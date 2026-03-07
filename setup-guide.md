# SeedLink — n8n Workflow Setup Guide

Step-by-step instructions for importing and configuring all SeedLink automation workflows in n8n.

> **Note:** For new client builds, Steps 1 and 3 are **automated** by the `client-onboarding-orchestrator.json` workflow. When a client pays via Stripe and submits the onboarding questionnaire, the orchestrator auto-clones the Google Sheet template, populates the Settings tab, triggers Voice Profile generation, and notifies VV with the client's sheet URL and build brief. The manual steps below are for VV's reference during the remaining setup tasks.

---

## Prerequisites

Before starting, ensure you have:

- [ ] n8n instance running (cloud at $25/month minimum, or self-hosted)
- [ ] Anthropic API key with active billing (budget ~$50/month)
- [ ] Google account with Google Sheets access
- [ ] Buffer or Typefully account for social scheduling
- [ ] WordPress or CMS admin access for seedlink.app blog
- [ ] Slack workspace with webhook permissions
- [ ] Access to LinkedIn profiles (for Prosp.AI webhook setup)

### Additional Prerequisites for Onboarding Orchestrator

- [ ] Stripe account with Connect enabled (see `REVENUE_STRUCTURE.md`)
- [ ] Template Google Sheet created and ID stored as `SEEDLINK_TEMPLATE_SHEET_ID`
- [ ] Sales Pipeline Google Sheet created (see `sales-pipeline-template.md`) and ID stored as `SEEDLINK_SALES_TRACKER_ID`
- [ ] Email service API configured (`EMAIL_API_URL`, `EMAIL_API_KEY`)
- [ ] Onboarding form URL set as `ONBOARDING_FORM_URL`

---

## Step 1: Create the Google Sheets Workbook

1. Create a new Google Sheets workbook named "SeedLink Content Hub"
2. Create these sheets (tabs) with exact names:
   - `Content Hub`
   - `Social Queue`
   - `Analytics`
   - `Topics Archive`
   - `Outreach`
3. Add header rows to each sheet per the `google-sheets-template.md` document
4. Set up data validation dropdowns on the Content Hub sheet:
   - **Status column (F)**: Queued, Drafting, Ready for Review, Approved, Social Ready, Scheduled, Published, Needs Manual Review
   - **Pillar column (B)**: Finding AI Talent, Zero to MVP, AI Industry & Trends, SeedLink in Action
   - **Priority column (E)**: high, medium, low
5. Add conditional formatting to the Status column (green=Published, blue=Approved, yellow=Ready for Review, red=Needs Manual Review)
6. Freeze row 1 and columns A-F for easier navigation
7. Copy the Sheet ID from the URL (between `/d/` and `/edit`)

---

## Step 2: Configure n8n Credentials

Create these credentials in your n8n instance:

### Google Sheets OAuth2
- **Name**: `Google Sheets` (ID: `google_sheets`)
- **Type**: Google Sheets OAuth2
- Follow n8n's Google Sheets setup guide to create OAuth credentials
- Share the Google Sheets workbook with the service account email

### Anthropic API (via Environment Variable)
- The API key is passed via environment variable, not n8n credentials
- Set `ANTHROPIC_API_KEY` in n8n environment variables

### Buffer API
- **Name**: `Buffer API` (ID: `buffer_api`)
- **Type**: Header Auth
- **Header Name**: `Authorization`
- **Header Value**: `Bearer YOUR_BUFFER_ACCESS_TOKEN`
- Get your access token from Buffer's developer settings

### WordPress API
- **Name**: `WordPress API` (ID: `wordpress_api`)
- **Type**: HTTP Basic Auth
- **Username**: WordPress admin username
- **Password**: Application password (generate in WordPress admin → Users → Application Passwords)

---

## Step 3: Set Environment Variables

In your n8n instance, set these environment variables:

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Anthropic Console → API Keys |
| `SEEDLINK_EDITORIAL_CALENDAR_ID` | `1abc2def3ghi...` | Google Sheets URL between /d/ and /edit |
| `SEEDLINK_BLOG_URL` | `https://seedlink.app` | Your WordPress site URL (no trailing slash) |
| `NOTIFICATION_SLACK_WEBHOOK` | `https://hooks.slack.com/services/...` | Slack → Apps → Incoming Webhooks |
| `BUFFER_LINKEDIN_PROFILE_ID` | `abc123...` | Buffer API → Profiles endpoint |
| `BUFFER_TWITTER_PROFILE_ID` | `def456...` | Buffer API → Profiles endpoint |
| `SEEDLINK_SALES_TRACKER_ID` | `1xyz2abc...` | Sales Pipeline Google Sheet ID (see `sales-pipeline-template.md`) |
| `SEEDLINK_TEMPLATE_SHEET_ID` | `1tmpl2abc...` | Template Google Sheet ID (the master copy that gets cloned per client) |
| `SEEDLINK_CLIENT_FOLDER_ID` | `folder123...` | Google Drive folder ID for storing cloned client sheets |
| `N8N_BASE_URL` | `https://your-n8n.app.n8n.cloud` | n8n instance URL (for inter-workflow webhook calls) |
| `EMAIL_API_URL` | `https://api.resend.com/emails` | Email service API endpoint (Resend, SendGrid, etc.) |
| `EMAIL_API_KEY` | `re_...` | Email service API key |
| `ONBOARDING_FORM_URL` | `https://seedlink.app/onboarding` | Client onboarding questionnaire URL |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook signing secret (for verifying payment events) |
| `CALENDLY_URL` | `https://calendly.com/seedlink/handoff` | Handoff call booking link |
| `LITE_SUPPORT_CHECKOUT_URL` | `https://seedlink.app/lite-support` | Lite Support subscription checkout URL |

---

## Step 4: Import Workflows (in this order)

Import order matters — some workflows reference others.

### Infrastructure Workflows (import first, one-time setup)

0. **`client-onboarding-orchestrator.json`** — Stripe payment → questionnaire → provisioning → build tracking → Lite Support offers (only on VV's master n8n instance, not per-client)
1. **`voice-profile-generator.json`** — Voice Profile generation from questionnaire data (called by orchestrator)

### Per-Client Workflows (import for each new client)

2. **`editorial-calendar-manager.json`** — Weekly topic generation
3. **`content-pipeline-main.json`** — Master content pipeline with multi-agent review
4. **`social-engine.json`** — Social derivation + scheduling + publishing
5. **`analytics-reporter.json`** — Weekly performance reports
6. **`outreach-response-handler.json`** — Prosp.AI response classification

For each workflow:
1. In n8n, go to Workflows → Import from File
2. Select the JSON file
3. Verify all credential references resolve (no red warning icons)
4. Save the workflow (don't activate yet)

---

## Step 5: Voice Profile Setup

Before testing content workflows, the client's Voice Profile must be generated and stored.

### 5a. Determine Voice Path

- **Client has existing content** (provided 3-5 links in questionnaire): Use `prompts/voice-extractor.md`
- **Client is starting fresh** (selected Voice Builder path in questionnaire): Use `prompts/voice-builder.md`

### 5b. Generate Voice Profile

1. Format the client's questionnaire responses as JSON (see input format in the relevant prompt file)
2. Call Claude API with the appropriate prompt (voice-extractor.md or voice-builder.md) and the client's JSON input
3. Review the generated Voice Profile for completeness — all sections should reflect client-specific data, not generic defaults

### 5c. Store Voice Profile

1. In the client's Google Sheet, create the "Voice Profile" tab (Sheet 7) using the schema from `google-sheets-template.md`
2. Populate all rows from the generated Voice Profile output
3. Set `calibration_status` to "Calibrating" and `source` to "Voice Builder" or "Voice Extractor"
4. Protect the tab with Google Sheets protected ranges (only workflow automation should modify values after calibration)

### 5d. Verify Integration

1. Run the Content Pipeline manually (Step 6 below) — the draft should reflect the client's Voice Profile
2. Check that the Voice Agent review score reflects the new voice (not defaulting to generic SeedLink voice)

---

## Step 6: Manual Testing

Test each workflow manually before enabling scheduled triggers.

### Test 1: Editorial Calendar Manager
1. Add no topics to the sheet — just run the workflow manually
2. Verify: 5-7 new topics appear in the Content Hub sheet with Status = "Queued"
3. Check: Slack notification received

### Test 2: Content Pipeline
1. Ensure at least one topic exists with Status = "Queued"
2. Run the workflow manually
3. Verify: The topic row is updated with:
   - Status = "Ready for Review"
   - Draft Content populated
   - Voice Score, Strategy Score, SEO/AEO Score populated
   - Meta Title and Meta Description populated
4. Check: Slack notification received

### Test 3: Social Engine (Derivation)
1. Change a Content Hub row's Status to "Approved"
2. Send a POST request to the webhook URL with `{"post_id": "ROW_NUMBER"}`
3. Verify: LinkedIn Post, Twitter Thread, Short Posts populated in the Content Hub row
4. Check: Social Queue sheet has new rows

### Test 4: Social Engine (Publishing)
1. In Social Queue, add a test row with today's date and Status = "Scheduled"
2. Run the workflow manually
3. Verify: Buffer/WordPress API calls execute (check Buffer dashboard for the post)
4. Check: Status updated to "Published" with URL

### Test 5: Analytics Reporter
1. Run manually
2. Verify: Report row added to Analytics sheet
3. Check: Slack report received

### Test 6: Outreach Response Handler
1. Send a POST request to the webhook: `{"sender_name": "Test User", "sender_title": "CEO", "sender_company": "TestCo", "message_text": "I'd love to learn more about SeedLink", "response_date": "2026-02-17"}`
2. Verify: New row in Outreach sheet with Type = "Hot Lead"
3. Check: Slack notification received

---

## Step 7: Activate Scheduled Triggers

Once all manual tests pass, activate the scheduled workflows:

| Workflow | Schedule | Enable |
|----------|----------|--------|
| Editorial Calendar Manager | Monday 8:00 AM | Activate |
| Content Pipeline | Daily 9:00 AM | Activate |
| Social Engine (publishing) | Daily 10:00 AM | Activate |
| Analytics Reporter | Friday 4:00 PM | Activate |

The Social Engine's webhook trigger and Outreach Handler's webhook trigger are always active once the workflow is enabled.

---

## Step 7: Connect Prosp.AI Webhooks

1. In Prosp.AI, configure the webhook URL for response notifications:
   - URL: `https://YOUR_N8N_URL/webhook/outreach-response`
   - Method: POST
2. Map Prosp.AI fields to expected payload:
   ```json
   {
     "sender_name": "{{prospect_name}}",
     "sender_title": "{{prospect_title}}",
     "sender_company": "{{prospect_company}}",
     "message_text": "{{response_text}}",
     "response_date": "{{response_date}}",
     "profile_source": "{{sending_profile}}"
   }
   ```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Claude API returns 429 | Rate limited — the workflow has retry logic built in. If persistent, check API usage dashboard. |
| Google Sheets "permission denied" | Re-share the workbook with the n8n service account email. Verify the Sheet ID matches the environment variable. |
| No topics being picked up | Check the Content Hub sheet — ensure at least one row has Status = "Queued" (exact match, case-sensitive). |
| Social posts not publishing | Verify Buffer API token is valid. Check Buffer dashboard for scheduled posts. |
| Webhook not triggering | Ensure the workflow is active (not just saved). Test with a curl command to the webhook URL. |
| Agent review failing repeatedly | If content consistently fails review after 2 revisions, the topic may be too vague. Add more detail to the Topic and Angle columns. |
