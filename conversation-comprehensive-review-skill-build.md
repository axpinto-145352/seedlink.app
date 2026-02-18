# Conversation: Building the Comprehensive Review Agents Team Skill

## Summary
Built a Claude Code skill called `comprehensive-review-agents-team` that conducts a multi-dimensional review of any topic (workflow, proposal, guide, product, company) through 13 lenses and produces two deliverables: an Assessment Report and an Enhanced Original with inline recommendations.

## Trigger
User says **"run review agents team"** (or similar) after providing a topic and context.

## Key Design Decisions

### Started with 9 lenses:
1. Legal
2. Ethical
3. Logistical
4. Current State
5. Future Strategy
6. Cost Effectiveness
7. Time Effectiveness
8. Security
9. Guardrails & Governance

### Added 4 more lenses for client deliverable use case:
10. **AI Safety & Responsible AI** — Prompt injection, hallucination risk, data leakage, output validation, human-in-the-loop, model dependency, PII handling, failure modes
11. **Client Experience & Usability** — Onboarding friction, error messages, edge case UX, documentation, accessibility, user confidence
12. **Maintainability & Handoff Readiness** — Client self-sufficiency, knowledge transfer, vendor lock-in, modifiability, dependency mapping, technical debt
13. **Data Integrity & Quality** — Input validation, transformation accuracy, duplicate handling, data loss risk, schema drift, upstream change resilience

### Why these 4 were added:
- Primary use case is reviewing client deliverables from an AI automation consultancy (Veteran Vectors)
- AI Safety needs its own lens separate from general security — covers prompt injection, hallucination blast radius, PII in prompts, etc.
- Client Experience matters because technically sound work can still be miserable to use
- Maintainability ensures the client can own the deliverable after handoff without depending on the creator
- Data Integrity is critical for workflows — covers what happens when upstream data changes, schema drifts, or duplicates sneak in

## Architecture Decisions

### Single file vs. multi-file:
- **Started** with two files: SKILL.md (framework) + AGENTS.md (agent orchestration with 6 specialist prompts + 1 coordinator)
- **Consolidated** to a single SKILL.md because the user wanted a simple trigger ("run review agents team") without needing complex setup
- The single file is self-contained and self-triggering

### Auto-detection by topic type:
The skill auto-detects what's being reviewed and weights lenses accordingly:
- **n8n Workflows** → heavier on Security, Guardrails, AI Safety, Data Integrity
- **Companies / Business Plans** → heavier on Legal, Current State, Future Strategy, Cost
- **Social Media / Content Strategies** → heavier on Legal, Ethical, Time, AI Safety
- **Products / Services** → heavier on Legal, Security, AI Safety, Client UX, Maintainability
- **Client Deliverables (Guides, Proposals, SOPs)** → heavier on Guardrails, Client UX, Maintainability, Data Integrity

### Two deliverables per review:
1. **Assessment Report** — Executive summary, dimensional analysis (all 13 lenses), cross-cutting themes, priority matrix, conclusion
2. **Enhanced Original** — Original content preserved with inline `[RECOMMENDATION]`, `[STRENGTH]`, and `[CRITICAL]` tags plus new sections where gaps exist

## File Requirements for Claude Skills Upload
- File must be named `SKILL.md`
- Must start with YAML frontmatter (`---`)
- `name` field must be lowercase letters, numbers, and hyphens only
- `description` field summarizes what the skill does

### Correct frontmatter format:
```yaml
---
name: comprehensive-review-agents-team
description: Conducts a 13-lens review (legal, ethical, AI safety, security, cost, usability, maintainability, etc.) of any topic — workflow, proposal, guide, or product — and outputs an assessment report plus an enhanced version with inline recommendations. Trigger with "run review agents team".
---
```

## Rules Baked Into the Skill
- Every finding must be specific and evidence-based — no "could be better"
- Every recommendation must be actionable — who, what, when, how
- Quantify when possible — "$X/month" not "expensive"
- Be honest — don't soften critical findings
- Acknowledge trade-offs when recommendations conflict
- Enhanced Original must be usable as-is, not just a markup of problems
- If a lens doesn't apply, say so and move on
- Don't pad findings — if a lens has zero issues, say so clearly

## Issues Encountered
- Skills directory (`/mnt/skills/`) is read-only from within Claude conversations — can't install skills programmatically
- Claude.ai skill upload requires YAML frontmatter (first attempt failed without it)
- Skill `name` field must be lowercase with hyphens only (second attempt failed with title case)
- Internal server error on upload — server-side issue, not file format
- Skills and project knowledge files can only be managed through the Claude.ai UI, not from within a conversation

## Next Steps
- Upload SKILL.md to Claude Skills when server error resolves
- Add skill content to each Claude Project's knowledge files
- Consider keeping a master copy in Google Drive as single source of truth
- Test with a real client deliverable by providing context and saying "run review agents team"
