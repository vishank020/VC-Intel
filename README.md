# VC Intelligence Platform

A premium web application for researching companies and managing investment intelligence. Built with Next.js, React, and Tailwind CSS.

## Overview

The VC Intelligence Platform is a full-featured SaaS application designed for venture capitalists, investors, and business analysts to research companies, organize findings, and maintain a searchable database of prospects and targets.

## Core Features

### 1. Companies Database
- **Search & Filter**: Full-text search across 20+ mock companies
- **Advanced Filtering**: Filter by industry, funding stage, and location
- **Sorting**: Sort by company name, founding year, or location
- **Pagination**: Browse companies with intuitive pagination controls
- **Company Details**: Click any company to view detailed profile information

### 2. Company Profiles
- **Overview Section**: Key metrics including founded year, stage, location, and founders
- **Signals Timeline**: Historical company updates and milestones
- **Research Notes**: Add custom notes and annotations for each company
- **AI Enrichment**: Click the "Enrich" button to generate AI-powered company intelligence including:
  - Executive summary
  - Key capabilities
  - Industry keywords
  - Derived signals and insights
  - Source references
- **Save to List**: Quick access dropdown to add companies to your custom lists

### 3. Lists Management
- **Create Lists**: Build custom collections to organize companies by investment criteria
- **Add/Remove Companies**: Manage list contents dynamically
- **Export Data**: Download lists as CSV or JSON files
- **Delete Lists**: Remove lists with confirmation dialogs
- **Persistent Storage**: All lists automatically saved to browser localStorage

### 4. Saved Searches
- **Search History**: Pre-populated with example searches like "Series B Enterprise SaaS" and "Seed FinTech"
- **Rerun Searches**: Execute saved searches and update last-run timestamps
- **Search Metadata**: View filter descriptions and result counts
- **Manage Searches**: Delete searches you no longer need
- **Quick Access**: Easily return to frequently used search queries

### 5. Navigation & UI
- **Sidebar Navigation**: Fixed left sidebar with links to all major sections
- **Responsive Design**: Clean, professional interface that works on all screen sizes
- **Dark/Light Mode**: Full support for both light and dark themes
- **Search Bar**: Global search functionality in the header

## Application Structure

```
app/
├── page.tsx                          # Home page (redirects to companies)
├── layout.tsx                        # Root layout with sidebar
├── globals.css                       # Design tokens and styles
├── companies/
│   ├── page.tsx                      # Companies list page
│   └── [id]/page.tsx                 # Individual company profile
├── lists/page.tsx                    # Lists management page
├── saved/page.tsx                    # Saved searches page
└── api/
    └── enrich/route.ts               # AI enrichment API endpoint

components/
├── sidebar.tsx                       # Main navigation sidebar
└── header.tsx                        # Search and header bar

lib/
├── mock-data.ts                      # Mock company and list data
└── utils.ts                          # Utility functions
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks with localStorage persistence
- **Typography**: Geist font family
- **Icons**: Lucide React

## Design System

### Color Scheme
- **Primary**: Teal/Blue (#0066FF)
- **Secondary**: Cyan (#00D9FF)
- **Background**: Clean white/dark gray
- **Accents**: Professional blue tones

### Features
- Semantic design tokens for consistent theming
- Light and dark mode support
- Professional enterprise aesthetic
- Responsive flexbox-based layouts

## Data Persistence

All user data is automatically persisted to browser localStorage:
- Custom lists and their company contents
- Saved search queries and metadata
- Research notes on company profiles

Data syncs in real-time across the application without requiring a backend.

## Getting Started

### Installation

```bash
# Clone or download the project
git clone <repository-url>
cd v0-project

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You'll be automatically redirected to the companies page.

### Usage Workflows

#### Researching a Company
1. Go to **Companies** page
2. Use search bar to find a company
3. Click the company name to view profile
4. Click **Enrich** to generate AI insights
5. Add notes in the research section
6. Click "Save to List" to organize your findings

#### Building a Target List
1. Go to **Lists** page
2. Click "Create New List"
3. Enter list name and description
4. Add companies from the Companies page using "Save to List"
5. Export as CSV/JSON when ready to share
6. Delete list when no longer needed

#### Using Saved Searches
1. Go to **Saved Searches** page
2. Click any saved search to view results
3. Click "Rerun" to update the search timestamp
4. Delete searches you no longer use

## Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Companies | `/companies` | Browse and search company database |
| Company Profile | `/companies/[id]` | View detailed company info and enrich data |
| Lists | `/lists` | Create and manage custom company lists |
| Saved Searches | `/saved` | Access frequently used search queries |

## API Endpoints

### Enrich Company Data
- **Endpoint**: `POST /api/enrich`
- **Parameters**: Company data object
- **Returns**: Enriched company intelligence with summary, capabilities, keywords, and signals

## Features Highlights

- **Real-time Search**: Instant filtering as you type
- **Smart Filtering**: Multi-field filter combinations
- **Export Capabilities**: Download lists in standard formats
- **Notes Integration**: Add research observations directly on profiles
- **Quick Actions**: Save to list, enrich, and navigate without page reloads
- **Browser Storage**: No account needed, data stays private on your device
- **Professional UI**: Enterprise-grade design suitable for investor presentations

## Mock Data

The application includes 20 pre-loaded companies across various industries and funding stages to demonstrate functionality. Companies include TechCorp, InnovateLabs, DataFlow Systems, FinanceAI, CloudHub, and more.

## Browser Compatibility

Works on all modern browsers that support localStorage and ES6 JavaScript:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Future Enhancements

Potential features for expansion:
- Real API integration with live company databases
- User authentication and cloud storage
- Real AI/LLM integration for enrichment
- Email alerts for target companies
- Collaboration and team features
- Custom report generation
- Integration with CRM systems

---

For questions or support, contact the development team.
