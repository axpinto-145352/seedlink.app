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
4. Your Google Sheets Hub — The Control Center
5. Daily Operations (10-15 minutes)
6. Weekly Operations (30-45 minutes)
7. Monthly Operations (2-3 hours)
8. How the AI Works Behind the Scenes
9. What You Control vs. What's Automated
10. Troubleshooting & FAQ
11. Support & Contacts

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

## 4. Your Google Sheets Hub — The Control Center

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

## 5. Daily Operations (10-15 minutes)

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

## 6. Weekly Operations (30-45 minutes)

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

## 7. Monthly Operations (2-3 hours)

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

## 8. How the AI Works Behind the Scenes

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

## 9. What You Control vs. What's Automated

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

## 10. Troubleshooting & FAQ

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

## 11. Support & Contacts

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
