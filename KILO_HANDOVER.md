# Handover Document: FlowMind Development

## 📌 Project Overview
**FlowMind** — AI-powered code visualization SaaS. Monorepo (npm workspaces):
- **`apps/web`**: Next.js 16, Tailwind v4, Clerk, Monaco, React Flow, Zustand
- **`apps/api`**: Express REST API + BullMQ worker
- **`prisma`**: PostgreSQL schema + migrations
- **`docker/`**: Sandbox images for Node.js + Python execution

---

## ⚡ Current Status — Phases 1–8 Complete

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Foundation — monorepo, Docker, Prisma schema + migration | ✅ Done |
| 2 | UI — dark theme, landing page, dashboard | ✅ Done |
| 3 | Auth — Clerk integration, route guards | ✅ Done |
| 4 | Code Editor — Monaco, Zustand stores, auto-save | ✅ Done |
| 5 | Backend APIs — Express, Prisma, BullMQ queue, all REST endpoints | ✅ Done |
| 6 | Execution Engine — Docker sandbox, JS/Python instrumentation, BullMQ worker | ✅ Done |
| 7 | Trace Engine — useExecution hook, polling, FlowTrace parsing | ✅ Done |
| **8** | **Visualization — live graph, variable panel, recursion tree, output, playback engine** | ✅ Done |
| 9 | AI Integration — OpenAI streaming explanations + chat | 🔴 Next |
| 10 | Database Features — project CRUD FE, real dashboard data | 🔴 Pending |
| 11 | Deployment | 🔴 Pending |

---

## 🔌 Running Services

| Service | URL | Start |
|---------|-----|-------|
| Next.js frontend | http://localhost:3000 | `npm run dev` from root |
| Express API + Worker | http://localhost:4000 | `npm run dev:api` from root |
| PostgreSQL | localhost:5433 | `docker compose up -d` |
| Redis | localhost:6379 | `docker compose up -d` |

---

## 🏗️ Phases 7+8 — What Was Built

### Trace library (apps/web/lib/trace/)
```
lib/trace/
├── types.ts            ← Frontend FlowTrace types (mirrors API types)
└── graph-builder.ts    ← buildGraph() → dagre-laid-out React Flow nodes/edges
                           buildRecursionTree() → RecursionTreeNode hierarchy
                           collectOutput() → OutputLine[] synced to step index
```

### New hooks
```
hooks/
├── use-execution.ts        ← POST /executions → poll status → call onTrace(FlowTrace)
└── use-playback-engine.ts  ← RAF loop: advances currentStep at speed-controlled rate
```

### Updated stores
```
store/
├── playback-store.ts   ← Now holds real FlowTrace, loadTrace(), clearTrace()
└── execution-store.ts  ← NEW: run status, stdout, stderr, durationMs shared across panels
```

### Updated visualization components
```
features/visualization/
├── graph-canvas.tsx           ← Live React Flow from real trace (custom flowNode type)
├── flow-node.tsx              ← NEW: custom node with Framer Motion active/past highlighting
├── variable-panel.tsx         ← Real call stack + variable diff with changed/added badges
├── recursion-tree-placeholder.tsx ← Real recursion tree from trace call/return steps
├── output-panel.tsx           ← NEW: stdout synced to current playback step
└── timeline-controls.tsx      ← Speed selector, keyboard shortcuts (Space/←/→/Home/End)
```

### Updated workspace
```
features/workspace/workspace-shell.tsx
  ← Run button wired to useExecution hook
  ← Status indicator: Ready / Submitting / Running / Done (ms + steps) / Failed
  ← onTrace callback: loadTrace() + switch to graph tab
  ← CodeEditorPanel receives isRunning prop → spinner on Run button
```

---

## 🚀 Next Step: Phase 9 — AI Integration

Read `MASTER_PROJECT_DOCUMENTATION.md` Section 9.

### Key requirement: OPENAI_API_KEY in apps/api/.env
```
OPENAI_API_KEY=sk-...
```

### Prompt for next session:
```
Hi, we are building FlowMind. Read KILO_HANDOVER.md and MASTER_PROJECT_DOCUMENTATION.md Section 9.

Phases 1–8 are complete. The full execution + visualization pipeline is live.
When a user clicks Run, code executes in Docker, produces FlowTrace JSON,
and the frontend animates it with live graph/variable/recursion/output panels.

Let's build Phase 9: AI Integration.
1. Install openai package in apps/api
2. Create apps/api/src/ai/ai.service.ts with:
   - summarizeTrace() per Section 9.4
   - buildExplainPrompt() per Section 9.3
   - streaming SSE response per Section 9.5
   - Redis cache by hash(code+trace)
   - AIChatMessage persistence
3. Create POST /api/v1/ai/explain and POST /api/v1/ai/chat endpoints (SSE)
4. Build useAIStream hook in apps/web/hooks/use-ai-stream.ts
5. Wire the AIPanel to call /ai/explain after each execution completes
   (auto-explain) and enable the chat Send button

Ground ALL responses in the actual trace steps. Never invent execution paths.
```
