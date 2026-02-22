## VC Intelligence Platform   [preview🔗](https://vc-intel-project.vercel.app/)

A precision AI scout for venture capital sourcing and triage.

Venture capital teams dedicate substantial time each week to sourcing and triage: scanning inbound deals, parsing newsletters, querying databases, monitoring founder movements, and identifying early signals before funding rounds become obvious. This work is repetitive, fragmented across tools, and deeply thesis-dependent—what qualifies as a strong lead for one fund is often pure noise for another. Existing workflows frequently default to generic alerts, broad keyword searches, and manual spreadsheets, resulting in duplicated effort, inconsistent tagging, shallow profiles, and difficulty translating “what we invest in” into durable, repeatable filters and scouting processes.

This project delivers a focused solution: a modern intelligence interface that turns a fund’s unique investment thesis into an always-on discovery engine. It reduces noise, surfaces high-signal companies earlier, and ensures every recommendation is explainable with transparent sources. The core experience combines:

1. Fast, faceted search and profile exploration
2. On-demand live enrichment that pulls and summarizes real public website content
3. Actionable organization tools (lists, notes, saved searches)

The user journey is designed to feel like a production-grade product: discover companies through intuitive search and filters → open a detailed profile → enrich with fresh web data → generate thesis-aligned insights → take immediate action (save to list, add notes, export). Built to be highly customizable per fund (thesis-first) while remaining fully transparent about data sources and reasoning.

### Core Alignment with Assignment Goals

- **Problem addressed**: Repetitive, fragmented, thesis-agnostic sourcing workflows
- **Solution delivered**: Thesis-driven, explainable discovery with live public-web enrichment
- **MVP focus**: Usable interface + one complete live enrichment path (server-side, secure, cached)
- **Inspiration**: Harmonic.ai (workflow), Cardinal.ai (thesis orientation), PitchBook/Crunchbase/etc. (patterns)

Built as a take-home assignment for the VC Intelligence Interface + Live Enrichment role (February 2026).

### Key Differentiators vs. Existing Tools
- **Live, on-demand enrichment** from public websites (not static database pulls)
- **Transparent sources + timestamps** for every extracted field
- **Server-side only** AI processing (keys never exposed client-side)
- **Thesis-first** design (inspiration from Harmonic.ai and Cardinal.ai workflows)

## Features Implemented (MVP Scope)

- **Companies Database**  
  Search, multi-filter (industry, stage, location), sort, pagination, real company profiles

- **Company Profile**  
  Overview metrics, signals timeline, research notes (localStorage), save-to-list dropdown  
  **Live AI Enrichment** — one-click fetch + Gemini extraction of:  
  • Executive summary (1–2 sentences)  
  • What they do (3–6 bullets)  
  • Keywords (5–10)  
  • Derived signals (2–4 inferred insights)  
  • Sources (URLs + timestamps)

- **Lists Management**  
  Create lists, add/remove companies, export as JSON (CSV stretch)

- **Saved Searches**  
  Basic save & re-run capability (stretch: full filter persistence)

- **Navigation & UX**  
  Sidebar + global search bar, responsive layout, dark/light mode support, professional typography (Geist)

- **Data & Persistence**  
  20 real companies in mock data (with live websites)  
  All user data (notes, lists, saved searches, enrichment cache) persisted in browser localStorage

## Tech Stack

- Framework: Next.js 14+ (App Router)  
- UI: shadcn/ui components  
- Styling: Tailwind CSS v4  
- AI: Google Gemini (model: gemini-3-flash-preview)  
- Icons: Lucide React  
- Fonts: Geist Sans / Mono  
- Persistence: Browser localStorage (no backend required for MVP)

## Live Enrichment Implementation

- Endpoint: `POST /api/enrich` (Next.js Route Handler)  
- Process:  
  1. Client sends company website URL  
  2. Server fetches public homepage (no auth, no evasion)  
  3. Content cleaned and sent to Gemini with structured JSON prompt  
  4. Returns: summary, whatTheyDo, keywords, derivedSignals, sources  
- Caching: results stored in localStorage per company (key: `enrich-{id}`)  
- Security: API key only in server environment — never exposed to browser  
- Transparency: every field includes source URL + exact timestamp

## Getting Started

### Prerequisites
- Node.js
- npm/yarn

### Installation

```bash
- Clone the repository
git clone <your-repo-url>
cd vc-intelligence-platform

- Install dependencies
npm install

** Create .env.local and add your Gemini key
cp .env.local
- Then edit .env.local:
- GEMINI_API_KEY=your-key-from-aistudio.google.com
```
---
## Built by

**Vishank Singh**  
Full-stack developer & AI enthusiast  
Mumbai, India  

GitHub: https://github.com/vishank020  
LinkedIn: https://www.linkedin.com/in/vishank-singh/  
Portfolio: https://vishanksingh.vercel.app/ 
