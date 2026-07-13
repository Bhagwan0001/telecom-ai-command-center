# Telecom AI Command Center (TAICC)

> Enterprise AI Operating Platform for Telecom Intelligence

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React 19, Vite, TypeScript, Tailwind CSS, Shadcn UI     |
| Backend    | Node.js, Express, TypeScript, Prisma, PostgreSQL, Redis  |
| AI         | LangChain, OpenAI SDK, Gemini SDK                        |
| DevOps     | Docker, GitHub Actions, nginx                            |

## Project Structure

```
telecom-ai-command-center/
├── apps/
│   ├── web/            # React 19 + Vite frontend
│   └── server/         # Express + Prisma backend
├── packages/
│   ├── config/         # Shared ESLint, Prettier, TSConfig
│   ├── types/          # Shared TypeScript types & Zod schemas
│   ├── shared/         # Shared utilities & constants
│   ├── ui/             # Shadcn UI component library
│   └── logger/         # Winston & Morgan logging
├── docs/               # Documentation
├── scripts/            # Automation scripts
├── docker-compose.yml  # PostgreSQL + Redis + App services
└── .github/workflows/  # CI/CD pipelines
```

## Prerequisites

- **Node.js** >= 20
- **npm** >= 10
- **Docker** & **Docker Compose** (for databases)

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd telecom-ai-command-center
npm install
```

### 2. Start infrastructure

```bash
docker compose up -d postgres redis
```

### 3. Configure environment

```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
```

### 4. Setup database

```bash
npm run db:generate -w apps/server
npm run db:push -w apps/server
```

### 5. Run development servers

```bash
npm run dev
```

This starts both the frontend (http://localhost:3000) and backend (http://localhost:4000) concurrently.

## Available Scripts

| Script              | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start frontend and backend in dev mode      |
| `npm run build`     | Build all workspaces                        |
| `npm run lint`      | Lint all workspaces                         |
| `npm run format`    | Format all files with Prettier              |

### Server-specific

| Script                              | Description              |
| ----------------------------------- | ------------------------ |
| `npm run db:generate -w apps/server`| Generate Prisma client   |
| `npm run db:push -w apps/server`   | Push schema to database  |
| `npm run db:migrate -w apps/server` | Run Prisma migrations    |
| `npm run db:studio -w apps/server`  | Open Prisma Studio       |

## Docker

### Full stack

```bash
docker compose up --build
```

### Infrastructure only (for local dev)

```bash
docker compose up -d postgres redis
```

## License

Proprietary — Deutsche Telekom Digital Labs
