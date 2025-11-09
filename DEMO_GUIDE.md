# Convergent - Demo Presentation Guide

## Quick Start

```bash
npm run dev
```

Visit: http://localhost:3000

## Key Features to Showcase

### 1. Landing Page
- Beautiful Chime-inspired gradient hero
- Smooth animations with framer-motion
- Quick search suggestions
- Clear value proposition
- "How It Works" section
- OpenAlex stats section

### 2. Search & Discovery
Try these demo searches:
- "artificial intelligence machine learning"
- "biotech genetic engineering"
- "quantum computing"
- "climate change renewable energy"

Features:
- Real-time search from OpenAlex API
- Match scoring algorithm
- Advanced filters (country, institution, h-index, citations)
- Responsive researcher cards
- Pagination

### 3. Researcher Profiles
Click any researcher to see:
- Comprehensive profile with metrics (h-index, citations, i10-index)
- Research areas/concepts
- Top publications with DOI links
- Recent activity timeline
- Impact metrics

## Demo Script

### Opening (30 seconds)
"Convergent solves a critical problem for scaling tech companies: they need R&D expertise but can't afford to build full research teams. We connect them with university researchers instantly."

### Search Demo (1 minute)
1. Show landing page and value prop
2. Enter search: "artificial intelligence"
3. Show results with match scores
4. Apply filters (e.g., country: US, min h-index: 20)
5. Highlight the speed and relevance

### Profile Deep Dive (1 minute)
1. Click into a high-match researcher
2. Show comprehensive data:
   - Academic credentials
   - Research expertise
   - Publication track record
   - Recent activity
3. Emphasize "Connect" CTA

### Technology Highlight (30 seconds)
"Built on OpenAlex - 100M+ papers, 250M+ researchers, always up-to-date. No manual data entry, no stale information."

### Close (30 seconds)
"This is a demo MVP. Next steps: user accounts, direct messaging, collaboration tracking, and partnership analytics."

## Technical Highlights for Investors

- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Data Source**: OpenAlex API (open, free, comprehensive)
- **Architecture**: Serverless, scalable, low infrastructure cost
- **MVP Built**: In [timeframe] with [resources]
- **Ready to Scale**: Add auth, messaging, analytics as needed

## Key Metrics to Mention

- 250M+ researchers available
- 100M+ research papers indexed
- 100K+ institutions worldwide
- Real-time data, always current
- Search results in <2 seconds

## Potential Questions & Answers

**Q: How do you verify researcher credentials?**
A: OpenAlex aggregates from verified sources (ORCID, Crossref, institutional databases). We display h-index and citation counts as quality signals.

**Q: What's the revenue model?**
A: Subscription tiers for companies (freemium → pro → enterprise). Universities access free to attract industry partnerships.

**Q: What about competition?**
A: Existing platforms are slow, manual, and fragmented. We're the first AI-powered, instant matchmaking platform using open data.

**Q: How do you scale beyond MVP?**
A: Add user accounts, messaging, collaboration workspace, outcome tracking, and ML-powered recommendations based on success patterns.

**Q: Why now?**
A: OpenAlex launched 2022 (open alternative to Microsoft Academic). Rising R&D costs. Remote work normalized university-industry collaboration.

## Demo Tips

1. **Pre-load** a few good searches before demo (cache in browser)
2. **Have backup** searches ready if API is slow
3. **Practice timing** - 3-5 minutes max
4. **Focus on pain point** - expensive internal R&D vs. fast partnership
5. **Show data quality** - real h-indexes, real publications, real institutions
6. **Emphasize speed** - what takes months now takes minutes

## Contact for Questions

- Emphasize this is a demo/proof of concept
- Production would include auth, messaging, compliance, etc.
- Tech stack is production-ready and scalable

