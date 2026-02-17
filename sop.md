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
2. Check: Does the voice still feel authentic and founder-to-founder?
3. Check: Are CTAs feeling natural or forced?
4. If voice has drifted, update the Notes column on upcoming topics with specific guidance

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

## Roles & Responsibilities

| Role | Person | Responsibilities |
|------|--------|-----------------|
| **Content Approver** | Shilpa (CEO) | Daily: review and approve drafts, review social content |
| **Content Strategy** | Shilpa + VeteranVectors | Monthly: pillar performance, keyword strategy, voice audit |
| **Technical Ops** | VeteranVectors | Monthly: maintenance, credential checks, prompt tuning |
| **Outreach Manager** | Shilpa | Daily: follow up on hot leads, respond to questions, book meetings |
