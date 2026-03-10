# SEEDLINK × VETERAN VECTORS — PARTNERSHIP AGREEMENT & IMPLEMENTATION GUIDE

**Date:** March 9, 2026
**Parties:**
- **SeedLink.app** ("SeedLink") — Shilpa Kollengode, Founder & CEO
- **Veteran Vectors** ("VV") — Anthony Pinto, Founder

**Classification:** Confidential
**Version:** 3.0 — Major restructure Mar 10: Added scope of work per party (Sections 1.2–1.3), deliverables per module (1.5), Lite Support detail with 90/10 split (1.6), annotated client purchase flow (1.8), strengthened shared terms (Part 3: independent contractor, warranties, indemnification, force majeure, amendments). Package pricing (Outreach $2,500, Content $4,000, Full Stack $6,000). Prior: Mar 9 call (75/25 split, Premium tier removed, Growth Partner role, delayed Stripe split, validation call added)

---

## Purpose

This document defines the operating partnership between SeedLink and Veteran Vectors across two distinct engagement models:

1. **Track A — Modular Builds**: Individual module builds (LinkedIn Outreach, Content Creation, Email Automation, SEO/GEO) for SMB clients who purchase through SeedLink's website or referral pipeline. These are standardized, repeatable engagements.

2. **Track B — White Label Platform Build**: The productization of SeedLink's automation infrastructure into a self-serve or semi-serve SaaS product that clients buy directly from SeedLink. VV builds and maintains the platform under SeedLink's brand.

Both tracks operate simultaneously. Track A generates revenue now while Track B builds toward mid-year scale.

### Partner Roles

SeedLink operates with multiple specialized partners. VV's role is as the **Growth Partner** — responsible for technical delivery of automation builds (LinkedIn outreach, content engine, email, SEO/AEO). Other SeedLink partners handle different functions:

| Partner Role | Scope | Status |
|-------------|-------|--------|
| **Build Partner** | Framer websites, design, end-to-end AI product development | Active (separate dev partner) |
| **Launch Partner** | Product Hunt, press releases, Forbes/media placement | In discussion |
| **Growth Partner (VV)** | Automation builds, content engine, outreach, SEO/AEO | Active (this agreement) |
| **Scale Partner** | Meta ads, LinkedIn ads, paid acquisition at scale | TBD |

**SeedLink handles all sales, marketing, and client acquisition.** VV does not source or market to clients. Shilpa conducts pre-sale pitches, accelerator network outreach, and a validation call with each client before handing off to VV for the technical build.

---

# PART 1: TRACK A — MODULAR BUILDS

## 1.1 What This Covers

SMB clients purchase individual automation modules directly through SeedLink's website or via SeedLink referrals. VV delivers the build. SeedLink handles sales, client communication pre-sale, and ongoing relationship. VV handles technical delivery, handoff, and Lite Support.

---

## 1.2 Scope of Work — SeedLink Responsibilities

SeedLink is responsible for everything before the build and the ongoing client relationship after the build. SeedLink does not perform any technical delivery work.

### Pre-Sale (100% SeedLink)

| Responsibility | Description |
|---------------|-------------|
| **Brand & marketing** | Maintain seedlink.app, write sales copy, produce marketing content, manage social presence |
| **Lead generation** | Source clients via Founders Creative accelerator network, inbound marketing, partnerships, referrals |
| **Sales conversations** | Conduct all pre-sale calls, demos, and pitches. VV is never on sales calls |
| **Pricing & packaging** | Set and communicate pricing to clients. VV does not discuss pricing with clients |
| **Stripe & billing** | Maintain Stripe Connect platform, process payments, manage refunds/disputes |
| **Validation call** | Conduct 15-min post-purchase validation call with each client before questionnaire |

### Post-Sale (Shared — SeedLink Owns Relationship)

| Responsibility | Description |
|---------------|-------------|
| **Client relationship** | Primary point of contact for client relationship issues, complaints, account management |
| **Questionnaire management** | Maintain and distribute the onboarding questionnaire (Typeform/Google Form) |
| **Financial reporting** | Maintain shared Sales Pipeline sheet; provide VV with monthly revenue summaries |
| **Upsell / expansion** | Identify and pitch upsell opportunities (additional modules, package upgrades) to existing clients |
| **Client communication (non-technical)** | Handle billing questions, scheduling, general inquiries |
| **Lite Support billing** | Process monthly Lite Support subscriptions via Stripe (automated) |

### What SeedLink Does NOT Do

- SeedLink does not build, configure, or maintain n8n workflows
- SeedLink does not write or edit system prompts
- SeedLink does not provide technical support to clients
- SeedLink does not conduct handoff calls (optional attendance only)
- SeedLink does not perform Lite Support work (monitoring, optimization, troubleshooting)

---

## 1.3 Scope of Work — Veteran Vectors Responsibilities

VV is responsible for all technical delivery, from the moment a completed questionnaire arrives through build completion, handoff, monitoring, and ongoing Lite Support.

### Build Phase (100% VV)

| Responsibility | Description |
|---------------|-------------|
| **Environment setup** | Set client-specific n8n environment variables, import and configure workflows per purchased modules |
| **Workflow configuration** | Customize all workflow nodes for client's platforms, CRM, CMS, and accounts |
| **Prompt engineering** | Write and tune all Claude API system prompts using client's voice profile, content pillars, and ICP |
| **Voice Profile generation** | Run Voice Builder or Voice Extractor to produce the client's Voice Profile |
| **Google Sheet setup** | Clone template, configure Settings tab, populate Voice Profile tab |
| **Integration testing** | End-to-end test of every workflow; validate data flows across all connected platforms |
| **Documentation** | Produce client-specific setup guide and handoff documentation |

### Handoff & Monitoring (100% VV)

| Responsibility | Description |
|---------------|-------------|
| **Handoff call** | Conduct 30-min client walkthrough of all delivered systems (SeedLink optional) |
| **2-week monitoring** | Monitor all workflows for errors, review first content outputs, tune prompts as needed |
| **Voice calibration** | Run calibration loop during monitoring (up to 2 rounds; voice alignment call if needed) |
| **Build-complete notification** | Fire build-complete webhook to trigger automated client email and Sales Pipeline update |

### Lite Support (100% VV Delivery — See Section 1.6 for Detail)

| Responsibility | Description |
|---------------|-------------|
| **Performance monitoring** | Weekly check on workflow health, error rates, content quality |
| **Keyword & prompt refresh** | Monthly keyword updates, prompt tuning based on performance data |
| **Sequence optimization** | A/B test messaging, update sequences based on response patterns |
| **Technical troubleshooting** | Fix workflow failures, API changes, platform integration issues |
| **Client support (technical)** | Respond to client technical questions within 1 business day |
| **Monthly performance summary** | Provide brief performance update to client (email or Slack) |

### What VV Does NOT Do

- VV does not source, market to, or sell to clients
- VV does not set or negotiate pricing with clients
- VV does not handle billing, refunds, or payment disputes
- VV does not make product roadmap decisions unilaterally (provides input)
- VV does not manage client relationships outside of technical delivery and support

---

## 1.4 Service Catalog (Standard Packages)

These are the packages available for online purchase on seedlink.app:

| Module | Basic | Standard ★ |
|--------|-------|-----------|
| **A. LinkedIn Outreach** | $1,500 | $2,200 |
| **B. Content Creation** | $1,500 | $2,200 |
| **C. Email Automation** | $1,500 | $2,200 |
| **D. SEO/GEO Engine** | $1,500 | $2,200 |

> **Note:** Premium tier ($3,000) removed per Mar 9 call — fewer options, more streamlined. Standard ($2,200) is the recommended tier. If a client needs Premium-level scope, handle as a custom quote.

**Package pricing** (primary pricing — bundles complementary modules):

| Package | What's Included | Price |
|---------|----------------|-------|
| **Outreach Package** | LinkedIn (A) + Email (C) | **$2,500** |
| **Content Package** | Content (B) + SEO/GEO (D) | **$4,000** |
| **Full Stack** | All 4 modules | **$6,000** |

> Packages are the recommended purchase path. Individual modules available à la carte at Basic ($1,500) or Standard ($2,200) for clients who only need one system. Upgrade credit: clients who purchased à la carte can upgrade to a package and apply what they've paid toward the package price.

---

## 1.5 Deliverables by Module

These are the specific deliverables VV produces for each module. SeedLink provides the client questionnaire data, Voice Profile inputs, and access credentials. VV builds everything below.

### Module A — LinkedIn Outreach

| Deliverable | Basic | Standard |
|-------------|-------|----------|
| Prosp.AI setup & configuration | 1 account | 2 accounts |
| ICP list build & segmentation | 1 ICP | 2 ICPs |
| Connection request message templates | 3 variants | 5 variants |
| 5-touch follow-up sequences | 1 sequence | 2 sequences |
| Loom video framework & scripts | ✓ | ✓ |
| Calendly integration | ✓ | ✓ |
| LinkedIn profile optimization guide | ✓ | ✓ |
| CRM integration (if applicable) | Basic | Advanced |
| n8n response-handler workflow | ✓ | ✓ |
| Google Sheet tracking dashboard | ✓ | ✓ |
| 2 training sessions (30 min each) | ✓ | ✓ |
| Handoff documentation | ✓ | ✓ |

### Module B — Content Creation

| Deliverable | Basic | Standard |
|-------------|-------|----------|
| Content pillars configured | 1 pillar | 2 pillars |
| Blog posts/month (automated) | 4 | 8 |
| Voice Profile (generated or extracted) | ✓ | ✓ |
| Editorial calendar (Google Sheet) | ✓ | ✓ |
| n8n content-pipeline-main workflow | ✓ | ✓ |
| n8n social-derivation workflow | Blog-to-social | Blog-to-social + standalone |
| n8n editorial-calendar-manager workflow | ✓ | ✓ |
| Claude system prompts (brief, writer, reviewer) | ✓ | ✓ |
| Platform publishing | 1 platform | 2 platforms (LinkedIn + blog) |
| Human approval workflow (email/Slack) | ✓ | ✓ |
| Handoff documentation | ✓ | ✓ |

### Module C — Email Automation

| Deliverable | Basic | Standard |
|-------------|-------|----------|
| Email sequences | 2 sequences | 4 sequences |
| Emails per sequence | 3–5 | 5–7 |
| CRM/trigger integration | 1 CRM | Advanced (multi-trigger) |
| Subject line variants | 2 per email | 3 per email |
| Personalization tokens | Basic (name, company) | Advanced (role, industry, behavior) |
| n8n email orchestration workflow | ✓ | ✓ |
| Response classification workflow | ✓ | ✓ |
| Performance tracking dashboard | ✓ | ✓ |
| Handoff documentation | ✓ | ✓ |

### Module D — SEO/GEO Engine

| Deliverable | Basic | Standard |
|-------------|-------|----------|
| Content pillars configured | 1 pillar | 2 pillars |
| Posts optimized/month | 4 | 8 |
| Meta title & description generation | ✓ | ✓ |
| JSON-LD schema markup | — | ✓ |
| AEO optimization (AI-citable structure) | ✓ | ✓ |
| Internal link suggestion engine | ✓ | ✓ |
| n8n seo-content-optimizer workflow | ✓ | ✓ |
| CMS integration (WordPress/Ghost/Webflow) | — | ✓ |
| Weekly performance report workflow | — | ✓ |
| Keyword tracking setup | ✓ | ✓ |
| Handoff documentation | ✓ | ✓ |

### Package Deliverables

Packages include all deliverables from their component modules, plus integration work:

| Package | Component Modules | Additional Integration Deliverables |
|---------|-------------------|-------------------------------------|
| **Outreach ($2,500)** | LinkedIn (A) + Email (C) | Shared CRM pipeline: LinkedIn connections auto-feed into email sequences; unified response tracking; single performance dashboard across both channels |
| **Content ($4,000)** | Content (B) + SEO/GEO (D) | Unified content pipeline: posts are written and SEO-optimized in a single workflow pass; shared editorial calendar; combined performance reporting |
| **Full Stack ($6,000)** | All 4 modules (A+B+C+D) | Cross-channel integration: LinkedIn outreach feeds email nurture; content pipeline feeds social + SEO; single editorial calendar manages all channels; unified analytics dashboard; shared CRM across outreach + content |

---

## 1.6 Lite Support — Monthly Retainer

Lite Support is the optional monthly retainer offered to clients after their 2-week monitoring period ends. **VV performs 100% of Lite Support delivery work.** SeedLink handles billing only (automated via Stripe).

### What Lite Support Includes

| Service | Frequency | Description |
|---------|-----------|-------------|
| **Workflow health monitoring** | Weekly | Check for errors, failed executions, API issues across all active workflows |
| **Prompt tuning** | Monthly | Review content quality, adjust system prompts based on performance and client feedback |
| **Keyword refresh** (Content/SEO modules) | Monthly | Update target keywords based on search trends, refresh editorial calendar topics |
| **Sequence optimization** (LinkedIn/Email modules) | Monthly | Review response rates, update messaging, A/B test new variants |
| **Technical troubleshooting** | As needed | Fix workflow failures, handle API changes, resolve integration issues |
| **Client technical support** | As needed | Respond to client questions within 1 business day (email or Slack) |
| **Performance summary** | Monthly | Brief email/Slack update to client with key metrics and any changes made |

### Hour Cap

Lite Support is capped at **5 hours per module per month**. Work beyond 5 hours is billed as a change order at $75/hr (same 90/10 split as Lite Support).

### Lite Support Pricing

| Module | Monthly Price |
|--------|-------------|
| LinkedIn | $250/mo |
| Content | $350/mo |
| Email | $350/mo |
| SEO/GEO | $350/mo |
| Multi-module discount (3+) | 10% off total |

### Lite Support — What Each Party Does

| Task | SeedLink | VV |
|------|----------|-----|
| Bill client monthly (Stripe auto-charge) | ✓ | |
| Forward client billing questions | ✓ | |
| Perform all monitoring & optimization work | | ✓ |
| Communicate with client on technical matters | | ✓ |
| Provide monthly performance summary to client | | ✓ |
| Troubleshoot and fix issues | | ✓ |
| Escalate client relationship issues (cancellation, complaints) | ✓ | |
| Recommend upsells (additional modules, package upgrade) | ✓ | Flags opportunities to SeedLink |

---

## 1.7 Revenue Split — Modular Builds

| Component | SeedLink | Veteran Vectors |
|-----------|----------|----------------|
| **Build fees** (one-time) | 25% commission | 75% delivery revenue |
| **Lite Support** (monthly) | 10% (billing only) | 90% (all delivery work) |
| **Paid Assessment** ($750–$1,000) | 25% | 75% |
| **Change orders** | 25% | 75% |
| **Lite Support overages** ($75/hr beyond cap) | 10% | 90% |

> **Lite Support split rationale:** On one-time builds, SeedLink earns 25% for active work — client acquisition, sales, validation, and brand. On Lite Support, SeedLink's ongoing contribution is limited to processing an automated Stripe subscription. VV performs all monitoring, optimization, troubleshooting, and client support (3–5 hours/month per module). The 90/10 split reflects the actual labor distribution.

**Payment terms (Stripe Connect — automatic split):**
- All client payments processed through Stripe Connect
- Stripe automatically splits each payment: 75% to VV connected account, 25% to SeedLink platform account
- Stripe Connect configured with a 1-business-day payout delay: payment lands in SeedLink's account first (Day 0), then auto-splits to VV on Day 1. This allows SeedLink to log revenue before the split occurs (important for investor reporting).
- Both parties have real-time visibility into all transactions via their respective Stripe dashboards
- Stripe processing fees (2.9% + $0.30) absorbed proportionally: 75% by VV, 25% by SeedLink
- For Lite Support subscriptions: Stripe auto-splits each monthly recurring charge at 90% VV / 10% SeedLink (see Section 1.6)
- No manual invoicing required — Stripe handles all payment routing automatically
- If Stripe Connect is temporarily unavailable: SeedLink pays VV within 3 business days of client payment clearing, with Stripe receipt forwarded as proof of payment

**Payment protection:**
- VV has real-time access to all transaction data via Stripe Connected Account dashboard
- Payout delay: Stripe Connect configured with 1-business-day delay so SeedLink records revenue before split
- If any payment is more than 5 business days late (non-Connect fallback): VV may pause accepting new builds until resolved
- VV may request Stripe transaction export quarterly to verify accuracy
- VV retains IP rights on all deliverables until payment clears (per Section 1.15)

**Example — Outreach Package ($2,500):**
- Client pays: $2,500.00
- Stripe fee: -$72.80 (2.9% + $0.30)
- Net to split: $2,427.20
  - VV receives (75%): $1,820.40 (auto-deposited 1 business day after payment)
  - SeedLink retains (25%): $606.80 (deposited same day as payment)

**Example — Full Stack Package ($6,000):**
- Client pays: $6,000.00
- Stripe fee: -$174.30 (2.9% + $0.30)
- Net to split: $5,825.70
  - VV receives (75%): $4,369.28 (auto-deposited 1 business day after payment)
  - SeedLink retains (25%): $1,456.43 (deposited same day as payment)

**Shared financial dashboard:**
- Both parties maintain access to a shared Sales Pipeline Google Sheet (see `sales-pipeline-template.md`)
- Auto-populated by the `client-onboarding-orchestrator.json` workflow on every new sale
- Tracks: client name, modules, tier, amount paid, VV payout, SeedLink commission, build status, Lite Support status
- Revenue Summary tab auto-calculates totals, pending payouts, MRR, and monthly breakdown

---

## 1.8 Client Purchase Flow (Online)

Each step has a clear owner. This flow applies to all online purchases via seedlink.app.

| Step | Owner | What Happens |
|------|-------|-------------|
| **1. Discovery** | **SEEDLINK** | Client visits seedlink.app/automation. SeedLink's website, copy, and sales funnel drive the visit. |
| **2. Selection** | **CLIENT** | Client selects package or à la carte module(s) and tier. |
| **3. Payment** | **SEEDLINK (Stripe)** | Client completes purchase via Stripe checkout. Stripe Connect auto-splits: 75% VV / 25% SeedLink (builds) or 90% VV / 10% SeedLink (Lite Support). |
| **4. Post-purchase automation** | **AUTOMATED** | `client-onboarding-orchestrator.json` fires: (a) logs sale to Sales Pipeline, (b) sends confirmation email with questionnaire link, (c) notifies VV via Slack with purchase details + payout amount. |
| **5. Validation call** | **SEEDLINK** | Shilpa conducts ~15 min call with client. Not a sales call — confirms requirements, reviews questionnaire expectations, sets build timeline expectations. |
| **6. Questionnaire** | **CLIENT** | Client completes onboarding questionnaire (15–25 min). Covers: business info, voice samples or Voice Builder, content pillars, ICP, platforms, CMS, CRM, LinkedIn accounts, goals. |
| **7. Onboarding automation** | **AUTOMATED** | Orchestrator fires: (a) validates data, (b) clones Google Sheet → creates client Content Hub, (c) populates Settings tab, (d) triggers Voice Profile Generator, (e) generates client config via Claude, (f) updates Sales Pipeline, (g) sends "build started" email, (h) notifies VV with full brief + sheet URL + action items. |
| **8. Build acknowledgment** | **VV** | VV acknowledges within 24 hours. Reviews auto-generated config, sets up n8n env vars, imports workflows, begins build. |
| **9. Technical build** | **VV** | VV builds all deliverables per module spec (Section 1.5). Configures workflows, writes prompts, integrates platforms, runs end-to-end tests. See Section 1.9 for timelines. |
| **10. Build-complete automation** | **AUTOMATED** | VV fires build-complete webhook → orchestrator: (a) updates Sales Pipeline to "Build Complete — Monitoring", (b) emails client handoff booking link, (c) notifies Slack. |
| **11. Handoff call** | **VV** | VV conducts 30-min handoff call with client. Walks through all systems, answers questions, provides documentation. SeedLink attendance optional. |
| **12. Monitoring** | **VV** | 2-week monitoring period. VV monitors workflows, reviews first content outputs, runs Voice Calibration if applicable. |
| **13. Lite Support offer** | **AUTOMATED** | Orchestrator detects monitoring end: (a) sends Lite Support offer email, (b) updates Sales Pipeline, (c) notifies Slack. |
| **14. Ongoing support** | **VV (delivery) / SEEDLINK (billing)** | If client opts into Lite Support: VV performs all monthly work (Section 1.6). SeedLink processes Stripe subscription. |

---

## 1.9 Delivery Timelines — Modular Builds

| Tier | Build Time | Monitoring | Total |
|------|-----------|------------|-------|
| Paid Assessment | 3–5 business days | N/A | 3–5 days |
| Basic (single module) | 5–7 business days | 2 weeks | ~3 weeks |
| Standard (single module) | 7–10 business days | 2 weeks | ~4 weeks |
| Outreach Package | 10–15 business days | 2 weeks | ~5 weeks |
| Content Package | 15–20 business days | 2 weeks | ~6 weeks |
| Full Stack | 20–25 business days | 2 weeks | ~7 weeks |

**SLA:** VV will acknowledge new builds within 24 hours and begin work within 48 hours of receiving the completed questionnaire.

---

## 1.10 Scope & Change Orders

Each module tier has defined deliverables (per the Mavera proposal and template docs). Anything outside the defined scope requires a change order.

**Change order process:**
1. Client requests additional work (extra sequences, additional pillars, custom CRM integration, etc.)
2. VV scopes the work and estimates hours
3. VV sends scope + quote to SeedLink
4. SeedLink approves and communicates to client
5. Client pays for change order via SeedLink
6. Same 75/25 split applies

**Standard change order rates:**
- Additional LinkedIn account: $500
- Additional content pillar: $400
- Additional email sequence: $350
- Custom CRM integration (non-standard): $500–$1,500
- Additional platform integration: $400–$800

---

## 1.11 Communication Protocol — Modular Builds

| Channel | Purpose | Participants |
|---------|---------|-------------|
| **Slack channel** (shared) | Day-to-day coordination, build updates, client handoff scheduling | SeedLink + VV |
| **Email** | Formal communications, invoicing, client introductions | SeedLink + VV |
| **Client onboarding call** | 30-min kickoff after questionnaire | VV + Client (SeedLink optional) |
| **Client handoff call** | 30-min training + walkthrough after build | VV + Client (SeedLink optional) |
| **Weekly sync** (if volume warrants) | Pipeline review, capacity planning, issue resolution | SeedLink + VV |

**Escalation path:**
- Client support issue → VV (during monitoring / Lite Support)
- Client relationship issue → SeedLink
- Scope dispute → SeedLink + VV jointly
- Technical emergency (workflow down) → VV direct, notify SeedLink

**Client communication rules:**
- SeedLink owns the client relationship and brand experience
- VV communicates with clients as "the SeedLink automation team" or under VV's own brand (to be decided — see Section 1.8)
- VV does not solicit SeedLink clients for separate engagements
- SeedLink does not engage alternative delivery partners for services VV is contracted to deliver without prior discussion

---

## 1.12 Branding — Modular Builds

**Two options (to be decided on partnership call):**

| Option | How It Works | Pros | Cons |
|--------|-------------|------|------|
| **A. Co-branded** | "Delivered by Veteran Vectors, powered by SeedLink" | VV builds own reputation, natural referral source | Less "SeedLink product" feel |
| **B. White-labeled under SeedLink** | VV operates as SeedLink's delivery team | Seamless client experience | VV gets no brand visibility |

**Recommendation:** Option A for modular builds (co-branded). This lets VV build reputation while SeedLink maintains the client relationship. Reserve Option B for the white label platform (Track B).

---

## 1.13 Quality Standards

Every modular build must include:

- [ ] All workflow JSONs valid and importable to n8n
- [ ] All system prompts fully written (no placeholders)
- [ ] Google Sheets template cloned and configured for client
- [ ] Settings sheet populated with client-specific values
- [ ] Voice Profile generated and stored (if Voice Builder path) — see Section 4.5
- [ ] Voice Profile calibrated and locked after monitoring (if Voice Builder path)
- [ ] All credentials configured using client's own accounts
- [ ] End-to-end test of every workflow
- [ ] Handoff documentation (setup guide customized for client)
- [ ] 30-minute handoff call with client
- [ ] Slack/email notification that build is complete (to SeedLink)

---

## 1.14 Capacity & Scaling

| Volume | VV Capacity | Action Needed |
|--------|------------|---------------|
| 1–3 builds/month | Comfortable | Current model works |
| 4–5 builds/month | At capacity | VV flags SeedLink; discuss timeline extensions or subcontracting |
| 6+ builds/month | Over capacity | VV brings on additional delivery resources (at VV's discretion); or SeedLink + VV jointly source additional contractors |

**Key commitment:** VV will proactively flag capacity constraints at least 2 weeks before they impact delivery timelines.

---

## 1.15 Intellectual Property — Modular Builds

| Asset | Ownership |
|-------|----------|
| **Workflow JSON files** | Licensed to client for use on their own n8n instance. VV retains right to reuse workflow patterns (not client-specific configurations) across other clients |
| **System prompts** | Licensed to client. VV retains right to reuse prompt templates (not client-specific voice/brand content) |
| **Client-specific configurations** (voice guidelines, content pillars, ICP data) | Client owns |
| **Onboarding questionnaire design** | SeedLink owns |
| **Template library** (workflow templates, prompt templates) | Joint — both parties may use and iterate |
| **SeedLink website, landing pages, sales materials** | SeedLink owns |

---

## 1.16 Term & Termination — Modular Builds

- **Term:** Ongoing, month-to-month, no minimum commitment
- **Termination by either party:** 30 days written notice
- **Active builds at termination:** VV completes all builds that are paid and in progress
- **Lite Support clients at termination:** 60-day transition period for VV to hand off documentation and credentials to SeedLink or successor
- **Non-compete:** Neither party is restricted from working with competitors, but neither party will solicit the other's clients for 12 months after termination
- **Non-solicitation:** Neither party will recruit the other's employees or contractors for 12 months after termination

---

---

# PART 2: TRACK B — WHITE LABEL PLATFORM BUILD

## 2.1 What This Covers

SeedLink wants to productize the modular automation system into a platform that clients can purchase and access directly through seedlink.app — eventually with self-serve onboarding, a client dashboard, and automated billing. This is the "SeedLink Content Engine" (or similar product name).

This is a fundamentally different engagement from modular builds:
- **Modular builds** are repeated services — each client is a separate project
- **White label platform** is a product build — one system that serves many clients

The white label build is significantly more intensive: it involves multi-tenant architecture, a web application, billing integration, onboarding automation, and ongoing platform maintenance.

---

## 2.2 Platform Scope — What Gets Built

Based on the SAAS_IMPLEMENTATION_PLAN.md and CEO direction, the white label build includes:

### Phase 1: Productization Layer (Target: Mid-Year 2026)

| Component | Description | Effort |
|-----------|-------------|--------|
| **Onboarding automation** | Typeform/Google Form → auto-clone Google Sheet → populate Settings tab → configure workflows | 3–5 days |
| **Parameterized prompt templates** | Voice, content, SEO prompts become templates with `{{brand_name}}`, `{{voice_style}}` etc. | 2–3 days |
| **Clone-and-configure script** | Takes questionnaire output, creates full client environment automatically | 3–5 days |
| **Multi-client n8n environment** | Separate env vars per client, workflow execution tagged with client ID | 2–3 days |
| **Landing page + pricing page** | On seedlink.app — intake form, pricing, social proof, Stripe checkout | 2–3 days |
| **Stripe integration** | Payment collection for standard packages, subscription billing for Lite Support | 2–3 days |
| **Client portal (basic)** | Simple dashboard where clients can view content status, approve drafts, see analytics | 5–10 days |

**Estimated total Phase 1: 19–32 days of development (~$12,000–$20,000)**

### Phase 2: Full Platform (Target: Q3–Q4 2026)

| Component | Description | Effort |
|-----------|-------------|--------|
| **Web application** (Next.js) | Full client dashboard — content approval, analytics, settings, team management | 8–12 weeks |
| **Auth + tenant management** | Clerk integration, per-client orgs, team member invites | 1–2 weeks |
| **Content approval UI** | View AI drafts, edit inline, approve/reject, request revision | 2–3 weeks |
| **Settings & configuration panel** | Brand voice, content pillars, connected platforms, notification prefs | 1–2 weeks |
| **Platform connection wizard** | OAuth flows for Google Sheets, Buffer, Slack; API key input for Claude | 2–3 weeks |
| **Analytics dashboard** | Content performance, social engagement, publishing cadence | 2–3 weeks |
| **Billing integration** | Stripe subscriptions, plan enforcement, usage display | 1–2 weeks |
| **Self-serve onboarding wizard** | Guided setup: brand info → voice calibration (Voice Builder UI for new clients, content upload for existing brands — both paths per Section 4.5) → platform connections → first content | 1–2 weeks |

**Estimated total Phase 2: 18–30 weeks of development (~$25,000–$45,000)**

---

## 2.3 Revenue Split — White Label Platform

The white label platform is a different economic model than modular builds. VV is building a product, not delivering a service. The terms reflect this:

### Option A: Fixed-Fee Build + Revenue Share

| Component | Terms |
|-----------|-------|
| **Phase 1 build fee** | $12,000–$20,000 (fixed price, paid in milestones) |
| **Phase 2 build fee** | $25,000–$45,000 (fixed price, paid in milestones) |
| **Ongoing platform revenue share** | VV receives 20–25% of platform subscription revenue (MRR from clients using the SeedLink Content Engine) |
| **Ongoing maintenance** | VV provides platform maintenance, bug fixes, and minor feature updates for 10 hours/month included in revenue share |
| **Major feature development** | Scoped and priced separately per feature |

**Milestone payment schedule (Phase 1):**

| Milestone | Payment | Trigger |
|-----------|---------|---------|
| M1: Kickoff | 30% | Signed agreement + project start |
| M2: Onboarding automation + templates | 30% | Demo of working onboarding flow |
| M3: Landing page + Stripe + basic portal | 30% | Demo of end-to-end purchase + onboarding |
| M4: Launch | 10% | First client successfully onboarded through the system |

### Option B: Reduced Build Fee + Higher Revenue Share

| Component | Terms |
|-----------|-------|
| **Phase 1 build fee** | $6,000–$10,000 (50% discount on build) |
| **Phase 2 build fee** | $15,000–$25,000 (40% discount on build) |
| **Ongoing platform revenue share** | VV receives 35–40% of platform subscription revenue |
| **Maintenance** | Same as Option A |

**Option B rationale:** VV takes more risk upfront (lower guaranteed revenue) in exchange for higher upside as the platform scales. This option works better if both parties are confident in the growth trajectory.

### Option C: Equity/Partnership (Advanced — Discuss on Call)

If both parties want deeper alignment, a formal partnership structure with equity in the platform entity could be explored. This would require legal counsel and is out of scope for this initial agreement.

**Recommendation:** Start with Option A. It's clean, transparent, and gives both parties a fair deal. Revisit revenue share percentages after 6 months of platform operation.

---

## 2.4 Platform Pricing (What Clients Pay SeedLink)

Based on the SAAS Implementation Plan and CEO direction:

| Tier | Monthly Price | Target Client | Included |
|------|-------------|---------------|----------|
| **Starter** | $197/mo | Solopreneurs, early startups | 4 blog posts/mo, LinkedIn + X derivation, editorial calendar, Slack notifications |
| **Growth** | $397/mo | Funded startups, SMBs | 8 blog posts/mo, all Starter + multi-account LinkedIn, weekly analytics |
| **Scale** | $697/mo | Agencies, multi-brand | 16 blog posts/mo, all Growth + white-label, custom voice, API access |
| **Enterprise** | Custom | Large orgs | Custom volume, SLA, dedicated infrastructure |

**Setup fees** (one-time, in addition to subscription):

| Tier | Setup Fee |
|------|-----------|
| Starter | $500 |
| Growth | $1,000 |
| Scale | $2,000 |

**Revenue share example — Option A at Growth tier ($397/mo):**
- SeedLink retains: $298–$318/mo (75–80%)
- VV receives: $79–$99/mo (20–25%)
- At 25 clients: VV earns $1,975–$2,475/mo recurring from platform alone (on top of modular build revenue)

---

## 2.5 Timeline — White Label Platform

| Phase | Start | Target Complete | Key Deliverable |
|-------|-------|----------------|-----------------|
| Phase 1: Productization | April 2026 | June 2026 | Clients can purchase standard packages online, auto-onboarding, basic portal |
| Phase 2: Full Platform | July 2026 | December 2026 | Full web dashboard, self-serve onboarding, analytics, billing |

**Mid-year readiness target (CEO direction):** By June 2026, SeedLink should be able to process online purchases, auto-onboard clients, and handle 10+ concurrent clients without manual intervention for each build.

---

## 2.6 Communication Protocol — White Label Build

| Channel | Purpose | Frequency |
|---------|---------|-----------|
| **Slack channel** (dedicated #seedlink-platform) | Daily coordination, questions, blockers | Ongoing |
| **Weekly sprint review** | Demo progress, review priorities, plan next sprint | Weekly (30 min) |
| **Milestone review** | Formal demo at each milestone, payment trigger | Per milestone |
| **Monthly strategy sync** | Roadmap review, client feedback, feature prioritization | Monthly (45 min) |

---

## 2.7 Intellectual Property — White Label Platform

| Asset | Ownership |
|-------|----------|
| **Platform source code** (Next.js app, API layer) | SeedLink owns. VV has perpetual license to reuse non-SeedLink-branded components for other projects |
| **n8n workflow templates** (parameterized) | Joint — both parties retain right to use |
| **System prompt templates** | Joint — both parties retain right to use |
| **SeedLink brand, domain, trademarks** | SeedLink owns exclusively |
| **Client data** (content, analytics, credentials) | Client owns; SeedLink is data processor |
| **Architecture documentation** | Joint |
| **Infrastructure configurations** (Docker, deployment scripts) | VV retains for reuse; SeedLink has perpetual license |

---

## 2.8 Platform Maintenance & Support

| Service | Included in Revenue Share | Additional Cost |
|---------|--------------------------|-----------------|
| Bug fixes (critical) | Yes — within 24 hours | — |
| Bug fixes (non-critical) | Yes — within 1 week | — |
| Minor updates (prompt tuning, workflow adjustments) | Yes — up to 10 hrs/month | — |
| Security patches | Yes | — |
| Major feature development | No | Scoped + quoted separately |
| Platform scaling (infrastructure changes for 50+ clients) | No | Scoped + quoted separately |
| Emergency support (platform down) | Yes — 4-hour response SLA | — |

---

## 2.9 Term & Termination — White Label Platform

- **Term:** 12-month initial term, auto-renews annually
- **Termination by either party:** 90 days written notice (longer than modular builds due to platform dependency)
- **Transition support at termination:** VV provides 90 days of transition support including:
  - Full documentation handoff
  - Knowledge transfer sessions (up to 10 hours)
  - Source code and deployment guide
  - Introduction to recommended successor if requested
- **Revenue share post-termination:** Ends 90 days after termination notice
- **Non-compete:** VV will not build a competing platform (AI content automation SaaS with the same feature set) for 12 months after termination. VV may continue modular/custom builds for other clients.
- **Source code escrow (optional):** If SeedLink wants additional protection, both parties can agree to a source code escrow arrangement

---

---

# PART 3: SHARED TERMS

## 3.1 Independent Contractor Relationship

- Both parties operate as independent contractors. Nothing in this agreement creates an employment, agency, joint venture, or formal partnership (in the legal sense) between the parties.
- Each party is responsible for their own taxes, benefits, insurance, and business expenses.
- Neither party has authority to bind the other to contracts, obligations, or commitments without prior written consent.
- VV may engage subcontractors for delivery work at VV's discretion, provided subcontractors are bound by equivalent confidentiality and quality obligations. VV remains responsible for all deliverables regardless of subcontractor involvement.

---

## 3.2 Confidentiality

Both parties agree to:
- Keep all client data, pricing details, revenue figures, internal strategy documents, and the terms of this agreement confidential
- Not disclose partnership terms to third parties without written consent (exception: legal/financial advisors, accountants, and potential investors under NDA)
- Return or destroy confidential materials within 30 days of termination
- Not use the other party's confidential information for any purpose outside this agreement

**Scope:** Confidentiality covers: client lists, revenue data, pricing strategy, system prompts, workflow architectures, Voice Profiles, partnership financials, and all documents marked "Confidential."

**Exclusions:** Information that is (a) publicly available through no fault of the receiving party, (b) independently developed, or (c) lawfully obtained from a third party.

**Duration:** Confidentiality obligations survive **24 months** after termination.

---

## 3.3 Representations & Warranties

**Both parties represent and warrant that:**
- They have full authority to enter into this agreement
- They will perform their obligations in a professional and workmanlike manner
- They will comply with all applicable laws and regulations in the performance of their obligations
- They will not knowingly introduce security vulnerabilities, malware, or unauthorized access points into any deliverables

**SeedLink additionally warrants that:**
- SeedLink has the right to operate the seedlink.app platform and sell the services described herein
- SeedLink will maintain valid Stripe Connect platform status throughout the term
- SeedLink will process all client payments through the agreed Stripe Connect configuration and will not redirect, delay, or withhold VV's split beyond the agreed 1-business-day payout delay
- SeedLink will provide VV with accurate client information necessary for delivery

**VV additionally warrants that:**
- VV has the technical capability to deliver the services described in Sections 1.3 and 1.5
- All deliverables will be original work or properly licensed; VV will not infringe third-party IP
- VV will maintain the quality standards defined in Section 1.13 for every client build
- VV will meet the SLA commitments defined in Section 1.9 (24-hour acknowledgment, 48-hour build start)

---

## 3.4 Indemnification

**VV indemnifies SeedLink** against claims arising from:
- Defective deliverables that cause client harm (e.g., workflow malfunction that sends unauthorized communications)
- IP infringement in VV's original work product
- VV's breach of confidentiality obligations

**SeedLink indemnifies VV** against claims arising from:
- Misrepresentation of services to clients during the sales process
- Payment disputes caused by SeedLink's failure to configure or maintain Stripe Connect correctly
- Client claims arising from SeedLink's failure to perform its responsibilities (validation call, questionnaire, billing)
- SeedLink's breach of confidentiality obligations

**Indemnification limits:**
- Neither party's total liability under this agreement shall exceed the total fees paid/received under this agreement in the 12 months preceding the claim
- Neither party is liable for indirect, consequential, incidental, or lost-profit damages

---

## 3.5 Liability & Insurance

- Each party is responsible for their own professional liability
- VV carries professional liability insurance covering delivery work (or will obtain before exceeding 5 concurrent clients)
- SeedLink carries business liability insurance covering client relationships and platform operation
- **AI-generated content disclaimer:** Both parties acknowledge that AI outputs may contain errors. The human-in-the-loop review process mitigates but does not eliminate this risk. Client agreements must include content liability language. Neither party is liable to the other for client claims arising solely from AI-generated content that passed the human approval step.

---

## 3.6 Dispute Resolution

1. **Good faith discussion** between principals (Shilpa + Anthony) — 14 days
2. **Mediation** via mutually agreed mediator — 30 days
3. **Binding arbitration** — if mediation fails, per AAA Commercial Arbitration Rules

**Payment disputes:** If VV believes a Stripe split was processed incorrectly, VV may raise the issue in writing. SeedLink must respond with Stripe transaction records within 5 business days. If the discrepancy is confirmed, SeedLink corrects it within 3 business days. If SeedLink fails to respond or correct, VV may pause new builds per Section 1.7.

**Governing law:** State of [TO BE DETERMINED on partnership call]

---

## 3.7 Third-Party Tool Dependencies

Both parties acknowledge:
- The entire service relies on third-party tools (n8n, Claude API, Buffer, Prosp.AI, etc.)
- Pricing changes, API deprecation, or service discontinuation by any third-party vendor is outside both parties' control
- Both parties will monitor tool dependencies and proactively communicate changes that affect delivery or pricing
- Neither party is liable for service disruptions caused by third-party tool failures
- If a third-party tool cost increase materially affects delivery economics (>20% increase), both parties will renegotiate affected pricing within 30 days

---

## 3.8 Force Majeure

Neither party is liable for delays or failures caused by events beyond reasonable control, including: natural disasters, government actions, internet/infrastructure outages, third-party platform outages (Stripe, n8n cloud, Anthropic API), pandemics, or acts of war.

**Obligations during force majeure:**
- The affected party must notify the other within 48 hours
- Both parties must make reasonable efforts to mitigate impact
- If a force majeure event lasts more than 30 days, either party may terminate affected engagements without penalty
- Client builds already paid for will be completed once the force majeure event resolves, or refunded if completion is no longer feasible

---

## 3.9 Data Processing

- SeedLink is the data controller for client data
- VV is a data processor acting on SeedLink's behalf
- VV will not use client data for any purpose other than delivering the contracted services
- VV will follow reasonable data security practices (encrypted credential storage, no plaintext API keys, access controls)
- VV will notify SeedLink within 48 hours of discovering any data breach affecting client data
- For EU-targeting clients: both parties will execute a Data Processing Agreement (DPA) per GDPR requirements

---

## 3.10 Amendments

- This agreement may only be amended in writing, signed (or acknowledged in writing, e.g., email confirmation) by both parties
- Verbal agreements or informal Slack messages do not constitute amendments
- Material changes to revenue split, pricing, scope of work, or termination terms require a formal amendment with 14 days notice before taking effect
- Minor operational changes (e.g., tool substitutions, process improvements) may be agreed via email and documented in the next formal revision

---

## 3.11 Entire Agreement

This document, together with any written amendments, constitutes the entire agreement between the parties regarding the subject matter herein. It supersedes all prior discussions, proposals, and draft documents (including earlier versions of this agreement, call transcripts, and informal commitments).

---

# PART 4: SEEDLINK IMPLEMENTATION GUIDE (NON-TECHNICAL)

*This section is for Shilpa / the SeedLink team — what you need to set up on your side to start selling and processing modular builds online.*

---

## 4.1 Website Setup

**What to build on seedlink.app:**

### Landing Page: `/automation` or `/services`

Content structure:
1. **Hero:** "AI-Powered Growth Automation — Built Once, Owned by You"
2. **Problem statement:** "You're spending $3,500+/month on agencies. We build the system you own for a one-time fee."
3. **Module cards** (4 cards, one per module):
   - Module name + one-line description
   - "Starting at $1,500" with link to pricing
   - Key stat (e.g., "90% time saved" for LinkedIn, "88% cost reduction" for SEO)
4. **Package pricing** — Outreach ($2,500), Content ($4,000), Full Stack ($6,000)
5. **À la carte pricing** — Basic ($1,500) / Standard ($2,200) per module for single-module buyers
6. **Social proof** — Mavera case study (once available), testimonials
7. **FAQ section** — "What tools do I need?", "How long does it take?", "Do I own everything?"
8. **CTA:** "Get Started" → Stripe checkout or "Book a Call" → Calendly

### Stripe Checkout Integration

Set up Stripe products for:
- 3 packages: Outreach ($2,500), Content ($4,000), Full Stack ($6,000)
- 8 à la carte modules: 4 modules × 2 tiers (Basic/Standard)
- Lite Support subscriptions (4 products)
- Paid Assessment (1 product)

**Total: ~16 Stripe products.** Significantly simpler than the previous 29-product structure.

### Post-Purchase Automation

When a Stripe payment succeeds:
1. Send confirmation email (use Stripe's built-in receipts + a custom email via Mailchimp/Resend/Postmark)
2. Send link to onboarding questionnaire
3. Notify VV via Slack webhook or email automation
4. Log the sale in a tracking spreadsheet or CRM

**Tools needed:** Stripe ($0 — pay-as-you-go), email service (Resend free tier or Mailchimp), Zapier or n8n to connect Stripe → Slack notification.

---

## 4.2 Onboarding Questionnaire

Create a Typeform or Google Form with these fields:

**Section 1: Your Business**
- Company name
- Website URL
- What does your company do? (2–3 sentences)
- Target audience / ideal customer profile

**Section 2: Brand Voice** *(adaptive — see Voice Builder below)*
- Have you published content before? (Yes — I have blog posts, LinkedIn posts, or articles / No — I'm starting fresh)
- *(If Yes)* Share 3–5 links to content that sounds like your brand
- *(If No)* Voice Builder path activates — see Section 4.5
- How would you describe your brand voice? (dropdown: Professional, Casual, Technical, Founder-friendly, Academic, Other)
- Any words or phrases to always use? Any to avoid?

**Section 3: Content Strategy** (if Content/SEO modules purchased)
- What are your 3–5 main content themes or topics?
- Target keywords (if known)
- CMS platform (WordPress, Framer, Ghost, Webflow, Other)
- How many blog posts per month do you want?

**Section 4: Outreach** (if LinkedIn/Email modules purchased)
- LinkedIn profile URLs to activate
- Do you have a Prosp.AI account? (Yes/No/Not sure)
- CRM platform (HubSpot, Pipedrive, Salesforce, None, Other)
- Calendly or booking link URL

**Section 5: Platforms & Access**
- Which social platforms do you use? (checkboxes)
- Do you have a Buffer or Typefully account?
- Do you have an Anthropic (Claude API) account?
- Preferred notification channel (Slack, Email)

---

## 4.3 Internal Tracking

Set up a simple tracking system (Google Sheet or Airtable):

| Column | Purpose |
|--------|---------|
| Client Name | — |
| Date Purchased | — |
| Module(s) | A, B, C, D |
| Tier / Package | Basic / Standard / Outreach / Content / Full Stack |
| Amount Paid | — |
| VV Payout (75%) | Auto-calculated |
| SeedLink Commission (25%) | Auto-calculated |
| Questionnaire Received | Date |
| Build Started | Date |
| Build Delivered | Date |
| Handoff Complete | Date |
| Monitoring End | Date |
| Lite Support? | Yes/No |
| Lite Support Start | Date |
| Notes | — |

---

## 4.4 Client Communication Templates

### Email 1: Purchase Confirmation

> Subject: You're in — here's what happens next
>
> Hi [Name],
>
> Thanks for choosing SeedLink. Your [Module Name] automation build is confirmed.
>
> **What happens next:**
> 1. Complete the onboarding questionnaire (takes ~15 minutes): [LINK]
> 2. Our automation team will review your answers and kick off the build within 48 hours
> 3. You'll receive a build update within [5–10] business days
> 4. We'll schedule a 30-minute handoff call to walk you through everything
>
> **What you'll need ready:**
> - Your own accounts for: [list relevant tools based on module]
> - Access to your CMS (if applicable)
> - 30 minutes for the handoff call
>
> Questions? Reply to this email or book a quick call: [CALENDLY]
>
> — The SeedLink Team

### Email 2: Build Complete

> Subject: Your [Module Name] automation is ready
>
> Hi [Name],
>
> Your build is complete. Here's what's been configured:
> - [List of deliverables]
>
> **Next steps:**
> 1. Join our handoff call: [BOOKING LINK] (30 minutes)
> 2. We'll walk you through everything and answer questions
> 3. After handoff, we monitor everything for 2 weeks
>
> — The SeedLink Team

### Email 3: Lite Support Offer

> Subject: Keep your automation running at peak performance
>
> Hi [Name],
>
> Your 2-week monitoring period ends on [DATE]. Everything has been running smoothly.
>
> If you'd like ongoing optimization — keyword refreshes, sequence tuning, performance reviews, and priority support — our Lite Support plan is [$250–$350]/month. No lock-in, cancel anytime.
>
> Interested? Reply "yes" and we'll set it up.
>
> — The SeedLink Team

---

## 4.5 Voice Builder — For Clients Without Existing Content

Many early-stage founders have no blog posts, LinkedIn history, or documented brand voice to sample from. The Voice Builder replaces the "share 3–5 content links" requirement with a fully self-serve, automated flow that requires zero VV interaction.

### How It Works

The Voice Builder is embedded directly in the onboarding questionnaire. When a client selects "No — I'm starting fresh" in Section 2, the questionnaire branches into the Voice Builder path instead of asking for content links.

**Step 1: Voice Preference Picker (async, ~5 min)**

The questionnaire shows 5 pairs of short writing samples on the same topic (e.g., "announcing a product launch"). Each pair contrasts a voice dimension. The client picks which one sounds more like them.

| Pair | Dimension | Option A | Option B |
|------|-----------|----------|----------|
| 1 | Formality | Professional, polished | Casual, conversational |
| 2 | Technicality | Explains concepts simply | Assumes technical fluency |
| 3 | Energy | Measured, authoritative | High-energy, bold claims |
| 4 | Humor | Straight, no jokes | Dry wit, occasional humor |
| 5 | Perspective | Data-driven, evidence-first | Story-driven, anecdote-first |

Each sample pair is pre-written and stored in the Typeform/Google Form — no AI generation at intake time.

**Step 2: Reference Voices (~2 min)**

- "Name 1–3 founders, brands, or publications whose communication style you admire" (free text)
- "Pick your closest match" (dropdown with 8 archetypes):
  - Paul Graham (clear, essay-style, first principles)
  - Sahil Lavingia (casual, transparent, founder-diary)
  - Lenny Rachitsky (structured, data-informed, practical)
  - Alex Hormozi (direct, high-energy, action-oriented)
  - Julie Zhuo (thoughtful, design-thinking, reflective)
  - Naval Ravikant (concise, philosophical, contrarian)
  - Seth Godin (marketing-savvy, punchy, idea-driven)
  - Brené Brown (warm, vulnerability-forward, purpose-driven)

**Step 3: Quick-Fire Voice Questions (~3 min)**

Five short-answer questions that capture natural language patterns:

1. "How would you explain what your company does to a friend at dinner?" (2–3 sentences)
2. "What's a common misconception in your industry that frustrates you?" (1–2 sentences)
3. "What should never appear in your content?" (words, phrases, or tones to avoid)
4. "Are you comfortable with first-person ('I built this because...') or prefer company voice ('We believe...')?"
5. "What's more important: sounding smart or sounding approachable?" (slider or choice)

**Step 4 (Optional): Voice Recording (~5 min)**

For clients who want deeper voice calibration, the questionnaire includes an optional Loom/voice memo prompt:

> "Record yourself answering: What problem does your company solve and why do you care?"

This captures natural cadence, vocabulary, and energy that written answers miss. VV transcribes the recording (using Whisper, AssemblyAI, or equivalent) and feeds the transcript into the voice-builder prompt during the build phase.

### Voice Profile Generation

During the build phase, VV runs the Voice Builder questionnaire responses through a dedicated Claude prompt (`prompts/voice-builder.md`) that outputs a structured Voice Profile:

```
Voice Profile — [Client Name]
Generated: [Date]
Source: Voice Builder (no prior content)

Tone: conversational, direct, mildly technical
Formality: 3/5 (professional but not corporate)
Energy: 4/5 (confident, forward-leaning)
Humor: occasional dry wit, never sarcasm
Perspective: story-first, supported by data

Sentence style: short declarative sentences, occasional rhetorical questions
Vocabulary: accessible technical (uses terms but defines them naturally)
Person: first-person singular ("I")
Closest reference: Sahil Lavingia × Lenny Rachitsky

Always use: [client-specified terms]
Never use: "leverage", "synergy", "disrupt", "revolutionize"

Sample opening lines (generated, not client-written):
- "Here's what no one tells you about [topic]."
- "I spent three months figuring this out so you don't have to."
- "The conventional advice is wrong. Here's why."
```

This Voice Profile is stored as a dedicated tab ("Voice Profile") in the client's Google Sheet — not in the single-cell `voice_style` field. Content generation prompts reference the full Voice Profile tab via `{{voice_style}}`.

### Calibration Loop (Built Into Monitoring Period)

During the 2-week monitoring period, the first 3 content pieces serve double duty:

1. Client reviews generated content and rates voice fit (1–5 scale, plus "highlight what sounds right / wrong")
2. VV re-runs the voice-builder prompt with original inputs + client feedback to produce a revised Voice Profile
3. Voice Profile is locked after 2 rounds of calibration (or earlier if client rates ≥ 4/5)

**If voice fit remains below 4/5 after 2 calibration rounds:** VV schedules a 15-minute voice alignment call with the client to identify specific mismatches, then produces a final revised profile. This is the only scenario where direct VV-client interaction is required for Voice Builder clients. If voice fit still cannot be resolved, a change order ($400) covers a full manual voice workshop.

This happens within the existing monitoring period — no extra timeline or cost for the standard 2-round calibration.

### Pricing

Voice Builder is included in all tiers at no extra charge. It replaces the "content links" requirement — it's not an add-on, it's an alternative path through the same onboarding.

The optional voice recording step adds ~15 minutes to VV's build time for transcription and extraction. Available on any tier or package.

---

## 4.6 What SeedLink Does vs. What VV Does

*For full detail, see Section 1.2 (SeedLink scope) and Section 1.3 (VV scope).*

### Pre-Sale & Sales

| Task | SeedLink | VV |
|------|----------|-----|
| Marketing & sales (website, ads, content, accelerator outreach) | ✓ | |
| Client inquiries & pre-sale conversations | ✓ | |
| Pricing & packaging decisions | ✓ | |
| Payment collection & Stripe management | ✓ | |
| Post-purchase validation call (~15 min) | ✓ | |

### Onboarding & Build

| Task | SeedLink | VV |
|------|----------|-----|
| Onboarding questionnaire management | ✓ | |
| Voice Builder sample content (5 A/B pairs, archetypes) | | ✓ (one-time creation) |
| Voice Profile generation (Claude prompt during build) | | ✓ |
| Technical build (workflows, prompts, config, testing) | | ✓ |
| Google Sheet setup & configuration | | ✓ |
| Client handoff call (30 min) | Optional | ✓ |
| Handoff documentation | | ✓ |

### Post-Build

| Task | SeedLink | VV |
|------|----------|-----|
| 2-week monitoring | | ✓ |
| Voice calibration during monitoring | | ✓ |
| Lite Support delivery (monitoring, optimization, troubleshooting) | | ✓ (100% of work) |
| Lite Support billing (Stripe auto-charge) | ✓ | |
| Client relationship management (non-technical) | ✓ | |
| Client technical support | | ✓ |
| Upsell identification & pitch | ✓ | Flags to SeedLink |

### Platform & Strategy

| Task | SeedLink | VV |
|------|----------|-----|
| Platform development (Track B) | | ✓ |
| Product roadmap decisions | ✓ (with VV input) | |
| Pricing strategy | ✓ (with VV input) | |

---

---

# PART 5: SUMMARY & NEXT STEPS

## Side-by-Side Comparison: Modular vs. White Label

| Dimension | Track A: Modular Builds | Track B: White Label Platform |
|-----------|------------------------|------------------------------|
| **What it is** | Individual project builds for each client | Product that serves many clients automatically |
| **Revenue model** | One-time build fees + optional Lite Support | Monthly subscriptions + setup fees |
| **Revenue split** | 75% VV / 25% SeedLink | 75–80% SeedLink / 20–25% VV (or negotiated) |
| **Client experience** | Custom build, handoff call, Google Sheets | Self-serve dashboard, automated onboarding |
| **VV effort per client** | 28–75 hours per build | Near-zero after platform is built |
| **SeedLink effort per client** | Sales + questionnaire forwarding | Minimal (self-serve) |
| **Time to revenue** | Immediate (builds start generating revenue now) | 3–6 months (platform must be built first) |
| **Scalability** | Limited by VV delivery hours | Unlimited (software scales) |
| **Investment required** | $0 (VV uses existing templates) | $37,000–$65,000 in platform development |
| **Branding** | Co-branded or SeedLink-branded | SeedLink-branded exclusively |
| **Term** | Month-to-month | 12-month minimum |
| **Termination notice** | 30 days | 90 days |
| **IP** | Joint (templates) | SeedLink owns platform code |

---

## Immediate Next Steps

| # | Action | Owner | Timeline |
|---|--------|-------|----------|
| 1 | Schedule partnership call to align on terms | Both | This week |
| 2 | Decide branding approach for modular builds (co-branded vs. SeedLink-only) | Both | On call |
| 3 | Decide revenue split model for white label (Option A vs. B) | Both | On call |
| 4 | Set up shared Slack channel | SeedLink | This week |
| 5 | Build landing page on seedlink.app | SeedLink | 1–2 weeks |
| 6 | Set up Stripe products | SeedLink | 1–2 weeks |
| 7 | Create onboarding questionnaire | SeedLink (VV advises on questions) | 1 week |
| 8 | Finalize legal review of this agreement | Both (with counsel if desired) | 2 weeks |
| 9 | Begin Phase 1 white label build | VV | April 2026 |
| 10 | First online modular sale target | SeedLink | April 2026 |

---

## Signature Block

*This document serves as a working partnership framework. Both parties should review with legal counsel before signing.*

**SeedLink.app**

Name: Shilpa Kollengode
Title: Founder & CEO
Date: _______________
Signature: _______________

**Veteran Vectors**

Name: Anthony Pinto
Title: Founder
Date: _______________
Signature: _______________

---

*Confidential — Prepared for SeedLink.app × Veteran Vectors Partnership*
*March 10, 2026 — v3.0*
