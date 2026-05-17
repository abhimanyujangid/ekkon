


# Ekkon

Ekkon is an AI voice generation platform for turning text into realistic, natural-sounding speech. It is built for creators and teams who need quick voice drafts for stories, podcasts, marketing copy, notifications, and product experiences.

<img width="2559" height="963" alt="Screenshot 2026-05-17 at 6 18 29 PM" src="https://github.com/user-attachments/assets/4036b97e-649d-4ad6-a78c-e3fae0cb1a24" />

<img width="2559" height="1305" alt="Screenshot 2026-05-17 at 6 19 25 PM" src="https://github.com/user-attachments/assets/c92d105e-b095-4831-aaa7-6fb7b0c786f1" />

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
