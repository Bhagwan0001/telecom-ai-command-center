# Monorepo Initialization Plan

This plan details the steps to bootstrap a production-grade monorepo using npm workspaces for the Telecom AI Command Center, specifically adhering to the requirement of **no feature code**, just the foundational structure and configurations.

## User Review Required

Please review the following structural decisions:
- **Task Runner:** As requested, we will use **npm workspaces**. I will configure root-level scripts using `concurrently` (or standard npm scripts) to manage running the frontend and backend together. Are you comfortable with this, or would you prefer a tool like Turborepo?
- **Frontend Vite Setup:** I will scaffold the Vite React 19 app and configure Tailwind CSS and absolute imports (`@/*`).
- **Prisma Initialization:** I will initialize `prisma` in the backend but leave the schema empty. 
- **Docker:** A `docker-compose.yml` will be set up for PostgreSQL and Redis, along with Dockerfiles for the frontend and backend.

## Proposed Changes

### 1. Root Configuration
- **`package.json`**: Setup npm workspaces (`apps/*`, `packages/*`) and root scripts (`dev`, `build`, `lint`, `format`, `prepare` for Husky).
- **Tooling**: `.editorconfig`, `.prettierrc`, `.eslintrc.js`, `tsconfig.base.json`, `lint-staged.config.js`.
- **Git Hook**: Configure Husky for pre-commit linting.
- **VS Code**: Workspace settings (`.vscode/settings.json`) enforcing formatting on save and suggested extensions.
- **`.gitignore`**: Standard monorepo ignores (node_modules, dist, .env, etc.).

### 2. Packages (`packages/`)
- **`packages/config`**: Shared ESLint, Prettier, and TypeScript configurations.
- **`packages/types`**: Exported shared TypeScript types and Zod schemas.
- **`packages/shared`**: Common utility functions.
- **`packages/ui`**: React component library setup for Shadcn UI and Tailwind CSS.
- **`packages/logger`**: Winston and Morgan configuration exported for the server app.

### 3. Apps (`apps/`)
- **`apps/web`**: 
  - Framework: Vite + React 19 + TypeScript.
  - Configs: `vite.config.ts` (with path aliases), `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`.
  - Dependencies setup for React Router v7, TanStack Query, Zustand, React Hook Form, Zod, Axios, Lucide, Framer Motion, Recharts.
- **`apps/server`**:
  - Framework: Node.js + Express + TypeScript.
  - Configs: `tsconfig.json`, `prisma/schema.prisma` (empty).
  - Dependencies setup for Express, JWT, Redis, LangChain, OpenAI SDK, Gemini SDK.

### 4. DevOps & Documentation
- **`docker-compose.yml`**: PostgreSQL & Redis services.
- **`apps/web/Dockerfile`** & **`apps/server/Dockerfile`**: Multi-stage builds for production.
- **`.github/workflows/ci.yml`**: GitHub Actions pipeline for linting, type-checking, and building.
- **`README.md`**: Complete installation and run guide.
- **Folders**: Empty `docs/` and `scripts/` directories.

## Verification Plan

1. Verify folder structure matches the requirements.
2. Run `npm install` at the root to ensure workspace hoisting succeeds.
3. Validate `npm run lint` and `npm run format` across all packages.
4. Validate that all requested config files (Tailwind, absolute imports, tsconfig, etc.) are properly interlinked.
