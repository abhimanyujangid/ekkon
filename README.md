# Ekkon

Ekkon is an AI voice generation platform for turning text into realistic, natural-sounding speech. It is built for creators and teams who need quick voice drafts for stories, podcasts, marketing copy, notifications, and product experiences.

## Features

- Text-to-AI-voice generation workflow
- Voice browsing and organization-scoped voice management
- Dashboard for fast access to voice tools
- Cloud audio storage support through R2
- Authentication and organization management with Clerk

## Tech Stack

- Next.js App Router
- React and TypeScript
- tRPC and TanStack Query
- Prisma with PostgreSQL
- Tailwind CSS and shadcn/ui

## Getting Started

Install dependencies:

```bash
npm install
```

Set up the required environment variables in `.env`, including database, app URL, Clerk, and R2 storage credentials.

Generate Prisma Client:

```bash
npm run postinstall
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use Ekkon locally.

## Development

Run lint checks before shipping changes:

```bash
npm run lint
```
