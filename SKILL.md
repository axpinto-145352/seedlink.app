---
name: comprehensive-review-agents-team
description: Conducts a 13-lens review (legal, ethical, AI safety, security, cost, usability, maintainability, etc.) of any topic — workflow, proposal, guide, or product — and outputs an assessment report plus an enhanced version with inline recommendations. Trigger with "run review agents team".
---

# Comprehensive Review Agents Team

## Trigger
When the user says **"run review agents team"** (or similar: "run review," "comprehensive review," "review agents"), execute this skill against whatever topic and context the user has provided.

## Input
The user provides:
- **Topic** — what's being reviewed (a company, n8n workflow, strategy doc, product, etc.)
- **Context** — any additional details, documents, or goals (optional)

That's it. Everything below runs automatically.

---

## What You Do

You are a team of specialist reviewers + 1 coordinator. You review the topic through **16 lenses**, then produce **2 deliverables**.

### The 16 Lenses

| # | Lens | What You're Looking For |
|---|------|------------------------|
| 1 | **Legal** | Regulatory compliance, IP, data privacy, TOS, licensing, liability |
| 2 | **Ethical** | Bias, transparency, stakeholder impact, responsible AI use |
| 3 | **Logistical** | Feasibility, resources, dependencies, bottlenecks, scalability |
| 4 | **Current State** | Market position, strengths, weaknesses, performance, technical debt |
| 5 | **Future Strategy** | Long-term alignment, adaptability, innovation, emerging threats |
| 6 | **Cost Effectiveness** | TCO, ROI, hidden costs, waste, unit economics |
| 7 | **Time Effectiveness** | Time-to-value, process efficiency, automation opportunities, quick wins |
| 8 | **Security** | Data protection, access control, vulnerabilities, third-party risk, DR |
| 9 | **Guardrails & Governance** | QC, approval workflows, error handling, monitoring, documentation, change mgmt |
| 10 | **AI Safety & Responsible AI** | Prompt injection, hallucination risk, data leakage, output validation, human-in-the-loop, model dependency, PII in prompts, failure modes |
| 11 | **Client Experience & Usability** | Onboarding friction, error message clarity, edge case UX, documentation quality, accessibility, user confidence |
| 12 | **Maintainability & Handoff Readiness** | Client self-sufficiency, knowledge transfer, vendor lock-in, modifiability, dependency on creator, documentation completeness |
| 13 | **Data Integrity & Quality** | Input validation, transformation accuracy, duplicate handling, data loss risk, schema drift, upstream change resilience |
| 14 | **Revenue & Monetization** | Pricing model viability, payment flow integrity, revenue leakage, unit economics, billing automation, fee transparency, financial reporting |
| 15 | **Partnership & Stakeholder Alignment** | Responsibility clarity, communication protocols, conflict resolution, mutual accountability, scope boundaries, trust mechanisms |
| 16 | **Scalability & Growth Readiness** | Multi-client architecture, capacity planning, growth bottlenecks, platform evolution path, operational leverage, automation coverage |

---

### Lens Details

For **every** lens, produce:
- **Current State** — what exists (strengths + weaknesses)
- **Risk Rating** — Low / Medium / High / Critical (with justification)
- **Findings** — specific, evidence-based observations (not vague)
- **Recommendations** — actionable, tagged as Quick Win / Short-Term / Long-Term

---

#### 1. Legal
- Compliance with relevant laws/regulations (industry-specific)
- Intellectual property concerns
- Contractual obligations or liabilities
- Data privacy (GDPR, CCPA, etc.)
- Terms of service adherence (platform-specific)
- Licensing requirements

#### 2. Ethical
- Bias or fairness concerns
- Transparency and disclosure
- Impact on stakeholders (employees, customers, community)
- Alignment with stated values/mission
- Responsible AI usage (if applicable)
- Environmental/social responsibility

#### 3. Logistical
- Operational feasibility
- Resource requirements (people, tools, budget)
- Dependencies and bottlenecks
- Scalability constraints
- Timeline realism
- Vendor/partner dependencies

#### 4. Current State
- Market position or competitive landscape
- Performance metrics and benchmarks
- Strengths being leveraged
- Weaknesses being ignored
- Stakeholder satisfaction
- Technical debt or operational debt

#### 5. Future Strategy
- Alignment with long-term goals
- Adaptability to market changes
- Innovation opportunities
- Growth trajectory sustainability
- Succession/continuity planning
- Emerging threats or disruptions

#### 6. Cost Effectiveness
- Total cost of ownership
- ROI analysis (actual or projected)
- Hidden costs or cost leaks
- Budget allocation efficiency
- Cost vs. value delivered
- Opportunities for cost reduction without quality loss

#### 7. Time Effectiveness
- Time-to-value metrics
- Process efficiency (bottlenecks, redundancies)
- Automation opportunities
- Time spent vs. impact generated
- Cycle time analysis
- Quick wins vs. long-term investments

#### 8. Security
- Data protection measures
- Access control and authentication
- Vulnerability assessment
- Incident response readiness
- Third-party risk (integrations, APIs, vendors)
- Backup and disaster recovery

#### 9. Guardrails & Governance
- Quality control mechanisms
- Approval workflows and oversight
- Error handling and fallback procedures
- Monitoring and alerting
- Documentation and knowledge transfer
- Change management processes

#### 10. AI Safety & Responsible AI
- **Prompt injection risk** — can user input or upstream data manipulate AI behavior?
- **Hallucination risk** — where can the AI generate plausible but incorrect output? What's the blast radius if it does?
- **Data leakage into prompts** — is sensitive/proprietary/client data being sent to AI APIs? Is it necessary? Is it minimized?
- **PII handling** — is PII entering prompts, stored in logs, or returned in outputs? Is it masked, filtered, or disclosed?
- **Output validation** — is AI output checked before it reaches the end user or downstream system? By what mechanism?
- **Human-in-the-loop checkpoints** — where does a human review AI decisions? Are there any fully autonomous paths that should have oversight?
- **Failure mode planning** — what happens when the AI is wrong, down, rate-limited, or returns garbage? Is there a fallback?
- **Model dependency & vendor lock-in** — single model? Single provider? What breaks if the API changes, pricing changes, or the model is deprecated?
- **Responsible disclosure** — does the end user know AI is involved? Is that appropriate for the context?
- **Guardrail enforcement** — are system prompts and constraints robust? Can they be bypassed?

#### 11. Client Experience & Usability
- **Onboarding friction** — how easy is it for the client or end user to start using this? What setup is required?
- **Error message clarity** — when something fails, does the user understand what happened and what to do?
- **Edge case handling (UX side)** — what does the user see when inputs are unexpected, data is missing, or things time out?
- **Documentation quality** — is there a clear, non-technical guide the client can reference? Is it up to date?
- **Accessibility** — can users with varying technical skill levels operate this? Are there ADA/WCAG concerns?
- **User confidence** — does the user trust what they're seeing? Are outputs explained, sourced, or verifiable?
- **Support path** — when the user is stuck, what do they do? Is there a clear escalation route?

#### 12. Maintainability & Handoff Readiness
- **Client self-sufficiency** — can the client operate, troubleshoot, and make minor changes without the creator?
- **Knowledge transfer** — is there documentation of how it works, why decisions were made, and where things live?
- **Vendor lock-in** — how dependent is this on specific tools, platforms, or APIs? What's the exit plan?
- **Modifiability** — how easy is it to change a prompt, add a step, or swap a data source? Does changing one thing break others?
- **Dependency mapping** — are all external dependencies (APIs, credentials, services, schedules) documented?
- **Technical debt** — are there workarounds, hacks, or "temporary" solutions baked in that will cause problems later?
- **Version control & change history** — is there a record of what changed, when, and why?

#### 13. Data Integrity & Quality
- **Input validation** — is incoming data checked for format, type, completeness, and reasonableness before processing?
- **Transformation accuracy** — when data is mapped, merged, split, or reformatted, is the output verified against the input?
- **Duplicate handling** — can the same record be processed twice? What happens if it is?
- **Data loss risk** — are there points where data could be silently dropped, truncated, or overwritten?
- **Schema drift** — what happens when upstream data changes format, adds/removes fields, or changes types?
- **Upstream change resilience** — if a source API changes its response structure, does this fail gracefully or silently corrupt?
- **Data freshness** — is the data current enough for its purpose? Are there stale cache or timing risks?
- **Reconciliation** — is there a way to verify that input count = output count, or that totals match across stages?

#### 14. Revenue & Monetization
- **Pricing model viability** — is the pricing sustainable for all parties? Does it cover costs and generate margin at projected volume?
- **Payment flow integrity** — can payments be lost, delayed, or misattributed between parties? Are there single points of failure?
- **Revenue leakage** — are there scenarios where work is delivered but not billed, or where splits are calculated incorrectly?
- **Unit economics** — what does each unit (client, build, post) cost to deliver vs. what it earns? Does it improve with scale?
- **Billing automation** — are invoicing, splits, and payouts automated or manual? What breaks if volume doubles?
- **Fee transparency** — are all fees (processing, platform, tools) documented and allocated clearly between parties?
- **Financial reporting** — can both parties independently verify revenue, payouts, and outstanding balances at any time?
- **Subscription management** — are recurring payments (Lite Support, retainers) handled automatically with proper lifecycle management (upgrades, downgrades, cancellations)?

#### 15. Partnership & Stakeholder Alignment
- **Responsibility clarity** — is every task, deliverable, and decision clearly assigned to one party? Are there gaps or overlaps?
- **Communication protocols** — are escalation paths, response times, meeting cadences, and preferred channels defined?
- **Conflict resolution** — what happens when parties disagree on scope, quality, timing, or payment? Is there a defined process?
- **Mutual accountability** — can each party verify the other is meeting their commitments? Are there measurable SLAs?
- **Scope boundaries** — is it clear what's in scope vs. out of scope for each party? How are scope changes handled?
- **Trust mechanisms** — what systems replace personal trust with structural guarantees (escrow, auto-split, dashboards)?
- **Exit planning** — what happens if the partnership ends? Are handoff procedures, IP ownership, and transition timelines defined?
- **Growth alignment** — are both parties incentivized by the same growth outcomes? Do incentives diverge at scale?

#### 16. Scalability & Growth Readiness
- **Multi-client architecture** — can the system serve 5, 20, 100 clients without architectural changes? What breaks first?
- **Capacity planning** — is there a model for how volume (clients, content, API calls) maps to resource needs (time, compute, cost)?
- **Growth bottlenecks** — what are the top 3 constraints that limit growth? Are they technical, operational, or commercial?
- **Platform evolution path** — is there a clear roadmap from manual/service delivery to semi-automated to fully productized?
- **Operational leverage** — does adding a new client require proportional effort, or does effort per client decrease with scale?
- **Automation coverage** — what percentage of the delivery process is automated vs. manual? Which manual steps are the highest priority to automate?
- **Infrastructure scaling** — will the current infrastructure (n8n instance, API quotas, Google Sheets) handle growth? At what point do upgrades become necessary?
- **Knowledge capture** — as the team delivers more builds, is institutional knowledge captured in templates, playbooks, or code, or does it live only in people's heads?

---

## Adaptation (Auto-Detect)

Based on topic type, give extra weight to these areas:

**n8n Workflows →** Error handling coverage, credential security, rate limiting, retry logic, idempotency, node data validation, logging, scalability under load, AI Safety (lenses 8, 9, 10, 13, 16)

**Companies / Business Plans →** Market validation, financial projections, team gaps, regulatory exposure, customer concentration, unit economics, revenue model (lenses 1, 4, 5, 6, 14, 15)

**Social Media / Content Strategies →** Platform TOS compliance, brand safety, content authenticity, audience targeting ethics, algorithm dependency, measurement validity (lenses 1, 2, 7, 10)

**Products / Services →** User safety, accessibility, data handling, competitive durability, support burden, end-of-life planning, growth readiness (lenses 1, 8, 10, 11, 12, 16)

**Client Deliverables (Guides, Proposals, SOPs) →** Usability, handoff readiness, documentation, data integrity, maintainability (lenses 9, 11, 12, 13)

**Partnerships / Agreements →** Payment flows, responsibility delineation, mutual accountability, revenue splits, scalability, exit planning (lenses 1, 6, 14, 15, 16)

---

## The 2 Deliverables

### Deliverable 1: Assessment Report

```
# Comprehensive Review: [Topic Name]

## Executive Summary
- Overall risk profile (healthy / needs attention / at risk / critical)
- Top 3 strengths
- Top 3 critical findings
- Top 5 priority actions

## Dimensional Analysis
[For each of the 16 lenses:]
### [Lens Name]
- **Current State:** ...
- **Risk Rating:** [rating] — [one-line justification]
- **Key Findings:** [numbered list, specific]
- **Recommendations:** [numbered, tagged Quick Win / Short-Term / Long-Term]

## Cross-Cutting Themes
[Patterns that appear across multiple lenses]

## Priority Matrix
| # | Recommendation | Lens(es) | Priority | Effort | Impact |
|---|---------------|----------|----------|--------|--------|

## Conclusion & Next Steps
[Summary + recommended timeline]
```

### Deliverable 2: Enhanced Original

Take the original topic/document and return it with:
- All original content preserved
- Inline recommendations added using this format:

```
[original content here]

> **[RECOMMENDATION — Lens Name]** What to do and why.
> Priority: High | Effort: Low | Timeline: 1-2 days
```

- Gaps filled with new sections where needed
- Strengths called out: `> **[STRENGTH]** description`
- Critical risks flagged: `> **[CRITICAL]** description`

---

## Rules
- Every finding must be specific and evidence-based — no "could be better"
- Every recommendation must be actionable — who, what, when, how
- Quantify when possible — "$X/month" not "expensive"
- Be honest — don't soften critical findings
- Acknowledge trade-offs when recommendations conflict (e.g., cost vs. security)
- The Enhanced Original must be usable as-is, not just a markup of problems
- If a lens is genuinely not applicable to the topic, state "Not applicable — [reason]" and move on
- Do not pad findings — if a lens has zero issues, say so clearly
