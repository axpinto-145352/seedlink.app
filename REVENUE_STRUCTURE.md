# Revenue Structure & Payment Fairness — VV × SeedLink

**Date:** March 7, 2026
**Author:** Veteran Vectors
**Status:** Proposal — For Discussion on Partnership Call

---

## The Problem

Current structure:
1. Client pays SeedLink via Stripe
2. SeedLink holds 100% of the money
3. SeedLink pays VV 85% "within 7 business days"
4. VV has zero visibility into payments, zero control over timing

**Why this is risky for VV:**
- VV does 100% of the delivery work
- VV has no direct financial relationship with the money
- If SeedLink delays, disputes, or becomes insolvent, VV has no recourse except litigation
- "Within 7 business days" is a promise, not a mechanism
- VV can't verify that client actually paid, or when, or how much

---

## Recommended Structure: Stripe Connect (Automatic Split)

**How it works:**
- SeedLink sets up a Stripe Connect platform account
- VV creates a Stripe Connected Account (takes 10 minutes)
- When a client pays, Stripe automatically splits the payment at checkout:
  - 85% → VV's connected account (instant or next-day payout)
  - 15% → SeedLink's platform account
- Both parties see every transaction in real-time
- No invoicing, no "within 7 days", no trust required

**Stripe Connect costs:**
- Stripe's standard processing fee: 2.9% + $0.30 per transaction (already being paid)
- Connect payout fee (Express accounts): 0.25% + $0.25 per payout
- Connect platform fee: $0 additional (Stripe Connect is free to set up)
- Optional: Stripe can charge an additional "application fee" on top — but this isn't needed since we're doing a fixed split

**Example — Standard Content Build ($2,200):**
```
Client pays:         $2,200.00
Stripe processing:   -$64.10  (2.9% + $0.30)
Connect payout fee:  -$5.80   (0.25% + $0.25 to VV, $0.25 to SeedLink)
Net to split:        $2,130.10
  → VV (85%):        $1,810.59  (auto-deposited next business day)
  → SeedLink (15%):  $319.52    (auto-deposited next business day)
```

> **Note:** Connect payout fees apply per payout, not per transaction. If VV receives one daily payout aggregating multiple transactions, the fee is $0.25% + $0.25 on the total payout amount — which is more favorable at higher volume.

**Who absorbs the Stripe fee?**
Three options (decide on call):
1. **Client absorbs** — charge $2,265 so net equals $2,200 after fees (cleanest)
2. **Split proportionally** — each party absorbs their % of the fee (fairest)
3. **SeedLink absorbs** — comes off SeedLink's 15% since they chose the payment platform (simplest)

**Recommendation:** Option 2 (proportional). Neither party is disadvantaged.

### Stripe Connect Setup Steps (SeedLink's side)

1. Enable Stripe Connect on SeedLink's Stripe account (Dashboard → Connect → Get Started)
2. Choose "Standard" connected accounts (VV manages own Stripe account, lowest friction)
3. Create a connected account invitation link → send to VV
4. VV clicks link, connects existing or new Stripe account (10-min onboarding)
5. Set up payment splits in checkout sessions:
   ```javascript
   // In Stripe checkout session creation:
   {
     payment_intent_data: {
       transfer_data: {
         destination: 'acct_VV_STRIPE_ACCOUNT_ID',
       },
       application_fee_amount: Math.round(amount * 0.15), // SeedLink keeps 15%
     }
   }
   ```
6. VV sees payouts in own Stripe dashboard — full transparency

### For Lite Support (Monthly Subscriptions)

Stripe Connect handles recurring subscriptions identically:
- Client subscribes to $350/mo Content Lite Support
- Every month, Stripe auto-splits: $297.50 → VV, $52.50 → SeedLink
- No monthly invoicing from VV to SeedLink ever again

---

## Alternative Structure: Escrow (If Stripe Connect Isn't Feasible)

If SeedLink won't do Stripe Connect, the next best option:

**Escrow.com or equivalent:**
- Client pays into escrow
- Funds released to VV upon milestone delivery (handoff call complete, monitoring started)
- SeedLink's 15% released simultaneously
- Higher friction but maximum protection for both parties

**When to use escrow:**
- Builds over $5,000
- First 3 clients (until trust is established)
- Premium/Enterprise tier builds
- Any build where payment timing is uncertain

---

## Alternative Structure: Direct Billing (Nuclear Option)

If the relationship isn't working:
- VV invoices the client directly for 85% of the build
- SeedLink invoices the client for 15% referral fee
- Client pays two invoices
- Clean separation of financial relationships

**Downsides:** Confusing for clients, undermines the "SeedLink product" branding, adds admin burden. Only use this if Stripe Connect is refused and trust is low.

---

## Financial Dashboard (Required Regardless of Payment Model)

Both parties need a shared dashboard showing:

| Field | Source |
|-------|--------|
| Client name | Questionnaire |
| Module(s) purchased | Stripe |
| Tier | Stripe |
| Amount paid | Stripe |
| Date paid | Stripe |
| VV payout amount | Calculated |
| VV payout date | Stripe Connect / manual |
| Build status | n8n / manual |
| Lite Support active? | Stripe subscription |
| Lite Support payout | Stripe Connect / manual |

**Implementation:** Google Sheet (short-term) or Stripe Connect dashboard (long-term). The client-onboarding-orchestrator workflow auto-populates this on every new sale.

---

## Contract Addendum — Payment Terms (Proposed)

Replace Section 1.3 "Payment terms" in PARTNERSHIP_AGREEMENT.md with:

> **Payment terms:**
> - All client payments processed through Stripe Connect
> - Stripe automatically splits each payment: 85% to VV connected account, 15% to SeedLink platform account
> - Payouts occur on Stripe's standard schedule (next business day for both parties)
> - Both parties have real-time visibility into all transactions via Stripe dashboard
> - For Lite Support subscriptions: Stripe auto-splits each monthly charge identically
> - Stripe processing fees absorbed proportionally (85% by VV, 15% by SeedLink)
> - If Stripe Connect is temporarily unavailable: SeedLink pays VV within 3 business days of client payment clearing, with Stripe receipt forwarded as proof of payment
> - If any payment is more than 5 business days late: VV may pause accepting new builds until resolved

---

## Revenue Protection for VV

Regardless of payment model, the partnership agreement should include:

1. **Payment verification** — VV receives copy of Stripe receipt (or Stripe Connect auto-provides this)
2. **Late payment penalty** — 1.5%/month interest on late VV payouts (already in SOW — enforce it)
3. **Work stoppage right** — VV can pause new builds if any payout is >5 days late
4. **Minimum payout frequency** — For Lite Support: monthly payout by the 5th of each month
5. **Audit right** — VV can request Stripe transaction export quarterly to verify accuracy
6. **IP retention** — VV retains IP rights on all deliverables until payment clears (already in SOW)

---

## Track B (White Label) Revenue — Additional Consideration

For the platform build, Stripe Connect works the same way:
- Client subscribes to Starter/Growth/Scale tier
- Stripe auto-splits: 75-80% → SeedLink, 20-25% → VV
- VV sees platform MRR growing in real-time
- No "trust me, there are 25 subscribers" — VV can verify independently

---

## Recommendation Summary

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| **1 (Do Now)** | Set up Stripe Connect | 1 hour | Eliminates all payment trust issues |
| **2 (Do Now)** | Shared financial dashboard (Google Sheet) | 30 min | Transparency |
| **3 (Agreement)** | Update Section 1.3 with Stripe Connect terms | 15 min | Legal protection |
| **4 (Agreement)** | Add late payment / work stoppage clause | 15 min | Risk protection |
| **5 (Track B)** | Configure platform subscriptions with Connect split | 1 hour | Automated MRR payouts |

**Bottom line:** Stripe Connect makes this fair for everyone. SeedLink doesn't have to manually pay VV. VV doesn't have to chase payments. The client sees one checkout. Everyone gets paid automatically, transparently, on time.

---

*Confidential — Prepared by Veteran Vectors for SeedLink Partnership Discussion*
*March 7, 2026*
