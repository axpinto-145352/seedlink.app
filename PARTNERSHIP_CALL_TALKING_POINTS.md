# SeedLink × Veteran Vectors Partnership Call — Talking Points

**Date:** March 7, 2026
**Purpose:** Finalize Stripe Connect payment model, resolve open items, align on go-live

---

## 1. STRIPE CONNECT — THE WIN-WIN PROPOSAL

### The Problem We're Solving
- Old model: Client pays SeedLink → SeedLink holds 100% → manually pays VV 85% "within 7 days"
- Creates trust dependency, manual invoicing, delayed cash flow, zero visibility for VV
- 13-Lens Review flagged this as a **Critical finding** (L1-2)

### How Stripe Connect Works
- SeedLink sets up a Connect platform account (~1 hour setup)
- VV connects their Stripe account (~10 minutes)
- **At checkout, Stripe automatically splits every payment:**
  - **85% → VV** (deposited next business day)
  - **15% → SeedLink** (deposited next business day)
- Both parties see all transactions in real-time via their Stripe dashboards
- Zero manual invoicing. Zero delayed payments. Zero trust required.

### Example — Standard Content Build ($2,200)
```
Client pays:         $2,200.00
Stripe fee:          -$64.10  (2.9% + $0.30)
Net to split:        $2,135.90
  → VV (85%):        $1,815.52  (auto, next business day)
  → SeedLink (15%):  $320.39    (auto, next business day)
```

### Stripe Fee Handling — Recommendation: Proportional Split
| Option | Who Pays | Verdict |
|--------|----------|---------|
| Client absorbs | Client charged extra | Less transparent |
| **Proportional (recommended)** | **VV 85% of fee, SeedLink 15%** | **Fairest — neither disadvantaged** |
| SeedLink absorbs | Comes off SeedLink's 15% | Disproportionate |

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
