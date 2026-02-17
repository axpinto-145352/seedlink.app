# SeedLink.app — Build Summary

**Original Build Date**: February 10, 2026
**v2 Update Date**: February 17, 2026
**Builder**: Veteran Vectors (Claude Code automation)
**Source Documents**: `SeedLink_Combined_Proposal_VeteranVectors_Updated.pdf`, `SeedLink_SOW_Combined_VeteranVectors_Updated.pdf`

---

## v2 Changes Summary (February 17, 2026)

### What Triggered This Update

Founder requested:
1. Competitor review of Waldium (YC S23) and their AEO/content strategy
2. Evaluation of MarketerHire as a reference model for scalability
3. AEO (Answer Engine Optimization) upgrades to the existing build
4. Multi-agent review architecture — specialized agents for voice, strategy, SEO, editing
5. Workflow consolidation from 7 to 5
6. Google Sheets as the primary user interface

### Files Added

| File | Purpose |
|------|---------|
| `COMPETITOR_REVIEW_WALDIUM.md` | Deep analysis of Waldium (YC S23), MarketerHire reference model, feature comparison vs SeedLink, AEO gap analysis, scalability assessment (1-off → productized → platform), content pillar recommendation, 3-phase strategic roadmap |
| `prompts/voice-agent.md` | NEW — Voice & tone review agent: evaluates founder-to-founder tone, concreteness, accessibility, word choice (scores 1-5) |
| `prompts/strategy-agent.md` | NEW — Strategy review agent: evaluates pillar alignment, audience targeting, CTA integration, value delivery (scores 1-5) |
| `prompts/seo-aeo-agent.md` | NEW — SEO/AEO review agent: evaluates keyword placement, meta quality, AI citability, FAQ quality, verifiable claims + generates all SEO metadata |
| `prompts/editor-unifier-agent.md` | NEW — Final editorial agent: synthesizes all agent feedback, produces publication-ready draft |
| `workflows/social-engine.json` | NEW — Merged social derivation + scheduling + publishing (21 nodes) |

### Files Updated

| File | What Changed |
|------|-------------|
| `ARCHITECTURE.md` | Complete rewrite for v2: 5-workflow architecture, multi-agent review diagrams, token budget breakdown, Google Sheets UI design |
| `prompts/blog-writer.md` | AEO enhancements: opening definitions for AI citation, Key Takeaways section, FAQ section with self-contained answers, verifiable claims requirement |
| `workflows/content-pipeline-main.json` | Rebuilt from scratch: 25 nodes with 4-agent review (Voice → Strategy → SEO/AEO → Aggregate → Editor-Unifier), revision loop, SEO optimization built in |
| `workflows/editorial-calendar-manager.json` | Sheet references updated to "Content Hub", column mappings updated to match new schema |
| `workflows/analytics-reporter.json` | Renamed to "Analytics & Reporting", sheet references updated to "Content Hub" |
| `workflows/outreach-response-handler.json` | Renamed to "Outreach Handler", consolidated 4 separate sheets into single "Outreach" sheet with Type column |
| `google-sheets-template.md` | Complete redesign: 7 sheets → 5 sheets, Content Hub as primary UI with user action guide, status flow documentation, formatting recommendations |
| `setup-guide.md` | Updated for 5 workflows, new sheet names, new testing procedures for multi-agent pipeline |
| `sop.md` | Updated for Content Hub UI, social content review step, agent score trend monitoring, AEO quarterly assessment |

### Files Removed

| File | Reason |
|------|--------|
| `prompts/content-reviewer.md` | Replaced by 4 specialized agents (voice-agent, strategy-agent, seo-aeo-agent, editor-unifier-agent) |
| `prompts/seo-optimizer.md` | Absorbed into seo-aeo-agent.md (combined SEO + AEO review + metadata generation) |
| `workflows/seo-content-optimizer.json` | Absorbed into content-pipeline-main.json (SEO/AEO now built into the pipeline) |
| `workflows/social-derivation.json` | Merged into social-engine.json |
| `workflows/social-scheduler.json` | Merged into social-engine.json |

---

## Current State (v2)

### Documentation (7 files)

| File | Purpose |
|------|---------|
| `REQUIREMENTS.md` | Extracted requirements from both PDFs (unchanged from v1) |
| `ARCHITECTURE.md` | v2 workflow architecture with multi-agent review, 5 workflows, Google Sheets UI |
| `SUMMARY.md` | This file — consolidated change report |
| `COMPETITOR_REVIEW_WALDIUM.md` | Waldium competitor analysis, scalability assessment, strategic roadmap |
| `setup-guide.md` | Step-by-step setup for v2 architecture |
| `sop.md` | Standard Operating Procedures for v2 |
| `google-sheets-template.md` | Google Sheets UI template (5 sheets) |

### System Prompts (10 files in `prompts/`)

| File | Purpose | Used By |
|------|---------|---------|
| `content-brief-generator.md` | Topic → structured content brief | Content Pipeline |
| `blog-writer.md` | Brief → 1,000-1,500 word blog post with AEO optimization | Content Pipeline |
| `voice-agent.md` | Review: tone, concreteness, accessibility, word choice | Content Pipeline |
| `strategy-agent.md` | Review: pillar alignment, audience, CTA, value delivery | Content Pipeline |
| `seo-aeo-agent.md` | Review: SEO + AEO + metadata generation | Content Pipeline |
| `editor-unifier-agent.md` | Synthesize all agent feedback → final draft | Content Pipeline |
| `linkedin-deriver.md` | Blog → LinkedIn post | Social Engine |
| `twitter-deriver.md` | Blog → X/Twitter thread | Social Engine |
| `topic-generator.md` | Weekly topic ideation with dedup | Editorial Calendar |
| `response-classifier.md` | Outreach response classification | Outreach Handler |

### n8n Workflows (5 files in `workflows/`)

| File | Nodes | Trigger | Purpose |
|------|-------|---------|---------|
| `content-pipeline-main.json` | 25 | Daily schedule + manual | Topic → brief → draft → Voice/Strategy/SEO-AEO review → Editor-Unifier → save with scores + metadata |
| `social-engine.json` | 21 | Webhook + daily schedule | Path A: derive LinkedIn + Twitter + short posts from approved blog. Path B: publish scheduled posts via Buffer/WordPress |
| `editorial-calendar-manager.json` | 11 | Weekly (Monday) | Generate 5-7 topics balanced across pillars, dedup against last 30 days |
| `analytics-reporter.json` | 9 | Weekly (Friday) | Compile performance report to Google Sheets + Slack |
| `outreach-response-handler.json` | 9 | Webhook (Prosp.AI) | Classify responses → log to single Outreach sheet with Type column |

**Total**: 75 nodes across 5 workflows (down from 85 nodes across 7 workflows)

### Multi-Agent Review Pipeline

```
Blog Draft
    ↓
┌── Voice Agent (tone, wording, concreteness, accessibility) ──────── Score 1-5
├── Strategy Agent (pillar alignment, audience, CTA, value) ────────── Score 1-5
└── SEO/AEO Agent (keywords, meta, AI citability, FAQs, claims) ──── Score 1-5 + metadata
    ↓
Code: Aggregate Reviews (all must pass: avg >= 3.5, no score < 2.5)
    ↓
├── All passed → Editor-Unifier (synthesize feedback, produce final draft)
│                     ↓
│                 Save to Content Hub (Status = "Ready for Review")
│
└── Failed → Revision loop (max 2 cycles) or → "Needs Manual Review"
```

### Google Sheets UI (5 sheets)

| Sheet | Purpose | User Interaction |
|-------|---------|-----------------|
| **Content Hub** | Central workspace — all content from idea to publication | Add topics, review drafts, edit content, approve, schedule |
| **Social Queue** | Social post scheduling view | Review derived posts, verify dates |
| **Analytics** | Weekly performance data | Review reports |
| **Topics Archive** | Historical dedup reference | Read-only |
| **Outreach** | All response types in one sheet | Review classifications, update follow-up status |

**Key Design Principle**: Workflows never auto-advance past human checkpoints. User manually changes Status to "Approved" and "Scheduled."

### Token Budget

| API Call | max_tokens | Cost |
|----------|-----------|------|
| Topic Expansion | 1,024 | ~$0.05 |
| Draft Generation | 4,096 | ~$0.15 |
| Voice Review | 1,024 | ~$0.08 |
| Strategy Review | 1,024 | ~$0.08 |
| SEO/AEO Review | 1,024 | ~$0.08 |
| Editor-Unifier | 4,096 | ~$0.15 |
| LinkedIn Derivation | 1,024 | ~$0.08 |
| Twitter Derivation | 1,024 | ~$0.08 |
| Short Posts | 512 | ~$0.04 |
| **Total per piece** | — | **~$0.79** |

At 4 pieces/week × 4 weeks = **~$12.64/month** — well within the $50/month Claude API budget.

---

## Validation Results

- All 5 workflow JSONs pass JSON syntax validation
- All workflows contain: name, nodes array, connections object, tags (seedlink, production)
- All workflows include error handling (Error Trigger → Slack notification)
- All Claude API calls use correct endpoint, headers, and model (`claude-sonnet-4-20250514`)
- Content Pipeline confirmed: Voice Review, Strategy Review, SEO/AEO Review, Editor-Unifier nodes present
- Social Engine confirmed: dual-path architecture (webhook + schedule), parallel Claude derivation calls
- Outreach Handler confirmed: single Outreach sheet with Type column mapping
- All Google Sheets references updated from "Editorial Calendar" to "Content Hub"
- Zero remaining references to removed files (content-reviewer.md, seo-optimizer.md, etc.)

---

## Assumptions (Updated)

1. **CMS is WordPress** — Social Engine uses WordPress REST API for blog publishing
2. **Buffer for social scheduling** — LinkedIn and X/Twitter posts route through Buffer API
3. **Google Sheets as primary UI** — All user interaction happens through the 5-sheet workbook
4. **Single Google Sheets workbook** — All sheets in one workbook referenced by `SEEDLINK_EDITORIAL_CALENDAR_ID`
5. **Slack for notifications** — All workflow notifications go to Slack via webhook
6. **Prosp.AI webhook availability** — Outreach handler assumes Prosp.AI can send webhook POST requests
7. **Human-in-the-loop** — Workflows never auto-publish. User approves drafts and schedules posts manually
8. **X/Twitter via Buffer** — Direct X API deferred to Phase B per proposal
9. **Claude Sonnet for cost efficiency** — All workflows use `claude-sonnet-4-20250514` to stay within $50/month budget
10. **4 review agents is optimal** — Evaluated 6-agent (one per concern) vs 3-agent (grouped) vs 4-agent. Selected 4 agents as the right balance of specialization vs. API cost

---

## Competitor Intelligence

### Waldium (YC S23) — Key Findings

- **Not a direct competitor** — Waldium targets developer tools/technical products. SeedLink targets AI talent marketplace + SMB founders. Different audiences.
- **Where Waldium leads**: AEO-first architecture, AI citation analytics, LLMs.txt auto-generation, zero-setup hosted publishing
- **Where SeedLink leads**: Full-funnel automation (content + social + outreach + scheduling), multi-channel publishing, human-in-the-loop quality, cost transparency
- **What we adopted from Waldium**: AEO content structuring (opening definitions, self-contained FAQs, verifiable claims, Key Takeaways sections) — implemented via prompt upgrades and SEO/AEO agent

### Scalability Assessment

| Phase | Timeline | Model | Effort per Client |
|-------|----------|-------|-------------------|
| **A: Referral builds** | Now → 3 months | Clone workflows, change prompts/credentials | 2-3 days |
| **B: Productized service** | 3-6 months | Parameterized templates, onboarding form, landing page | 1-2 days |
| **C: Self-serve platform** | 6-12+ months (if demand warrants) | Multi-tenant infrastructure, configuration UI | Zero (self-serve) |

Founder's instinct confirmed: referral builds now → productized service → platform only if demand warrants.

---

## File Structure (v2)

```
seedlink.app/
├── CLAUDE.md                              (project instructions)
├── README.md                              (quick start)
├── REQUIREMENTS.md                        (extracted requirements)
├── ARCHITECTURE.md                        (v2 workflow architecture)
├── SUMMARY.md                             (this file)
├── COMPETITOR_REVIEW_WALDIUM.md           (competitor analysis + scalability)
├── setup-guide.md                         (v2 setup instructions)
├── sop.md                                 (v2 standard operating procedures)
├── google-sheets-template.md              (Google Sheets UI template — 5 sheets)
├── SeedLink_Combined_Proposal_VeteranVectors_Updated.pdf
├── SeedLink_SOW_Combined_VeteranVectors_Updated.pdf
├── workflows/
│   ├── content-pipeline-main.json         (25 nodes — multi-agent review)
│   ├── social-engine.json                 (21 nodes — derive + publish)
│   ├── editorial-calendar-manager.json    (11 nodes)
│   ├── analytics-reporter.json            (9 nodes)
│   └── outreach-response-handler.json     (9 nodes)
└── prompts/
    ├── content-brief-generator.md
    ├── blog-writer.md                     (AEO-enhanced)
    ├── voice-agent.md                     (NEW)
    ├── strategy-agent.md                  (NEW)
    ├── seo-aeo-agent.md                   (NEW)
    ├── editor-unifier-agent.md            (NEW)
    ├── linkedin-deriver.md
    ├── twitter-deriver.md
    ├── topic-generator.md
    └── response-classifier.md
```

---

## Next Steps

1. **Deploy**: Set up n8n instance, configure credentials per `setup-guide.md`
2. **Create Google Sheets**: Build the 5-sheet workbook per `google-sheets-template.md`
3. **Import & test**: Import 5 workflows in order, run manual tests
4. **Run for 30 days**: Collect real performance data on content quality and agent scores
5. **Implement LLMs.txt**: Add `/llms.txt` file to WordPress listing published content URLs
6. **Create landing page**: "AI Content Automation for Startups" on SeedLink.app for referral pipeline
7. **First referral build**: Clone for one of the 3 CEOs the founder mentioned
8. **Track AEO**: Manually check if SeedLink content is cited by AI assistants (ChatGPT, Perplexity)
