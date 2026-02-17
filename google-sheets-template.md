# SeedLink — Google Sheets Editorial Calendar Template

This document defines the structure for the Google Sheets workbook that powers SeedLink's content engine and outreach tracking. Create a single Google Sheets workbook and share it with the n8n service account.

**Sheet ID**: Once created, set the Sheet ID as the `SEEDLINK_EDITORIAL_CALENDAR_ID` environment variable in n8n.

---

## Sheet 1: "Editorial Calendar"

The primary sheet used by all content workflows.

| Column | Header | Data Type | Description | Example |
|--------|--------|-----------|-------------|---------|
| A | Topic | Text | Blog post topic/title | "5 Questions to Ask Before Hiring a Fractional AI Engineer" |
| B | Pillar | Text | Content pillar | Finding AI Talent / Zero to MVP / AI Industry & Trends / SeedLink in Action |
| C | Target Keyword | Text | Primary SEO keyword | "hire fractional AI engineer" |
| D | Target Audience | Text | Who this post is for | "Founders, startup CEOs" |
| E | Status | Text | Current workflow status | Queued / In Progress / Ready for Review / Approved / Scheduled / Published |
| F | Draft Content | Text | Full blog post markdown | (long text — blog post body) |
| G | Review Score | Number | Agentic review score (1-5) | 4.2 |
| H | Review Notes | Text | Reviewer feedback | "Strong voice, CTA could be more natural in paragraph 3" |
| I | Meta Title | Text | SEO meta title | "How to Hire a Fractional AI Engineer | SeedLink" |
| J | Meta Description | Text | SEO meta description (150-160 chars) | "Learn the 5 key questions to ask..." |
| K | Schema Markup | Text | JSON-LD structured data | (JSON string) |
| L | LinkedIn Post | Text | Derived LinkedIn content | (full LinkedIn post text) |
| M | Twitter Thread | Text | Derived X/Twitter thread | (full thread text) |
| N | Short Posts | Text | Derived short-form social snippets | (JSON array of snippets) |
| O | Publish Date | Date | Scheduled publish date | 2026-02-18 |
| P | Blog URL | URL | Published blog post URL | https://seedlink.app/blog/hire-fractional-ai-engineer |
| Q | LinkedIn URL | URL | Published LinkedIn post URL | (LinkedIn post link) |
| R | Twitter URL | URL | Published X/Twitter thread URL | (X post link) |
| S | CTA Type | Text | Primary CTA in this post | marketplace / playbook / talent_matching / combo |
| T | Notes | Text | Internal notes, revision history | "Revised twice — voice improved after feedback" |
| U | Created Date | Date | Date topic was added to calendar | 2026-02-11 |
| V | Revision Count | Number | Number of AI revision cycles | 0 / 1 / 2 |

### Status Values (workflow states)

| Status | Meaning | Set By |
|--------|---------|--------|
| Queued | Topic added, waiting for content pipeline to pick up | editorial-calendar-manager |
| In Progress | Content pipeline is actively generating draft | content-pipeline-main |
| Ready for Review | AI draft complete, awaiting human review | content-pipeline-main |
| Approved | Human has reviewed and approved | Manual (Shilpa) |
| SEO Optimized | SEO metadata and schema added | seo-content-optimizer |
| Social Derived | Social content generated | social-derivation |
| Scheduled | Publish date set, queued for auto-publish | social-scheduler (pre-publish) |
| Published | Live on all platforms | social-scheduler |

---

## Sheet 2: "Analytics"

Weekly performance data compiled by the analytics-reporter workflow.

| Column | Header | Data Type | Description | Example |
|--------|--------|-----------|-------------|---------|
| A | Report Date | Date | Week ending date | 2026-02-21 |
| B | Post Title | Text | Content piece title | "5 Questions to Ask Before Hiring..." |
| C | Platform | Text | Where published | Blog / LinkedIn / X/Twitter |
| D | Pillar | Text | Content pillar | Finding AI Talent |
| E | Impressions | Number | View/impression count | 1,250 |
| F | Engagement | Number | Likes + comments + shares | 87 |
| G | Engagement Rate | Percent | Engagement / Impressions | 6.96% |
| H | Clicks | Number | Link clicks to seedlink.app | 34 |
| I | Conversions | Number | Sign-ups or marketplace visits attributed | 5 |
| J | Notes | Text | Performance notes | "High engagement — topic resonated with founder audience" |

---

## Sheet 3: "Topics Archive"

Historical record of all topics used, for deduplication by the editorial-calendar-manager.

| Column | Header | Data Type | Description | Example |
|--------|--------|-----------|-------------|---------|
| A | Topic | Text | Blog post topic | "5 Questions to Ask Before Hiring a Fractional AI Engineer" |
| B | Pillar | Text | Content pillar | Finding AI Talent |
| C | Target Keyword | Text | Primary keyword used | "hire fractional AI engineer" |
| D | Date Used | Date | Date the topic was published | 2026-02-18 |
| E | Performance Score | Number | Composite engagement score (1-10) | 7.5 |
| F | Blog URL | URL | Link to published post | https://seedlink.app/blog/hire-fractional-ai-engineer |

---

## Sheet 4: "Hot Leads" (Workstream A)

Outreach responses classified as "interested" by the response handler.

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A | Sender Name | Text | Prospect's name |
| B | Sender Title | Text | Job title |
| C | Sender Company | Text | Company name |
| D | Message | Text | Their response text |
| E | Classification | Text | interested |
| F | Confidence | Number | AI confidence score (0-1) |
| G | Suggested Action | Text | Recommended next step |
| H | Urgency | Text | high / medium / low |
| I | Response Date | Date | When they responded |
| J | Profile Source | Text | Which of the 4 LinkedIn profiles |
| K | Follow-Up Status | Text | Pending / Contacted / Meeting Booked / Converted |

---

## Sheet 5: "Meetings" (Workstream A)

Responses classified as "meeting_request."

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A–J | Same as Hot Leads | — | Same structure |
| K | Meeting Date | Date | Scheduled meeting date |
| L | Meeting Notes | Text | Pre-meeting context |

---

## Sheet 6: "Questions" (Workstream A)

Responses classified as "question" needing human reply.

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A–J | Same as Hot Leads | — | Same structure |
| K | Reply Sent | Boolean | Whether reply was sent |
| L | Reply Content | Text | What was sent back |

---

## Sheet 7: "Archived" (Workstream A)

Responses classified as "not_interested."

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A–I | Same as Hot Leads | — | Same structure (minus Follow-Up Status) |
| J | Reason | Text | AI reasoning for classification |

---

## Setup Instructions

1. Create a new Google Sheets workbook
2. Create all 7 sheets with the exact names listed above (case-sensitive)
3. Add header rows to each sheet matching the column definitions
4. Share the workbook with the n8n Google Sheets service account email
5. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
6. Set `SEEDLINK_EDITORIAL_CALENDAR_ID` environment variable in n8n to this Sheet ID
