# SeedLink.app — Workflow Architecture (v2)

This document describes the n8n workflow architecture for SeedLink's AI Content Engine and LinkedIn Outreach support system. **Version 2** consolidates from 7 workflows to 5, introduces multi-agent review, and uses Google Sheets as the primary user interface.

---

## System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    SEEDLINK AUTOMATION SYSTEM (v2)                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  GOOGLE SHEETS "Content Hub" (Primary User Interface)                    │
│       │                                                                  │
│       ▼                                                                  │
│  ┌──────────────────────┐     ┌──────────────────────────────────┐      │
│  │ editorial-calendar-  │────▶│ content-pipeline-main             │      │
│  │ manager              │     │                                    │      │
│  │ (weekly topic gen)   │     │  Topic Expansion                   │      │
│  └──────────────────────┘     │       ↓                            │      │
│                               │  Draft Generation                  │      │
│                               │       ↓                            │      │
│                               │  ┌─── Multi-Agent Review ───┐     │      │
│                               │  │ Voice Agent              │     │      │
│                               │  │ Strategy Agent            │     │      │
│                               │  │ SEO/AEO Agent            │     │      │
│                               │  └──────────────────────────┘     │      │
│                               │       ↓                            │      │
│                               │  Editor-Unifier (final pass)      │      │
│                               │       ↓                            │      │
│                               │  → Save to Content Hub             │      │
│                               └──────────┬───────────────────────┘      │
│                                          │                               │
│                      User approves in Google Sheets                      │
│                                          │                               │
│                                          ▼                               │
│                               ┌──────────────────────────┐             │
│                               │ social-engine             │             │
│                               │ (derive + schedule +      │             │
│                               │  publish)                 │             │
│                               └──────────────────────────┘             │
│                                                                          │
│  ┌──────────────────────┐     ┌──────────────────────────┐             │
│  │ analytics-reporter   │     │ outreach-response-handler │             │
│  │ (weekly reports)     │     │ (Prosp.AI routing)        │             │
│  └──────────────────────┘     └──────────────────────────┘             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Key Changes from v1

| Change | v1 | v2 | Rationale |
|--------|----|----|-----------|
| Workflow count | 7 | 5 | SEO optimizer absorbed into content pipeline; social derivation + scheduler merged |
| Content review | 1 monolithic reviewer | 4 specialized agents | Deeper, focused evaluation of voice, strategy, SEO/AEO, then unified edit |
| User interface | Workflows + manual actions | Google Sheets as primary UI | User edits content, approves, and schedules directly in the sheet |
| AEO optimization | Basic FAQ structure | Full AEO layer (definitions, Key Takeaways, LLMs.txt-ready, verifiable claims) | Content structured for AI citation, not just SEO |
| Outreach sheets | 4 separate sheets (Hot Leads, Meetings, Questions, Archived) | 1 "Outreach" sheet with Type column | Simpler to manage, filter, and review |
| Sheet structure | 7 sheets | 5 sheets (Content Hub, Social Queue, Analytics, Topics Archive, Outreach) | Cleaner, less tab-switching |

---

## Shared Standards

### Node Naming Convention
- `Claude: [Action]` — AI API calls (e.g., `Claude: Voice Review`)
- `Sheets: [Action]` — Google Sheets operations (e.g., `Sheets: Save Final Content`)
- `IF: [Condition]` — Conditional routing (e.g., `IF: All Agents Passed`)
- `HTTP: [Target]` — External API calls (e.g., `HTTP: Publish to Buffer`)
- `Set: [Description]` — Data transformation (e.g., `Set: Aggregate Reviews`)
- `Code: [Purpose]` — JavaScript logic (e.g., `Code: Parse Agent Responses`)
- `Switch: [Criteria]` — Multi-path routing (e.g., `Switch: Platform`)

### Error Handling Pattern
Every workflow includes:
1. A global Error Trigger node that catches unhandled errors
2. A Slack notification node that posts failure details to `NOTIFICATION_SLACK_WEBHOOK`
3. Timeout settings on all Claude API calls (120s for drafts, 60s for reviews)

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
    "max_tokens": "<varies>",
    "system": "<agent-specific prompt>",
    "messages": [{"role": "user", "content": "<dynamic>"}]
  }
}
```

### Token Budget per Content Piece

| API Call | max_tokens | Estimated Cost |
|----------|-----------|----------------|
| Topic Expansion | 1,024 | ~$0.05 |
| Draft Generation | 4,096 | ~$0.15 |
| Voice Review | 1,024 | ~$0.08 |
| Strategy Review | 1,024 | ~$0.08 |
| SEO/AEO Review | 1,024 | ~$0.08 |
| Editor-Unifier | 4,096 | ~$0.15 |
| LinkedIn Derivation | 1,024 | ~$0.08 |
| Twitter Derivation | 1,024 | ~$0.08 |
| Short Posts | 512 | ~$0.04 |
| **Total per piece** | — | **~$0.79** |

At 4 pieces/week × 4 weeks = 16 pieces/month × $0.79 = **~$12.64/month** — well within the $50/month Claude API budget.

---

## Workflow Specifications

### 1. `content-pipeline-main.json` — Content Pipeline with Multi-Agent Review

**Purpose**: End-to-end content creation from topic to reviewed draft, with SEO/AEO optimization built in.

**Trigger**: Schedule Trigger (daily 9:00 AM) OR Manual Trigger

**Node Flow**:
```
Schedule/Manual Trigger
    ↓
Sheets: Pull Next Topic (Status = "Queued" from Content Hub)
    ↓
IF: Topic Found → (no) → Slack: No Topics
    ↓ (yes)
Set: Prepare Topic Brief
    ↓
Claude: Expand Topic (content-brief-generator prompt, 1024 tokens)
    ↓
Claude: Generate Draft (blog-writer prompt, 4096 tokens)
    ↓
┌── Multi-Agent Review (sequential) ──┐
│ Claude: Voice Review (voice-agent)   │
│ Claude: Strategy Review (strategy)   │
│ Claude: SEO/AEO Review (seo-aeo)    │
└──────────────────────────────────────┘
    ↓
Code: Aggregate Reviews (parse all 3, calculate pass/fail)
    ↓
IF: All Agents Passed
    ├── (yes) → Claude: Editor-Unifier (final synthesis, 4096 tokens)
    │              ↓
    │           Code: Parse Final Content
    │              ↓
    │           Sheets: Save Final Content (Status = "Ready for Review")
    │              ↓
    │           HTTP: Notify Slack
    │
    └── (no) → IF: Max Revisions (< 2)
                 ├── (yes) → Claude: Revise Draft → loop back to Voice Review
                 └── (no) → Sheets: Save as "Needs Manual Review" with agent feedback
```

**Multi-Agent Review Architecture**:

| Agent | Prompt File | What It Checks | Score Weight |
|-------|-------------|----------------|--------------|
| Voice Agent | `voice-agent.md` | Tone, concreteness, accessibility, word choice | 25% |
| Strategy Agent | `strategy-agent.md` | Pillar alignment, audience targeting, CTA integration, value delivery | 25% |
| SEO/AEO Agent | `seo-aeo-agent.md` | Keyword placement, meta quality, structure, AI citability, FAQ quality, verifiable claims | 30% |
| Editor-Unifier | `editor-unifier-agent.md` | Synthesizes all feedback, produces final draft, editorial quality check | Final pass |

**Pass/Fail Logic**:
- All 3 review agents must individually pass (avg score >= 3.5, no score below 2.5)
- If any agent fails → revision loop (max 2 cycles)
- If all pass → Editor-Unifier produces final content

**Data Written to Content Hub**:
- Draft Content (final edited version)
- Voice Score, Strategy Score, SEO/AEO Score
- Review Notes (summary from Editor-Unifier)
- Meta Title, Meta Description, Schema Markup (from SEO/AEO Agent)
- Revision Count
- Status = "Ready for Review"

---

### 2. `social-engine.json` — Social Derivation + Scheduling + Publishing

**Purpose**: Derives social content from approved blog posts AND publishes scheduled content. Merges the old social-derivation and social-scheduler workflows.

**Triggers**: Webhook (content approved) + Schedule Trigger (daily 10:00 AM for publishing)

**Path A — Social Derivation** (webhook triggered):
```
Webhook: Content Approved
    ↓
Sheets: Get Approved Post (from Content Hub)
    ↓
Set: Format Blog Data
    ↓
┌── Parallel Claude Calls ──┐
│ Claude: Derive LinkedIn    │
│ Claude: Derive Twitter     │
│ Claude: Derive Short Posts │
└────────────────────────────┘
    ↓
Set: Merge Social Content (+ set staggered publish dates)
    ↓
Sheets: Save Social Content (Content Hub + Social Queue)
    ↓
HTTP: Notify Slack
```

**Path B — Social Publishing** (schedule triggered):
```
Schedule Trigger (daily 10am)
    ↓
Sheets: Pull Today's Social Posts (Social Queue, Status = "Scheduled")
    ↓
IF: Posts Available → (no) → Slack: No Posts Today
    ↓ (yes)
SplitInBatches
    ↓
Switch: Platform
    ├── LinkedIn → HTTP: Publish to Buffer
    ├── Twitter → HTTP: Publish to Buffer
    └── Blog → HTTP: Publish to WordPress
    ↓
Sheets: Update Published Status (+ URL)
    ↓
Loop back to SplitInBatches
```

---

### 3. `editorial-calendar-manager.json` — Weekly Topic Generation

**Purpose**: Generate weekly topic ideas balanced across content pillars.

**Trigger**: Schedule Trigger (Monday 8:00 AM)

**Node Flow**:
```
Schedule Trigger
    ↓
Sheets: Get Recent Topics (Topics Archive, last 30 days)
  + Sheets: Get Pillar Distribution (Content Hub, pillar counts)
    ↓
Set: Prepare Topic Request
    ↓
Claude: Generate Topics (topic-generator prompt, 1024 tokens)
    ↓
Code: Parse Topics → Code: Dedup Check
    ↓
Sheets: Write New Topics (to Content Hub, Status = "Queued")
    ↓
HTTP: Notify Slack
```

---

### 4. `analytics-reporter.json` — Analytics & Reporting

**Purpose**: Compile weekly content performance reports.

**Trigger**: Schedule Trigger (Friday 4:00 PM)

**Node Flow**:
```
Schedule Trigger
    ↓
Sheets: Get Published Content (Content Hub)
  + Sheets: Get Analytics Data (Analytics sheet)
    ↓
Set: Compile Report Data
    ↓
Code: Format Report (pillar distribution, top performers, recommendations)
    ↓
Sheets: Save Report (Analytics sheet)
    ↓
HTTP: Send Slack Report
```

---

### 5. `outreach-response-handler.json` — Outreach Response Routing

**Purpose**: Classify and route incoming LinkedIn outreach responses.

**Trigger**: Webhook (from Prosp.AI)

**Node Flow**:
```
Webhook Trigger
    ↓
Set: Format Response
    ↓
Claude: Classify Response (response-classifier prompt, 256 tokens)
    ↓
Code: Parse Classification
    ↓
Code: Map Classification to Type
    ↓
Sheets: Log Response (single "Outreach" sheet with Type column)
    ↓
HTTP: Notify Slack
```

---

## Workflow Dependencies

```
editorial-calendar-manager ──▶ content-pipeline-main ──▶ social-engine
                                   (multi-agent review       (derive + publish)
                                    + SEO built in)

analytics-reporter (standalone — runs weekly on Fridays)
outreach-response-handler (standalone — triggered by Prosp.AI webhooks)
```

## Google Sheets as Primary UI

The Google Sheets workbook is the single interface for all user interaction:

| Sheet | Purpose | User Actions |
|-------|---------|-------------|
| **Content Hub** | Central content workspace | Add topics, review drafts, edit content, approve, schedule |
| **Social Queue** | Social post scheduling | Review derived posts, set publish dates |
| **Analytics** | Performance tracking | Review weekly reports |
| **Topics Archive** | Historical dedup | Reference only |
| **Outreach** | Lead management | Review classifications, update follow-up status |

**Key Design Principle**: Workflows never auto-advance past human checkpoints. The user manually changes Status to "Approved" and "Scheduled" — the system never does this automatically.

---

## Prompt Files

| File | Used By | Purpose |
|------|---------|---------|
| `content-brief-generator.md` | Content Pipeline | Topic → structured brief |
| `blog-writer.md` | Content Pipeline | Brief → 1,000-1,500 word blog post (AEO-optimized) |
| `voice-agent.md` | Content Pipeline | Review: tone, concreteness, accessibility, word choice |
| `strategy-agent.md` | Content Pipeline | Review: pillar alignment, audience, CTA, value delivery |
| `seo-aeo-agent.md` | Content Pipeline | Review: SEO keywords, meta, AEO citability + generate metadata |
| `editor-unifier-agent.md` | Content Pipeline | Synthesize all agent feedback, produce final draft |
| `linkedin-deriver.md` | Social Engine | Blog → LinkedIn post |
| `twitter-deriver.md` | Social Engine | Blog → X/Twitter thread |
| `topic-generator.md` | Editorial Calendar | Generate weekly topic ideas |
| `response-classifier.md` | Outreach Handler | Classify outreach responses |

---

## Credential References

| Credential Name | Type | Used By |
|----------------|------|---------|
| `google_sheets` | OAuth2 | All workflows |
| `buffer_api` | HTTP Header Auth | Social Engine |
| `wordpress_api` | HTTP Basic Auth | Social Engine |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API authentication |
| `SEEDLINK_EDITORIAL_CALENDAR_ID` | Google Sheets workbook ID |
| `SEEDLINK_BLOG_URL` | WordPress blog base URL |
| `NOTIFICATION_SLACK_WEBHOOK` | Slack notification webhook |
| `BUFFER_LINKEDIN_PROFILE_ID` | Buffer LinkedIn profile |
| `BUFFER_TWITTER_PROFILE_ID` | Buffer Twitter profile |
