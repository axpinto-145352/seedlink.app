# Changelog — SeedLink.app Automation Infrastructure

All notable changes to workflows, prompts, and configurations are documented here.

---

## [2026-03-07] — 16-Lens Review & Security Hardening

### Added
- `PARTNERSHIP_CALL_TALKING_POINTS.md` — Stripe Connect proposal talking points for partnership call
- `onboarding-form/create-google-form.gs` — Google Apps Script to auto-generate client onboarding questionnaire (30 fields, 7 sections, auto-POSTs to n8n webhook)
- `onboarding-form/SETUP.md` — 5-minute setup guide for the Google Form
- `CLIENT_QUICK_START.md` — 1-page quick start for clients (replaces 680-line ONBOARDING.md for day-1 essentials)
- `RUNBOOK.md` — 17 operational scenarios with step-by-step resolution procedures
- `CHANGELOG.md` — This file (change tracking for prompts/workflows/config)
- `reviews/16_LENS_ASSESSMENT_REPORT.md` — Full 16-lens comprehensive review report
- Voice calibration rubric (scores 1-5 with definitions) in CLIENT_QUICK_START.md
- Lite Support scope definition in sop.md (≤5 hrs/month, included/excluded activities, overage rate)
- "Content fails after 2 revisions" procedure in sop.md
- Anti-prompt-injection safety instructions added to all 14 system prompts
- Webhook authentication added to all inbound webhook endpoints

### Changed
- `SKILL.md` — Expanded from 13 lenses to 16 lenses (added Revenue & Monetization, Partnership & Stakeholder Alignment, Scalability & Growth Readiness)
- `REVENUE_STRUCTURE.md` — Added Stripe Connect payout fees (0.25% + $0.25) to example calculations
- `REQUIREMENTS.md` — Added v1 historical note header (references old "Editorial Calendar" terminology)
- `sop.md` — Added Lite Support scope, failure procedures, voice calibration rubric reference

### Security
- Webhook authentication added to: social-engine.json, outreach-response-handler.json, voice-profile-generator.json, social-publisher-direct.json, email-sequences.json
- Anti-injection instructions added to all 14 prompt files in prompts/
- Onboarding form webhook POST includes authentication header

---

## [2026-03-06] — Partnership Agreement Update

### Changed
- `PARTNERSHIP_AGREEMENT.md` — Section 1.3 rewritten for Stripe Connect auto-split (replaces manual 7-day payout)
- `PARTNERSHIP_AGREEMENT.md` — Section 1.4 added 12-step automated onboarding flow
- `reviews/PARTNERSHIP_13_LENS_REVIEW.md` — Updated with 3 resolved findings (L1-2, L3-2, L6-3)

### Added
- `REVENUE_STRUCTURE.md` — Stripe Connect payment model proposal with fee calculations
- `sales-pipeline-template.md` — Auto-populated financial tracking sheet spec

---

## [2026-02-17] — v2 Architecture (Multi-Agent Review)

### Changed
- `content-pipeline-main.json` — Replaced single-reviewer with 4-agent review pipeline (Voice, Strategy, SEO/AEO, Editor-Unifier)
- `social-engine.json` — Merged social-derivation.json and social-scheduler.json into single workflow
- All workflows — Switched to dynamic Voice Profile loading from Google Sheets
- Google Sheets template — Renamed "Editorial Calendar" → "Content Hub", added Voice Profile tab

### Added
- `workflows/voice-profile-generator.json` — Voice Extractor + Voice Builder dual-path workflow
- `workflows/client-onboarding-orchestrator.json` — Stripe → provisioning → voice profile → Slack notification
- `workflows/email-sequences.json` — Email automation engine
- `prompts/voice-agent.md` — Voice review agent (scores 1-5)
- `prompts/strategy-agent.md` — Strategy review agent
- `prompts/seo-aeo-agent.md` — SEO/AEO review agent
- `prompts/editor-unifier-agent.md` — Final editorial synthesis agent
- `prompts/voice-builder.md` — Voice Builder for new clients
- `prompts/voice-extractor.md` — Voice Extractor for existing content
- `prompts/email-sequence-writer.md` — Email copy generation
- `prompts/onboarding-config-generator.md` — Client config generation
- `ONBOARDING.md` — Client-facing onboarding guide (35 sections)
- `SUMMARY.md` — v2 changelog and validation

### Removed
- `social-derivation.json` — Merged into social-engine.json
- `social-scheduler.json` — Merged into social-engine.json
- `seo-content-optimizer.json` — Integrated into content-pipeline-main.json as SEO/AEO review agent

---

## [2026-02-10] — v1 Initial Build

### Added
- All 7 original workflow JSON files (content-pipeline-main, social-derivation, social-scheduler, editorial-calendar-manager, seo-content-optimizer, analytics-reporter, outreach-response-handler)
- All 8 original prompt files
- `REQUIREMENTS.md` — Extracted from SOW and proposal documents
- `ARCHITECTURE.md` — Workflow architecture design
- `setup-guide.md` — n8n setup instructions
- `sop.md` — Standard operating procedures
- `google-sheets-template.md` — Google Sheets workbook spec
