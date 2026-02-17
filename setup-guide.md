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
- [ ] Access to LinkedIn profiles (for Prosp.AI webhook setup)

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

---

## Step 4: Import Workflows (in this order)

Import order matters — some workflows reference others.

1. **`editorial-calendar-manager.json`** — Weekly topic generation
2. **`content-pipeline-main.json`** — Master content pipeline with multi-agent review
3. **`social-engine.json`** — Social derivation + scheduling + publishing
4. **`analytics-reporter.json`** — Weekly performance reports
5. **`outreach-response-handler.json`** — Prosp.AI response classification

For each workflow:
1. In n8n, go to Workflows → Import from File
2. Select the JSON file
3. Verify all credential references resolve (no red warning icons)
4. Save the workflow (don't activate yet)

---

## Step 5: Manual Testing

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

## Step 6: Activate Scheduled Triggers

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
