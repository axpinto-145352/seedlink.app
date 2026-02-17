# SeedLink.app — n8n Workflow Build Project

## Project Overview

You are building the automation infrastructure for SeedLink.app, an AI tools marketplace and talent platform. This project has two workstreams defined in the proposal and SOW documents located in this directory. Your job is to extract requirements from those documents and build production-ready n8n workflows.

## Step 1: Extract Requirements

Before writing any code, read both documents thoroughly:

- `SeedLink_Combined_Proposal_VeteranVectors_Updated.docx` — The growth strategy proposal
- `SeedLink_SOW_Combined_VeteranVectors_Updated.docx` — The detailed Statement of Work

Create a file called `REQUIREMENTS.md` that extracts and organizes:

1. **Workstream A (Prosp.AI LinkedIn Outreach)** — Identify any automation touchpoints that require n8n (response handling workflows, lead qualification triggers, CRM sync, etc.). Note: Prosp.AI is a third-party tool — we build the *glue* around it, not the tool itself.

2. **Workstream B (AI Content Engine)** — This is the core n8n build. Extract every workflow requirement including:
   - Content pipeline stages (topic input → draft → review → publish)
   - Content types (blog posts, LinkedIn posts, X/Twitter posts)
   - AI integration points (Claude API for drafting, reviewing, social derivation)
   - Scheduling integrations (Buffer or Typefully)
   - SEO/AEO/GEO optimization steps
   - Analytics and tracking requirements
   - CTA strategy for marketplace and Playbook references

3. **Integration Points** — List every external service/API the workflows must connect to:
   - Anthropic Claude API
   - LinkedIn (publishing)
   - X/Twitter (publishing)
   - Buffer or Typefully (scheduling)
   - Google Sheets or Airtable (editorial calendar, tracking)
   - WordPress or CMS (blog publishing)
   - Google Analytics / tracking pixels
   - Google Search Console (SEO monitoring)

4. **Content Pillars** — The four content pillars that drive topic generation:
   - Finding AI Talent
   - Zero to MVP
   - AI Industry Trends
   - SeedLink in Action

5. **Voice & Tone Requirements** — Extract any brand voice guidelines (founder-to-founder, non-salesy, etc.)

6. **Monthly Retainer Workflows** — Identify recurring/maintenance workflows needed post-launch.

Save `REQUIREMENTS.md` before proceeding.

## Step 2: Design Workflow Architecture

Create `ARCHITECTURE.md` documenting the workflow design:

### Required Workflows

Design each workflow as a separate n8n JSON file. At minimum, build these:

#### 2a. `content-pipeline-main.json` — Master Content Pipeline
- **Trigger**: Scheduled (daily/weekly) OR manual webhook
- **Input**: Pulls next topic from editorial calendar (Google Sheets)
- **Stage 1 — Topic Expansion**: Claude API call to expand topic into structured brief (headline, angle, target keyword, content pillar, CTA type)
- **Stage 2 — Draft Generation**: Claude API call with voice guidelines and brief to produce full blog post draft
- **Stage 3 — Agentic Review**: Claude API call acting as editor — checks voice consistency, CTA placement for marketplace/Playbook, SEO keyword density, readability
- **Stage 4 — Revision**: If review flags issues, loop back to drafting with editor notes (max 2 revision cycles)
- **Stage 5 — Output**: Save approved draft to Google Sheets/Airtable with status "Ready for Review"
- **Notification**: Send Slack/email notification that draft is ready for human review

#### 2b. `social-derivation.json` — Blog-to-Social Repurposing
- **Trigger**: Webhook or status change (blog post marked "Approved")
- **Input**: Approved blog post content
- **LinkedIn Post**: Claude API call to derive a LinkedIn post (hook + insight + CTA to full article)
- **X/Twitter Thread**: Claude API call to derive a Twitter thread (3-5 tweets, thread structure)
- **Short-form Post**: Claude API call for a punchy standalone social post
- **Output**: Save all social variants to editorial calendar with publish dates
- **Each social post must include marketplace/Playbook CTAs where natural**

#### 2c. `social-scheduler.json` — Auto-Publish to Social Platforms
- **Trigger**: Scheduled (checks for posts due today)
- **Input**: Pull posts with today's publish date from editorial calendar
- **LinkedIn**: Publish via Buffer/Typefully API OR LinkedIn API
- **X/Twitter**: Publish via Buffer/Typefully API
- **Blog**: Publish to CMS via API (WordPress REST API or equivalent)
- **Post-publish**: Update editorial calendar status to "Published" with URL

#### 2d. `editorial-calendar-manager.json` — Calendar Population
- **Trigger**: Weekly scheduled (Monday morning)
- **Input**: Content pillars, previous topics (to avoid repetition), trending topics
- **Process**: Claude API call to generate 5-7 topic ideas for the week, balanced across pillars
- **Output**: Populate editorial calendar with topics, suggested publish dates, assigned pillar, target keywords
- **Dedup check**: Compare against last 30 days of topics to prevent repetition

#### 2e. `seo-content-optimizer.json` — SEO/AEO/GEO Optimization
- **Trigger**: Webhook (fired after blog draft approved, before publish)
- **Input**: Blog post content + target keyword
- **Process**: Claude API call to:
  - Generate meta title and description
  - Create structured data / schema markup (JSON-LD)
  - Optimize for AI-citable content (clear definitions, structured answers)
  - Suggest internal links to marketplace/Playbook
- **Output**: Updated post with SEO metadata attached

#### 2f. `analytics-reporter.json` — Performance Tracking
- **Trigger**: Weekly scheduled
- **Input**: Pull data from Google Analytics, LinkedIn analytics, X/Twitter analytics
- **Process**: Compile into structured report
- **Output**: Save report to Google Sheets, send summary via Slack/email

#### 2g. `outreach-response-handler.json` — Prosp.AI Response Routing (Workstream A support)
- **Trigger**: Webhook from Prosp.AI or LinkedIn notification
- **Input**: Incoming response/connection acceptance
- **Process**: Classify response type (interested, not interested, question, meeting request)
- **Output**: Route to appropriate follow-up sequence or flag for human review

## Step 3: Build the Workflows

For each workflow, create a valid n8n JSON file in the `workflows/` directory.

### n8n Workflow Standards

Follow these conventions for every workflow:

**Node Naming**: Use descriptive names like `Claude: Generate Draft`, `Sheets: Pull Topics`, `IF: Review Passed`

**Error Handling**: Every workflow must include:
- Try/catch or error trigger nodes
- Fallback notifications (Slack/email) on failure
- Retry logic for API calls (especially Claude API)

**Claude API Calls**: Use the HTTP Request node with:
- URL: `https://api.anthropic.com/v1/messages`
- Method: POST
- Headers: `x-api-key: {{$env.ANTHROPIC_API_KEY}}`, `anthropic-version: 2023-06-01`, `content-type: application/json`
- Model: `claude-sonnet-4-20250514` (cost-efficient for content generation)
- Always include a detailed system prompt with voice guidelines
- Set `max_tokens` appropriately (4096 for blog posts, 1024 for social posts, 512 for metadata)

**Credentials**: Use n8n credential references, never hardcode keys. Reference these credential names:
- `anthropic_api` — Anthropic API key
- `google_sheets` — Google Sheets OAuth
- `buffer_api` or `typefully_api` — Social scheduling
- `wordpress_api` — CMS access
- `slack_webhook` — Notifications

**Environment Variables**: Reference via `{{$env.VARIABLE_NAME}}`:
- `ANTHROPIC_API_KEY`
- `SEEDLINK_EDITORIAL_CALENDAR_ID` (Google Sheet ID)
- `SEEDLINK_BLOG_URL`
- `NOTIFICATION_SLACK_WEBHOOK`

**Workflow Metadata**: Each JSON must include:
```json
{
  "name": "SeedLink - [Workflow Name]",
  "tags": ["seedlink", "production"],
  "settings": {
    "executionOrder": "v1",
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner"
  }
}
```

### System Prompts for Claude API Calls

Create a `prompts/` directory with separate `.md` files for each system prompt:

- `prompts/content-brief-generator.md` — Topic expansion prompt
- `prompts/blog-writer.md` — Blog post drafting prompt (include voice guide, CTA requirements, pillar context)
- `prompts/content-reviewer.md` — Agentic editor prompt (evaluation criteria, scoring rubric)
- `prompts/linkedin-deriver.md` — Blog-to-LinkedIn conversion prompt
- `prompts/twitter-deriver.md` — Blog-to-Twitter thread conversion prompt
- `prompts/seo-optimizer.md` — SEO metadata generation prompt
- `prompts/topic-generator.md` — Weekly topic ideation prompt
- `prompts/response-classifier.md` — Outreach response classification prompt

Each prompt must reference SeedLink's brand context:
- SeedLink.app is an AI tools marketplace and talent platform
- Content should drive discovery of the marketplace and Playbook
- Tone: founder-to-founder, practical, non-salesy
- Target audience: founders and teams building with AI

## Step 4: Create Supporting Files

### `google-sheets-template.md`
Document the editorial calendar Google Sheet structure:
- Sheet 1: "Editorial Calendar" — columns: Topic, Pillar, Target Keyword, Status, Draft URL, Publish Date, LinkedIn Post, Twitter Thread, Blog URL, Notes
- Sheet 2: "Analytics" — columns: Date, Post Title, Platform, Impressions, Engagement, Clicks, Conversions
- Sheet 3: "Topics Archive" — columns: Topic, Pillar, Date Used, Performance Score

### `setup-guide.md`
Step-by-step setup instructions for the client:
1. Import each workflow JSON into n8n
2. Configure credentials (API keys, OAuth connections)
3. Set environment variables
4. Create Google Sheets from template
5. Test each workflow manually
6. Enable scheduled triggers

### `sop.md`
Standard Operating Procedure for ongoing content operations:
- Daily: Review and approve drafted content
- Weekly: Check editorial calendar population, review analytics
- Monthly: Adjust content pillars, update voice guidelines, review keyword strategy

## File Structure

When complete, the directory should contain:

```
Seedlink.app builds/
├── REQUIREMENTS.md
├── ARCHITECTURE.md
├── setup-guide.md
├── sop.md
├── google-sheets-template.md
├── workflows/
│   ├── content-pipeline-main.json
│   ├── social-derivation.json
│   ├── social-scheduler.json
│   ├── editorial-calendar-manager.json
│   ├── seo-content-optimizer.json
│   ├── analytics-reporter.json
│   └── outreach-response-handler.json
└── prompts/
    ├── content-brief-generator.md
    ├── blog-writer.md
    ├── content-reviewer.md
    ├── linkedin-deriver.md
    ├── twitter-deriver.md
    ├── seo-optimizer.md
    ├── topic-generator.md
    └── response-classifier.md
```

## Execution Order

1. Read documents → Create `REQUIREMENTS.md`
2. Design architecture → Create `ARCHITECTURE.md`
3. Write system prompts → Populate `prompts/` directory
4. Build workflows → Populate `workflows/` directory
5. Create supporting docs → `setup-guide.md`, `sop.md`, `google-sheets-template.md`
6. Validate all workflow JSONs are syntactically valid
7. Write a final `SUMMARY.md` listing what was built and any assumptions made

## Important Notes

- **Do not stub or placeholder anything.** Every workflow JSON must be complete and importable into n8n.
- **Every Claude API system prompt must be fully written** — no "insert guidelines here" placeholders.
- **Reference the SOW pricing and timeline** — the build phase is 1 week, so workflows should be practical and shippable, not over-engineered.
- **The $50/month Claude API budget** mentioned in the SOW should inform prompt efficiency — prefer shorter, focused prompts over verbose ones.
- **Test mental model**: Before saving each workflow, mentally walk through the node chain and verify data flows correctly between nodes.
