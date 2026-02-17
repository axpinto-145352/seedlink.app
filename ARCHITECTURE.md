# SeedLink.app — Workflow Architecture

This document describes the n8n workflow architecture for SeedLink's AI Content Engine and LinkedIn Outreach support system. Each workflow is a separate JSON file in the `workflows/` directory, designed for direct import into n8n.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SEEDLINK AUTOMATION SYSTEM                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  EDITORIAL CALENDAR (Google Sheets)                                 │
│       │                                                             │
│       ▼                                                             │
│  ┌──────────────────────┐     ┌──────────────────────────┐         │
│  │ editorial-calendar-  │────▶│ content-pipeline-main    │         │
│  │ manager              │     │ (topic → draft → review)  │         │
│  │ (weekly topic gen)   │     └──────────┬───────────────┘         │
│  └──────────────────────┘                │                          │
│                                          ▼                          │
│                              ┌──────────────────────────┐          │
│                              │ seo-content-optimizer     │          │
│                              │ (meta, schema, AEO/GEO)  │          │
│                              └──────────┬───────────────┘          │
│                                          │                          │
│                                          ▼                          │
│                              ┌──────────────────────────┐          │
│                              │ social-derivation         │          │
│                              │ (LinkedIn + X/Twitter)    │          │
│                              └──────────┬───────────────┘          │
│                                          │                          │
│                                          ▼                          │
│                              ┌──────────────────────────┐          │
│                              │ social-scheduler          │          │
│                              │ (auto-publish)            │          │
│                              └──────────────────────────┘          │
│                                                                     │
│  ┌──────────────────────┐     ┌──────────────────────────┐         │
│  │ analytics-reporter   │     │ outreach-response-handler │         │
│  │ (weekly reports)     │     │ (Prosp.AI routing)        │         │
│  └──────────────────────┘     └──────────────────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Shared Standards

### Node Naming Convention
- `Claude: [Action]` — AI API calls (e.g., `Claude: Generate Draft`)
- `Sheets: [Action]` — Google Sheets operations (e.g., `Sheets: Pull Topics`)
- `IF: [Condition]` — Conditional routing (e.g., `IF: Review Passed`)
- `HTTP: [Target]` — External API calls (e.g., `HTTP: Publish to Buffer`)
- `Set: [Description]` — Data transformation (e.g., `Set: Format Blog Data`)
- `Error: [Handler]` — Error handling nodes

### Error Handling Pattern
Every workflow includes:
1. A global Error Trigger node that catches unhandled errors
2. A Slack notification node that posts failure details to `NOTIFICATION_SLACK_WEBHOOK`
3. Retry logic on Claude API calls (1 retry with 5-second delay)

### Claude API Call Pattern
All Claude calls use HTTP Request nodes with:
```json
{
  "url": "https://api.anthropic.com/v1/messages",
  "method": "POST",
  "headers": {
    "x-api-key": "{{$env.ANTHROPIC_API_KEY}}",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
  },
  "body": {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": "<varies by use case>",
    "system": "<loaded from prompts/ files>",
    "messages": [{"role": "user", "content": "<dynamic>"}]
  }
}
```

### Workflow Metadata
```json
{
  "name": "SeedLink - [Workflow Name]",
  "tags": [{"name": "seedlink"}, {"name": "production"}],
  "settings": {
    "executionOrder": "v1",
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner"
  }
}
```

---

## Workflow Specifications

### 2a. `content-pipeline-main.json` — Master Content Pipeline

**Purpose**: End-to-end content creation from topic to approved draft.

**Trigger**: Schedule Trigger (daily at 9:00 AM UTC) OR Manual Trigger (webhook)

**Node Flow**:
1. `Schedule Trigger` / `Manual Trigger` — Initiates workflow
2. `Sheets: Pull Next Topic` — Reads next row from editorial calendar where Status = "Queued"
3. `IF: Topic Available` — Check if a topic was returned
4. `Set: Prepare Topic Brief` — Format topic data for Claude
5. `Claude: Expand Topic` — Expand topic into structured content brief (headline, angle, keyword, pillar, CTA type). `max_tokens: 1024`
6. `Set: Prepare Draft Request` — Combine brief with voice guidelines
7. `Claude: Generate Draft` — Produce 1,000–1,500 word blog post. `max_tokens: 4096`
8. `Claude: Review Draft` — Agentic editor checks voice, CTA placement, SEO density, readability. Returns JSON with pass/fail and notes. `max_tokens: 1024`
9. `IF: Review Passed` — Branch on review result
10. **If failed + revision count < 2**: `Set: Increment Revision Count` → `Claude: Revise Draft` → loop back to step 8
11. **If passed or max revisions reached**: `Sheets: Save Approved Draft` — Write draft to editorial calendar with status "Ready for Review"
12. `HTTP: Notify Slack` — Post notification that draft is ready for human review
13. `Error Trigger` → `HTTP: Slack Error Alert` — Global error handler

**Data Flow**:
- Input: Topic row from Google Sheets (topic, pillar, keyword, audience, reference links)
- Output: Completed blog draft saved to Google Sheets with status "Ready for Review"

---

### 2b. `social-derivation.json` — Blog-to-Social Repurposing

**Purpose**: Convert approved blog posts into LinkedIn, X/Twitter, and short-form social content.

**Trigger**: Webhook (fired when blog post status changes to "Approved")

**Node Flow**:
1. `Webhook Trigger` — Receives blog post data
2. `Sheets: Get Approved Post` — Pull full blog content from editorial calendar
3. `Claude: Derive LinkedIn Post` — Generate LinkedIn thought-leadership post (150–300 words, hook + insight + CTA). `max_tokens: 1024`
4. `Claude: Derive Twitter Thread` — Generate X/Twitter thread (5–7 tweets). `max_tokens: 1024`
5. `Claude: Derive Short Posts` — Generate 2–3 standalone social snippets. `max_tokens: 512`
6. `Sheets: Save Social Content` — Write all social variants to editorial calendar with suggested publish dates
7. `HTTP: Notify Slack` — Confirm social content is ready
8. `Error Trigger` → `HTTP: Slack Error Alert`

**Data Flow**:
- Input: Approved blog post content + metadata
- Output: LinkedIn post, Twitter thread, short-form posts saved with publish dates

---

### 2c. `social-scheduler.json` — Auto-Publish to Social Platforms

**Purpose**: Publish scheduled content to LinkedIn, X/Twitter, and blog CMS.

**Trigger**: Schedule Trigger (daily at 10:00 AM UTC)

**Node Flow**:
1. `Schedule Trigger` — Daily check
2. `Sheets: Pull Today's Posts` — Get all posts with today's publish date and status "Scheduled"
3. `IF: Posts Available` — Check if any posts are due
4. `Split In Batches` — Process each post individually
5. `Switch: Platform` — Route by platform (LinkedIn, X/Twitter, Blog)
6. **LinkedIn branch**: `HTTP: Publish to Buffer/Typefully` — POST to Buffer or Typefully API
7. **X/Twitter branch**: `HTTP: Publish to Buffer/Typefully` — POST to Buffer or Typefully API
8. **Blog branch**: `HTTP: Publish to WordPress` — POST to WordPress REST API
9. `Sheets: Update Status` — Mark each post as "Published" with URL
10. `Error Trigger` → `HTTP: Slack Error Alert`

**Data Flow**:
- Input: Posts from editorial calendar with today's date
- Output: Published posts, updated calendar statuses with live URLs

---

### 2d. `editorial-calendar-manager.json` — Calendar Population

**Purpose**: Generate weekly topic ideas balanced across content pillars.

**Trigger**: Schedule Trigger (Monday at 8:00 AM UTC)

**Node Flow**:
1. `Schedule Trigger` — Weekly Monday trigger
2. `Sheets: Get Recent Topics` — Pull last 30 days of topics for dedup check
3. `Sheets: Get Pillar Distribution` — Check pillar balance across recent topics
4. `Set: Prepare Topic Request` — Format context for Claude (recent topics, pillar gaps, trending signals)
5. `Claude: Generate Topics` — Generate 5–7 topic ideas for the week, balanced across pillars, with suggested publish dates, target keywords, and assigned pillars. `max_tokens: 1024`
6. `Code: Parse Topics` — Parse Claude's JSON response into individual topic rows
7. `Code: Dedup Check` — Compare generated topics against recent topics, filter duplicates
8. `Sheets: Write New Topics` — Append approved topics to editorial calendar with status "Queued"
9. `HTTP: Notify Slack` — Confirm new topics added
10. `Error Trigger` → `HTTP: Slack Error Alert`

**Data Flow**:
- Input: Last 30 days of topics, pillar distribution data
- Output: 5–7 new topics written to editorial calendar

---

### 2e. `seo-content-optimizer.json` — SEO/AEO/GEO Optimization

**Purpose**: Add SEO metadata, schema markup, and AI-citable optimizations to approved blog posts.

**Trigger**: Webhook (fired after blog draft approved, before publish)

**Node Flow**:
1. `Webhook Trigger` — Receives approved blog post data
2. `Sheets: Get Post Content` — Pull full blog content and target keyword
3. `Claude: Generate SEO Metadata` — Generate meta title, meta description, and suggested internal links. `max_tokens: 512`
4. `Claude: Generate Schema Markup` — Create JSON-LD structured data (Article, FAQ, Organization schemas). `max_tokens: 1024`
5. `Set: Combine SEO Data` — Merge metadata, schema, and optimization suggestions
6. `Sheets: Save SEO Data` — Update post row with SEO metadata
7. `HTTP: Notify Slack` — Confirm SEO optimization complete
8. `Error Trigger` → `HTTP: Slack Error Alert`

**Data Flow**:
- Input: Blog post content + target keyword
- Output: Meta title, meta description, JSON-LD schema, internal link suggestions

---

### 2f. `analytics-reporter.json` — Performance Tracking

**Purpose**: Compile weekly content and outreach performance reports.

**Trigger**: Schedule Trigger (Friday at 4:00 PM UTC)

**Node Flow**:
1. `Schedule Trigger` — Weekly Friday trigger
2. `Sheets: Get Published Content` — Pull all content published this week
3. `Sheets: Get Analytics Data` — Pull engagement metrics from analytics sheet
4. `Set: Compile Report Data` — Aggregate metrics by platform, pillar, and content type
5. `Code: Format Report` — Structure into readable report format
6. `Sheets: Save Report` — Write report to Analytics sheet
7. `HTTP: Send Slack Report` — Post summary to Slack with key metrics
8. `Error Trigger` → `HTTP: Slack Error Alert`

**Data Flow**:
- Input: Published content data, engagement metrics
- Output: Formatted report in Google Sheets + Slack summary

---

### 2g. `outreach-response-handler.json` — Prosp.AI Response Routing

**Purpose**: Classify and route incoming outreach responses from LinkedIn.

**Trigger**: Webhook (from Prosp.AI or manual trigger)

**Node Flow**:
1. `Webhook Trigger` — Receives response data
2. `Set: Format Response` — Normalize response data
3. `Claude: Classify Response` — Classify as: interested, not_interested, question, meeting_request. `max_tokens: 256`
4. `Code: Parse Classification` — Extract classification from Claude response
5. `Switch: Response Type` — Route based on classification
6. **Interested**: `Sheets: Add to Hot Leads` — Flag for immediate human follow-up
7. **Not Interested**: `Sheets: Log and Archive` — Remove from active pipeline
8. **Question**: `Sheets: Flag for Review` — Queue for human response with suggested reply
9. **Meeting Request**: `Sheets: Add to Meetings` — Flag for calendar booking follow-up
10. `HTTP: Notify Slack` — Alert team of new response
11. `Error Trigger` → `HTTP: Slack Error Alert`

**Data Flow**:
- Input: LinkedIn response/message data from Prosp.AI
- Output: Classified and routed lead data in appropriate Google Sheets tabs

---

## Workflow Dependencies

```
editorial-calendar-manager ──▶ content-pipeline-main ──▶ seo-content-optimizer
                                                       ──▶ social-derivation ──▶ social-scheduler

analytics-reporter (standalone — runs weekly)
outreach-response-handler (standalone — triggered by webhooks)
```

## Credential References

| Credential Name | Type | Used By |
|----------------|------|---------|
| `anthropic_api` | API Key | All workflows with Claude calls |
| `google_sheets` | OAuth2 | All workflows with Sheets operations |
| `buffer_api` or `typefully_api` | API Key | `social-scheduler` |
| `wordpress_api` | API Key / Basic Auth | `social-scheduler` |
| `slack_webhook` | Webhook URL | All workflows (error handling + notifications) |
