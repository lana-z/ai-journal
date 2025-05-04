# AI Journal App: Architecture and Implementation Plan

## Overview
The AI Journal App allows users to read short journal entries and click through to full blog posts generated and enhanced by AI. Admins create the initial entries and CrewAI agents and MCP (Model Context Protocol) act as research, editorial and marketing team enhancing the AI-driven content and automating the workflow. 

The app has two distinct interfaces:
1. **Reader Interface**: A public-facing, polished UI for readers to discover and consume content
2. **Admin Interface**: A functional dashboard for the admin (single user) to create journal entries and manage content

This separation allows for a focused user experience for readers while providing all necessary tools for content creation to the admin.

### Architecture
Next.js backend in-place (no Python backend switch)

Adds Python-only MCP server as a standalone process for clean tool logic

Allows easy reuse of CrewAI agent logic later in CLI, cron, or workflow engine

Keeps CrewAI logic decoupled and testable

---

#### Architecture Notes

Adds a Python-only MCP server as a standalone process to encapsulate tools used across agents or automation workflows. Tasks like keyword extraction, blog scoring, or notification logic will be MCP tools. Simpler LLM calls (e.g., tag suggestion or title generation) will be handled inline without MCP.

Tag suggestions and social prompts will be handled inline in the app using direct LLM calls. MCP will only be used for shared logic or agent workflows, not lightweight UI helpers.

Only use MCP for:
- Multi-agent shared logic (e.g. SEO score used by blog and social agents)
- Background/scheduled operations (e.g. blog performance re-analysis)
- Notifications or structured I/O integrations

Avoid MCP for:
- Single-step UI enhancements
- Simple model completions (titles, tags, summaries)

| Function          | Handled via MCP? | Why                                  |
| ----------------- | ---------------- | ------------------------------------- |
| Keyword extraction| ✅ Yes           | Used by multiple agents              |
| Blog score        | ✅ Yes           | Shared and reused                    |
| Tag suggestion    | ❌ No            | Inline app UX                        |
| Social caption    | ❌ Initially     | Simple formatting, fast inline       |

## Project File Structure (Next.js 13+ App Router)

complete this section

---

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Prisma (Neon)
- **Authentication**: Clerk or NextAuth.js
- **AI**: OpenAI API, CrewAI agent orchestration
- **MCP Server**: Python-based tool server exposing shared logic (SEO, keywording, scraping) to CrewAI agents via MCP
- **Hosting**: Vercel
- **Media**: Vercel Blob

**Key additions:**
- **MCP server** (in Python) to expose tools for agents (API lookups, notifications, SEO, etc.)
- **CrewAI orchestration** using TypeScript or Python triggered from Next.js API route
- **Improved CrewAI API route** to use agents + tools

---

## Data Models (Prisma Schema)
```prisma
model JournalEntry {
  id          String    @id @default(cuid())
  date        DateTime
  title       String
  content     String
  tags        String[]
  blogPost    BlogPost?
  published   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model BlogPost {
  id             String       @id @default(cuid())
  slug           String       @unique
  title          String
  summary        String
  content        String       @db.Text
  publishDate    DateTime
  journalEntry   JournalEntry @relation(fields: [journalEntryId], references: [id])
  journalEntryId String       @unique
  tags           String[]
  aiGenerated    Boolean      @default(true)
  published      Boolean      @default(false)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}
```

---

## Admin Workflow (AI Integration)
1. Admin logs into the dashboard
2. Admin creates a journal entry (title, date, content, tags)
3. AI suggests tags and content in realtime to assist admin with quick entry
4. Admin posts the journal entry; moves on to unrelated work.
5. Posting triggers CrewAI orchestration layer:
6. CrewAI agents: 
- generate a draft of a corresponding blog post. 
- enhance with internet context, SEO, images, memes, links
- use MCP tools for keyword extraction, scraping, etc.
- notify admin when ready.
7. Admin reviews, and publishes blog. 
8. Newsletter with blog post is sent by CrewAI agent(s).
9. CrewAI agent(s) generate and post social content (LinkedIn, tweets, IG posts, substack, etc.) and future scheduled posts/content calendar.  
(No need for admin approval of social content because all social content is pulled from blog posts.)
---

## Key API Route: `/api/generate-blog/route.ts`
```ts
export async function POST(request: Request) {
  const { journalEntryId } = await request.json();
  const journalEntry = await prisma.journalEntry.findUnique({ where: { id: journalEntryId } });
  if (!journalEntry) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const prompt = `Expand the journal entry into a blog post...`;
  const completion = await openai.chat.completions.create({ model: "gpt-4", messages: [{ role: "user", content: prompt }] });
  const content = completion.choices[0].message.content;
  const slug = slugify(journalEntry.title);

  const blogPost = await prisma.blogPost.create({
    data: {
      title: journalEntry.title,
      slug: `${slug}-${Date.now()}`,
      summary: journalEntry.content,
      content,
      publishDate: new Date(),
      journalEntryId: journalEntry.id,
      tags: journalEntry.tags,
      aiGenerated: true,
      published: false,
    },
  });
  return NextResponse.json({ blogPost });
}
```

---
# Implementation Phases

### Phase 1: Core
- [x] Initialize Next.js app with Tailwind CSS and Shadcn (complete)
- [x] Set up project routing and page structure
  - [x] Configure app router with proper layout hierarchy
  - [x] Implement responsive navigation component
  - [x] Set up error handling and loading states
- [x] Set up Vercel deployment
  - [x] Configure environment variables
  - [x] Set up preview deployments for branches
- [x] Create Prisma schema and connect to Neon/PostgreSQL
  - [x] Define models for users, journal entries, blog posts, tags
  - [x] Set up database migrations workflow
  - [x] Create and connect to Neon PostgreSQL database
- [x] Seed example content (journal entries, blog posts)
  - [x] Create seed script with realistic sample data
  - [x] Verify seed data in database

### Phase 2: Admin & Reader Interfaces
- [ ] Implement reader-focused home page
  - [x] Create card components for journal entry previews
  - [x] Connect reader interface to database (display real journal entries)
  - [ ] Add filtering and sorting options
  - [ ] Implement pagination for large datasets
  - [ ] Design polished UI focused on content discovery
- [ ] Implement admin interface and authentication (Clerk or NextAuth.js)
  - [ ] Set up authentication provider
  - [ ] Create protected routes and middleware
  - [ ] Build admin dashboard layout
  - [ ] Create journal entry form with rich text editor
  - [ ] Implement journal entry management (create, edit, delete)
- [ ] Add AI-assisted tag suggestions (prompt to OpenAI)
  - [ ] Implement OpenAI API integration
  - [ ] Create prompt template for tag extraction
  - [ ] Add UI for accepting/rejecting suggestions
- [ ] Implement blog post listing on /blog (Blog)
  - [ ] Create filterable post grid
  - [ ] Add tag-based navigation
  - [ ] Implement search functionality
- [ ] Display individual blog posts with /blog/[slug]
  - [ ] Build responsive post template
  - [ ] Add related posts section
  - [ ] Implement social sharing options
- [ ] Test Phase 2 features
  - [ ] Test admin workflow: creating, editing, and managing journal entries
  - [ ] Test reader experience: browsing, filtering, and reading content
  - [ ] Ensure both interfaces are functional before proceeding to Phase 3
  - [ ] Test and refine Responsive design for different screen sizes and mobile

### Phase 3: CrewAI Workflow
- [ ] Implement /api/generate-blog/route.ts (OpenAI integration)
  - [ ] Set up secure API key management
  - [ ] Create structured prompt templates
  - [ ] Implement rate limiting and error handling
- [ ] Set up Python MCP server with endpoints: /keywords, /seo-score, /notify
  - [ ] Develop Python backend with FastAPI
  - [ ] Implement keyword extraction algorithm
  - [ ] Create SEO scoring system
  - [ ] Set up notification service
- [ ] Define CrewAI agents and YAML or config file
  - [ ] Create agent definitions for different roles (researcher, writer, editor)
  - [ ] Define agent workflows and interactions
  - [ ] Implement configuration system for easy updates
- [ ] Trigger CrewAI orchestration via API route
  - [ ] Build orchestration controller
  - [ ] Implement job queue for async processing
  - [ ] Create status tracking system
- [ ] Log agent output and notify admin when ready
  - [ ] Implement structured logging
  - [ ] Create admin notification system (email/SMS)
  - [ ] Build status dashboard for monitoring
- [ ] Add modular prompt templates in /lib/prompts.ts
  - [ ] Create reusable prompt components
  - [ ] Implement versioning for prompts
  - [ ] Add prompt testing framework

### Phase 4: Automation
> Outcome: Repetitive content tasks and improvement cycles are run automatically on a schedule or based on content state.
- [ ] Set up scheduled cron jobs for:
  - [ ] Weekly newsletter draft generation
    - [ ] Select posts by performance or tags
    - [ ] Populate email templates
    - [ ] If no new journal is posted in X days, trigger a CrewAI prompt to refresh an old post or generate a “weekly roundup” from older posts
  - [ ] Social media scheduling
    - [ ] Format cross-platform versions
    - [ ] Post at optimal times
- [ ] Create trigger system (webhooks or polling)
  - [ ] On publish → add to social queue
  - [ ] On low score → flag for CrewAI refresh

### Phase 5: Analytics & Distribution
> Outcome: Admins can track performance, understand user behavior, and distribute content via email.
- [ ] Add analytics with PostHog or Vercel
  - [ ] Set up event tracking and goals
  - [ ] Build analytics dashboard
- [ ] Email distribution system (Substack API)
  - [ ] Implement subscription management
  - [ ] Build and test email templates
  - [ ] Set up auto-campaigns (new blog post, digest)

### Phase 6: Media Storage
- [ ] Implement media storage (Vercel Blob)
  - [ ] Set up secure upload system
  - [ ] Implement image optimization
  - [ ] Create media library interface
  - [ ] Add metadata management for assets

  ### Phase 7: AI-Driven Content Optimization
- [ ] Re-analyze published blog posts on a schedule
  - [ ] Identify low-performing posts
  - [ ] Trigger CrewAI updates with new trending context
- [ ] Refactor SEO meta descriptions and titles dynamically
- [ ] Add automatic internal linking between related posts
- [ ] Use sentiment or tone analysis to recommend edits
- [ ] Update social content with fresh messaging and links
- [ ] Use analytics and CrewAI to recommend:
  - [ ] "Your most visited post last month was ____. Want to create a journal entry to follow up?"
  - [ ] "This tag is trending: ___. Want to create a new entry based on it?"
  - [ ] Include CTA button: [Create Draft] that opens the journal entry form pre-filled with suggestions

### Phase 8 (Maybe): Growth & Community 
- [ ] Add user registration and profile settings
- [ ] Enable post reactions or comments
- [ ] Integrate referral/share tracking
- [ ] Launch public journal feed with filters

## Appendix: Cron Jobs
Cron jobs are automated scheduled tasks...
- Re-run CrewAI workflows for stale drafts
- Generate weekly newsletters automatically
- Schedule social reposts for engagement optimization
  - [ ] Blog post health checks
    - [ ] Score stale or underperforming posts
    - [ ] Trigger re-generation or enhancement

## TODO Notes: Skipped During Phase Work 
- [ ] Change mobile menu component (mobile-menu.tsx) from slide-out sheet to something I like better
- [ ] Finish content on Let's Partner to make an Impact section on About Me page
- [ ] Logo/ more interesting header
- [ ] Add custom favicon
- [ ] Check metadata language / optimize SEO 
- [ ] Implement OpenGraph tags for social sharing
- [ ] Set up basic analytics to track page load times and user interactions
- [ ] Add custom favicon
- [ ] Add normalization of tags, deduplication, validation,and slugification or consider a dedicated tags model enabling tag management, metadata, and better filtering. Currently the tags are simply implemented as a string array in the journal entry model.
  - [ ] Implement connection pooling for Vercel serverless environment when needed for higher traffic