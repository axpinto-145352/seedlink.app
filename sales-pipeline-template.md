# Sales Pipeline — Google Sheets Template

This is the shared financial dashboard for SeedLink × VV. Both parties have full visibility into every client, every payment, and every status.

**Sheet Name:** "SeedLink — Sales Pipeline & Financial Tracker"

---

## Sheet 1: Sales Pipeline

The main client tracking sheet. Auto-populated by the `client-onboarding-orchestrator.json` workflow on every new Stripe payment.

| Column | Type | Source | Description |
|--------|------|--------|-------------|
| `client_name` | Text | Stripe / Questionnaire | Client's company or brand name |
| `client_email` | Email | Stripe | Primary contact email |
| `client_id` | Text | Auto-generated | Unique ID for multi-tenant tracking (format: `client_brandname_timestamp`) |
| `modules` | Text | Stripe metadata | Comma-separated: content, linkedin, email, seo |
| `tier` | Dropdown | Stripe metadata | Basic / Standard / Premium |
| `amount_paid` | Currency | Stripe | Total payment amount |
| `vv_payout` | Currency | Formula: `=amount_paid * 0.75` | VV's 75% share |
| `seedlink_commission` | Currency | Formula: `=amount_paid * 0.25` | SeedLink's 25% share |
| `vv_payout_date` | Date | Stripe Connect / Manual | Date VV received payout |
| `vv_payout_status` | Dropdown | Manual / Stripe Connect | Pending / Paid / Overdue |
| `stripe_session_id` | Text | Stripe webhook | For payment verification |
| `purchased_at` | DateTime | Stripe webhook | ISO timestamp of purchase |
| `status` | Dropdown | Workflow auto-updates | See Status Values below |
| `questionnaire_received` | Date | Questionnaire webhook | Date client completed onboarding form |
| `build_started` | Date | VV manual entry | Date VV began build |
| `build_delivered` | Date | Build-complete webhook | Date VV delivered |
| `handoff_complete` | Date | VV manual entry | Date of handoff call |
| `monitoring_end` | Date | Auto-calculated | 14 days after build_delivered |
| `lite_support` | Dropdown | Manual | None / Offered / Active / Declined |
| `lite_support_start` | Date | Stripe subscription | Date Lite Support subscription started |
| `lite_support_monthly` | Currency | Stripe | Monthly Lite Support amount |
| `sheet_url` | URL | Provisioning workflow | Link to client's Content Hub Google Sheet |
| `notes` | Text | Various | Free-form notes |

### Status Values (Dropdown)

```
Payment Received
Questionnaire Sent
Questionnaire Received
Provisioned — Awaiting VV Build
Build In Progress
Build Complete — Monitoring
Monitoring Complete — Lite Support Offered
Active — Lite Support
Completed — No Support
Paused
Cancelled
```

### Conditional Formatting Rules

| Condition | Format |
|-----------|--------|
| `vv_payout_status` = "Overdue" | Red background |
| `vv_payout_status` = "Paid" | Green text |
| `status` = "Build In Progress" | Yellow background |
| `status` contains "Monitoring" | Blue background |
| `status` = "Active — Lite Support" | Green background |
| Days since `purchased_at` > 3 AND `questionnaire_received` is empty | Orange background (client hasn't filled form) |

### Data Validation

| Column | Validation |
|--------|-----------|
| `tier` | List: Basic, Standard, Premium |
| `status` | List: (see Status Values above) |
| `vv_payout_status` | List: Pending, Paid, Overdue |
| `lite_support` | List: None, Offered, Active, Declined |
| `modules` | Text (comma-separated, validated by workflow) |

---

## Sheet 2: Revenue Summary

Auto-calculated summary of financial performance.

| Row | Formula | Description |
|-----|---------|-------------|
| **Total Revenue (All Time)** | `=SUM(Pipeline!amount_paid)` | All client payments |
| **VV Total Earned** | `=SUM(Pipeline!vv_payout)` | All VV payouts |
| **SeedLink Total Commission** | `=SUM(Pipeline!seedlink_commission)` | All SeedLink commissions |
| **VV Pending Payouts** | `=SUMIFS(Pipeline!vv_payout, Pipeline!vv_payout_status, "Pending")` | Outstanding VV payments |
| **VV Overdue Payouts** | `=SUMIFS(Pipeline!vv_payout, Pipeline!vv_payout_status, "Overdue")` | Late VV payments |
| **Active Clients** | `=COUNTIFS(Pipeline!status, "*Active*") + COUNTIFS(Pipeline!status, "*Monitoring*") + COUNTIFS(Pipeline!status, "*Build*")` | Currently served |
| **Lite Support MRR** | `=SUMIFS(Pipeline!lite_support_monthly, Pipeline!lite_support, "Active")` | Monthly recurring |
| **VV Lite Support MRR** | `=Lite_Support_MRR * 0.75` | VV's share |
| **Avg Build Value** | `=AVERAGE(Pipeline!amount_paid)` | Average deal size |
| **Builds This Month** | `=COUNTIFS(Pipeline!purchased_at, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))` | Current month volume |

### Monthly Breakdown (Rows below summary)

| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| Month | Builds | Revenue | VV Earned | SeedLink Earned | Lite Support MRR |

Formula-driven from Pipeline sheet data, grouped by month.

---

## Sheet 3: Lite Support Tracker

For tracking ongoing monthly retainers.

| Column | Description |
|--------|-------------|
| `client_id` | Links to Pipeline |
| `client_name` | — |
| `modules_supported` | Which modules have Lite Support |
| `monthly_rate` | Total monthly charge |
| `vv_monthly` | VV's 75% share |
| `start_date` | Subscription start |
| `last_invoice_date` | Most recent charge |
| `next_invoice_date` | Upcoming charge |
| `stripe_subscription_id` | For verification |
| `status` | Active / Paused / Cancelled |
| `hours_used_this_month` | VV tracking |
| `notes` | — |

---

## Setup Instructions

1. Create a new Google Sheet named "SeedLink — Sales Pipeline & Financial Tracker"
2. Create 3 tabs: "Sales Pipeline", "Revenue Summary", "Lite Support Tracker"
3. Add headers from tables above
4. Set up data validation dropdowns for status fields
5. Add conditional formatting rules
6. Add formulas to Revenue Summary tab
7. Share with both SeedLink and VV (Editor access)
8. Copy the Sheet ID and set as `SEEDLINK_SALES_TRACKER_ID` environment variable in n8n
9. The `client-onboarding-orchestrator.json` workflow auto-writes to this sheet on every new sale

---

## Environment Variable

```
SEEDLINK_SALES_TRACKER_ID=<Google Sheet ID>
```

This must be set in n8n for the onboarding orchestrator to write to the pipeline.
