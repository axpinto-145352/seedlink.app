# SeedLink × Veteran Vectors Partnership Call — Talking Points

**Date:** March 7, 2026
**Purpose:** Finalize Stripe Connect payment model, resolve open items, align on go-live

---

## 1. STRIPE CONNECT — THE WIN-WIN PROPOSAL

### The Problem We're Solving
- Old model: Client pays SeedLink → SeedLink holds 100% → manually pays VV 75% "within 7 days"
- Creates trust dependency, manual invoicing, delayed cash flow, zero visibility for VV
- 13-Lens Review flagged this as a **Critical finding** (L1-2)

### How Stripe Connect Works
- SeedLink sets up a Connect platform account (~1 hour setup)
- VV connects their Stripe account (~10 minutes)
- **At checkout, Stripe automatically splits every payment:**
  - **75% → VV** (deposited 1 business day after payment — delayed split)
  - **25% → SeedLink** (deposited same day — logged as revenue for investor reporting)
- Both parties see all transactions in real-time via their Stripe dashboards
- Zero manual invoicing. Zero delayed payments. Zero trust required.

### Example — Standard Content Build ($2,200)
```
Client pays:         $2,200.00
Stripe fee:          -$64.10  (2.9% + $0.30)
Net to split:        $2,135.90
  → SeedLink (25%):  $533.98   (auto, same day)
  → VV (75%):        $1,601.93 (auto, next business day — delayed split)
```

### Stripe Fee Handling — Recommendation: Proportional Split
| Option | Who Pays | Verdict |
|--------|----------|---------|
| Client absorbs | Client charged extra | Less transparent |
| **Proportional (recommended)** | **VV 75% of fee, SeedLink 25%** | **Fairest — neither disadvantaged** |
| SeedLink absorbs | Comes off SeedLink's 25% | Disproportionate |

### Benefits for VV
- Automatic payment — no chasing, no invoicing
- Next-business-day payout vs. "within 7 days"
- Real-time Stripe dashboard visibility
- Quarterly audit rights on transaction data
- Pause clause: can stop new builds if fallback payments >5 days late
- IP retained until payment clears

### Benefits for SeedLink
- No manual remittance or accounting overhead
- Automatic subscription splits for Lite Support
- Scales identically for 1 client or 100 clients
- Professional checkout experience for clients

### Fallback (If Stripe Connect Temporarily Unavailable)
- SeedLink pays VV within 3 business days
- Stripe receipt forwarded as proof
- If >5 days late: VV may pause new builds

---

## 2. RESOLVED ITEMS FROM 13-LENS REVIEW

| # | Finding | Resolution |
|---|---------|------------|
| L1-2 | Payment enforcement lacking | **RESOLVED** — Stripe Connect auto-split |
| L3-2 | Online purchase flow doesn't exist | **RESOLVED** — `client-onboarding-orchestrator.json` automates 12-step flow |
| L6-3 | Hidden Stripe costs | **PARTIALLY RESOLVED** — fees now explicit, proportional split recommended |

---

## 3. DECISIONS NEEDED ON THIS CALL

### Must-Decide (P0)

**a) Confirm Stripe Connect approach**
- Both parties benefit. Should be straightforward.

**b) Choose Stripe fee handling**
- Recommendation: Option 2 (proportional split)

**c) Governing law — Section 3.3 is blank**
- "State of [TO BE DETERMINED on partnership call]"
- Impacts: non-compete enforceability, arbitration rules, dispute resolution
- **Need to pick a state.**

**d) Track B revenue share model**
- Three options (A, B, C) are presented
- Recommendation: **Option A** — Fixed-Fee Build + Revenue Share
  - Phase 1: $12K–$20K (milestones)
  - Phase 2: $25K–$45K (milestones)
  - Ongoing: 20–25% of platform MRR
- **How to justify the 20–25% to Shilpa:**
  - "The build itself is already 50–80% below market rate ($37K–$65K vs. $50K–$300K for a custom SaaS MVP). The revenue share keeps me invested in making the platform excellent — not just functional."
  - "Without it, you'd need a separate maintenance contract at $3K–$8K/month ($36K–$96K/year). The revenue share at 50 subscribers is $2,970–$3,713/month — cheaper than hiring someone else."
  - "Industry standard for agencies that build and maintain SaaS platforms is 20–40%. We're at the low end of that range. Referral-only partners who do zero build work get 15–30%."
  - "You keep 75–80% of every dollar. At 87–91% gross margin on the tiers, you're netting $130–$464 per subscriber per month after my share and all costs. The platform is highly profitable for SeedLink with the share in place."
  - "It also protects you — I'm financially motivated to fix bugs fast, improve retention, and make the product better. A one-time build contractor walks away after the check clears."
  - "We've built in a review framework at 6 months and at 50 subscribers so we can adjust if the economics change. This isn't locked forever — it's designed to evolve with the business."

**e) Capacity vs. revenue projections**
- Agreement: VV comfortable at 1–3 builds/month, at capacity at 4–5
- Revenue projections: moderate scenario = 4/month, aggressive = 6/month
- Options: cap Track A during Track B development, or delay Phase 1 to July 2026

### Important Clarifications (P1)

**f) IP ownership — "Joint" is undefined**
- Can either party license to third parties?
- Can either party modify the other's contributions?
- Who controls derivative works?

**g) Lite Support scope — no hour cap defined**
- $250–$350/mo could mean 2 or 20 hours
- Recommendation: define as ≤5 hours/month; overages at $75/hr

**h) Post-monitoring support path**
- Client's $3K Premium build breaks in week 4 — where do they go?
- Options: paid support tickets vs. mandatory Lite Support

---

## 4. WHAT'S BUILT & READY

| Component | Status |
|-----------|--------|
| 9 n8n workflows | ✓ Complete, valid JSON |
| 14 system prompts | ✓ Fully written |
| Client onboarding orchestrator | ✓ Stripe → Sheet → Voice Profile → Slack |
| Voice Profile system | ✓ Extractor + Builder paths |
| Partnership agreement | ✓ Updated for Stripe Connect |
| Revenue structure doc | ✓ Complete with examples |
| Sales pipeline template | ✓ Auto-populated by orchestrator |
| Setup guide, SOP, onboarding guide | ✓ All complete |

---

## 5. WHAT'S LEFT (SeedLink's Court)

| Task | Owner | Effort |
|------|-------|--------|
| Enable Stripe Connect on Stripe account | SeedLink | 1 hour |
| Invite VV to connect Stripe account | SeedLink | 10 min |
| Build client onboarding Google Form | **Done** (see `onboarding-form/`) | — |
| Set 4 missing env vars in n8n | SeedLink/VV | 15 min |
| Create template Google Sheet | SeedLink/VV | 30 min |
| End-to-end manual test | VV | 2 hours |

---

## 6. PROPOSED TIMELINE

| Milestone | Target Date |
|-----------|------------|
| Partnership call (today) | March 7, 2026 |
| Stripe Connect live | March 10, 2026 |
| Template sheet created | March 11, 2026 |
| End-to-end test complete | March 12, 2026 |
| First online modular sale | Late March 2026 |
| Track B Phase 1 begins | April 2026 |

---

## 7. CLOSING

**The Stripe Connect proposal eliminates the #1 partnership risk.** Both parties get automatic payments, real-time visibility, and zero manual accounting. The infrastructure is built. The only remaining work is configuration and testing.

**Ask:** Confirm Stripe Connect, pick governing law, decide Track B model, and we can sign and go live within a week.
