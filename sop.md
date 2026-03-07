# SeedLink — Standard Operating Procedure (SOP)

Standard operating procedures for ongoing content operations and outreach management.

---

## Daily Operations (10-15 minutes)

### Review Drafted Content
1. Open the Google Sheets **Content Hub** sheet
2. Filter for Status = "Ready for Review"
3. For each draft:
   - Read the **Draft Content** column (expand the cell or use the sidebar)
   - Check **Voice Score**, **Strategy Score**, **SEO/AEO Score** — all should be 3.5+
   - Read **Review Notes** for the Editor-Unifier's summary of changes made
   - Edit the draft directly in the cell if you want to make changes
4. Decision:
   - **Approve**: Change Status to "Approved" — this triggers social content derivation
   - **Request Changes**: Add notes in the Notes column and change Status to "Queued" for re-processing
   - **Reject**: Delete the row or change Status to "Rejected" with reason in Notes

### Review Social Content
1. Filter Content Hub for Status = "Social Ready"
2. Review **LinkedIn Post**, **Twitter Thread**, and **Short Posts** columns
3. Edit any content directly in the cells if needed
4. When satisfied: Set **Publish Date** and change Status to "Scheduled"

### Check Outreach Responses
1. Open the **Outreach** sheet
2. Filter by Type = "Hot Lead" and Follow-Up Status = "Pending" — follow up within 24 hours
3. Filter by Type = "Meeting" — send calendar links immediately
4. Filter by Type = "Question" — draft and send responses
5. Update Follow-Up Status and Notes for each response after action is taken

---

## Weekly Operations (30-45 minutes)

### Monday: Editorial Calendar Review
1. Verify the Editorial Calendar workflow ran (check for new "Queued" topics in Content Hub)
2. Review generated topics — edit Topic, Angle, or Keyword if needed
3. Adjust Priority for the week's topics
4. Optionally add manual topics (type directly into the sheet, set Status = "Queued")
5. Check pillar balance — are all 4 pillars represented this week?

### Wednesday: Mid-Week Content Check
1. Verify content pipeline has been generating drafts
2. Review and approve any "Ready for Review" drafts that accumulated
3. Check Social Queue for any posts due this week — verify dates and content

### Friday: Analytics Review
1. Check Slack for the weekly analytics report
2. Open the **Analytics** sheet to review detailed metrics
3. Note which content pillars and platforms performed best
4. Flag any underperforming content for topic adjustment next week

---

## Monthly Operations (2-3 hours)

### Content Pillar Performance Review
1. In Content Hub, filter by each pillar and review engagement trends
2. Are any pillars consistently underperforming? Consider adjusting topic angles
3. Are any pillars over-represented? Rebalance the editorial calendar

### Keyword Strategy Update
1. Review which target keywords drove the most traffic (from Analytics sheet)
2. Check Google Search Console for new ranking opportunities
3. Update upcoming topic keywords based on performance data

### Voice Quality Audit
1. Read the last 4 published blog posts end-to-end
2. Check: Does the voice still match the client's Voice Profile (see "Voice Profile" tab in Google Sheet)?
3. Check: Are CTAs feeling natural or forced?
4. If voice has drifted, update the Notes column on upcoming topics with specific guidance
5. If drift is persistent (3+ posts), re-run the voice-builder or voice-extractor prompt with updated input and regenerate the Voice Profile

### Voice Calibration Protocol (Onboarding — First 2 Weeks)

This runs during the monitoring period for every new client:

1. **Round 1 (after first content piece):** Client rates voice fit 1-5 and highlights what sounds right/wrong
2. **If score ≥ 4/5:** Voice Profile is locked. Set `calibration_status` to "Locked" in the Voice Profile tab.
3. **If score < 4/5:** Re-run the voice prompt (voice-builder.md or voice-extractor.md) with the original inputs PLUS the client's calibration feedback. Update the Voice Profile tab.
4. **Round 2 (after second content piece):** Client rates again.
5. **If score ≥ 4/5 after Round 2:** Lock the profile.
6. **If score still < 4/5 after Round 2:** Schedule a 15-minute voice alignment call with the client to identify specific mismatches. Produce a final revised profile manually. If still unresolved, escalate via change order ($400 full voice workshop).

**Key rule:** Never lock a Voice Profile the client hasn't approved. Never skip calibration — even if the first draft scores well, get explicit client sign-off.

### Agent Review Score Trends
1. In Content Hub, review the Voice, Strategy, and SEO/AEO scores over the past month
2. If any agent consistently scores low, the prompts may need tuning
3. If scores are consistently 4.5+, the agents may not be critical enough — review prompt thresholds

### Technical Maintenance
1. Check n8n execution logs for any failed runs
2. Verify all API credentials are still valid (Buffer, WordPress, Google Sheets)
3. Check Claude API usage against the $50/month budget
4. Clear old execution data in n8n to keep the instance performant

---

## Quarterly Operations (half day)

### Content Audit
1. Review all published content for the quarter
2. Identify top 5 performers by engagement — what made them work?
3. Identify bottom 5 — what went wrong?
4. Update content strategy for next quarter based on learnings

### AEO/SEO Assessment
1. Check Google Search Console for ranking changes
2. Test whether SeedLink content is being cited by AI assistants (search relevant terms in ChatGPT, Perplexity)
3. Review and update the `/llms.txt` file on the WordPress site
4. Adjust SEO/AEO agent prompt if citation patterns have changed

### ROI Calculation
1. Compare content costs (Claude API + n8n + tools) against outcomes
2. Track: marketplace visits, Playbook sign-ups, and talent matching inquiries attributed to content
3. Present findings to inform budget and strategy decisions

---

## Emergency Procedures

### Workflow Failure
1. Check Slack for error notifications (all workflows send Slack alerts on failure)
2. Open n8n → Executions → filter by failed
3. Read the error message — most common issues:
   - Claude API rate limit → wait and retry, or check billing
   - Google Sheets permission → re-share the workbook
   - Buffer token expired → regenerate in Buffer settings
4. Fix the issue and re-run the workflow manually

### Content Quality Issue (Published Bad Content)
1. Immediately update the post on WordPress/LinkedIn/X
2. In Content Hub, add notes about what went wrong
3. Review the agent scores for that piece — did the agents miss something?
4. If systemic, tighten the relevant agent prompt thresholds

### Outreach Misclassification
1. In the Outreach sheet, correct the Type and Classification manually
2. Take appropriate follow-up action
3. If misclassifications are frequent, review the response-classifier prompt

---

## New Client Onboarding (VV — Per New Sale)

Most of the onboarding process is automated by the `client-onboarding-orchestrator.json` workflow. VV receives a Slack notification when a new client has paid and submitted their questionnaire. The following steps are VV's manual responsibilities:

### When Slack Notification Arrives (within 24 hours)

1. Open the client's auto-provisioned Google Sheet (link in Slack message)
2. Verify Settings tab was populated correctly by the orchestrator
3. Verify Voice Profile tab was populated by the voice-profile-generator workflow
4. Review the Claude-generated client config (setup checklist, risk flags, customization notes)

### Build Phase (per SLA timeline — Basic: 5-7 days, Standard: 7-10 days, Premium: 10-15 days)

1. Set client-specific n8n environment variables:
   - `{CLIENT_ID}_SHEET_ID` — from the auto-provisioned Google Sheet
   - `{CLIENT_ID}_BLOG_URL` — from questionnaire
   - `{CLIENT_ID}_SLACK_WEBHOOK` — from questionnaire (if provided)
2. Import per-client workflows (editorial-calendar-manager, content-pipeline-main, social-engine, etc.) based on purchased modules
3. Update workflow nodes to reference client-specific env vars
4. Handle any customization notes from the config (e.g., Ghost CMS instead of WordPress, non-standard CRM)
5. Run all 6 manual tests per `setup-guide.md` Step 6
6. Activate scheduled triggers

### Delivery (when build is complete)

1. Fire the build-complete webhook: `POST {N8N_BASE_URL}/webhook/client-build-complete` with client details
   - The orchestrator auto-emails the client with a handoff booking link
   - The orchestrator auto-updates the Sales Pipeline
2. Conduct the 30-minute handoff call with the client
3. Begin 2-week monitoring period
4. Run Voice Calibration Protocol (see Monthly Operations → Voice Calibration above)

### After Monitoring Ends

The orchestrator auto-sends the Lite Support offer email and updates the Sales Pipeline. No VV action needed unless the client subscribes to Lite Support.

---

## Lite Support Scope Definition

**Pricing:** $250/month (Content), $300/month (Content + Outreach), $350/month (Full Suite)

**Included (up to 5 hours/month):**
- Keyword refreshes and target keyword updates
- Social post sequence tuning (CTA adjustments, format changes)
- Monthly performance review (analytics check + 1-paragraph summary)
- Voice Profile refinements based on client feedback
- Agent prompt threshold adjustments
- Workflow error investigation and resolution
- Google Sheets maintenance (stuck rows, formula fixes)

**Not included (billable as overage at $75/hour):**
- New workflow builds or major modifications
- New content pillar setup
- CMS migration or new platform integrations
- Full voice profile rebuild (use $400 voice workshop change order)
- Custom analytics dashboards or reporting
- Training sessions beyond the initial handoff call
- Work exceeding 5 hours in a calendar month

**Overage process:** VV notifies client when approaching 5-hour cap. Work beyond 5 hours requires written client approval and is billed at $75/hour on the next month's invoice.

---

## Content Pipeline Failure Procedures

### When Content Fails After 2 Revision Cycles

If the multi-agent review rejects content after 2 revision attempts:

1. Content Hub row will have Status = "Needs Manual Review"
2. **Read the agent feedback** in the Review Notes column — identify which agent(s) scored lowest and why
3. **Assess the root cause:**
   - **Topic too vague/broad:** Rewrite the Topic and Angle columns with more specificity, add target keyword, set Status back to "Queued"
   - **Voice Profile miscalibration:** Check Voice Profile tab — compare against client's actual writing. Re-run calibration if needed.
   - **Impossible topic:** Some topics can't be written well by AI (highly technical, requires proprietary knowledge). Flag for manual writing.
   - **Prompt issue:** If multiple topics fail on the same agent, the prompt may need tuning — log for monthly prompt optimization.
4. **Resolution options:**
   - Option A: Fix the brief and re-queue (most common)
   - Option B: Manually edit the AI draft to resolve the flagged issues, then set Status to "Ready for Review" to bypass the pipeline
   - Option C: Write the post manually and paste into Draft Content, set Status to "Approved"
5. **Log the failure** in Notes column with the date, cause, and resolution for future reference

---

## Roles & Responsibilities

### SeedLink Responsibilities

| Area | Responsibility |
|------|---------------|
| **Sales & Marketing** | Drive traffic to seedlink.app/automation, manage pricing page, run ads |
| **Stripe & Payments** | Maintain Stripe checkout, Stripe Connect setup, product catalog (29 products) |
| **Client Communication (Pre-Sale)** | Answer prospect questions, sales calls (optional), demos |
| **Landing Page** | Build and maintain /automation page with trust signals, case studies, FAQ |
| **Onboarding Form** | Maintain Typeform/Google Form questionnaire, ensure webhook fires to orchestrator |
| **Brand & Legal** | Client contracts, AI content disclaimers, data processing agreements |

### VV Responsibilities

| Area | Responsibility |
|------|---------------|
| **Technical Delivery** | Import, configure, and test all n8n workflows per client |
| **Voice Calibration** | Run calibration protocol during monitoring period, lock voice profile |
| **Build QA** | End-to-end testing before handoff |
| **Handoff Calls** | 30-minute walkthrough with each client |
| **Monitoring** | 2-week post-delivery monitoring, fix any issues |
| **Lite Support** | Monthly maintenance for subscribed clients (content QA, keyword refresh, prompt tuning) |
| **Infrastructure** | Maintain onboarding orchestrator, voice profile generator, and master n8n instance |
| **Prompt Optimization** | Refine Claude prompts based on review scores and client feedback |

### Shared Responsibilities

| Area | Responsibility |
|------|---------------|
| **Sales Pipeline** | Both parties have visibility via shared Google Sheet (auto-populated by orchestrator) |
| **Content Strategy** | VV handles technical execution, SeedLink/client handles strategic direction |
| **Escalations** | SeedLink escalates client issues to VV; VV escalates payment issues to SeedLink |
| **Quarterly Reviews** | Joint review of partnership metrics, pricing, and capacity planning |

### Per-Client Roles

| Role | Person | Responsibilities |
|------|--------|-----------------|
| **Content Approver** | Client (e.g., Shilpa for SeedLink) | Daily: review and approve drafts, review social content |
| **Content Strategy** | Client + VeteranVectors | Monthly: pillar performance, keyword strategy, voice audit |
| **Technical Ops** | VeteranVectors | Monthly: maintenance, credential checks, prompt tuning |
| **Outreach Manager** | Client | Daily: follow up on hot leads, respond to questions, book meetings |
