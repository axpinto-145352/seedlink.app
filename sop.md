# SeedLink — Standard Operating Procedure (SOP)

Standard operating procedures for ongoing content operations and outreach management.

---

## Daily Operations (10-15 minutes)

### Review Drafted Content
1. Open the Google Sheets editorial calendar
2. Filter for Status = "Ready for Review"
3. Read the draft in the "Draft Content" column
4. Check the Review Score and Review Notes for AI feedback
5. Decision:
   - **Approve**: Change Status to "Approved" — this triggers the SEO optimizer and social derivation workflows
   - **Request Changes**: Add notes in the Notes column and change Status back to "Queued" for re-processing
   - **Reject**: Change Status to "Rejected" and add reason in Notes

### Check Outreach Responses
1. Open the "Hot Leads" sheet — follow up with interested prospects within 24 hours
2. Open the "Meetings" sheet — send calendar links to meeting requests immediately
3. Open the "Questions" sheet — draft and send responses to prospect questions
4. Mark follow-up status for each lead after action is taken

---

## Weekly Operations (30-45 minutes)

### Monday: Editorial Calendar Review
1. Verify the Editorial Calendar Manager ran successfully (check for new "Queued" topics)
2. Review the 5-7 generated topics — reorder or replace any that don't align with current priorities
3. Ensure pillar balance looks right for the week
4. Add any manually-generated topics (from outreach conversations, client feedback, timely events)

### Wednesday: Mid-Week Content Check
1. Verify the Content Pipeline is processing topics on schedule
2. Review any drafts that are in "Ready for Review" status
3. Check social content queue in Buffer/Typefully — verify posts are scheduled for correct dates

### Friday: Weekly Performance Review
1. Review the weekly analytics report (posted to Slack and saved to Analytics sheet)
2. Note top-performing content — what topic, pillar, and format worked best?
3. Note underperforming content — what can be improved?
4. Record observations in the Notes column for future reference

---

## Monthly Operations (2-3 hours)

### Content Strategy Review (First Monday of each month)
1. **Pillar Performance Analysis**: Which pillar is driving the most engagement and conversions? Adjust weighting for next month.
2. **Keyword Review**: Check Google Search Console for keyword rankings. Are target keywords improving? Identify new keyword opportunities.
3. **Voice Quality Audit**: Read the last 4 blog posts. Is the voice consistent? Does it still sound founder-to-founder? If quality has drifted, review and update the Claude prompts in the `prompts/` directory.
4. **CTA Effectiveness**: Are marketplace, Playbook, and talent matching CTAs driving clicks? Adjust CTA strategy if needed.
5. **Competitor Scan**: Quick review of what competitors are publishing on LinkedIn and their blogs. Identify gaps or topics SeedLink should address.

### Outreach Performance Review (First Monday of each month)
1. **Campaign Metrics**: Review connection acceptance rates, response rates, and call booking rates across all 4 profiles
2. **Messaging Optimization**: Identify which A/B variants are performing better. Kill underperformers and create new test variants.
3. **Lead Quality**: Review converted leads — are they the right profile? Adjust Sales Navigator targeting if needed.
4. **Pipeline Health**: Count total active conversations, meetings booked, and conversions. Compare to targets (600-800 connections, 25-35% acceptance, 5-10% call booking).

### Technical Maintenance (First Monday of each month)
1. **n8n Execution Log**: Review failed executions from the past month. Identify and fix recurring errors.
2. **API Usage Check**: Log into Anthropic dashboard. Verify Claude API usage is within $50/month budget. If approaching limit, review prompt efficiency.
3. **Credential Rotation**: Check if any API keys or OAuth tokens need renewal.
4. **Workflow Updates**: If n8n has released updates, review changelog for breaking changes before updating.

---

## Quarterly Operations (Half day)

### Quarter Review & Strategy Refresh
1. **Content Audit**: Review all published content. Which posts drove the most traffic, engagement, and conversions? Double down on winning formats.
2. **SEO/GEO Assessment**: Check organic search traffic trends. Are any posts ranking on page 1? Check AI answer engine mentions (search SeedLink on ChatGPT, Perplexity, Google AI Overviews).
3. **Pillar Refresh**: Update content pillars if SeedLink's product or market has evolved. Add or remove topics/themes.
4. **Voice Guidelines Update**: Refine voice guidelines based on 3 months of content. Update prompts if needed.
5. **Outreach Strategy Refresh**: Update targeting criteria, messaging, and lead lists based on quarter performance.
6. **ROI Assessment**: Calculate hours saved, content produced, leads generated, and conversions vs. costs. Compare to projections in the original proposal.

---

## Emergency Procedures

### Workflow Failure
1. Check Slack for error alerts (all workflows send failure notifications)
2. Open n8n > Executions > filter for errors
3. Common fixes:
   - **API key expired**: Refresh the credential in n8n Settings
   - **Google Sheets permission lost**: Re-authorize the OAuth connection
   - **Claude API rate limit**: Wait 60 seconds and retry, or check if usage exceeds plan limits
4. If a workflow is stuck, manually re-trigger it after fixing the issue

### Content Quality Issue (Published Post Has Errors)
1. Update the post directly in the CMS (WordPress)
2. Note the issue in the editorial calendar Notes column
3. If it's a systemic issue (e.g., voice drift), review and update the relevant prompt in `prompts/`

### Outreach Misclassification
1. Manually move the lead to the correct sheet (Hot Leads, Questions, Meetings, or Archived)
2. If misclassification is happening frequently, review the response-classifier prompt

---

## Roles & Responsibilities

| Role | Responsibility | Time Commitment |
|------|---------------|-----------------|
| Shilpa (CEO) | Review/approve drafts, respond to hot leads, strategic decisions | 30-45 min/week |
| Veteran Vectors (Retainer) | Pipeline maintenance, prompt optimization, reporting, A/B testing, troubleshooting | Included in $600/month retainer |

---

## Key Contacts

- **Pipeline Issues**: anthony@veteranvectors.com
- **Prosp.AI Support**: Prosp.AI support portal
- **n8n Support**: n8n community forum or cloud support
- **Claude API Issues**: Anthropic support portal
