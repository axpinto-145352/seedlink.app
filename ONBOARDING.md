# SEEDLINK.APP

## Client Onboarding Guide
## LinkedIn Outreach & AI Content Engine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Prepared by** Veteran Vectors
**For** Shilpa Kollengode, CEO — SeedLink
**Date** February 17, 2026

**CONFIDENTIAL**

---

## TABLE OF CONTENTS

1. Welcome & What Was Built
2. System Overview
3. Getting Started Checklist
4. Platform Setup Guide
5. Your Google Sheets Hub — The Control Center
6. Daily Operations (10-15 minutes)
7. Weekly Operations (30-45 minutes)
8. Monthly Operations (2-3 hours)
9. How the AI Works Behind the Scenes
10. What You Control vs. What's Automated
11. Troubleshooting & FAQ
12. Support & Contacts

---

## 1. Welcome & What Was Built

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your SeedLink automation system is live. Here's what it does:

**Content Engine (Workstream B)**
- Generates blog topics weekly, balanced across your 4 content pillars
- Writes full 1,000-1,500 word blog posts using AI, reviewed by 4 specialized AI agents
- Derives LinkedIn posts, X/Twitter threads, and short-form social content from each blog
- Publishes to WordPress, LinkedIn (via Buffer), and X/Twitter (via Buffer) on your schedule
- Tracks performance weekly and reports to Slack

**Outreach Support (Workstream A)**
- Classifies incoming LinkedIn responses from Prosp.AI automatically
- Routes prospects to Hot Leads, Meetings, Questions, or Archived categories
- Notifies you in Slack when new responses arrive

**Your only ongoing job**: Review AI-generated content, approve what's good, edit what needs work, and follow up on hot outreach leads. Everything else runs automatically.

---

## 2. System Overview

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The entire system runs through **5 automated workflows** and **1 Google Sheets workbook** that acts as your control center.

```
YOU (Google Sheets)
    │
    ├── Review & approve blog drafts
    ├── Review & schedule social content
    ├── Follow up on outreach leads
    │
    ▼
AUTOMATION (n8n + Claude AI)
    │
    ├── Generates topics every Monday
    ├── Writes and reviews blog drafts daily
    ├── Creates social content from approved blogs
    ├── Publishes on schedule
    ├── Classifies outreach responses
    └── Reports performance every Friday
```

**The key design principle**: The system never publishes anything without your approval. You decide what goes live and when.

### Your 5 Workflows

| Workflow | What It Does | When It Runs |
|----------|-------------|--------------|
| **Editorial Calendar** | Generates 5-7 topic ideas for the week | Every Monday, 8:00 AM |
| **Content Pipeline** | Writes blog posts and runs them through 4 AI reviewers | Every day, 9:00 AM |
| **Social Engine** | Derives social content from approved blogs + publishes scheduled posts | On approval + every day, 10:00 AM |
| **Analytics Reporter** | Compiles weekly performance data | Every Friday, 4:00 PM |
| **Outreach Handler** | Classifies and routes LinkedIn responses | Instantly (when responses come in) |

---

## 3. Getting Started Checklist

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Complete these steps to go live. Veteran Vectors will handle the technical setup — your items are marked with **[YOU]**.

### Accounts & Access

- [ ] **[YOU]** Confirm n8n cloud instance is running ($25/month plan minimum)
- [ ] **[YOU]** Provide WordPress admin access for seedlink.app blog
- [ ] **[YOU]** Confirm Buffer or Typefully account is active
- [ ] **[YOU]** Confirm Slack workspace is ready (for notifications)
- [ ] **[YOU]** Provide Prosp.AI webhook access (for outreach routing)

### Google Sheets Setup

- [ ] **[VV]** Create the "SeedLink Content Hub" workbook with 5 sheets
- [ ] **[VV]** Set up column headers, data validation dropdowns, and conditional formatting
- [ ] **[YOU]** Bookmark the Google Sheets workbook — this is your daily workspace
- [ ] **[YOU]** Share the workbook with the n8n service account email (provided by VV)

### Workflow Import & Configuration

- [ ] **[VV]** Import all 5 workflows into n8n
- [ ] **[VV]** Configure all API credentials (Claude, Google Sheets, Buffer, WordPress, Slack)
- [ ] **[VV]** Set environment variables
- [ ] **[VV]** Run manual tests on each workflow
- [ ] **[VV]** Activate scheduled triggers

### Go-Live Verification

- [ ] **[VV + YOU]** Verify first batch of topics appears in Content Hub
- [ ] **[VV + YOU]** Review first AI-generated blog draft together
- [ ] **[VV + YOU]** Approve a test post and verify social content is derived
- [ ] **[VV + YOU]** Publish a test post and verify it appears on WordPress + Buffer
- [ ] **[VV + YOU]** Send a test outreach response and verify it's classified correctly

---

## 4. Platform Setup Guide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step-by-step setup instructions for every platform in the SeedLink automation stack. Items marked **[YOU]** require your action or credentials. Items marked **[VV]** are handled by Veteran Vectors during onboarding.

### 4.1 n8n (Workflow Automation Platform)

n8n is the engine that runs all 5 workflows. It connects everything together.

| Detail | Value |
|--------|-------|
| **What it does** | Runs your automated workflows on schedule |
| **Plan needed** | Cloud Starter ($25/month minimum) or self-hosted |
| **URL** | https://n8n.io |

**Setup Steps:**

1. **[YOU]** Create an n8n Cloud account at https://app.n8n.cloud/register
2. **[YOU]** Select the Starter plan ($25/month) — this includes enough executions for all 5 workflows
3. **[YOU]** Share your n8n instance URL and login credentials with VV (temporarily, for setup)
4. **[VV]** Import all 5 workflow JSON files
5. **[VV]** Configure environment variables in **Settings > Variables**:

   | Variable | Value | Where You Get It |
   |----------|-------|-----------------|
   | `ANTHROPIC_API_KEY` | `sk-ant-...` | Anthropic Console (see 4.2) |
   | `SEEDLINK_EDITORIAL_CALENDAR_ID` | Sheet ID string | Google Sheets URL (see 4.3) |
   | `SEEDLINK_BLOG_URL` | `https://seedlink.app` | Your blog URL |
   | `NOTIFICATION_SLACK_WEBHOOK` | `https://hooks.slack.com/...` | Slack (see 4.7) |
   | `BUFFER_LINKEDIN_PROFILE_ID` | Profile ID | Buffer API (see 4.5) |
   | `BUFFER_TWITTER_PROFILE_ID` | Profile ID | Buffer API (see 4.5) |

6. **[VV]** Set up credentials in **Settings > Credentials** (Google Sheets OAuth, Buffer API, WordPress API)
7. **[VV]** Test each workflow manually, then activate scheduled triggers

### 4.2 Anthropic (Claude AI API)

Claude AI writes all content, reviews drafts, classifies outreach responses, and generates SEO metadata.

| Detail | Value |
|--------|-------|
| **What it does** | Powers all AI content generation and review |
| **Budget** | ~$13/month typical, $50/month maximum |
| **URL** | https://console.anthropic.com |

**Setup Steps:**

1. **[YOU]** Create an Anthropic account at https://console.anthropic.com
2. **[YOU]** Go to **Settings > Billing** and add a payment method
3. **[YOU]** Set a monthly spending limit of **$50** (Settings > Limits) — this prevents surprise charges
4. **[YOU]** Go to **Settings > API Keys** and click **Create Key**
5. **[YOU]** Name it "SeedLink n8n" and copy the key (starts with `sk-ant-`)
6. **[YOU]** Send the API key to VV securely (do not send via plain email — use a secure channel)
7. **[VV]** Add the key as `ANTHROPIC_API_KEY` in n8n environment variables

**Monthly cost estimate:** At 4 blog posts/week, the system uses approximately $12-13/month in API calls. The $50 limit is a safety net, not a target.

### 4.3 Google Cloud Console + Google Sheets

Google Sheets is your primary interface for the entire system. The Google Cloud Console provides the OAuth credentials that let n8n read and write to your sheets.

| Detail | Value |
|--------|-------|
| **What it does** | Google Sheets = your control center. Cloud Console = API access. |
| **Cost** | Free (Google Sheets API has no cost at this usage level) |
| **Cloud Console URL** | https://console.cloud.google.com |

**Google Cloud Console Setup:**

1. **[YOU]** Go to https://console.cloud.google.com and sign in with the Google account that will own the Sheets workbook
2. **[YOU]** Create a new project — name it "SeedLink Automation"
3. **[VV]** Enable the **Google Sheets API**:
   - Navigate to **APIs & Services > Library**
   - Search "Google Sheets API" and click **Enable**
4. **[VV]** Create OAuth 2.0 credentials:
   - Go to **APIs & Services > Credentials**
   - Click **Create Credentials > OAuth client ID**
   - Application type: **Web application**
   - Name: "n8n SeedLink"
   - Add n8n's redirect URI under **Authorized redirect URIs** (n8n shows this URI during credential setup)
   - Copy the **Client ID** and **Client Secret**
5. **[VV]** Configure the OAuth consent screen:
   - Go to **APIs & Services > OAuth consent screen**
   - User type: **External** (or Internal if using Google Workspace)
   - App name: "SeedLink Automation"
   - Add your email as a test user
6. **[VV]** In n8n, create a **Google Sheets OAuth2** credential using the Client ID and Client Secret
7. **[VV]** Complete the OAuth authorization flow (browser popup to grant access)

**Google Sheets Workbook Setup:**

8. **[VV]** Create a new Google Sheets workbook named **"SeedLink Content Hub"**
9. **[VV]** Create 5 sheets with exact names: `Content Hub`, `Social Queue`, `Analytics`, `Topics Archive`, `Outreach`
10. **[VV]** Add all column headers, data validation dropdowns, and conditional formatting per the template
11. **[YOU]** Copy the **Sheet ID** from the URL — it's the long string between `/d/` and `/edit`:
    ```
    https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
    ```
12. **[YOU]** Share the workbook with the Google account used in the OAuth flow (edit access)
13. **[YOU]** Bookmark the workbook — this is your daily workspace

### 4.4 Prosp.AI + Sales Navigator (LinkedIn Outreach)

Prosp.AI automates LinkedIn outreach across your 4 profiles. Sales Navigator provides the lead targeting data. n8n connects to Prosp.AI via webhooks to classify and route incoming responses.

| Detail | Value |
|--------|-------|
| **What it does** | Automated LinkedIn outreach + lead targeting |
| **Cost** | Per your existing Prosp.AI and Sales Navigator plans |
| **Prosp.AI URL** | https://prosp.ai |

**Prosp.AI Setup:**

1. **[YOU]** Log into Prosp.AI and confirm all 4 LinkedIn profiles are connected and active
2. **[VV]** In n8n, activate the Outreach Response Handler workflow and copy the **Production Webhook URL**
3. **[YOU]** In Prosp.AI, go to **Settings > Webhooks** (or Integrations)
4. **[YOU]** Add the n8n webhook URL as the destination for **response events**
5. **[VV]** Map the Prosp.AI response payload fields:

   | Prosp.AI Field | Maps To |
   |---------------|---------|
   | Prospect name | `sender_name` |
   | Prospect title | `sender_title` |
   | Prospect company | `sender_company` |
   | Response text | `message_text` |
   | Response date | `response_date` |
   | Sending profile | `profile_source` |

6. **[VV + YOU]** Test with a sample response to verify the webhook connection works
7. **[VV]** Verify the response appears in the **Outreach** sheet with correct classification

**Sales Navigator Setup:**

8. **[YOU]** Confirm Sales Navigator subscription is active on all outreach profiles
9. **[VV]** Create initial lead lists segmented by target persona (per the proposal targeting strategy)
10. **[VV]** Configure Prosp.AI campaigns to pull from Sales Navigator lead lists

### 4.5 Buffer (Social Scheduling)

Buffer queues and publishes LinkedIn posts and X/Twitter content on your schedule.

| Detail | Value |
|--------|-------|
| **What it does** | Publishes social content to LinkedIn and X/Twitter |
| **Plan needed** | Team plan or higher (for API access) |
| **URL** | https://buffer.com |

**Setup Steps:**

1. **[YOU]** Log into Buffer and confirm LinkedIn and X/Twitter profiles are connected
2. **[YOU]** Go to **Settings > API** (or use Buffer's developer portal)
3. **[YOU]** Generate an **Access Token** and send it to VV securely
4. **[VV]** Find your profile IDs via the Buffer API (`GET /1/profiles.json`) — needed for routing posts to the correct accounts:

   | Profile | Environment Variable |
   |---------|---------------------|
   | LinkedIn (Shilpa's profile) | `BUFFER_LINKEDIN_PROFILE_ID` |
   | X/Twitter | `BUFFER_TWITTER_PROFILE_ID` |

5. **[VV]** Create a **Header Auth** credential in n8n named `buffer_api` with the access token
6. **[VV + YOU]** Test by scheduling a test post through the workflow and verifying it appears in Buffer's queue

**Alternative — Typefully:** If using Typefully instead of Buffer, the setup is similar: generate an API key in Typefully settings and provide it to VV. The workflow nodes will be adjusted to use Typefully's API endpoints.

### 4.6 WordPress (Blog CMS)

WordPress hosts the seedlink.app blog. The Social Engine publishes blog posts directly via the WordPress REST API.

| Detail | Value |
|--------|-------|
| **What it does** | Publishes blog posts to seedlink.app |
| **Cost** | Part of your existing hosting |
| **URL** | Your WordPress admin panel |

**Setup Steps:**

1. **[YOU]** Log into your WordPress admin panel (seedlink.app/wp-admin)
2. **[YOU]** Verify you're running **WordPress 5.6+** (Application Passwords is built in)
   - If running an older version, install the "Application Passwords" plugin
3. **[YOU]** Go to **Users > Your Profile > Application Passwords**
4. **[YOU]** Enter the name **"n8n SeedLink"** and click **Add New Application Password**
5. **[YOU]** Copy the generated password (it will only be shown once) — send it to VV securely along with your WordPress admin username
6. **[VV]** Create an **HTTP Basic Auth** credential in n8n named `wordpress_api`:
   - Username: your WordPress admin username
   - Password: the application password from step 5
7. **[VV]** Set `SEEDLINK_BLOG_URL` environment variable to `https://seedlink.app` (no trailing slash)
8. **[VV + YOU]** Test by publishing a draft post through the workflow and verifying it appears on the blog

### 4.7 Slack (Notifications)

Slack receives all system notifications — new drafts ready, published posts, weekly reports, errors, and outreach alerts.

| Detail | Value |
|--------|-------|
| **What it does** | Delivers real-time notifications from all workflows |
| **Cost** | Free (Incoming Webhooks) |
| **URL** | Your Slack workspace |

**Setup Steps:**

1. **[YOU]** In your Slack workspace, create a channel for notifications (e.g., `#seedlink-alerts`)
2. **[YOU]** Go to **Apps** (left sidebar) > search "Incoming Webhooks" > click **Add to Slack**
3. **[YOU]** Select the `#seedlink-alerts` channel as the destination
4. **[YOU]** Copy the **Webhook URL** (starts with `https://hooks.slack.com/services/...`)
5. **[YOU]** Send the webhook URL to VV
6. **[VV]** Set `NOTIFICATION_SLACK_WEBHOOK` environment variable in n8n
7. **[VV + YOU]** Test by triggering a workflow manually and verifying the Slack notification arrives

**What you'll receive in Slack:**

| Notification | When | From |
|-------------|------|------|
| "New topics generated" | Monday morning | Editorial Calendar |
| "Draft ready for review" | After each blog is drafted | Content Pipeline |
| "Social content derived" | After you approve a blog | Social Engine |
| "Post published" | When scheduled posts go live | Social Engine |
| "Weekly analytics report" | Friday afternoon | Analytics Reporter |
| "New outreach response" | When LinkedIn responses arrive | Outreach Handler |
| "Workflow error" | When any workflow fails | All workflows |

### 4.8 Platform Summary

| Platform | Owner Sets Up | VV Configures | Monthly Cost |
|----------|--------------|---------------|-------------|
| **n8n** | Account + plan | Workflows, credentials, variables | $25 |
| **Anthropic** | Account + billing + API key | n8n integration | ~$13 (up to $50) |
| **Google Cloud** | Account + project | OAuth, Sheets API, credentials | Free |
| **Google Sheets** | Sharing + bookmark | Workbook creation, formatting | Free |
| **Prosp.AI** | Webhook configuration | Payload mapping, testing | Per existing plan |
| **Sales Navigator** | Active subscription | Lead list creation | Per existing plan |
| **Buffer** | Account + API token | n8n credential, profile IDs | Per existing plan |
| **WordPress** | Application Password | n8n credential, blog URL | Per existing hosting |
| **Slack** | Channel + webhook | n8n environment variable | Free |

**Total new costs**: ~$38/month (n8n $25 + Claude API ~$13). All other tools use your existing subscriptions.

---

## 5. Your Google Sheets Hub — The Control Center

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your Google Sheets workbook has 5 tabs. Here's what each one does and how you interact with it.

### Sheet 1: Content Hub (Your Main Workspace)

This is where you'll spend most of your time. Every content piece lives here — from topic idea to published post.

**What you see for each row:**

| What | Where | Example |
|------|-------|---------|
| Topic | Column A | "5 Questions to Ask Before Hiring a Fractional AI Engineer" |
| Content Pillar | Column B | Finding AI Talent |
| Target Keyword | Column C | "hire fractional AI engineer" |
| Status | Column F | Ready for Review |
| Blog Draft | Column G | Full blog post text |
| AI Review Scores | Columns H-J | Voice: 4.2, Strategy: 4.0, SEO/AEO: 3.8 |
| Review Summary | Column K | "Strong voice, CTA integrated naturally, FAQ section added" |
| Social Content | Columns O-Q | LinkedIn post, Twitter thread, short posts |
| Publish Date | Column R | 2026-02-24 |

**How content flows through statuses:**

```
Queued → Drafting → Ready for Review → Approved → Social Ready → Scheduled → Published
  ↑                      │                 │                          │
  │                      │                 │                          │
  YOU or                 YOU reviews       YOU approves               YOU sets date
  Calendar               the draft         the draft                  and schedules
  workflow
```

**Your actions in this sheet:**

| To Do This | Do This |
|------------|---------|
| Add a new topic idea | Type it in column A, set Status to "Queued" |
| Review a draft | Read column G (Draft Content), check scores in H-J |
| Edit a draft | Modify column G directly — your edits are preserved |
| Approve a draft | Change Status from "Ready for Review" to "Approved" |
| Schedule publishing | Set Publish Date (column R), change Status to "Scheduled" |
| Send back for revision | Add notes in column Z, change Status back to "Queued" |
| Reject a piece | Change Status to "Rejected" or delete the row |

### Sheet 2: Social Queue

A scheduling view for all social posts. Auto-populated when you approve a blog post.

| Column | What It Shows |
|--------|--------------|
| Platform | LinkedIn / Twitter / Blog |
| Content | The actual post text |
| Publish Date | When it's scheduled to go live |
| Status | Pending / Scheduled / Published |
| Published URL | Link after it goes live |

### Sheet 3: Analytics

Weekly performance data. Auto-populated every Friday.

| Column | What It Shows |
|--------|--------------|
| Post Title | Which content piece |
| Platform | Blog / LinkedIn / X/Twitter |
| Impressions | How many people saw it |
| Engagement | Likes + comments + shares |
| Clicks | Link clicks to seedlink.app |

### Sheet 4: Topics Archive

Historical log of all topics used. The AI checks this to avoid repeating topics. You don't need to manage this sheet.

### Sheet 5: Outreach

All LinkedIn outreach responses, classified by type. This is where you follow up on leads.

| Column | What It Shows |
|--------|--------------|
| Type | Hot Lead / Meeting / Question / Archived |
| Sender Info | Name, title, company |
| Message | What they said |
| AI Classification | How the AI categorized it |
| Confidence | How sure the AI is (0-1) |
| Suggested Action | What the AI recommends you do |
| Urgency | high / medium / low |
| Follow-Up Status | Your tracking column — update as you take action |

---

## 6. Daily Operations (10-15 minutes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Step 1: Review Drafted Content (5-7 minutes)

1. Open the **Content Hub** sheet
2. Filter Status column for **"Ready for Review"**
3. For each draft:
   - Read the **Draft Content** (column G) — expand the cell or click to view
   - Glance at the AI scores (columns H-J) — all should be 3.5 or higher
   - Read the **Review Notes** (column K) for a summary of what the AI agents flagged and fixed
   - Edit the draft directly if you want to change anything
4. **Approve** by changing Status to **"Approved"**
   - This automatically triggers social content generation
5. Or **send back** by adding notes in the Notes column and changing Status to **"Queued"**

### Step 2: Review Social Content (3-5 minutes)

1. Filter Status column for **"Social Ready"**
2. Review the LinkedIn Post (column O), Twitter Thread (column P), and Short Posts (column Q)
3. Edit anything directly in the cells
4. Set the **Publish Date** (column R) and change Status to **"Scheduled"**

### Step 3: Check Outreach (3-5 minutes)

1. Switch to the **Outreach** sheet
2. Filter Type = **"Hot Lead"** where Follow-Up Status = **"Pending"** → respond within 24 hours
3. Filter Type = **"Meeting"** → send calendar links immediately
4. Filter Type = **"Question"** → draft responses
5. Update **Follow-Up Status** after each action (Pending → Contacted → Meeting Booked → Converted)

---

## 7. Weekly Operations (30-45 minutes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Monday: Review the Editorial Calendar (10-15 minutes)

1. Check the Content Hub for new **"Queued"** topics (generated over the weekend)
2. Review the 5-7 suggested topics — do they align with what's on your mind this week?
3. Reorder, edit, or replace any topics that don't fit
4. Add any manual topics you want covered (from outreach conversations, market events, etc.)
5. Set **Priority** (high/medium/low) for the week

### Wednesday: Mid-Week Check (10-15 minutes)

1. Verify drafts are being generated (check for "Ready for Review" items)
2. Approve any accumulated drafts
3. Check the Social Queue — verify scheduled posts look right for the rest of the week

### Friday: Review Analytics (10-15 minutes)

1. Check Slack for the automated weekly analytics report
2. Open the **Analytics** sheet for detailed numbers
3. Note what worked: Which pillar? Which platform? What topic format?
4. Note what didn't: Low engagement? Wrong audience? Weak CTA?
5. Use observations to inform next Monday's topic review

---

## 8. Monthly Operations (2-3 hours)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Content Strategy Review (First Monday)

| Check | What to Look For |
|-------|-----------------|
| **Pillar balance** | Is one pillar dominating? Rebalance if needed |
| **Voice quality** | Read 4 recent posts — does it still sound like you? |
| **CTA effectiveness** | Are marketplace/Playbook/talent matching CTAs getting clicks? |
| **Keyword performance** | Check Google Search Console — any rankings improving? |
| **AI review scores** | Are scores trending up, down, or flat? Scores above 4.5 may mean the reviewers aren't critical enough |

### Outreach Performance Review (First Monday)

| Metric | Target | Where to Find |
|--------|--------|---------------|
| Connection acceptance rate | 25-35% | Prosp.AI dashboard |
| Response rate | 10-15% | Prosp.AI dashboard |
| Call booking rate | 5-10% | Outreach sheet (filter: Type = "Meeting") |
| Monthly connections | 600-800 | Prosp.AI dashboard |

### Technical Maintenance (Handled by Veteran Vectors)

- Review n8n execution logs for failed runs
- Verify API credentials are valid (Buffer, WordPress, Claude)
- Check Claude API usage against $50/month budget
- Clear old execution data for performance

---

## 9. How the AI Works Behind the Scenes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You don't need to understand the technical details, but here's what's happening when the system runs.

### The Content Pipeline (What Happens to Each Blog Post)

```
1. TOPIC EXPANSION
   The AI takes your topic and creates a detailed content brief:
   headline, angle, target audience, CTA strategy, outline

2. DRAFT GENERATION
   A second AI pass writes the full 1,000-1,500 word blog post
   following SeedLink's founder-to-founder voice

3. MULTI-AGENT REVIEW (4 specialized AI reviewers)

   ┌─ Voice Agent ──────── Is this founder-to-founder? Concrete? Accessible?
   ├─ Strategy Agent ───── Does this align with the right pillar? Is the CTA natural?
   └─ SEO/AEO Agent ────── Will this rank in search? Will AI assistants cite this?

4. QUALITY CHECK
   All 3 agents must pass (score 3.5+/5.0). If any fail:
   → Revision loop (up to 2 attempts)
   → If still failing → flagged as "Needs Manual Review"

5. EDITOR-UNIFIER
   A final AI pass synthesizes all feedback and produces
   a publication-ready draft with SEO metadata

6. READY FOR YOU
   Draft appears in Content Hub as "Ready for Review"
   with scores, review notes, and metadata attached
```

### The 4 Content Pillars

Every piece of content maps to one of these pillars:

| Pillar | What It Covers | Who It's For |
|--------|---------------|-------------|
| **Finding AI Talent** | Hiring AI builders, vetting talent, fractional AI teams | Founders, startup CEOs |
| **Zero to MVP** | Building MVPs with AI, co-pilot workflows, Playbook guidance | Early-stage founders |
| **AI Industry & Trends** | AI tools landscape, marketplace dynamics, hiring trends | Tech professionals |
| **SeedLink in Action** | Platform updates, match spotlights, community milestones | All audiences |

### SEO & AEO (Answer Engine Optimization)

Your content is optimized for both traditional search engines (Google) and AI answer engines (ChatGPT, Perplexity, Google AI Overviews):

- **SEO**: Keywords, meta titles, meta descriptions, schema markup, heading structure
- **AEO**: Opening definitions AI can extract, Key Takeaways sections, self-contained FAQ answers, verifiable claims with specifics

This means SeedLink content is structured to appear when someone asks an AI assistant: *"Where can I find AI talent for my startup?"*

---

## 10. What You Control vs. What's Automated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Action | Who Does It | How |
|--------|------------|-----|
| Generate topic ideas | **Automated** (weekly) | Calendar workflow generates 5-7 topics every Monday |
| Write blog posts | **Automated** (daily) | Content Pipeline drafts and reviews with 4 AI agents |
| Review and approve drafts | **You** | Change Status to "Approved" in Content Hub |
| Generate social content | **Automated** (on approval) | Social Engine derives LinkedIn + Twitter + short posts |
| Review social content | **You** | Edit in Content Hub, set Publish Date |
| Publish to all platforms | **Automated** (on schedule) | Social Engine publishes when Publish Date arrives |
| Track performance | **Automated** (weekly) | Analytics Reporter compiles data every Friday |
| Classify outreach responses | **Automated** (instantly) | Outreach Handler categorizes as they arrive |
| Follow up on leads | **You** | Open Outreach sheet, contact Hot Leads and Meeting requests |
| Add manual topics | **You** | Type directly into Content Hub, set Status = "Queued" |
| Edit any content | **You** | Edit directly in Google Sheets — your changes are preserved |
| Adjust strategy | **You + VV** (monthly) | Review pillar performance, keywords, voice quality |

**Nothing publishes without your approval.** The system generates, reviews, and prepares — you decide what goes live.

---

## 11. Troubleshooting & FAQ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Common Questions

**Q: What if I don't like a draft?**
Edit it directly in the Draft Content column, or add notes and change Status back to "Queued" for the AI to regenerate.

**Q: Can I add my own topics?**
Yes. Type the topic in column A of the Content Hub, fill in Pillar and Target Keyword, and set Status to "Queued." The pipeline will pick it up on its next run.

**Q: What if a post goes live with errors?**
Fix it directly on the platform (WordPress, LinkedIn). Then note the issue in the Content Hub Notes column so VV can investigate if it's a systemic problem.

**Q: What does "Needs Manual Review" mean?**
The AI tried to improve the draft twice and it still didn't pass review. Read the Review Notes for what's wrong, edit the draft yourself, and change Status to "Approved" when you're satisfied.

**Q: How do I know the system is working?**
You'll receive Slack notifications when:
- New topics are generated (Monday)
- Drafts are ready for review (daily)
- Posts are published (daily)
- Weekly analytics reports are compiled (Friday)
- Outreach responses are classified (as they arrive)
- Any workflow fails (immediately)

**Q: What if I stop getting Slack notifications?**
Contact Veteran Vectors — this usually means a workflow has deactivated or a credential expired.

**Q: Can I change the content pillars?**
Yes, but this requires updating the AI prompts. Contact Veteran Vectors for pillar changes.

**Q: What if I want to post more or less frequently?**
The system is designed for 4 blog posts/month (1/week) with 3-4 LinkedIn posts and 5 X/Twitter posts per week. Adjusting cadence requires workflow schedule changes — contact VV.

### Common Issues

| Issue | What to Do |
|-------|-----------|
| No new topics on Monday | Check Slack for error alerts. If none, contact VV. |
| Draft quality seems off | Check the Voice Score — if below 3.5, the AI flagged issues too. Add specific notes in the Notes column for what you want changed. |
| Social content doesn't appear after approval | The Social Engine webhook may need re-triggering. Wait 30 minutes — if still missing, contact VV. |
| Outreach response in wrong category | Change the Type column manually in the Outreach sheet. If misclassification is frequent, contact VV to adjust the classifier. |
| Post published to wrong date | Check the Publish Date column in Content Hub. Social Engine publishes whatever is scheduled for today. |

---

## 12. Support & Contacts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Veteran Vectors (Retainer Support — $600/month)

| Contact | Details |
|---------|---------|
| **Email** | anthony@veteranvectors.com |
| **Response Time** | Within 24 hours (business days) |
| **Scope** | Pipeline maintenance, prompt optimization, reporting, A/B testing, troubleshooting |

### What's Included in the Retainer

**Content Engine**
- Content review, editing, and quality assurance
- Editorial calendar updates and topic refreshes
- SEO/AEO keyword tracking and content adjustments
- n8n pipeline maintenance and prompt optimization
- Social scheduling management
- Monthly performance reporting

**Outreach**
- Lead list refreshes and Sales Navigator data pulls
- Messaging optimization and A/B testing
- Campaign creation and audience segmentation
- Monthly outreach performance reporting

### What's Not Included (Billed Separately)

- Third-party subscription costs (n8n, Prosp.AI, Sales Navigator, Buffer)
- Claude AI API usage exceeding $50/month
- New feature development or additional workflow builds
- Major strategy pivots requiring prompt rewrites

### Estimated Monthly Costs (Your Responsibility)

| Service | Estimated Cost |
|---------|---------------|
| n8n Cloud | $25/month |
| Claude API (Anthropic) | ~$13/month (up to $50 budget) |
| Prosp.AI | Per your existing plan |
| Sales Navigator | Per your existing plan |
| Buffer or Typefully | Per your existing plan |
| **VV Retainer** | **$600/month** |

---

## Quick Reference Card

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Daily (10-15 min)**
1. Open Content Hub → filter "Ready for Review" → review and approve
2. Filter "Social Ready" → review social content → set date → schedule
3. Open Outreach → follow up on Hot Leads and Meetings

**Weekly**
- Monday: Review generated topics, adjust priorities
- Wednesday: Approve accumulated drafts, check Social Queue
- Friday: Review analytics report in Slack

**Monthly**
- Pillar balance check
- Voice quality audit (read last 4 posts)
- Review AI review score trends

**When something breaks**: Check Slack for alerts → email anthony@veteranvectors.com
