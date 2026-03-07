# Google Form Setup — Client Onboarding Questionnaire

## Quick Start (5 minutes)

### Step 1: Create the Form

1. Go to [script.google.com](https://script.google.com) → **New Project**
2. Delete the default code
3. Paste the contents of `create-google-form.gs`
4. Update `N8N_WEBHOOK_URL` on line 15 to your n8n instance URL:
   ```
   https://your-n8n.app.n8n.cloud/webhook/onboarding-questionnaire
   ```
5. Click **Run** → Select `createOnboardingForm` → **Run**
6. Grant permissions when prompted (Google Sheets, Forms, Mail, URL Fetch)
7. Check the **Execution Log** — it will show:
   ```
   Form created: https://docs.google.com/forms/d/XXXXX/edit
   Form response URL: https://docs.google.com/forms/d/XXXXX/viewform
   Form ID: XXXXX
   ```

### Step 2: Set Up the Webhook Trigger

1. In the same Apps Script project, click **Run** → Select `setupFormSubmitTrigger` → **Run**
2. This creates an automatic trigger that fires `onFormSubmit()` every time the form is submitted
3. The trigger POSTs form data to your n8n webhook in the exact format the `client-onboarding-orchestrator.json` expects

### Step 3: Test It

1. Open the Form response URL from Step 1
2. Fill out the form with test data:
   - Client ID: `test_001`
   - Company Name: `Test Company`
   - etc.
3. Submit the form
4. Check n8n execution history — you should see the webhook fire
5. Check that the orchestrator processes the submission correctly

### Step 4: Integrate with Stripe

The form needs to receive the `client_id` from Stripe. Two options:

**Option A: Pre-filled URL (recommended)**
- In your Stripe checkout success page or confirmation email, link to the form with a pre-filled Client ID
- Use the `generatePrefilledUrl()` function in the Apps Script to generate the URL
- Example: `https://docs.google.com/forms/d/XXXXX/viewform?usp=pp_url&entry.YYYY=cus_abc123`

**Option B: Manual entry**
- Include the Client ID in the purchase confirmation email
- Client copies it into the form manually
- Less elegant but works as a fallback

### Step 5: Set Environment Variable

In n8n, set `ONBOARDING_FORM_URL` to the form's published URL:
```
ONBOARDING_FORM_URL=https://docs.google.com/forms/d/XXXXX/viewform
```

This URL is included in the purchase confirmation email sent by the orchestrator.

---

## Form Sections

The form collects 30 fields across 7 sections:

| Section | Fields | Required |
|---------|--------|----------|
| 1. Business Information | Client ID, Company Name, Description, Website, Target Audience, Industry | 5 of 6 |
| 2. Voice & Tone | Existing content?, Sample URLs, Reference voices, Tone, Perspective, Depth, Energy, Words to use/avoid | 1 of 9 |
| 3. Content Strategy | Pillars, Keywords, CMS, Cadence | 3 of 4 |
| 4. Social Media | Platforms, Buffer account | 2 of 2 |
| 5. LinkedIn Outreach | Profile URLs, Prosp.AI, CRM, Calendly | 0 of 4 |
| 6. Technical Setup | Notifications, Slack webhook, Anthropic key | 2 of 3 |
| 7. Anything Else | Additional notes | 0 of 1 |

## Webhook Payload

The `onFormSubmit()` function transforms Google Form responses into the JSON payload expected by `client-onboarding-orchestrator.json`:

```json
{
  "client_id": "cus_abc123",
  "client_email": "founder@company.com",
  "company_name": "Acme AI",
  "company_description": "AI-powered inventory management for e-commerce",
  "website_url": "https://acmeai.com",
  "target_audience": "E-commerce founders with 10K+ SKUs",
  "industry": "E-commerce",
  "has_existing_content": true,
  "content_samples": ["https://acmeai.com/blog/post-1", "https://acmeai.com/blog/post-2"],
  "reference_voices": "Shopify's blog, Tobi Lutke's Twitter",
  "voice_path": "extractor",
  "content_pillars": "AI for inventory, E-commerce automation, Founder lessons",
  "target_keywords": "AI inventory management, e-commerce automation",
  "cms_platform": "wordpress",
  "posts_per_month": 4,
  "social_platforms": "linkedin,twitter",
  "has_buffer": true,
  "notification_channel": "slack",
  "slack_webhook": "https://hooks.slack.com/services/...",
  "has_anthropic_key": false,
  "submitted_at": "2026-03-07T10:30:00.000Z",
  "source": "google_form"
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Form not created | Check Apps Script permissions — needs Forms, Mail, URL Fetch |
| Webhook not firing | Run `setupFormSubmitTrigger()` again. Check Triggers tab in Apps Script |
| n8n returns 400 | Check that `client_id` and `company_name` are filled in (required by orchestrator) |
| Email notifications fail | The script uses `MailApp.sendEmail()` — check Gmail quota (100/day for consumer, 1500/day for Workspace) |
