# SeedLink — Google Sheets UI Template

This document defines the Google Sheets workbook that serves as the **primary user interface** for SeedLink's content engine. All content input, editing, approval, and scheduling happens through this workbook. The n8n workflows read from and write to these sheets automatically.

**Sheet ID**: Once created, set the Sheet ID as the `SEEDLINK_EDITORIAL_CALENDAR_ID` environment variable in n8n.

---

## Sheet 1: "Content Hub" (Primary UI)

The central workspace for all content operations. Each row is a content piece tracked from topic idea through publication.

### User Actions in This Sheet

| Action | How | What Happens |
|--------|-----|--------------|
| **Add a topic manually** | Type topic in column A, set Status to "Queued" | Content Pipeline picks it up on next run |
| **Review a draft** | Read "Draft Content" column, edit directly if needed | When satisfied, change Status to "Approved" |
| **Edit content** | Modify any content column directly (Draft Content, LinkedIn Post, Twitter Thread) | Workflows use whatever is in the cell next time they run |
| **Override AI suggestions** | Edit Meta Title, Meta Description, or any generated content | Your edits are preserved — workflows don't overwrite approved content |
| **Schedule for publishing** | Set Publish Date, change Status to "Scheduled" | Social Engine auto-publishes on that date |
| **Add notes** | Use Notes column for any context | Visible to workflows for reference |

### Column Definitions

| Column | Header | Data Type | Set By | Editable? | Description |
|--------|--------|-----------|--------|-----------|-------------|
| A | Topic | Text | Calendar workflow or manual | Yes | Blog post topic |
| B | Pillar | Text | Calendar workflow or manual | Yes | Finding AI Talent / Zero to MVP / AI Industry & Trends / SeedLink in Action |
| C | Target Keyword | Text | Calendar workflow or manual | Yes | Primary SEO keyword |
| D | Target Audience | Text | Calendar workflow or manual | Yes | Who this post is for |
| E | Priority | Text | Calendar workflow or manual | Yes | high / medium / low |
| F | Status | Text | Workflows + manual | **Yes — this drives workflows** | See status values below |
| G | Draft Content | Text | Content Pipeline | Yes — edit before approving | Full blog post in markdown |
| H | Voice Score | Number | Voice Agent | No | Voice/tone review score (1-5) |
| I | Strategy Score | Number | Strategy Agent | No | CTA/pillar alignment score (1-5) |
| J | SEO/AEO Score | Number | SEO/AEO Agent | No | SEO + AI citability score (1-5) |
| K | Review Notes | Text | Editor-Unifier | No | Summary of agent feedback and changes |
| L | Meta Title | Text | SEO/AEO Agent | Yes — override if needed | SEO meta title (50-60 chars) |
| M | Meta Description | Text | SEO/AEO Agent | Yes — override if needed | SEO meta description (150-160 chars) |
| N | Schema Markup | Text | SEO/AEO Agent | No | JSON-LD structured data |
| O | LinkedIn Post | Text | Social Engine | Yes — edit before scheduling | Derived LinkedIn content |
| P | Twitter Thread | Text | Social Engine | Yes — edit before scheduling | Derived X/Twitter thread |
| Q | Short Posts | Text | Social Engine | Yes — edit before scheduling | Standalone social snippets (JSON array) |
| R | Publish Date | Date | Calendar workflow or manual | **Yes — set to schedule** | Target publish date |
| S | Blog URL | URL | Social Engine | No | Published blog post URL |
| T | LinkedIn URL | URL | Social Engine | No | Published LinkedIn post URL |
| U | Twitter URL | URL | Social Engine | No | Published X/Twitter URL |
| V | CTA Type | Text | Content Pipeline | Yes | marketplace / playbook / talent_matching / combo |
| W | Angle | Text | Calendar workflow | Yes | The specific hook for this piece |
| X | Revision Count | Number | Content Pipeline | No | Number of AI revision cycles (0/1/2) |
| Y | Created Date | Date | Calendar workflow | No | When the topic was added |
| Z | Notes | Text | Manual | **Yes — your workspace** | Internal notes, revision history, context |

### Status Values (User Controls the Flow)

| Status | Meaning | Set By | Triggers |
|--------|---------|--------|----------|
| **Queued** | Topic ready for AI drafting | Calendar workflow or user | Content Pipeline picks it up |
| **Drafting** | Content Pipeline is generating a draft | Content Pipeline | — (in progress) |
| **Ready for Review** | AI draft complete with agent scores | Content Pipeline | User reviews the draft |
| **Approved** | User has reviewed and approved the draft | **User (manual)** | Social Engine derives social posts, SEO metadata already attached |
| **Social Ready** | Social content derived, ready for user review | Social Engine | User reviews social content |
| **Scheduled** | All content approved, publish date set | **User (manual)** | Social Engine publishes on the date |
| **Published** | Live on all platforms | Social Engine | Analytics Reporter tracks it |
| **Needs Manual Review** | AI review failed after max revisions | Content Pipeline | User must edit and re-queue |

**Key principle**: Workflows never auto-advance past "Ready for Review" or "Social Ready." The user always decides when to approve and when to schedule. This is the human-in-the-loop design.

---

## Sheet 2: "Social Queue"

Separate view for social posts with scheduling details. Auto-populated by the Social Engine.

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A | Post ID | Text | Links back to Content Hub row |
| B | Platform | Text | LinkedIn / Twitter / Blog |
| C | Content | Text | The social post content |
| D | Publish Date | Date | Scheduled date |
| E | Status | Text | Pending / Scheduled / Published |
| F | Published URL | URL | Live URL after publishing |
| G | Source Blog Title | Text | Which blog post this was derived from |

---

## Sheet 3: "Analytics"

Weekly performance data compiled by the Analytics & Reporting workflow.

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A | Report Date | Date | Week ending date |
| B | Post Title | Text | Content piece title |
| C | Platform | Text | Blog / LinkedIn / X/Twitter |
| D | Pillar | Text | Content pillar |
| E | Impressions | Number | View/impression count |
| F | Engagement | Number | Likes + comments + shares |
| G | Engagement Rate | Percent | Engagement / Impressions |
| H | Clicks | Number | Link clicks to seedlink.app |
| I | Conversions | Number | Sign-ups or marketplace visits |
| J | Notes | Text | Performance notes |

---

## Sheet 4: "Topics Archive"

Historical record of all topics used, for deduplication by the Editorial Calendar workflow.

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A | Topic | Text | Blog post topic |
| B | Pillar | Text | Content pillar |
| C | Target Keyword | Text | Primary keyword used |
| D | Date Used | Date | Date published |
| E | Performance Score | Number | Composite score (1-10) |
| F | Blog URL | URL | Link to published post |

---

## Sheet 5: "Outreach"

All outreach responses in one sheet, categorized by Type. Replaces the old 4-sheet structure.

| Column | Header | Data Type | Description |
|--------|--------|-----------|-------------|
| A | Type | Text | Hot Lead / Archived / Question / Meeting |
| B | Sender Name | Text | Prospect's name |
| C | Title | Text | Job title |
| D | Company | Text | Company name |
| E | Message | Text | Their response text |
| F | Response Date | Date | When they responded |
| G | Source | Text | Profile source (LinkedIn profile) |
| H | Classification | Text | AI classification (interested/not_interested/question/meeting_request) |
| I | Confidence | Number | AI confidence score (0-1) |
| J | Reasoning | Text | Why the AI classified it this way |
| K | Suggested Action | Text | Recommended next step |
| L | Urgency | Text | high / medium / low |
| M | Follow-Up Status | Text | Pending / Contacted / Meeting Booked / Converted / Closed |
| N | Follow-Up Notes | Text | Human notes on follow-up |

---

## Setup Instructions

1. Create a new Google Sheets workbook
2. Create 5 sheets with these exact names (case-sensitive):
   - Content Hub
   - Social Queue
   - Analytics
   - Topics Archive
   - Outreach
3. Add header rows to each sheet matching the column definitions above
4. Share the workbook with the n8n Google Sheets service account email (edit access)
5. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
6. Set `SEEDLINK_EDITORIAL_CALENDAR_ID` environment variable in n8n to this Sheet ID

## Formatting Recommendations

- **Content Hub**: Freeze row 1 (headers) and columns A-F (topic info) so you can scroll through content while seeing context
- **Status column**: Add data validation dropdown with the status values listed above
- **Priority column**: Add data validation dropdown (high/medium/low)
- **Pillar column**: Add data validation dropdown with the 4 pillar names
- **Conditional formatting**: Color Status column cells by value (green=Published, blue=Approved, yellow=Ready for Review, red=Needs Manual Review)
- **Column widths**: Set Draft Content, LinkedIn Post, Twitter Thread to 400px+ for readability
