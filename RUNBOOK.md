# SeedLink Operational Runbook

Common scenarios and step-by-step resolution procedures.

---

## Content Pipeline Issues

### Scenario 1: Content fails after 2 revision cycles

**Symptoms:** Content Hub row has Status = "Needs Manual Review" with agent scores below threshold after 2 revision attempts.

**Resolution:**
1. Read the agent feedback in the Draft Content / Notes columns
2. Assess whether the issue is the topic (too vague/broad) or the voice profile (miscalibrated)
3. If topic issue: rewrite the topic brief manually with more specificity, set Status back to "Queued"
4. If voice issue: revisit Voice Profile tab, adjust the flagged dimensions, re-run pipeline
5. If persistent: escalate to manual drafting — write the post or heavily edit the AI draft
6. Log the failure pattern for prompt optimization in the next monthly review

### Scenario 2: No new topics generated on Monday

**Symptoms:** Editorial Calendar Manager ran but no new rows appeared in Content Hub.

**Resolution:**
1. Check n8n execution history for the Editorial Calendar Manager workflow
2. If execution failed: check error details (likely Claude API timeout or Google Sheets API error)
3. If execution succeeded but 0 topics: check the Topics Archive — the dedup may have rejected all generated topics
4. If Topics Archive is very full: expand content pillars or refresh target keywords
5. Manual override: add 5-7 topics manually to Content Hub with Status = "Queued"

### Scenario 3: Client says "it doesn't sound like me"

**Symptoms:** Client rates voice calibration ≤2 across multiple drafts.

**Resolution:**
1. Ask the client for specific examples: "Which phrases don't sound like you? What would you say instead?"
2. Compare client's actual writing samples (if available) to the Voice Profile tab values
3. If Voice Builder path was used: the profile may need manual adjustment based on client feedback
4. If Voice Extractor path was used: request more/better content samples and re-run extraction
5. Adjust Voice Profile rows: tone, vocabulary, sentence_structure, perspective
6. Re-generate one draft and have client rate immediately
7. If still ≤2 after 2 rounds: escalate to a change order — may need manual voice workshop

### Scenario 4: Duplicate content published

**Symptoms:** Same or very similar blog post published twice.

**Resolution:**
1. Immediately unpublish the duplicate from WordPress/social platforms
2. Check Content Hub for duplicate rows — delete the duplicate, keep the original
3. Investigate root cause: likely the pipeline ran twice before status was updated
4. Verify idempotency lock is working (Status should change to "Drafting" immediately when picked up)
5. If lock isn't working: check workflow execution timing — two scheduled executions may have overlapped

---

## Social Media Issues

### Scenario 5: Wrong content published to social

**Symptoms:** Social post contains errors, wrong CTA, or inappropriate content.

**Resolution:**
1. **Immediately:** Delete the post from LinkedIn/Twitter (Buffer dashboard or platform directly)
2. Check the Social Queue row — was the content correct in the Sheet but wrong on the platform, or wrong in the Sheet?
3. If wrong in Sheet: the social derivation prompt needs adjustment — review the Claude output
4. If correct in Sheet but wrong on platform: Buffer API issue — check Buffer dashboard for the post content
5. Publish a corrected version manually
6. Add the error pattern to the social derivation prompt as a negative example

### Scenario 6: Social posts not publishing

**Symptoms:** Social Queue has rows with today's date and Status = "Scheduled" but they're still "Scheduled" at end of day.

**Resolution:**
1. Check n8n execution history for Social Engine workflow
2. If not executed: verify the scheduled trigger is active (not just saved)
3. If executed with error: check Buffer API response — likely expired token
4. Refresh Buffer API token: Buffer Settings → Apps → Regenerate Access Token → Update n8n credential
5. Re-run the workflow manually for today's posts

---

## Integration Issues

### Scenario 7: Claude API rate limited (429 errors)

**Symptoms:** Workflow executions failing with HTTP 429 from Anthropic API.

**Resolution:**
1. Check Anthropic Console → Usage dashboard for current usage
2. If near limit: reduce concurrent workflow executions — stagger schedules
3. If unexpectedly high usage: check for runaway workflows (infinite loops, excessive retries)
4. Workflows have built-in retry logic — 429s should auto-resolve within minutes
5. If persistent: contact Anthropic support for rate limit increase

### Scenario 8: Google Sheets API quota exceeded

**Symptoms:** Multiple workflows failing with Google Sheets 429/quota errors.

**Resolution:**
1. Check Google Cloud Console → APIs & Services → Google Sheets API → Quotas
2. Default quota: 300 requests/minute/project, 60/minute/user
3. If near limit: reduce workflow frequency or stagger execution times
4. If at limit with <5 clients: migrate to Airtable or database (Phase 2 trigger)
5. Request quota increase in Google Cloud Console (takes 24-48 hours)

### Scenario 9: WordPress API connection failed

**Symptoms:** Blog posts not publishing; workflow error mentions WordPress.

**Resolution:**
1. Verify WordPress site is accessible (check seedlink.app/wp-admin)
2. Check WordPress application password: Users → Application Passwords → verify it's active
3. If password expired/revoked: generate new one, update n8n credential
4. Test with curl: `curl -u "username:app_password" https://seedlink.app/wp-json/wp/v2/posts`
5. Check WordPress REST API is enabled (some security plugins disable it)

### Scenario 10: Slack notifications not arriving

**Symptoms:** Workflows succeed but Slack messages aren't received.

**Resolution:**
1. Check Slack webhook URL is valid: copy from n8n env var and test with curl
2. `curl -X POST -H 'Content-Type: application/json' -d '{"text":"test"}' $NOTIFICATION_SLACK_WEBHOOK`
3. If 404/410: webhook was deleted — recreate in Slack → Apps → Incoming Webhooks
4. If channel was renamed: update the webhook configuration in Slack
5. Update the env var and/or client Settings tab in Google Sheets

---

## Onboarding Issues

### Scenario 11: Stripe payment received but questionnaire not submitted

**Symptoms:** Sales Pipeline shows "Payment Received" but no questionnaire data.

**Resolution:**
1. Check client's email for the onboarding questionnaire link
2. If email wasn't received: check email service delivery logs (Resend/SendGrid dashboard)
3. If email was received: follow up with client via Slack or personal email
4. If urgent: send the Google Form URL directly with their pre-filled client_id
5. Use `generatePrefilledUrl()` from `onboarding-form/create-google-form.gs`

### Scenario 12: Voice Profile generation fails

**Symptoms:** Onboarding orchestrator triggers voice profile workflow but no profile appears in Sheet.

**Resolution:**
1. Check n8n execution history for `voice-profile-generator` workflow
2. If webhook not triggered: verify `N8N_BASE_URL` env var is correct
3. If Claude API error: check the input payload — may have missing/malformed fields
4. If parsing error: Claude may have returned non-JSON output — check the raw response
5. Manual fallback: copy the client's questionnaire data, run the relevant prompt (voice-extractor.md or voice-builder.md) manually in Claude, paste results into Voice Profile tab

---

## Payment Issues

### Scenario 13: Stripe Connect split not working

**Symptoms:** Payment received but VV payout not appearing in Stripe dashboard.

**Resolution:**
1. Check Stripe dashboard → Connect → verify VV's connected account is active
2. Check the payment's transfer details in Stripe — was a transfer created?
3. If no transfer: the Stripe checkout product may not have the `transfer_data` parameter set
4. Review Stripe product/checkout configuration — ensure 75% transfer to VV's connected account (with 1-day delayed payout)
5. If first time: the Connect integration may need explicit activation per REVENUE_STRUCTURE.md setup steps

### Scenario 14: Client requests refund

**Symptoms:** Client requests partial or full refund before/during build.

**Resolution:**
1. Check build status in Sales Pipeline — has work started?
2. If pre-build: full refund via Stripe → Payments → Refund. Stripe reverses the Connect split automatically.
3. If mid-build: negotiate partial refund based on work completed. Document in change order.
4. Process refund through Stripe (do NOT refund manually — let Stripe handle the split reversal)
5. Update Sales Pipeline status to "Cancelled" or "Refunded"
6. Deactivate client's workflows in n8n

---

## Emergency Procedures

### Scenario 15: Entire n8n instance down

**Resolution:**
1. Check n8n cloud status page (status.n8n.io)
2. If n8n cloud outage: wait for resolution — content won't publish but no data is lost
3. If self-hosted: check server status, restart Docker containers, check logs
4. Notify affected clients via Slack/email: "Content pipeline temporarily paused, no content will publish until restored"
5. Once restored: check for missed scheduled executions and run manually if needed

### Scenario 16: Accidental publish of bad content

**Resolution:**
1. **Immediately:** Delete/unpublish from all platforms (WordPress admin, LinkedIn, Twitter)
2. If already shared/engaged: post a correction
3. Investigate how content bypassed review — was Status changed without reading?
4. Review the Content Approval Log (if implemented) for who approved
5. Add the failure case to the content safety prompt
6. Consider pausing auto-publish until root cause is fixed

### Scenario 17: API key compromised

**Resolution:**
1. **Immediately:** Revoke the compromised key at the provider (Anthropic Console, Google Cloud, Buffer, Stripe)
2. Generate a new key
3. Update the n8n environment variable
4. Check usage logs for unauthorized activity during the exposure window
5. If Stripe key compromised: contact Stripe support, review recent transactions
6. Rotate all keys as a precaution (treat a compromise as "assume all keys may be compromised")
7. Document the incident: when discovered, what was exposed, actions taken, prevention measures

---

## Monthly Maintenance Checklist

- [ ] Review and optimize underperforming prompts (check agent scores)
- [ ] Verify all API keys are valid (none expired or approaching expiration)
- [ ] Check Google Sheets API quota usage trend
- [ ] Review Content Hub for stuck rows (Status unchanged for >3 days)
- [ ] Archive old Topics Archive entries (>90 days)
- [ ] Check Buffer scheduled queue for any stuck posts
- [ ] Review client voice calibration feedback
- [ ] Update content pillars/keywords based on performance data
- [ ] Verify Stripe Connect payouts are processing correctly
- [ ] Export n8n workflow backups (download JSON from each workflow)
