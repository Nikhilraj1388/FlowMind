# FlowMind — Deployment Guide

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐
│   Vercel         │     │   Railway              │
│   (Frontend)     │────▶│   ┌─────────────────┐ │
│   Next.js 16     │     │   │ API Server      │ │
│   apps/web       │     │   │ Express :4000   │ │
└─────────────────┘     │   └────────┬────────┘ │
                         │            │          │
                         │   ┌────────▼────────┐ │
                         │   │ PostgreSQL 16   │ │
                         │   └─────────────────┘ │
                         │   ┌─────────────────┐ │
                         │   │ Redis 7         │ │
                         │   └─────────────────┘ │
                         └──────────────────────┘
```

---

## 1. Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Vercel Account](https://vercel.com/signup)
- [Railway Account](https://railway.app/login)
- [Clerk Account](https://dashboard.clerk.com/)
- [OpenRouter API Key](https://openrouter.ai/keys)

---

## 2. Local Development

```bash
# Clone the repo
git clone https://github.com/Nikhilraj1388/FlowMind.git
cd FlowMind

# Install dependencies
npm install

# Start Docker services (PostgreSQL + Redis)
docker compose up -d

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Start API server (terminal 1)
npx tsx apps/api/src/index.ts

# Start frontend (terminal 2)
npm run dev --workspace=web
```

**URLs:**
- Frontend: http://localhost:3000
- API: http://localhost:4000
- Health: http://localhost:4000/health

---

## 3. Railway Deployment (Backend)

### Step 1: Create Railway Project

1. Go to [railway.app/new](https://railway.app/new)
2. Click **"Deploy from GitHub repo"**
3. Select `Nikhilraj1388/FlowMind`

### Step 2: Add PostgreSQL

1. In Railway dashboard → **"+ New"** → **"Database"** → **PostgreSQL**
2. Copy the `DATABASE_URL` from the Variables tab

### Step 3: Add Redis

1. **"+ New"** → **"Database"** → **Redis**
2. Copy the `REDIS_URL` from the Variables tab

### Step 4: Configure Environment Variables

Add these in Railway → **Variables** tab:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | *(auto from Railway PostgreSQL)* |
| `REDIS_URL` | *(auto from Railway Redis)* |
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `CLERK_SECRET_KEY` | `sk_live_...` |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |
| `WORKER_CONCURRENCY` | `5` |

### Step 5: Configure Build

Railway will auto-detect `railway.toml`:
- **Builder**: Dockerfile (`Dockerfile.api`)
- **Start command**: `npx prisma migrate deploy && node --import tsx apps/api/src/index.ts`
- **Health check**: `/health`

### Step 6: Deploy

```bash
# Or deploy via CLI
npm i -g @railway/cli
railway login
railway up --service flowmind-api
```

### Step 7: Get API URL

After deploy, Railway provides a URL like `https://flowmind-api-production.up.railway.app`. Note this for Vercel config.

---

## 4. Vercel Deployment (Frontend)

### Step 1: Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Nikhilraj1388/FlowMind`
3. Set **Root Directory** to `apps/web`
4. Framework: **Next.js** (auto-detected)

### Step 2: Configure Environment Variables

Add in Vercel → **Settings** → **Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` |
| `CLERK_SECRET_KEY` | `sk_live_...` |
| `NEXT_PUBLIC_API_URL` | `https://your-railway-api.up.railway.app/api/v1` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |

### Step 3: Configure Build

In Vercel → **Settings** → **General**:
- **Build Command**: `cd ../.. && npm run build --workspace=web`
- **Install Command**: `cd ../.. && npm install`
- **Output Directory**: `.next`

### Step 4: Deploy

Click **Deploy** or push to `main` branch.

---

## 5. Custom Domain (Optional)

### Vercel
1. **Settings** → **Domains** → Add `flowmind.dev`
2. Update DNS: Add CNAME record pointing to `cname.vercel-dns.com`

### Railway
1. **Settings** → **Domains** → Add `api.flowmind.dev`
2. Update DNS: Add CNAME record pointing to Railway's provided domain

---

## 6. CI/CD Pipeline

GitHub Actions workflows are configured:

- **`.github/workflows/ci.yml`** — Runs on every push/PR:
  - TypeScript type checking
  - Next.js production build
  - Docker image build test

- **`.github/workflows/deploy.yml`** — Runs on push to `main`:
  - Deploys frontend to Vercel
  - Deploys backend to Railway

### Required GitHub Secrets

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `RAILWAY_TOKEN` | [railway.app/account/tokens](https://railway.app/account/tokens) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard |
| `NEXT_PUBLIC_API_URL` | Your Railway API URL |

---

## 7. Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name description_of_change

# Deploy migrations to production
npx prisma migrate deploy

# Reset database (⚠️ destructive)
npx prisma migrate reset
```

---

## 8. Monitoring & Health Checks

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Simple status check (for load balancers) |
| `GET /health/detailed` | Full check: DB ping, Redis ping, uptime |

### Example Response (`/health/detailed`)

```json
{
  "status": "healthy",
  "uptime": 3600.5,
  "timestamp": "2026-06-04T10:00:00.000Z",
  "responseTimeMs": 12,
  "checks": {
    "database": { "status": "healthy", "latencyMs": 3 },
    "redis": { "status": "healthy", "latencyMs": 1 }
  }
}
```

---

## 9. Docker Local Deployment

To run the full production stack locally:

```bash
# Build all images
bash scripts/docker-build.sh

# Start production stack
docker compose -f docker-compose.prod.yml up -d

# Check logs
docker compose -f docker-compose.prod.yml logs -f api

# Stop
docker compose -f docker-compose.prod.yml down
```

---

## 10. Troubleshooting

| Issue | Solution |
|-------|----------|
| `Prisma client not initialized` | Run `npx prisma generate` |
| `Connection refused` on API | Check Railway env vars, ensure PostgreSQL/Redis are running |
| `401 Unauthorized` | Verify `CLERK_SECRET_KEY` matches in both Vercel and Railway |
| `CORS error` | Add your Vercel URL to `ALLOWED_ORIGINS` in Railway |
| Build fails on Vercel | Set root directory to `apps/web`, install command to `cd ../.. && npm install` |
| `os error 380` | Move project off OneDrive to a local drive (e.g., `D:\`) |
