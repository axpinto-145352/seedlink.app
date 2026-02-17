# SeedLink.app — Requirements Document

Extracted from: `SeedLink_Combined_Proposal_VeteranVectors_Updated.pdf` (Growth Strategy Proposal) and `SeedLink_SOW_Combined_VeteranVectors_Updated.pdf` (Statement of Work).

---

## 1. Workstream A: Prosp.AI LinkedIn Outreach (Automation Touchpoints)

Prosp.AI is a third-party tool that handles core LinkedIn automation. Veteran Vectors builds the **glue workflows** around it — specifically the response handling and lead qualification automation.

### n8n Automation Requirements

- **Response Routing Workflow**: When a prospect responds to an outreach sequence (via Prosp.AI webhook or LinkedIn notification), classify the response type and route accordingly:
  - **Interested** — Flag for immediate human follow-up, add to "Hot Leads" queue
  - **Not Interested** — Log and remove from active sequence
  - **Question** — Route to FAQ-based auto-reply or flag for human response
  - **Meeting Request** — Trigger calendar booking link delivery
- **Lead Qualification Criteria**: Classify incoming leads based on job title, company size, industry, and engagement signals from Sales Navigator
- **CRM Sync**: Push qualified leads and response data to Google Sheets tracking dashboard
- **Performance Tracking**: Pull campaign metrics (connection acceptance rate, response rate, call booking rate) into analytics dashboard

### Outreach Configuration (Prosp.AI — not built in n8n)

- 4 LinkedIn profiles configured with distinct audience segments
- Sales Navigator lead lists segmented by: job title, company size, industry, geography, recent activity
- Connection request messaging with A/B testing
- 10-day automated follow-up escalation cadence
- Loom video integration (face-on vs. product-focused A/B testing)

### Target Metrics

| Metric | Target |
|--------|--------|
| Connection Acceptance Rate | 25–35% |
| Response Rate (to follow-up) | 10–15% |
| Call Booking Rate | 5–10% |
| Monthly Connections (4 profiles) | 600–800 |

---

## 2. Workstream B: AI Content Engine (Core n8n Build)

### Content Pipeline Stages

1. **Topic Input** — Pull next topic from Google Sheets editorial calendar (tagged with pillar, audience, keywords, reference links)
2. **Topic Expansion** — Claude API call to expand topic into a structured content brief (headline, angle, target keyword, content pillar, CTA type)
3. **Blog Draft Generation** — Claude API call with voice guidelines and brief to produce 1,000–1,500 word blog post including heading structure, internal links, FAQ sections, and contextual CTAs
4. **Agentic Review** — Claude API call acting as editor: checks voice consistency, CTA placement for marketplace/Playbook, SEO keyword density, GEO-readiness, readability
5. **Revision Loop** — If review flags issues, loop back to drafting with editor notes (max 2 revision cycles)
6. **Approval Queue** — Save approved draft to Google Sheets/Airtable with status "Ready for Review", send notification
7. **Social Content Derivation** — From approved blog post, generate:
   - LinkedIn thought-leadership post (150–300 words with hook + insight + CTA to full article)
   - X/Twitter thread (5–7 tweets, thread structure)
   - 2–3 standalone short-form social snippets
8. **Publishing & Distribution** — Publish blog to CMS, queue LinkedIn and X/Twitter posts via Buffer/Typefully
9. **Post-Publish Tracking** — Update editorial calendar with "Published" status and URLs
10. **Performance Tracking** — Pull engagement data back into tracking sheet for reporting

### Content Types

| Type | Length | Frequency | Automation Level |
|------|--------|-----------|-----------------|
| Blog Post | 1,000–1,500 words | 1x/week (4/month) | AI-drafted, human-reviewed |
| LinkedIn Post | 150–300 words | 3–4x/week (12–16/month) | AI-drafted, auto-scheduled |
| X/Twitter Thread | 5–7 tweets | 5x/week (20+/month) | AI-drafted, manual review initially |
| Short-form Social | 1–2 sentences | As derived | AI-drafted |

### AI Integration Points

All Claude API calls use:
- **Model**: `claude-sonnet-4-20250514` (cost-efficient for content generation)
- **Endpoint**: `https://api.anthropic.com/v1/messages`
- **Headers**: `x-api-key`, `anthropic-version: 2023-06-01`, `content-type: application/json`
- **Token Budgets** (per SOW $50/month API budget constraint):
  - Blog posts: `max_tokens: 4096`
  - Social posts: `max_tokens: 1024`
  - Metadata/SEO: `max_tokens: 512`

### Claude API Call Points

1. **Topic Expansion** — Expand topic into structured brief
2. **Blog Draft Generation** — Full blog post from brief + voice guidelines
3. **Agentic Review** — Editor evaluation with scoring rubric
4. **Revision** — Redraft with editor notes (up to 2 cycles)
5. **LinkedIn Derivation** — Blog-to-LinkedIn post conversion
6. **X/Twitter Derivation** — Blog-to-Twitter thread conversion
7. **SEO Optimization** — Meta title, description, schema markup, AI-citable optimization
8. **Topic Generation** — Weekly topic ideation balanced across pillars
9. **Response Classification** — Outreach response type classification (Workstream A support)

### Scheduling Integrations

- **Phase A (initial)**: Buffer or Typefully for LinkedIn and X/Twitter scheduling
- **Phase B (future)**: Direct X API automation if Phase A metrics justify ROI

### SEO/AEO/GEO Optimization Requirements

**Traditional SEO:**
- Keyword research and clustering around 4 content pillars
- On-page optimization: title tags, meta descriptions, heading hierarchy, internal linking
- Technical SEO audit of seedlink.app (site speed, mobile, crawlability, sitemap)

**AEO (Answer Engine Optimization):**
- FAQ sections in every blog post with clear Q&A formatting
- Schema markup: FAQ schema, HowTo schema, Organization schema
- Concise, factual, authoritative statements for AI engine extraction
- "Best of" and comparison content for discovery queries

**GEO (Generative Engine Optimization):**
- Consistent publishing cadence on focused topic clusters
- Entity-rich content defining SeedLink, marketplace, Playbook, and positioning
- Cross-platform presence (blog, LinkedIn, X) for training data reinforcement
- Structured data and clear site architecture for AI crawlers

### Analytics and Tracking Requirements

- Weekly automated performance report
- Data sources: Google Analytics, LinkedIn analytics, X/Twitter analytics
- Report output: Google Sheets + Slack/email summary
- Tracked metrics: impressions, engagement, clicks, conversions per post and platform

### CTA Strategy

Every piece of content must include contextual CTAs driving readers to:
- **AI Tools Marketplace** — SeedLink's growing AI tools and agents marketplace tab
- **AI Playbook** — Milestone planner with tool recommendations for startup founders
- **Talent Matching** — SeedLink's core talent marketplace
- CTAs must be natural and non-salesy, woven into content where contextually appropriate

---

## 3. Integration Points

| Service/API | Purpose | Credential Reference |
|-------------|---------|---------------------|
| Anthropic Claude API | Content drafting, reviewing, social derivation, SEO, topic generation, response classification | `anthropic_api` |
| Google Sheets | Editorial calendar, analytics tracking, topics archive | `google_sheets` |
| Buffer or Typefully | Social media scheduling (LinkedIn + X/Twitter) | `buffer_api` or `typefully_api` |
| WordPress REST API (or CMS) | Blog publishing to seedlink.app | `wordpress_api` |
| Slack Webhook | Failure notifications, draft-ready alerts, weekly reports | `slack_webhook` |
| Google Analytics | Website traffic and conversion tracking | Via API or manual data pull |
| LinkedIn Analytics | Post engagement and follower metrics | Via Buffer/Typefully or manual |
| X/Twitter Analytics | Post engagement and follower metrics | Via Buffer/Typefully or manual |
| Google Search Console | SEO monitoring and keyword tracking | Via API or manual |
| Prosp.AI | LinkedIn outreach automation (webhook triggers for responses) | External (not n8n credential) |
| Sales Navigator | Lead list building and segmentation | External (used via Prosp.AI) |

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API authentication |
| `SEEDLINK_EDITORIAL_CALENDAR_ID` | Google Sheet ID for editorial calendar |
| `SEEDLINK_BLOG_URL` | Base URL for the SeedLink blog |
| `NOTIFICATION_SLACK_WEBHOOK` | Slack webhook URL for notifications |

---

## 4. Content Pillars

| Pillar | Topics & Themes | Target Audience | SEO/GEO Intent |
|--------|----------------|-----------------|-----------------|
| **Finding AI Talent** | How to hire AI builders, vetting AI talent, fractional AI teams, cost of AI development | Founders, startup CEOs | High-intent discovery queries |
| **Zero to MVP** | Validating ideas with AI, building MVPs fast, co-pilot workflows, when to hire vs. use agents, AI Playbook milestone guidance | Early-stage founders | Problem-aware search queries |
| **AI Industry & Trends** | Agent tech landscape, AI tools and agents ecosystem, AI marketplace dynamics, what's changing in AI hiring | Tech professionals, AI talent | Thought leadership, shareability |
| **SeedLink in Action** | Platform updates, match spotlights, user outcomes, AI tools marketplace highlights, Playbook walkthroughs, community milestones | All audiences | Brand authority, social proof |

---

## 5. Voice & Tone Requirements

- **Lead with value, not pitch** — Show how others are succeeding, not what SeedLink is selling
- **Founder-to-founder tone** — Speak as a peer who's building in the same space, not a vendor
- **Concrete over abstract** — Use specific numbers, examples, and outcomes rather than vague promises
- **Accessible technical language** — Write for smart non-technical founders who are learning about AI
- **Opinionated but not pushy** — Take clear positions on industry trends without lecturing

### Brand Context (for all prompts)

- SeedLink.app is an AI-augmented talent marketplace connecting founders and startups with AI talent (native builders, fractional experts, AI agent tools)
- ~150 users onboarded, 15 successful matches
- Growing AI tools and agents marketplace
- Recently launched AI Playbook (milestone planner with tool recommendations)
- Target audience: founders and teams building with AI

---

## 6. Monthly Retainer Workflows (Post-Launch)

### Workstream A (Prosp.AI Outreach)
- Lead list refreshes and Sales Navigator data pulls
- Messaging optimization and A/B test iterations
- New campaign creation and audience segmentation
- Prosp.AI troubleshooting and platform updates
- Monthly outreach performance reporting

### Workstream B (AI Content Engine)
- Content review, editing, and quality assurance (4 blog posts/month, 12–16 LinkedIn posts, 20+ X posts)
- Editorial calendar updates, topic refreshes, and marketplace/Playbook CTA optimization
- SEO/AEO/GEO keyword tracking and content adjustments
- n8n pipeline maintenance and prompt optimization
- Social scheduling management and A/B testing
- Monthly content performance reporting and recommendations

### Budget Constraints
- Claude API budget: ~$50/month (prompts should be efficient and focused)
- n8n hosting: $25/month minimum
- Total monthly retainer: $600/month (covers VV professional services)
- Software costs (client-held): Prosp.AI, Sales Navigator, n8n, Claude API, Buffer/Typefully

---

## 7. Project Constraints

- **Build timeline**: 4 weeks (Feb 11 – Mar 11, 2026)
- **Total project investment**: $4,000 ($2,000 at Phase 1 completion, $2,000 at Phase 4 completion)
- **Workflows must be practical and shippable** — not over-engineered
- **All workflow JSONs must be complete and importable** into n8n — no stubs or placeholders
- **All Claude API system prompts must be fully written** — no placeholder text
