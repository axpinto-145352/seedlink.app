# SeedLink — n8n Workflow Setup Guide

Step-by-step instructions for importing and configuring all SeedLink automation workflows in n8n.

---

## Prerequisites

Before starting, ensure you have:

- [ ] n8n instance running (cloud at $25/month minimum, or self-hosted)
- [ ] Anthropic API key with active billing (budget ~$50/month)
- [ ] Google account with Google Sheets access
- [ ] Buffer or Typefully account for social scheduling
- [ ] WordPress or CMS admin access for seedlink.app blog
- [ ] Slack workspace with webhook permissions
- [ ] Access to all 4 LinkedIn profiles (for Prosp.AI webhook setup)

---

## Step 1: Create the Google Sheets Workbook

1. Create a new Google Sheets workbook named "SeedLink Editorial Calendar"
2. Create these sheets (tabs) with exact names:
   - `Editorial Calendar`
   - `Analytics`
   - `Topics Archive`
   - `Hot Leads`
   - `Meetings`
   - `Questions`
   - `Archived`
3. Add header rows per the `google-sheets-template.md` document
4. Note the **Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit`

---

## Step 2: Configure n8n Credentials

In your n8n instance, go to **Settings > Credentials** and create:

### 2a. Google Sheets OAuth (`google_sheets`)
1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create an OAuth 2.0 Client ID (Web application type)
3. Add n8n's redirect URI (shown in n8n's credential setup screen)
4. Enable Google Sheets API in your Google Cloud project
5. In n8n, create a "Google Sheets OAuth2 API" credential named `google_sheets`
6. Complete the OAuth flow
7. Share the Google Sheets workbook with the authenticated Google account

### 2b. Slack Webhook (`slack_webhook`)
1. Go to your Slack workspace > Apps > Incoming Webhooks
2. Create a new webhook for your target channel (e.g., #seedlink-alerts)
3. Copy the webhook URL

### 2c. Buffer API (`buffer_api`) — if using Buffer
1. Go to Buffer > Settings > API
2. Generate an access token
3. Note your profile IDs for LinkedIn and X/Twitter (find via Buffer API: `GET /1/profiles.json`)

### 2d. Typefully API (`typefully_api`) — if using Typefully instead of Buffer
1. Go to Typefully > Settings > API
2. Generate an API key

### 2e. WordPress API (`wordpress_api`) — if using WordPress
1. Install the "Application Passwords" plugin (or use WordPress 5.6+ built-in)
2. Go to Users > Your Profile > Application Passwords
3. Create a new application password named "n8n SeedLink"
4. Note the username and generated password

---

## Step 3: Set Environment Variables

In n8n, go to **Settings > Variables** (or set as environment variables on your server):

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Anthropic Console > API Keys |
| `SEEDLINK_EDITORIAL_CALENDAR_ID` | Google Sheet ID string | Sheet URL (Step 1) |
| `SEEDLINK_BLOG_URL` | `https://seedlink.app` | Your blog base URL |
| `NOTIFICATION_SLACK_WEBHOOK` | `https://hooks.slack.com/...` | Slack webhook (Step 2b) |

---

## Step 4: Import Workflows

Import each JSON file from the `workflows/` directory:

1. In n8n, click **Add Workflow** > **Import from File**
2. Import in this order (dependencies flow top to bottom):

| Order | File | Purpose |
|-------|------|---------|
| 1 | `editorial-calendar-manager.json` | Weekly topic generation |
| 2 | `content-pipeline-main.json` | Blog post creation pipeline |
| 3 | `seo-content-optimizer.json` | SEO metadata generation |
| 4 | `social-derivation.json` | Blog-to-social repurposing |
| 5 | `social-scheduler.json` | Auto-publish to platforms |
| 6 | `analytics-reporter.json` | Weekly performance reports |
| 7 | `outreach-response-handler.json` | LinkedIn response routing |

3. After importing each workflow, assign credentials:
   - Click each Google Sheets node > select `google_sheets` credential
   - Click each HTTP Request node that calls Claude > verify `ANTHROPIC_API_KEY` env var is set
   - Click Buffer/Typefully nodes > select `buffer_api` or `typefully_api`
   - Click WordPress nodes > select `wordpress_api`

---

## Step 5: Test Each Workflow Manually

Test in dependency order before enabling scheduled triggers:

### 5a. Editorial Calendar Manager
1. Open the workflow and click **Execute Workflow**
2. Verify: 5-7 new topics appear in the "Editorial Calendar" sheet with Status = "Queued"
3. Verify: Slack notification received

### 5b. Content Pipeline Main
1. Ensure at least one topic has Status = "Queued" in the editorial calendar
2. Click **Execute Workflow**
3. Verify: Topic status changes to "Ready for Review" with draft content in Draft Content column
4. Verify: Review Score and Review Notes are populated
5. Verify: Slack notification received

### 5c. SEO Content Optimizer
1. Manually change a post's status to "Approved" in the sheet
2. Trigger the webhook (use n8n's test webhook URL with the post row data)
3. Verify: Meta Title, Meta Description, and Schema Markup columns are populated

### 5d. Social Derivation
1. Trigger the webhook with an approved post's data
2. Verify: LinkedIn Post, Twitter Thread, and Short Posts columns are populated
3. Verify: Publish dates are staggered over 5 days

### 5e. Social Scheduler
1. Set one post's Publish Date to today and Status to "Scheduled"
2. Click **Execute Workflow**
3. Verify: Post is submitted to Buffer/Typefully (check your Buffer queue)
4. Verify: Status updates to "Published"

### 5f. Analytics Reporter
1. Ensure some posts have Status = "Published" with engagement data in Analytics sheet
2. Click **Execute Workflow**
3. Verify: Report row added to Analytics sheet
4. Verify: Slack summary received

### 5g. Outreach Response Handler
1. Send a test POST to the webhook URL with sample response data:
   ```json
   {
     "sender_name": "Test User",
     "sender_title": "CTO",
     "sender_company": "Test Corp",
     "message_text": "This sounds interesting, can we set up a call?",
     "response_date": "2026-02-15",
     "profile_source": "Profile 1"
   }
   ```
2. Verify: Response classified as "meeting_request" and added to Meetings sheet
3. Verify: Slack notification received

---

## Step 6: Enable Scheduled Triggers

Once all manual tests pass, activate the scheduled workflows:

1. **Editorial Calendar Manager** — Activate (runs Monday 8:00 AM UTC)
2. **Content Pipeline Main** — Activate (runs daily 9:00 AM UTC)
3. **Social Scheduler** — Activate (runs daily 10:00 AM UTC)
4. **Analytics Reporter** — Activate (runs Friday 4:00 PM UTC)

Webhook-triggered workflows are always active once deployed:
- **SEO Content Optimizer** — Active on webhook
- **Social Derivation** — Active on webhook
- **Outreach Response Handler** — Active on webhook

---

## Step 7: Configure Prosp.AI Webhooks

Connect Prosp.AI to the outreach response handler:

1. In n8n, open the Outreach Response Handler workflow
2. Copy the **Production Webhook URL** (not the test URL)
3. In Prosp.AI, go to Settings > Webhooks (or Integrations)
4. Add the n8n webhook URL as the destination for response events
5. Test with a sample response to verify the connection

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Claude API returns 401 | Check `ANTHROPIC_API_KEY` is set correctly and has active billing |
| Google Sheets returns 403 | Verify the sheet is shared with the OAuth account and credential is authorized |
| Slack notifications not arriving | Verify `NOTIFICATION_SLACK_WEBHOOK` URL and that the webhook is active |
| Buffer returns 401 | Re-authenticate Buffer credential, check access token hasn't expired |
| WordPress returns 401 | Verify application password is correct, user has publish permissions |
| Workflow times out | Claude API calls may take 30-60 seconds for long posts — increase timeout in HTTP Request node settings |

---

## Monthly Maintenance Checklist

- [ ] Review and refresh Claude API prompts if content quality drifts
- [ ] Check Google Sheets for any stuck statuses (rows that haven't progressed)
- [ ] Review analytics reports and adjust content pillar weighting
- [ ] Update keyword strategy based on search performance
- [ ] Verify all scheduled triggers are running (check n8n Executions log)
- [ ] Review API usage costs in Anthropic dashboard (target under $50/month)
