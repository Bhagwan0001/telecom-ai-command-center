# Telecom AI Command Center (TAICC)

> Enterprise AI Operating Platform for Telecom Intelligence powered by AI, real-time monitoring, and intelligent network operations.

---

# 🌐 Live Demo

### Frontend (Vercel)

https://telecom-ai-command-center-web-knqw.vercel.app

### Backend API (Railway)

https://telecom-ai-command-center-production.up.railway.app

### GitHub Repository

https://github.com/Bhagwan0001/telecom-ai-command-center

---

# 🚀 Features

- AI Command Center
- Real-time Telecom Dashboard
- Network Monitoring
- Live Incident Management
- AI Agent Orchestration
- Customer Support Dashboard
- Analytics & Reports
- JWT Authentication
- Socket.IO Real-time Communication
- PostgreSQL Database
- Prisma ORM
- Google Gemini AI Integration
- Docker Support
- Railway Deployment
- Vercel Deployment
- Responsive Modern UI

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Shadcn UI |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Realtime | Socket.IO |
| AI | Google Gemini, LangChain |
| Caching | Redis |
| DevOps | Docker, Railway, Vercel |
| Version Control | Git & GitHub |

---

# 📁 Project Structure

```
telecom-ai-command-center/
│
├── apps/
│   ├── web/                     # React Frontend
│   └── server/                  # Express Backend
│
├── packages/
│   ├── config/
│   ├── logger/
│   ├── shared/
│   ├── types/
│   └── ui/
│
├── docs/
├── scripts/
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🏗 System Architecture

```
                   React + Vite
                     (Vercel)
                         │
                         │
                  REST API / Socket.IO
                         │
                         │
               Express + TypeScript
                    (Railway)
                         │
              ┌──────────┴──────────┐
              │                     │
         PostgreSQL             Gemini AI
            Prisma             LangChain
```

---

# ⚙️ Prerequisites

- Node.js >= 20
- npm >= 10
- Docker
- Docker Compose

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/Bhagwan0001/telecom-ai-command-center.git

cd telecom-ai-command-center
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment

Backend

```bash
cp apps/server/.env.example apps/server/.env
```

Frontend

```bash
cp apps/web/.env.example apps/web/.env
```

---

## 4. Start PostgreSQL & Redis

```bash
docker compose up -d postgres redis
```

---

## 5. Generate Prisma Client

```bash
npm run db:generate -w apps/server
```

---

## 6. Push Database Schema

```bash
npm run db:push -w apps/server
```

---

## 7. Run Development

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8080
```

---

# 📦 Available Scripts

## Root

| Command | Description |
|----------|-------------|
| npm run dev | Run frontend & backend |
| npm run build | Build all workspaces |
| npm run lint | Lint project |
| npm run format | Format source code |

---

## Backend

| Command | Description |
|----------|-------------|
| npm run build -w apps/server | Build backend |
| npm run start -w apps/server | Start backend |
| npm run db:generate -w apps/server | Generate Prisma Client |
| npm run db:push -w apps/server | Push schema |
| npm run db:migrate -w apps/server | Run migrations |
| npm run db:studio -w apps/server | Open Prisma Studio |

---

# 🐳 Docker

## Run Entire Stack

```bash
docker compose up --build
```

## Run Infrastructure Only

```bash
docker compose up -d postgres redis
```

---

# 🌍 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Railway |
| Database | PostgreSQL (Railway) |
| AI | Google Gemini |
| Cache | Redis |

---

# 🔐 Environment Variables

## Backend

```env
PORT=
DATABASE_URL=
JWT_SECRET=
GEMINI_API_KEY=
REDIS_URL=
NODE_ENV=
```

---

## Frontend

```env
VITE_API_URL=
```

---

# 📸 Application Modules

- Dashboard
- AI Command Center
- Network Monitoring
- Live Incident Center
- AI Agents
- Customer Support
- Analytics
- Reports
- Settings

---

# 📈 Highlights

- Enterprise Monorepo Architecture
- Modern React 19 UI
- Real-time Socket Communication
- AI Powered Telecom Assistant
- Scalable Backend Architecture
- Dockerized Deployment
- Production Ready
- Railway + Vercel Hosting

---

# 👨‍💻 Author

**Bhagwan Singh**

Software Engineer

GitHub

https://github.com/Bhagwan0001

---

# 📄 License

This project is developed for educational and portfolio purposes.

© 2026 Bhagwan Singh