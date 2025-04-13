# AI Journal App

A notes and blog application implemented with AI integration and Model Context Protocol (MCP) .

## Project Overview

The AI Journal App allows the admin to utilize AI agents and Model Context Protocol (MCP) to enhance the content and automate the workflow, while allowing users to read short journal entries and click through to full blog posts.

## Author
Lana Zumbrunn

## Features

- **Journal Entries**: Chronological display of short-form AI experiences and learnings
- **Blog Posts**: Expanded content related to journal entries
- **Responsive Design**: Mobile and desktop optimized layouts
- **Search Functionality**: Find specific journal entries and blog posts
- **Dynamic Content Loading**: Content loaded from a database (coming soon)

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Prisma (Neon) - coming soon
- **Authentication**: Clerk or NextAuth.js - coming soon
- **AI Integration**: OpenAI API, CrewAI agent orchestration - coming soon
- **Hosting**: Vercel

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implementation Plan

The project is being implemented in phases:

1. **Phase 1**: Core functionality and UI
2. **Phase 2**: Journal & Blog Features
3. **Phase 3**: AI Integration
4. **Phase 4**: Automation

See the [planning document](./docs/planning.md) for more details.

## License

[MIT](https://choosealicense.com/licenses/mit/)
