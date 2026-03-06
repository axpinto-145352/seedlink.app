# SeedLink.app — SaaS Product Implementation Plan

**Date**: February 19, 2026
**Prepared by**: Veteran Vectors
**For**: Shilpa Kollengode, Founder & CEO
**Status**: Implementation-ready

---

## Executive Summary

This document is the blueprint for turning SeedLink's internal content automation system into a scalable, multi-tenant SaaS product. The product — working name **SeedLink Content Engine** — packages the AI content pipeline, social media derivation, multi-account outreach support, and analytics reporting into a self-serve (or semi-serve) platform that other companies can subscribe to.

The plan is sequenced into 4 phases, starting with what's already built and progressing to full self-serve SaaS. Each phase is revenue-generating and independently viable — if demand stalls at any phase, the business still works.

---

## 1. What We're Building

### Product Definition

An AI-powered content operations platform that takes a company from "I need content" to "content is live across all my channels" — with AI drafting, multi-agent quality review, social media derivation, scheduling, and performance tracking.

### Core Value Proposition

> "One system that writes your blog posts, derives your social content, publishes across channels, and tracks what's working — all calibrated to your brand voice."

### Who It's For

| Segment | Pain Point | How We Solve It |
|---------|-----------|----------------|
| **Startup founders (5-50 employees)** | No content team, no time to write, but need SEO/thought leadership | Fully automated pipeline: topic → draft → review → publish |
| **SMB marketing teams (1-3 people)** | Team is stretched thin, content is inconsistent | AI handles first drafts and social derivation, humans do final review |
| **Agencies managing multiple clients** | Repetitive content setup per client, no unified system | Multi-tenant with per-client voice calibration and branding |
| **Solopreneurs / fractional CMOs** | Managing content for multiple brands simultaneously | Switch between client configs in one dashboard |

### What Makes This Different from Jasper/Waldium/Buffer

| Competitor | What They Do | What We Do That They Don't |
|-----------|-------------|---------------------------|
| **Jasper** | AI content generation (write individual pieces) | End-to-end pipeline: ideation → draft → multi-agent review → social derivation → scheduling → analytics |
| **Waldium** | AEO-optimized blog posts + hosting | Social media derivation, multi-channel publishing, outreach integration, multi-account LinkedIn |
| **Buffer/Hootsuite** | Social scheduling and management | AI content creation, brand voice calibration, editorial calendar automation |
| **HubSpot Marketing** | Full marketing suite ($800+/mo) | 10x cheaper, AI-native, focused on content ops vs. enterprise marketing |

**Our moat**: No one else connects AI content creation → multi-agent quality review → social derivation → multi-platform publishing → outreach integration in a single automated pipeline.

---

## 2. Architecture: How the SaaS Product Works

### System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                    SEEDLINK CONTENT ENGINE (SaaS)                     │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     Web Application (Next.js)                 │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │   │
│  │  │ Dashboard │  │ Content  │  │ Settings │  │ Analytics  │  │   │
│  │  │ Overview  │  │ Approval │  │ & Config │  │ & Reports  │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                              │                                       │
│  ┌──────────────────────────┼───────────────────────────────────┐   │
│  │              API Layer (Node.js / tRPC)                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │   │
│  │  │ Auth     │  │ Workflow  │  │ Webhook  │  │ Billing    │  │   │
│  │  │ (Clerk)  │  │ Trigger  │  │ Router   │  │ (Stripe)   │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                              │                                       │
│  ┌──────────────────────────┼───────────────────────────────────┐   │
│  │              Workflow Engine (n8n, parameterized)              │   │
│  │                                                               │   │
│  │  ┌─────────────────┐  ┌─────────────────┐                   │   │
│  │  │ Content Pipeline │  │ Social Engine    │                   │   │
│  │  │ (multi-agent)    │  │ (derive+publish) │                   │   │
│  │  └─────────────────┘  └─────────────────┘                   │   │
│  │  ┌─────────────────┐  ┌─────────────────┐                   │   │
│  │  │ Editorial Cal.   │  │ Analytics Rptr   │                   │   │
│  │  │ Manager          │  │                  │                   │   │
│  │  └─────────────────┘  └─────────────────┘                   │   │
│  │  ┌─────────────────┐                                         │   │
│  │  │ Outreach Handler │                                         │   │
│  │  │ (multi-account)  │                                         │   │
│  │  └─────────────────┘                                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐             │
│  │Postgres │  │ Redis   │  │ S3/R2   │  │ Secrets  │             │
│  │(tenants,│  │(queues, │  │(content │  │ Manager  │             │
│  │ content)│  │ cache)  │  │ assets) │  │(API keys)│             │
│  └─────────┘  └─────────┘  └─────────┘  └──────────┘             │
└──────────────────────────────────────────────────────────────────────┘
```

### Multi-Tenancy Model

Each client ("tenant") gets:
- **Their own Google Sheet** (cloned from template) — the operational interface
- **Their own Settings tab** with brand name, voice guidelines, content pillars, CTA products, blog platform
- **Their own credentials** stored in encrypted secrets manager (their Claude API key OR shared pool, their Buffer account, their Framer/WordPress/Ghost CMS)
- **Shared n8n workflows** that read tenant config at runtime from the Settings sheet

This is the key architectural insight: **the workflows don't change per client — only the Settings sheet changes**. The `Sheets: Load Client Config` node (already added to content-pipeline-main.json) reads all client-specific values at the start of each execution.

### Data Isolation

| Layer | Isolation Method |
|-------|-----------------|
| Content data | Separate Google Sheet per tenant (Sheet ID in env var) |
| Credentials | Per-tenant encrypted storage (n8n credential scoping or external vault) |
| Workflow execution | Tenant ID passed through all nodes; logged per-tenant |
| Analytics | Filtered by tenant ID in shared analytics tables |
| Billing | Stripe customer ID mapped to tenant ID |

---

## 3. Technology Stack

### Phase 1-2 Stack (Productized Service, 1-10 clients)

| Component | Technology | Cost | Rationale |
|-----------|-----------|------|-----------|
| Workflow engine | n8n self-hosted (Docker) | $0 | Already built, proven, visual debugging |
| Content data | Google Sheets (1 per client) | $0 | Clients already know Sheets; no training needed |
| AI content | Anthropic Claude API (Sonnet) | ~$13/client/mo | Best quality-to-cost for content |
| Social scheduling | Buffer Business | $120/mo shared | Multi-platform, API access |
| Blog publishing | Framer CMS (notification-based) | $0 (client's Framer) | Per workflow update — Slack notification + manual paste |
| Notifications | Slack webhooks | $0 | Already integrated |
| Hosting | DigitalOcean Droplet (4 CPU, 8GB) | $48/mo | Handles 10+ concurrent workflow executions |
| Monitoring | Uptime Kuma + Sentry | $0 | Self-hosted monitoring |
| **Total infrastructure** | | **~$170/mo** (shared) | |

### Phase 3-4 Stack (SaaS Platform, 10-50+ clients)

| Component | Technology | Cost | Rationale |
|-----------|-----------|------|-----------|
| Web app | Next.js 15 + Tailwind + shadcn/ui | $0 | Fast, modern, SSR for dashboard |
| API | tRPC or Next.js API routes | $0 | Type-safe, integrated with Next.js |
| Auth | Clerk | $0-$25/mo | Easy multi-tenant auth, org support |
| Database | PostgreSQL (Supabase or self-hosted) | $0-$25/mo | Tenant data, content metadata, analytics |
| Workflow engine | n8n (parameterized) or Temporal.io | $0-$300/mo | n8n through 25 clients, evaluate Temporal at 25+ |
| Queue | Redis (BullMQ) | $0 (self-hosted) | Job scheduling, rate limiting |
| File storage | Cloudflare R2 or S3 | ~$5/mo | Content assets, exports |
| Secrets | HashiCorp Vault or AWS Secrets Manager | $0-$50/mo | Per-tenant API key encryption |
| Billing | Stripe Billing | 2.9% + $0.30/tx | Subscriptions, usage metering |
| Hosting | Railway or Fly.io or DigitalOcean App Platform | $50-$150/mo | Managed containers, auto-scaling |
| CDN | Cloudflare | $0 | Edge caching, DDoS protection |
| Error tracking | Sentry | $0 (developer tier) | Error monitoring across tenants |

---

## 4. Feature Roadmap by Phase

### Phase 1: Prove It (NOW → Month 2) — Already Underway

**Goal**: Run SeedLink's own content engine, collect performance data, handle first 1-2 referral clients manually.

| Feature | Status | Notes |
|---------|--------|-------|
| Content pipeline with multi-agent review | Built | content-pipeline-main.json with voice, strategy, SEO/AEO agents |
| Social derivation (LinkedIn + X + short posts) | Built | social-engine.json |
| Social publishing via Buffer | Built | social-engine.json Path B |
| Blog staging for Framer | Built (updated) | Slack notification with link to Content Hub |
| Editorial calendar auto-population | Built | editorial-calendar-manager.json |
| Multi-account outreach response handling | Built (updated) | source_account field tracks which LinkedIn profile |
| Client config via Settings sheet | Built (updated) | Sheets: Load Client Config node added to pipeline |
| Weekly analytics reporting | Built | analytics-reporter.json |
| AEO-optimized content (definitions, FAQ, Key Takeaways) | Built | Blog writer + SEO/AEO agent prompts |

**Revenue**: $0 (internal use) + $3,500-$4,000 per referral build

### Phase 2: Productize (Month 2 → Month 5)

**Goal**: Standardize client onboarding, reduce setup from 1 week to 2 days, onboard 3-5 paying clients.

| Feature | Priority | Effort | Description |
|---------|----------|--------|-------------|
| **Onboarding questionnaire** | P0 | 1 day | Google Form or Typeform: brand name, voice examples, pillars, platforms, ICP, goals |
| **Clone-and-configure script** | P0 | 3 days | Script that takes questionnaire output → clones Google Sheet template → populates Settings tab → generates customized prompt files |
| **Multi-client n8n environment** | P0 | 2 days | Separate environment variables per client; workflow execution tagged with client ID |
| **Client-specific prompt generation** | P1 | 2 days | Template system: voice-agent.md becomes a template with `{{brand_name}}`, `{{voice_style}}`, `{{content_pillars}}` placeholders |
| **Landing page** | P1 | 2 days | "AI Content Engine for Startups" on seedlink.app — intake form, pricing, social proof |
| **Pricing packages** | P1 | 1 day | Define tiers (see pricing section below) |
| **LLMs.txt generation** | P2 | 1 day | Workflow addition: after blog publish, regenerate /llms.txt |
| **AI citation monitoring** | P2 | 3 days | New workflow: weekly check if client content is cited by ChatGPT/Claude/Perplexity |
| **Monthly client reporting** | P2 | 2 days | Enhanced analytics-reporter with per-client branding |

**Revenue target**: 3-5 clients × $297-$497/mo = $891-$2,485/mo recurring + setup fees

### Phase 3: Platform MVP (Month 5 → Month 9)

**Goal**: Build the web application layer so clients can self-configure, approve content, and view analytics without touching Google Sheets.

| Feature | Priority | Effort | Description |
|---------|----------|--------|-------------|
| **Auth + tenant management** | P0 | 1 week | Clerk integration; each client gets an org; team member invites |
| **Dashboard overview** | P0 | 2 weeks | Content queue, upcoming publications, recent performance, action items |
| **Content approval UI** | P0 | 2 weeks | View AI-generated drafts, edit inline, approve/reject, request revision |
| **Settings & configuration panel** | P0 | 1 week | Brand voice, content pillars, connected platforms, notification prefs |
| **Platform connection wizard** | P1 | 2 weeks | OAuth flows for: Google Sheets, Buffer, Slack; API key input for Claude |
| **Analytics dashboard** | P1 | 2 weeks | Content performance, social engagement, publishing cadence, pillar balance |
| **Billing integration** | P1 | 1 week | Stripe subscriptions, plan enforcement, usage display |
| **Onboarding wizard** | P2 | 1 week | Guided setup: brand info → voice calibration → platform connections → first topic generation |
| **Brand voice calibration** | P2 | 1 week | Upload 3-5 example posts → AI extracts voice characteristics → generates voice guidelines |

**Revenue target**: 10-15 clients × $197-$397/mo = $1,970-$5,955/mo recurring

### Phase 4: Scale (Month 9+)

**Goal**: Self-serve onboarding, multi-platform content (Instagram, TikTok, YouTube Shorts), universal CRM, white-label.

| Feature | Priority | Effort | Description |
|---------|----------|--------|-------------|
| **Self-serve sign-up** | P0 | 2 weeks | No human involvement needed to get started |
| **Instagram content derivation** | P1 | 2 weeks | Caption + hashtag optimization, carousel suggestions |
| **TikTok script generation** | P1 | 1 week | Hook → value → CTA script format |
| **YouTube Shorts scripts** | P1 | 1 week | Short-form video script derivation |
| **Email outreach integration** | P1 | 3 weeks | Apollo.io + Instantly.ai integration for multi-channel lead gen |
| **White-label / agency mode** | P2 | 4 weeks | Agencies manage multiple client workspaces under their brand |
| **API access** | P2 | 2 weeks | Programmatic content generation and management |
| **Custom orchestrator migration** | P2 | 6 weeks | Evaluate Temporal.io or BullMQ if n8n hits scaling limits at 25+ clients |

**Revenue target**: 25-50 clients × $149-$297/mo = $3,725-$14,850/mo recurring

---

## 5. Pricing Model

### Recommended Pricing Tiers

| Tier | Price | Target | What's Included |
|------|-------|--------|----------------|
| **Starter** | $197/mo | Solopreneurs, early startups | 4 blog posts/mo, LinkedIn + X derivation, editorial calendar, Framer/WordPress staging, Slack notifications, email support |
| **Growth** | $397/mo | Funded startups, SMBs | 8 blog posts/mo, all Starter features + multi-account LinkedIn outreach support (up to 4 accounts), weekly analytics reports, priority support |
| **Scale** | $697/mo | Agencies, multi-brand | 16 blog posts/mo, all Growth features + white-label, custom voice calibration, dedicated Slack channel, API access |
| **Enterprise** | Custom | Large orgs | Custom volume, SLA, dedicated infrastructure, onboarding specialist |

### Setup Fees

| Tier | One-Time Setup | Includes |
|------|---------------|----------|
| Starter | $500 | Onboarding call, Sheet setup, voice calibration, first content cycle |
| Growth | $1,000 | Everything in Starter + outreach config, multi-account setup |
| Scale | $2,000 | Everything in Growth + white-label branding, API integration support |

### Unit Economics

| Metric | Starter | Growth | Scale |
|--------|---------|--------|-------|
| Monthly revenue | $197 | $397 | $697 |
| Claude API cost (per client) | ~$13 | ~$26 | ~$52 |
| Infrastructure cost (per client, at 25 clients) | ~$8 | ~$8 | ~$8 |
| Buffer cost allocation | ~$5 | ~$5 | ~$5 |
| **Gross margin** | **$171 (87%)** | **$358 (90%)** | **$632 (91%)** |

---

## 6. Client Onboarding Flow

### Productized Phase (Phase 2) — Human-Assisted

```
Day 0: Client signs up via landing page
    ↓
Day 1: Onboarding call (30 min)
    ├── Brand name, description, URL
    ├── Voice examples (3-5 existing posts/articles they like)
    ├── Content pillars (3-5 themes they want to cover)
    ├── Target audience / ICP
    ├── Platforms used (LinkedIn, X, Blog, Instagram, etc.)
    ├── LinkedIn accounts for outreach (names, Prosp.AI workspace names)
    ├── CMS platform (Framer, WordPress, Ghost, Webflow)
    └── Goals (traffic, leads, thought leadership)

Day 2: System setup (automated with script)
    ├── Clone Google Sheet template
    ├── Populate Settings tab with client config
    ├── Generate client-specific prompt files
    ├── Configure n8n environment variables for client
    ├── Connect Buffer profile
    ├── Set up Slack notification channel
    └── Test all workflows end-to-end

Day 3: Voice calibration
    ├── AI analyzes 3-5 voice examples → extracts style characteristics
    ├── Generate voice guidelines document
    ├── Generate 2 sample blog post drafts
    └── Client reviews, provides feedback

Day 4: Prompt refinement + first real content
    ├── Adjust prompts based on voice feedback
    ├── Run full content pipeline for first real topic
    ├── Client reviews and approves first draft
    └── Derive social content from approved draft

Day 5-7: Go live
    ├── Enable scheduled triggers
    ├── Train client on Google Sheets UI
    ├── Enable Slack notifications
    ├── First real content published
    └── Monitoring enabled
```

### Platform Phase (Phase 3) — Semi-Automated

```
Sign up → Onboarding wizard in web app
    ↓
Step 1: Brand info (name, URL, description)
Step 2: Upload voice examples → AI calibrates voice
Step 3: Define content pillars (guided suggestions based on industry)
Step 4: Connect platforms (OAuth for Sheets, Buffer; API key for Claude)
Step 5: Configure CMS (Framer/WordPress/Ghost URL)
Step 6: Review auto-generated sample content
Step 7: Approve → system goes live
    ↓
Total time: 30-60 minutes self-serve
```

---

## 7. Development Timeline

### Sprint Plan

| Sprint | Dates | Deliverable | Hours |
|--------|-------|-------------|-------|
| **Sprint 1** | Week 1-2 (Phase 2) | Onboarding questionnaire + clone-and-configure script | 24 hrs |
| **Sprint 2** | Week 3-4 | Prompt template system (parameterized brand voice) | 20 hrs |
| **Sprint 3** | Week 5-6 | Landing page + pricing page on seedlink.app | 16 hrs |
| **Sprint 4** | Week 7-8 | First 2 client onboardings using productized flow | 24 hrs |
| **Sprint 5** | Week 9-10 | LLMs.txt workflow + AI citation monitoring | 20 hrs |
| **Sprint 6** | Week 11-12 | Enhanced analytics reporting (per-client, branded) | 16 hrs |
| **Sprint 7** | Week 13-16 (Phase 3 start) | Next.js app scaffold + auth (Clerk) + tenant management | 40 hrs |
| **Sprint 8** | Week 17-20 | Content approval UI + dashboard overview | 60 hrs |
| **Sprint 9** | Week 21-24 | Settings panel + platform connection wizard | 40 hrs |
| **Sprint 10** | Week 25-28 | Analytics dashboard + billing (Stripe) | 40 hrs |
| **Sprint 11** | Week 29-32 | Onboarding wizard + voice calibration UI | 32 hrs |
| **Sprint 12** | Week 33-36 | Testing, security audit, beta launch | 40 hrs |

### Milestone Summary

| Milestone | Target Date | What's Live |
|-----------|------------|-------------|
| **M1: First referral client** | Week 4 | Cloned system running for a real client |
| **M2: Productized service live** | Week 8 | Landing page, pricing, 2-day onboarding flow |
| **M3: 5 paying clients** | Week 16 | Validated product-market fit for productized model |
| **M4: Platform MVP beta** | Week 28 | Web dashboard for content approval + analytics |
| **M5: Platform GA** | Week 36 | Self-serve onboarding, billing, full dashboard |

---

## 8. Go-to-Market Strategy

### Phase 2: Productized Service GTM

| Channel | Tactic | Expected Outcome |
|---------|--------|-----------------|
| **Founder referrals** | Shilpa introduces 3 CEOs who expressed interest | 2-3 paying clients in month 1 |
| **SeedLink marketplace** | Banner/CTA on seedlink.app: "Automate your content with AI" | Inbound from existing SeedLink users |
| **LinkedIn (Shilpa's profile)** | "Building in public" posts about the content engine | Thought leadership → inbound interest |
| **LinkedIn (other 3 accounts)** | Cross-promote from Karthik, Shashank, 4th account | Wider reach across networks |
| **Content pillar: SeedLink in Action** | Blog posts documenting automation results | SEO + social proof |
| **Direct outreach via Prosp.AI** | Target startup founders who post content manually | Outbound pipeline |

### Phase 3: Platform GTM

| Channel | Tactic | Expected Outcome |
|---------|--------|-----------------|
| **Product Hunt launch** | Launch platform MVP on PH | 500+ sign-ups, 20-50 trial users |
| **AppSumo LTD** (optional) | Lifetime deal for early adopters | Cash injection + user base |
| **Content marketing** | Case studies from Phase 2 clients | Social proof for self-serve |
| **Integrations directory** | List on Buffer, n8n, Anthropic partner directories | Discoverability |
| **SEO** | Target: "AI content automation", "AI blog writer", "content pipeline tool" | Organic inbound |

### Competitive Positioning Statement

> **SeedLink Content Engine**: The only AI content platform that writes your blog posts, derives social content for every channel, publishes automatically, and connects to your outreach pipeline — all calibrated to your brand voice, reviewed by multiple AI agents, with human approval built in.

---

## 9. Financial Projections

### Revenue Forecast (Conservative)

| Month | Clients | Avg Revenue/Client | MRR | Infrastructure Cost | Gross Profit |
|-------|---------|-------------------|-----|--------------------|--------------|
| 3 | 3 | $347 | $1,041 | $220 | $821 |
| 6 | 8 | $322 | $2,576 | $350 | $2,226 |
| 9 | 15 | $297 | $4,455 | $550 | $3,905 |
| 12 | 25 | $272 | $6,800 | $800 | $6,000 |
| 18 | 50 | $247 | $12,350 | $1,500 | $10,850 |

### Investment Required

| Phase | Development Cost | Timeline | Revenue by Phase End |
|-------|-----------------|----------|---------------------|
| Phase 2 (Productize) | $8,000-$12,000 | 3 months | $1,000-$2,500/mo |
| Phase 3 (Platform MVP) | $20,000-$30,000 | 5 months | $4,000-$6,000/mo |
| Phase 4 (Scale) | $15,000-$25,000 | 4 months | $10,000-$15,000/mo |
| **Total** | **$43,000-$67,000** | **12 months** | **$10,000-$15,000/mo** |

### Break-Even Analysis

- **Phase 2 break-even**: 3-4 clients at $347 avg (covers infrastructure + dev amortization)
- **Phase 3 break-even**: 8-10 clients at $297 avg (covers platform costs + dev amortization)
- **Full investment payback**: ~12 months from Phase 2 launch at conservative growth

---

## 10. What's Already Updated in the Workflows

These changes have been made to the n8n workflows to support the SaaS transition:

### social-engine.json — Framer-Compatible Blog Publishing
- **Removed**: `HTTP: Publish to WordPress` node
- **Added**: `HTTP: Notify Blog Ready for Framer` node — sends Slack notification with blog title, direct link to Content Hub Google Sheet, and instructions to paste into Framer CMS
- **Why**: SeedLink uses Framer, not WordPress. The Framer CMS doesn't have a public API for programmatic blog publishing, so the workflow stages content in Google Sheets and notifies the team to paste into Framer. When Framer adds an API (or if a client uses WordPress/Ghost), the platform selector in Settings controls behavior.

### outreach-response-handler.json — Multi-Account LinkedIn Support
- **Added**: `source_account` field — tracks which LinkedIn account (Shilpa, Karthik, Shashank, or 4th) the outreach response came from
- **Added**: `linkedin_profile_url` field — captures the responder's LinkedIn URL for easy follow-up
- **Updated**: Sheets logging now includes "Source Account" and "LinkedIn URL" columns
- **Updated**: Slack notifications now show which account received the response
- **Why**: SeedLink runs outreach from 4 LinkedIn profiles via Prosp.AI. Each profile has its own Prosp.AI workspace, and the response handler needs to track which account generated each response for proper attribution and follow-up routing.

### content-pipeline-main.json — Client Config Parameterization
- **Added**: `Sheets: Load Client Config` node — reads the "Settings" sheet tab at the start of every pipeline execution
- **Updated**: Trigger connections now route through the config loader before pulling topics
- **Why**: This is the foundation for multi-tenant operation. Instead of hardcoding brand names, voice guidelines, and content pillars into system prompts, workflows read them from a per-client Settings sheet. To deploy for a new client: clone the Google Sheet, update the Settings tab, point the workflow at the new Sheet ID.

### google-sheets-template.md — Settings Sheet Added
- **Added**: "Settings" sheet (Sheet 6) specification with 12 required configuration rows
- **Key settings**: `brand_name`, `brand_description`, `voice_style`, `content_pillars`, `cta_products`, `blog_platform`, `linkedin_accounts`, `target_audience`, `ai_model`, token limits
- **Why**: The Settings sheet is the configuration interface for the entire system. Changing settings takes effect on the next workflow run — no restart or redeployment needed. This is how we deploy to new clients without modifying workflow code.

---

## 11. Key Decisions for Shilpa

| Decision | Options | Recommendation |
|----------|---------|---------------|
| **Phase 2 start date** | Now vs. after 30-day internal run | Start now — run internal + first referral client in parallel |
| **Pricing** | $197 vs. $297 vs. $397 starting tier | $297/mo Starter — premium enough to signal quality, accessible enough for startups |
| **Blog platform support** | Framer-only vs. Framer + WordPress + Ghost | Support Framer (notification-based) + WordPress (API) from Phase 2. Ghost in Phase 3. |
| **Claude API cost model** | Client BYOK vs. shared pool with markup | BYOK for Growth/Scale tiers (transparency). Shared pool for Starter (simplicity). |
| **Web app build timing** | Month 5 vs. sooner | Month 5 — validate with 5 paying clients on Google Sheets before investing in dashboard |
| **Hire** | Solo through Phase 2 vs. bring on contractor | Solo through Phase 2. Hire full-stack contractor for Phase 3 web app build. |
| **n8n vs. custom orchestrator** | Stay on n8n vs. migrate early | Stay on n8n through 25 clients. Only evaluate Temporal.io/BullMQ if workflow execution reliability drops. |

---

## 12. Immediate Next Steps (This Week)

1. **Deploy current workflows** for SeedLink's own content — run the first full content cycle end-to-end
2. **Populate the Settings sheet** with SeedLink's own configuration values
3. **Test the Framer publishing flow** — verify Slack notification arrives with correct Content Hub link
4. **Test multi-account outreach** — send a test webhook with `source_account` field set to each of the 4 LinkedIn profiles
5. **Create onboarding questionnaire** (Google Form or Typeform) — capture all parameters needed for a new client
6. **Reach out to the 3 interested CEOs** — offer them a founding client rate ($197/mo for Growth tier, normally $397)
7. **Start "building in public" content** — first LinkedIn post from Shilpa about automating SeedLink's content operations

---

## Summary

| Metric | Value |
|--------|-------|
| **Product** | AI Content Engine — end-to-end content operations platform |
| **Current state** | 5 workflows, 10 prompts, multi-agent review, ready for internal deployment |
| **Workflow updates shipped** | Framer blog staging, multi-account outreach, client config parameterization, Settings sheet |
| **Phase 2 (Productize) cost** | $8,000-$12,000 |
| **Phase 2 timeline** | 3 months to 5 paying clients |
| **Phase 3 (Platform) cost** | $20,000-$30,000 |
| **Phase 3 timeline** | 5 additional months to web dashboard |
| **Break-even** | 3-4 clients at $347/mo avg |
| **12-month MRR target** | $6,800/mo (25 clients) |
| **Gross margin** | 87-91% |
| **Biggest risk** | Founder bandwidth (building product while running marketplace) |
| **Biggest opportunity** | No competitor combines content creation + multi-agent review + social derivation + outreach in one pipeline |

The path is clear: deploy internally, validate with 3-5 referral clients, productize the onboarding, then build the platform layer only when demand proves it. Every phase is independently revenue-generating. Don't build Phase 3 until Phase 2 has 5+ paying clients.
