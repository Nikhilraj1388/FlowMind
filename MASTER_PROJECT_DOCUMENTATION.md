# FLOWMIND — Master Project Documentation

> **Version:** 1.0.0  
> **Status:** Production-Grade PRD & Engineering Blueprint  
> **Last Updated:** 2026-06-03  
> **Audience:** Engineering, Product, AI Development Assistants (Cursor)  
> **Purpose:** Single source of truth for building FlowMind phase-by-phase

---

## Document Index

| Section | Title |
|---------|-------|
| 1 | [Project Overview](#section-1--project-overview) |
| 2 | [Product Features](#section-2--product-features) |
| 3 | [Complete Tech Stack](#section-3--complete-tech-stack) |
| 4 | [System Architecture](#section-4--system-architecture) |
| 5 | [Frontend Architecture](#section-5--frontend-architecture) |
| 6 | [Backend Architecture](#section-6--backend-architecture) |
| 7 | [Execution Engine](#section-7--execution-engine) |
| 8 | [Visualization Engine](#section-8--visualization-engine) |
| 9 | [AI System](#section-9--ai-system) |
| 10 | [Database Design](#section-10--database-design) |
| 11 | [API Design](#section-11--api-design) |
| 12 | [UI/UX System](#section-12--uiux-system) |
| 13 | [Security Architecture](#section-13--security-architecture) |
| 14 | [Testing Strategy](#section-14--testing-strategy) |
| 15 | [DevOps & Deployment](#section-15--devops--deployment) |
| 16 | [Scalability Plan](#section-16--scalability-plan) |
| 17 | [Coding Standards](#section-17--coding-standards) |
| 18 | [Complete Project Breakdown](#section-18--complete-project-breakdown) |
| 19 | [Task Priority Matrix](#section-19--task-priority-matrix) |
| 20 | [AI Development Workflow](#section-20--ai-development-workflow) |
| 21 | [Final Engineering Rules](#section-21--final-engineering-rules) |

---

# SECTION 1 — PROJECT OVERVIEW

## 1.1 Project Vision

**FlowMind** is a venture-scale AI-powered SaaS platform that transforms opaque code execution into interactive, cinematic visual narratives. Users write or paste code in JavaScript, Python, C++, or Java and receive real-time animated execution graphs, variable state tracking, recursion trees, memory visualizations, execution timelines, and AI-generated explanations — enabling deep comprehension of algorithmic behavior without traditional debugger friction.

FlowMind occupies the intersection of **developer tooling**, **CS education**, and **AI-assisted learning** — a category with no dominant player offering unified multi-language execution visualization at production quality.

## 1.2 Mission

> *Make every line of code understandable through visual intelligence.*

FlowMind's mission is to eliminate the cognitive gap between reading code and understanding runtime behavior by providing a zero-setup, browser-native execution visualization environment powered by deterministic tracing and contextual AI.

## 1.3 Core Objectives

| # | Objective | Success Metric | Timeline |
|---|-----------|----------------|----------|
| O1 | Ship MVP with JS + Python execution visualization | 500 beta users, <3s trace generation | Month 3 |
| O2 | Achieve sub-500ms visualization render for traces ≤1000 steps | P95 render latency | Month 4 |
| O3 | Launch AI explanation system with streaming | 80% user satisfaction on explanations | Month 5 |
| O4 | Add C++ and Java support | 4-language parity on core viz features | Month 7 |
| O5 | Reach 10K MAU with freemium conversion ≥5% | Analytics dashboard | Month 12 |
| O6 | Enable real-time collaboration (P2) | 100 concurrent sessions | Month 14 |

## 1.4 Target Users

### Primary Personas

| Persona | Description | Key Needs | Willingness to Pay |
|---------|-------------|-----------|-------------------|
| **CS Student (Alex, 20)** | Undergraduate learning DSA | Step-through visualization, recursion trees, complexity explanations | Low → Student plan |
| **Self-Taught Developer (Jordan, 28)** | Career switcher, bootcamp grad | Multi-language support, AI debugging assistant | Medium → Pro plan |
| **Engineering Educator (Dr. Chen, 45)** | University professor, coding instructor | Classroom mode, shareable sessions, assignment templates | High → Team/Edu plan |
| **Interview Prep Candidate (Sam, 25)** | FAANG interview preparation | Interview mode, timed challenges, trace replay | Medium → Pro plan |
| **Senior Engineer (Morgan, 35)** | Staff engineer reviewing complex algorithms | Performance traces, memory visualization, export | High → Pro/Team plan |

### Secondary Personas

- **Technical content creators** — YouTube/blog authors needing embeddable visualizations
- **Engineering managers** — Code review and onboarding acceleration
- **Open-source maintainers** — Documentation and contributor onboarding

## 1.5 Pain Points Solved

| Pain Point | Current Workarounds | FlowMind Solution |
|------------|--------------------|--------------------|
| Cannot visualize recursion depth | Manual stack trace reading, print debugging | Animated recursion tree with call/return lifecycle |
| Debugger setup is complex | IDE-specific configuration, environment issues | Zero-setup browser execution with instant traces |
| Variable state changes are invisible | Console.log sprawl | Live variable panel synced to execution timeline |
| Memory behavior is abstract | Reading documentation, valgrind locally | Stack/heap visualization with allocation events |
| DSA learning lacks interactivity | Static diagrams, YouTube videos | Interactive DSA visualizer with user code |
| AI explanations lack execution context | ChatGPT with pasted code snippets | AI grounded in deterministic execution traces |
| Multi-language learning requires different tools | PythonTutor, JS visualizers, separate C++ tools | Unified platform across 4 languages |
| Collaboration on code understanding is async | Screenshots, Loom videos | Shareable execution sessions with synchronized playback |

## 1.6 Market Positioning

```
                    HIGH INTERACTIVITY
                           │
         FlowMind ●        │        ● Replit (broader scope)
                           │
    ───────────────────────┼─────────────────────── FEATURE DEPTH
                           │
         Python Tutor ●    │    ● Debugger IDEs
                           │
                    LOW INTERACTIVITY
```

**Positioning Statement:** FlowMind is the *visual intelligence layer* for code execution — not an IDE, not a tutorial site, not a generic AI chatbot. It is the specialized tool for **understanding what code does at runtime**.

### Competitive Landscape

| Competitor | Strength | Weakness | FlowMind Differentiation |
|------------|----------|----------|-------------------------|
| Python Tutor | Simple, proven UX for Python | Python-only, dated UI, no AI | Multi-language, AI-native, modern UX |
| Replit | Full IDE, collaboration | Not visualization-focused | Deep execution visualization specialization |
| ChatGPT/Claude | General AI explanations | No deterministic execution traces | Grounded AI with trace context |
| Chrome DevTools | Production-grade JS debugging | JS-only, steep learning curve | Language-agnostic, educational UX |
| VisuAlgo | Beautiful DSA animations | Not user-code execution | User code + DSA templates |

## 1.7 Unique Selling Points (USPs)

1. **Deterministic Trace-First Architecture** — Every visualization is derived from actual execution, not simulated approximations
2. **Unified Multi-Language Engine** — Single UX paradigm across JS, Python, C++, Java
3. **AI Grounded in Traces** — Explanations reference specific execution steps, variables, and call frames
4. **Cinematic Playback System** — Timeline scrubbing, speed control, step-forward/backward with animation
5. **Zero Environment Setup** — Docker-sandboxed execution in browser, no local runtime required
6. **Developer-Grade Aesthetic** — Linear/Framer-inspired dark UI, not educational toy aesthetic
7. **Embeddable & Shareable** — Public links, iframe embeds, classroom session sharing

## 1.8 Long-Term Vision (3–5 Years)

| Horizon | Capability |
|---------|-----------|
| Year 1 | MVP → 4 languages, AI assistant, freemium SaaS, 10K MAU |
| Year 2 | Real-time collaboration, classroom/enterprise tiers, API access, 100K MAU |
| Year 3 | 3D memory visualization, custom runtime plugins, marketplace for DSA templates |
| Year 4 | On-premise enterprise deployment, LMS integrations (Canvas, Moodle) |
| Year 5 | FlowMind Execution Protocol (open trace format), developer ecosystem, 1M MAU |

### Strategic Moats

- **Trace format standardization** — Open `FlowTrace` JSON schema becomes industry reference
- **Instrumentation library** — Per-language instrumentation SDKs with community contributions
- **AI trace corpus** — Fine-tuned models on execution patterns for superior explanations
- **Network effects** — Shared public visualizations, template marketplace, classroom communities

---

# SECTION 2 — PRODUCT FEATURES

Features are organized by priority: **P0** (MVP-critical) → **P3** (future).

## Feature Documentation Template

Each feature below includes: Description, User Flow, Technical Requirements, Dependencies, Complexity, Implementation Notes, Scalability Concerns, Risks.

---

## P0 — Critical MVP

### F-P0-001: User Authentication

| Field | Detail |
|-------|--------|
| **Description** | Secure user registration, login, session management via Clerk or Auth.js. Supports email/password, Google OAuth, GitHub OAuth. |
| **User Flow** | Landing → Sign Up → OAuth/email → Email verification → Redirect to Dashboard → Session persisted via JWT/httpOnly cookies |
| **Technical Requirements** | Clerk SDK integration; middleware auth guards on API routes; user sync webhook to PostgreSQL; session refresh; logout invalidation |
| **Dependencies** | Clerk account, PostgreSQL User table, Next.js middleware |
| **Complexity** | Medium |
| **Implementation Notes** | Use Clerk for speed-to-market; abstract auth provider behind `AuthService` interface for future migration to Auth.js. Sync user on `user.created` webhook. Store `clerkId` as external ID, never store passwords locally. |
| **Scalability Concerns** | Clerk handles auth scaling; webhook processing must be idempotent with dedup keys |
| **Risks** | Vendor lock-in; mitigate via abstraction layer |

### F-P0-002: Dashboard

| Field | Detail |
|-------|--------|
| **Description** | Central hub displaying user's projects, recent executions, quick-start templates, usage stats |
| **User Flow** | Login → Dashboard → View project grid → Click project → Editor; or New Project → Language select → Editor |
| **Technical Requirements** | SSR project list; pagination (cursor-based); empty states; skeleton loading; search/filter by language and date |
| **Dependencies** | Auth, Project API, PostgreSQL |
| **Complexity** | Medium |
| **Implementation Notes** | Dashboard is `/dashboard` route group. Use React Server Components for initial data fetch. Client-side search via debounced API. Grid layout with project cards showing language icon, last edited, execution count. |
| **Scalability Concerns** | Paginate at 20 items; index `(userId, updatedAt DESC)` |
| **Risks** | Over-fetching project metadata; use selective Prisma queries |

### F-P0-003: Monaco Code Editor

| Field | Detail |
|-------|--------|
| **Description** | Full-featured in-browser code editor with syntax highlighting, autocomplete, multi-language support, themes matching FlowMind design system |
| **User Flow** | Open project → Editor loads with saved code → Edit → Auto-save (debounced) → Run button triggers execution |
| **Technical Requirements** | `@monaco-editor/react`; language modes for JS, Python, C++, Java; custom dark theme; keyboard shortcuts (Cmd+Enter to run); minimap disabled for cleaner UX; tab size config per language |
| **Dependencies** | Project persistence API, Execution API |
| **Complexity** | Medium |
| **Implementation Notes** | Wrap Monaco in `CodeEditor` component. Register custom theme on mount. Use `editor.addCommand` for run shortcut. Store editor state (cursor, scroll) in sessionStorage for recovery. Lazy-load Monaco (~2MB) via dynamic import. |
| **Scalability Concerns** | Monaco bundle size; code-split and preload on dashboard hover |
| **Risks** | Mobile editing is poor; show desktop-only banner on mobile |

### F-P0-004: Execution Engine (Core)

| Field | Detail |
|-------|--------|
| **Description** | Sandboxed code execution in Docker containers with instrumentation, producing structured execution traces |
| **User Flow** | User clicks Run → Code sent to API → Container spawned → Code instrumented & executed → Trace returned → Visualization renders |
| **Technical Requirements** | Docker API integration; per-language runtime images; instrumentation injection; stdout/stderr capture; timeout enforcement (10s default); memory limit (256MB); CPU quota; trace JSON output |
| **Dependencies** | Docker daemon, Redis queue, Instrumentation Engine, Trace Engine |
| **Complexity** | Very High |
| **Implementation Notes** | See Section 7 for full specification. MVP supports JavaScript (Node.js) and Python only. |
| **Scalability Concerns** | Container pool pre-warming; execution queue with worker scaling |
| **Risks** | Container escape; resource exhaustion; infinite loops — all mitigated in Section 13 |

### F-P0-005: Docker Sandboxing

| Field | Detail |
|-------|--------|
| **Description** | Isolated, ephemeral Docker containers for each execution with strict resource and network constraints |
| **User Flow** | (System-level) Transparent to user |
| **Technical Requirements** | `--network=none`; `--memory=256m`; `--cpus=0.5`; `--read-only` root FS with tmpfs `/tmp`; non-root user; seccomp profile; auto-remove container; max concurrent containers per user (3) |
| **Dependencies** | Docker Engine on Railway/Render worker nodes |
| **Complexity** | High |
| **Implementation Notes** | Maintain base images: `flowmind/node:20`, `flowmind/python:3.12`. Pre-pull on worker startup. Container lifecycle: create → copy code → inject instrumentation → run → extract trace → destroy. Target lifecycle < 2s for warm pool. |
| **Scalability Concerns** | Horizontal worker scaling; container pool size tuning |
| **Risks** | Docker-in-Docker on cloud platforms; validate Railway/Render support early |

### F-P0-006: Instrumentation Engine

| Field | Detail |
|-------|--------|
| **Description** | Transforms user code by injecting trace-collecting probes at function entries, exits, assignments, conditionals, loops, and returns |
| **User Flow** | (System-level) Code auto-instrumented before execution |
| **Technical Requirements** | AST-based transformation per language; probe injection points; trace event serialization; source map generation for mapping instrumented lines to original |
| **Dependencies** | Language parsers (Babel for JS, ast for Python, tree-sitter for C++/Java) |
| **Complexity** | Very High |
| **Implementation Notes** | See Section 7. MVP: JS via Babel plugin, Python via AST transformer. Instrumentation must be idempotent and preserve semantics. |
| **Scalability Concerns** | Instrumentation CPU time adds ~50-200ms; cache instrumented AST for unchanged code (hash-based) |
| **Risks** | Instrumentation breaking edge-case syntax; comprehensive test suite per language |

### F-P0-007: Execution Tracing

| Field | Detail |
|-------|--------|
| **Description** | Captures structured events during code execution: line execution, function calls, returns, variable mutations, exceptions |
| **User Flow** | (System-level) Trace generated during execution, streamed to frontend |
| **Technical Requirements** | `FlowTrace` JSON schema v1; event types: `line`, `call`, `return`, `assign`, `condition`, `loop_iter`, `exception`, `output`; timestamps; frame stack; variable snapshots |
| **Dependencies** | Instrumentation Engine, Execution Engine |
| **Complexity** | High |
| **Implementation Notes** | Trace events buffered in container, written to `/tmp/trace.json` on completion. Max trace size: 10MB / 10,000 events. Truncate with warning if exceeded. |
| **Scalability Concerns** | Large traces (deep recursion) → compression (gzip); pagination of trace events for frontend |
| **Risks** | Trace size explosion on infinite loops; hard step limit enforced |

### F-P0-008: Variable Visualization

| Field | Detail |
|-------|--------|
| **Description** | Real-time panel showing all active variables, their types, values, and mutation history at current execution step |
| **User Flow** | Run code → Variables panel populates → Scrub timeline → Variables update to reflect state at that step → Changed variables highlighted |
| **Technical Requirements** | Parse variable snapshots from trace; diff consecutive steps for change detection; support primitives, arrays, objects, nested structures; type-aware rendering (color-coded) |
| **Dependencies** | Trace Engine, Timeline System |
| **Complexity** | Medium |
| **Implementation Notes** | `VariablePanel` component with virtualized list for many variables. Use structural diff (not JSON.stringify) for change detection. Collapse nested objects by default. |
| **Scalability Concerns** | Large objects (1000+ keys) → truncate display with "show more" |
| **Risks** | Circular reference serialization; detect and render as `[Circular]` |

### F-P0-009: Execution Graph Visualization

| Field | Detail |
|-------|--------|
| **Description** | Animated directed graph showing code execution flow — nodes represent statements/blocks, edges represent control flow |
| **User Flow** | Run code → Graph renders → Active node highlights during playback → Click node → Jump to that step |
| **Technical Requirements** | React Flow for graph rendering; nodes mapped from trace events; active node animation via Framer Motion; edge types: sequential, conditional (true/false), loop back; auto-layout via dagre |
| **Dependencies** | Trace Engine, React Flow, Framer Motion |
| **Complexity** | High |
| **Implementation Notes** | Build graph from trace offline (not during playback). Cache graph structure. During playback, only update active node state — do not re-render entire graph. |
| **Scalability Concerns** | Graphs with 500+ nodes → collapse sequential chains into super-nodes |
| **Risks** | Layout performance; use Web Worker for graph construction |

### F-P0-010: Timeline Replay System

| Field | Detail |
|-------|--------|
| **Description** | Scrubable timeline allowing step-forward, step-backward, play/pause, speed control (0.25x–4x) through execution |
| **User Flow** | Execution completes → Timeline appears → Press Play → Visualizations animate → Drag scrubber → All panels sync → Step Forward/Back buttons for frame-by-frame |
| **Technical Requirements** | Playback engine with RAF loop; speed multiplier; step index state; sync hooks for graph, variables, output panels; keyboard shortcuts (Space=play, Arrow keys=step) |
| **Dependencies** | Trace Engine, all visualization components |
| **Complexity** | Medium |
| **Implementation Notes** | Central `PlaybackController` (Zustand store) manages current step index. All viz components subscribe to step changes. Pre-compute step durations for smooth animation timing. |
| **Scalability Concerns** | 10,000 steps → virtualize timeline; step-to-event index map pre-built |
| **Risks** | Desync between panels; single source of truth for current step |

### F-P0-011: Project Saving

| Field | Detail |
|-------|--------|
| **Description** | Persist user code, language, settings, and metadata to database with auto-save |
| **User Flow** | Edit code → Auto-save (2s debounce) → "Saved" indicator → Close browser → Return → Code restored |
| **Technical Requirements** | REST API CRUD for projects; auto-save via debounced PATCH; optimistic UI; conflict detection (version field) |
| **Dependencies** | Auth, PostgreSQL, Project API |
| **Complexity** | Low |
| **Implementation Notes** | `useAutoSave` hook with debounce. Store code as TEXT in PostgreSQL. Max code size: 100KB. Version field for optimistic concurrency. |
| **Scalability Concerns** | Minimal; projects are small text blobs |
| **Risks** | Lost edits on network failure; queue saves offline with retry |

### F-P0-012: Basic AI Explanation

| Field | Detail |
|-------|--------|
| **Description** | AI-generated natural language explanation of code execution, grounded in trace data |
| **User Flow** | Run code → Click "Explain" → AI panel opens → Streaming explanation appears → References specific steps and variables |
| **Technical Requirements** | OpenAI API (GPT-4o); prompt template with code + trace summary; streaming SSE response; token budget management |
| **Dependencies** | Execution Engine, OpenAI API, Redis cache |
| **Complexity** | Medium |
| **Implementation Notes** | See Section 9. Summarize trace to fit token budget (max 4000 tokens context). Cache explanations by code hash + trace hash. |
| **Scalability Concerns** | API cost; cache aggressively; rate limit 10 explanations/user/day on free tier |
| **Risks** | Hallucination; always ground in trace data, never invent execution paths |

---

## P1 — Important

### F-P1-001: Recursion Tree Visualization

| Field | Detail |
|-------|--------|
| **Description** | Hierarchical tree showing recursive function calls with depth, parameters, return values, and base case detection |
| **User Flow** | Run recursive code → Switch to Recursion tab → Tree builds → Playback animates call/return → Click node → See frame details |
| **Technical Requirements** | Extract call/return events from trace; build tree structure; React Flow or custom tree renderer; collapse deep branches; highlight base cases |
| **Dependencies** | Trace Engine (call/return events), Visualization Engine |
| **Complexity** | High |
| **Implementation Notes** | Filter trace for recursive function name. Build tree from call stack events. Max display depth: 50 levels; beyond that, show "... N more levels". |
| **Scalability Concerns** | Exponential recursion (fib(30)) → 1M+ nodes; truncate and show summary stats |
| **Risks** | Misidentifying recursion vs. regular calls; detect via function name + stack depth analysis |

### F-P1-002: Stack/Heap Memory Visualization

| Field | Detail |
|-------|--------|
| **Description** | Visual representation of stack frames and heap allocations during execution |
| **User Flow** | Run code → Memory tab → Stack frames shown as blocks → Heap objects as nodes → Alloc/dealloc animated during playback |
| **Technical Requirements** | Track stack frame push/pop from trace; heap allocation events (language-dependent); visual blocks with address, size, type; color-coded by data type |
| **Dependencies** | Trace Engine, C++/Java runtime support for memory events |
| **Complexity** | Very High |
| **Implementation Notes** | JS/Python: simulate stack/heap from trace frames (no raw memory access). C++/Java: instrument with allocation hooks. Two-panel layout: stack (vertical) + heap (grid). |
| **Scalability Concerns** | Many allocations → paginate heap view |
| **Risks** | C++ memory instrumentation complexity; phase behind JS/Python simulation |

### F-P1-003: C++ Execution Support

| Field | Detail |
|-------|--------|
| **Description** | Full execution pipeline for C++ code including compilation, instrumentation, tracing, and visualization |
| **User Flow** | Select C++ → Write code → Run → Compile in container → Execute → Visualize |
| **Technical Requirements** | GCC/Clang in Docker; compile step with error capture; tree-sitter for AST instrumentation; stdout parsing; 15s timeout (compile + run) |
| **Dependencies** | Docker image `flowmind/cpp:gcc13`, Instrumentation Engine |
| **Complexity** | Very High |
| **Implementation Notes** | Two-phase execution: compile then run. Capture compile errors separately. Instrument via source-to-source transformation inserting trace macros. |
| **Scalability Concerns** | Compilation adds 1-3s; pre-warm compiler cache |
| **Risks** | Compilation errors, linker issues; robust error reporting to user |

### F-P1-004: Java Execution Support

| Field | Detail |
|-------|--------|
| **Description** | Full execution pipeline for Java code with JVM-based instrumentation and tracing |
| **User Flow** | Select Java → Write code → Run → Compile → Execute on JVM → Visualize |
| **Technical Requirements** | OpenJDK 21 in Docker; javac compilation; Java Agent for runtime instrumentation (preferred) or source transformation; 15s timeout |
| **Dependencies** | Docker image `flowmind/java:21`, Java Agent JAR |
| **Complexity** | Very High |
| **Implementation Notes** | Java Agent approach (JVMTI) is cleaner than source transformation. Agent JAR injected via `-javaagent` flag. Agent emits trace events to stdout as JSON lines. |
| **Scalability Concerns** | JVM startup ~1-2s; use warmed container pool |
| **Risks** | JVM memory overhead; allocate 512MB for Java containers |

### F-P1-005: AI Debugging Assistant

| Field | Detail |
|-------|--------|
| **Description** | Conversational AI that helps debug code by analyzing traces, suggesting fixes, explaining errors |
| **User Flow** | Code fails/errors → AI panel auto-opens → "I see a NullPointerException at step 42..." → User asks follow-up → AI responds with trace context |
| **Technical Requirements** | Chat interface; conversation history; trace + code context injection; streaming; error pattern detection |
| **Dependencies** | AI System, Trace Engine, Execution Engine |
| **Complexity** | High |
| **Implementation Notes** | Separate from explanation system. Maintain conversation thread per project. Inject last execution trace + stderr on each message. System prompt emphasizes debugging, not code generation. |
| **Scalability Concerns** | Long conversations → summarize older messages; token budget management |
| **Risks** | AI suggesting code changes that break semantics; disclaimer + diff preview |

### F-P1-006: Execution History

| Field | Detail |
|-------|--------|
| **Description** | Log of all past executions for a project with trace replay, comparison, and diff |
| **User Flow** | Project editor → History tab → List of executions → Click → Replay trace → Compare two executions side-by-side |
| **Technical Requirements** | Store traces in PostgreSQL (JSONB) or S3 for large traces; list with timestamp, duration, status, step count; replay from stored trace |
| **Dependencies** | Execution Engine, PostgreSQL/S3 |
| **Complexity** | Medium |
| **Implementation Notes** | Traces >100KB stored in S3 with reference in DB. Keep last 50 executions per project on free tier. Traces are immutable once stored. |
| **Scalability Concerns** | Storage costs; implement retention policy; compress traces |
| **Risks** | Storage cost explosion; tier-based retention limits |

### F-P1-007: DSA Visualizer (Templates)

| Field | Detail |
|-------|--------|
| **Description** | Pre-built visualizations for classic DSA algorithms (sorting, searching, trees, graphs) with editable code |
| **User Flow** | Dashboard → Templates → Select "Binary Search" → Template loads with working code → Run → Specialized DSA visualization renders |
| **Technical Requirements** | Template library (20+ algorithms); custom visualization components per algorithm category; editable code with template structure preserved |
| **Dependencies** | Visualization Engine, Project system |
| **Complexity** | High |
| **Implementation Notes** | Templates are projects with `isTemplate: true` flag. Custom viz components registered by algorithm type. Template metadata: category, difficulty, description. |
| **Scalability Concerns** | Template content is static; CDN-cacheable |
| **Risks** | Template code must be validated and instrumentable |

### F-P1-008: Output Panel

| Field | Detail |
|-------|--------|
| **Description** | Console output panel showing stdout, stderr, and return values synced to execution timeline |
| **User Flow** | Run code → Output panel shows print statements as they execute during playback |
| **Technical Requirements** | Capture stdout/stderr in container; timestamp each output line; sync with timeline step; syntax highlight errors |
| **Dependencies** | Execution Engine, Timeline System |
| **Complexity** | Low |
| **Implementation Notes** | Output events in trace with step index. Panel auto-scrolls during playback. Error lines styled in red with icon. |
| **Scalability Concerns** | Large output (1MB+) → truncate with warning |
| **Risks** | Binary output from C++; detect and show hex preview |

---

## P2 — Advanced

### F-P2-001: Real-Time Collaboration

| Field | Detail |
|-------|--------|
| **Description** | Multiple users viewing and interacting with the same execution session simultaneously |
| **User Flow** | User shares session link → Collaborator opens → Both see same execution playback → Cursor presence → Shared timeline control |
| **Technical Requirements** | WebSocket server; CRDT or OT for timeline sync; presence indicators; session rooms; permission model (view/edit) |
| **Dependencies** | WebSocket infrastructure, Redis pub/sub, Auth |
| **Complexity** | Very High |
| **Implementation Notes** | Start with view-only collaboration (shared playback sync). Edit collaboration in v2. Use Socket.io with Redis adapter for scaling. |
| **Scalability Concerns** | WebSocket connection limits; Redis pub/sub for multi-instance |
| **Risks** | Conflict resolution complexity; start read-only |

### F-P2-002: Classroom Mode

| Field | Detail |
|-------|--------|
| **Description** | Instructor creates a classroom session where students follow along with live or pre-recorded execution demonstrations |
| **User Flow** | Instructor → Create Classroom → Share code → Students join → Instructor controls playback → Students watch synchronized → Q&A via AI |
| **Technical Requirements** | Classroom entity; instructor controls; student join via code; synchronized playback broadcast; roster management |
| **Dependencies** | Collaboration system, Auth, WebSocket |
| **Complexity** | Very High |
| **Implementation Notes** | Extends collaboration with role-based control. Instructor is playback master. Students can fork to personal editor. |
| **Scalability Concerns** | 100+ students per session; broadcast via Redis pub/sub |
| **Risks** | Latency in sync; acceptable for educational use case |

### F-P2-003: Interview Mode

| Field | Detail |
|-------|--------|
| **Description** | Timed coding challenges with automated execution analysis, complexity detection, and evaluation rubrics |
| **User Flow** | Select challenge → Timer starts → Write solution → Run → Submit → AI evaluates correctness, complexity, style → Score displayed |
| **Technical Requirements** | Challenge library; timer; test case runner; automated evaluation; complexity analysis from trace; scoring rubric |
| **Dependencies** | Execution Engine, AI System, DSA Templates |
| **Complexity** | High |
| **Implementation Notes** | Test cases run in same Docker sandbox. Compare output against expected. AI evaluates approach quality from trace pattern. |
| **Scalability Concerns** | Batch test case execution; parallel container runs |
| **Risks** | False negatives in evaluation; allow manual review |

### F-P2-004: 3D Memory Visualization

| Field | Detail |
|-------|--------|
| **Description** | Three-dimensional representation of memory layout using Three.js/React Three Fiber |
| **User Flow** | Run C++/Java code → Toggle 3D view → Rotate/zoom memory space → See allocations as 3D blocks |
| **Technical Requirements** | Three.js or React Three Fiber; 3D stack frames as layers; heap as spatial grid; camera controls; WebGL performance optimization |
| **Dependencies** | Memory Visualization, C++/Java support |
| **Complexity** | Very High |
| **Implementation Notes** | Optional enhancement to 2D memory view. Progressive enhancement — only load Three.js when 3D tab activated. |
| **Scalability Concerns** | WebGL memory; limit rendered objects to 500 |
| **Risks** | Performance on low-end devices; provide 2D fallback |

### F-P2-005: Complexity Analysis

| Field | Detail |
|-------|--------|
| **Description** | Automatic time/space complexity detection from execution traces with Big-O notation |
| **User Flow** | Run code with multiple inputs → Complexity tab → Graph of input size vs. execution steps → Big-O estimate → AI explanation |
| **Technical Requirements** | Run code with scaled inputs; collect step counts; regression analysis for Big-O; visualization of growth curve |
| **Dependencies** | Execution Engine, AI System |
| **Complexity** | High |
| **Implementation Notes** | Auto-generate scaled inputs (n=10, 100, 1000). Run multiple executions. Plot steps vs. input size. Fit to O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ). |
| **Scalability Concerns** | Multiple executions per analysis; queue and run sequentially |
| **Risks** | Incorrect Big-O for ambiguous patterns; show confidence score |

### F-P2-006: Embeddable Widgets

| Field | Detail |
|-------|--------|
| **Description** | iframe-embeddable execution visualizations for blogs, documentation, and educational content |
| **User Flow** | User → Share → Copy embed code → Paste in blog → Readers see interactive visualization |
| **Technical Requirements** | Public execution URLs; iframe-safe CSP; embed SDK script; responsive embed sizing; optional branding removal (paid) |
| **Dependencies** | Project sharing, Visualization Engine |
| **Complexity** | Medium |
| **Implementation Notes** | `/embed/[executionId]` route with minimal chrome. postMessage API for parent page communication. |
| **Scalability Concerns** | CDN-cacheable embed pages |
| **Risks** | iframe abuse; rate limit embed views |

### F-P2-007: Custom Themes & Export

| Field | Detail |
|-------|--------|
| **Description** | Export visualizations as PNG, SVG, GIF, or MP4 video; custom color themes for visualizations |
| **Technical Requirements** | html2canvas for PNG; SVG export from React Flow; GIF generation via canvas frames; MP4 via MediaRecorder or server-side ffmpeg |
| **Dependencies** | Visualization Engine |
| **Complexity** | Medium |
| **Implementation Notes** | Client-side PNG/SVG export. Server-side video export via ffmpeg in worker for quality. |
| **Scalability Concerns** | Video export is CPU-intensive; queue on worker |
| **Risks** | Export quality vs. performance tradeoff |

---

## P3 — Future Features

### F-P3-001: Plugin System

Custom runtime plugins, user-defined instrumentation rules, third-party visualization extensions.

### F-P3-002: LMS Integration

Canvas, Moodle, Blackboard integrations for assignment submission and auto-grading.

### F-P3-003: Mobile App

React Native companion for viewing (not editing) shared visualizations.

### F-P3-004: FlowMind API

Public REST API for programmatic execution and trace retrieval.

### F-P3-005: Custom Domain & White-Label

Enterprise white-label deployment with custom branding.

### F-P3-006: AI Code Generation from Visualizations

Reverse flow: describe algorithm → AI generates code → auto-visualize.

### F-P3-007: Version Control Integration

GitHub/GitLab integration for visualizing repository code.

### F-P3-008: Performance Profiling

Flame graphs, hot path detection, bottleneck identification from traces.

---

# SECTION 3 — COMPLETE TECH STACK

## 3.1 Stack Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLOWMIND STACK                           │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   Frontend   │   Backend    │   Data       │   Infrastructure   │
├──────────────┼──────────────┼──────────────┼────────────────────┤
│ Next.js 15   │ Node.js 20   │ PostgreSQL 16│ Vercel (FE)        │
│ TypeScript 5 │ Express.js 4 │ Redis 7      │ Railway (BE/Worker)│
│ Tailwind 4   │ Prisma 6     │ S3 (traces)  │ Render (fallback)  │
│ Framer Motion│ Dockerode    │              │ AWS (future)       │
│ React Flow   │ OpenAI SDK   │              │                    │
│ Monaco Editor│ BullMQ       │              │                    │
│ Zustand      │ Clerk        │              │                    │
└──────────────┴──────────────┴──────────────┴────────────────────┘
```

## 3.2 Frontend Technologies

### Next.js 15 (App Router)

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | SSR/RSC for dashboard SEO and performance; API routes for BFF pattern; Vercel-native deployment; file-based routing; built-in optimization |
| **Alternatives** | Remix (better forms, smaller ecosystem), Vite+React SPA (no SSR), Nuxt (Vue ecosystem) |
| **Pros** | Server Components reduce client bundle; streaming SSR; image/font optimization; middleware for auth; massive ecosystem |
| **Cons** | App Router learning curve; RSC complexity; vendor coupling with Vercel |
| **Scaling** | Edge middleware for auth; ISR for public pages; static generation for templates; CDN via Vercel |

### TypeScript 5 (Strict Mode)

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Type safety across full stack; shared types between frontend/backend; IDE support; refactoring confidence |
| **Alternatives** | JavaScript (no safety), Flow (deprecated), Zod-only runtime validation |
| **Pros** | Catch errors at compile time; self-documenting code; Prisma generates types |
| **Cons** | Build time overhead; learning curve for complex generics |
| **Scaling** | Shared `@flowmind/types` package; strict mode enforced in CI |

### Tailwind CSS 4

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Utility-first matches design system needs; dark mode built-in; small production bundle with purge; rapid UI development |
| **Alternatives** | CSS Modules, Styled Components, Panda CSS |
| **Pros** | Consistent spacing/colors via config; no CSS file proliferation; responsive utilities |
| **Cons** | HTML verbosity; complex animations need Framer Motion supplement |
| **Scaling** | Design tokens in `tailwind.config.ts`; component classes via `@apply` sparingly |

### Framer Motion

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Declarative React animations; layout animations; gesture support; spring physics for natural motion |
| **Alternatives** | GSAP (imperative, heavier), React Spring (similar), CSS animations (limited) |
| **Pros** | React-native API; AnimatePresence for mount/unmount; performance optimized |
| **Cons** | Bundle size (~30KB); overuse causes jank |
| **Scaling** | Lazy load animation components; use `layoutId` for shared element transitions; respect `prefers-reduced-motion` |

### React Flow (@xyflow/react)

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Purpose-built for node-edge graphs; zoom/pan/minimap; customizable nodes; performant with large graphs |
| **Alternatives** | D3.js (lower level), Cytoscape.js, custom Canvas |
| **Pros** | React integration; plugin ecosystem; TypeScript support; active maintenance |
| **Cons** | Bundle size; customization requires understanding internal API |
| **Scaling** | Virtualization for 1000+ nodes; Web Worker for layout computation; memoize node components |

### Monaco Editor

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | VS Code engine; best-in-class syntax highlighting; multi-language; autocomplete; theming |
| **Alternatives** | CodeMirror 6 (lighter), Ace Editor (older) |
| **Pros** | Feature parity with VS Code; language server protocol support; massive language support |
| **Cons** | ~2MB bundle; heavy for mobile |
| **Scaling** | Dynamic import; web worker for syntax validation; preload on hover |

## 3.3 Backend Technologies

### Node.js 20 LTS + Express.js 4

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | JavaScript ecosystem unity with frontend; non-blocking I/O for concurrent execution management; massive npm ecosystem; team skill overlap |
| **Alternatives** | Fastify (faster, less middleware), NestJS (opinionated, heavier), Go (performance, different language), Python FastAPI |
| **Pros** | Shared types with frontend; async/await native; Dockerode for Docker API; BullMQ for queues |
| **Cons** | Single-threaded CPU work; less performant than Go/Rust for compute |
| **Scaling** | Cluster mode for API server; separate worker processes for execution; horizontal scaling behind load balancer |

### Prisma 6

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Type-safe ORM; migration system; PostgreSQL-native; excellent DX; auto-generated client |
| **Alternatives** | Drizzle (lighter, SQL-like), TypeORM (older), Knex (query builder only) |
| **Pros** | Schema-as-code; relation handling; connection pooling; Prisma Studio for debugging |
| **Cons** | Abstraction leaks on complex queries; migration conflicts in teams |
| **Scaling** | Connection pooling via PgBouncer; read replicas with `@@schema` separation; query optimization via `$queryRaw` |

### Redis 7

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Execution queue (BullMQ); session cache; rate limiting; AI response cache; pub/sub for future WebSocket scaling |
| **Alternatives** | Memcached (simpler, fewer features), RabbitMQ (message broker only) |
| **Pros** | Sub-millisecond latency; data structures (sorted sets for rate limiting); TTL support |
| **Cons** | Memory-bound; persistence configuration needed |
| **Scaling** | Redis Cluster for sharding; separate instances for cache vs. queue |

### Docker + Dockerode

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Industry-standard containerization; language isolation; resource limits; security via seccomp/AppArmor |
| **Alternatives** | Firecracker microVMs (more secure, complex), gVisor (syscall interception), WASM (limited language support) |
| **Pros** | Mature ecosystem; pre-built language images; resource cgroups; network isolation |
| **Cons** | Cold start latency; Docker-in-Docker complexity on cloud; host resource consumption |
| **Scaling** | Dedicated worker nodes; container pool pre-warming; auto-scaling based on queue depth |

## 3.4 Authentication

### Clerk (Primary Choice)

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Fastest time-to-market; pre-built UI components; OAuth providers; webhook system; session management |
| **Alternatives** | Auth.js/NextAuth (self-hosted, more control), Supabase Auth (bundled with DB), Firebase Auth |
| **Pros** | 30-minute integration; user management dashboard; MFA support; organization support for teams |
| **Cons** | Cost at scale ($0.02/MAU after free tier); vendor dependency |
| **Scaling** | Clerk handles scaling; abstract behind `AuthProvider` interface |

## 3.5 AI

### OpenAI API (GPT-4o / GPT-4o-mini)

| Aspect | Detail |
|--------|--------|
| **Why Chosen** | Best reasoning for code explanation; streaming support; function calling; JSON mode |
| **Alternatives** | Anthropic Claude (strong reasoning), Google Gemini (cost), self-hosted Llama (quality gap) |
| **Pros** | Superior code understanding; streaming SSE; structured output; fine-tuning available |
| **Cons** | Cost per token; latency; data privacy concerns |
| **Scaling** | GPT-4o-mini for simple explanations; GPT-4o for complex debugging; aggressive caching; token budget management |

## 3.6 Deployment

| Platform | Role | Why |
|----------|------|-----|
| **Vercel** | Frontend (Next.js) | Native Next.js support; edge network; preview deployments; zero-config |
| **Railway** | Backend API + Workers + Docker | Docker support; PostgreSQL/Redis add-ons; simple scaling; reasonable pricing |
| **Render** | Fallback backend | Docker support; free tier for staging; auto-deploy from Git |
| **AWS (Future)** | Full migration target | ECS/EKS for workers; RDS for PostgreSQL; ElastiCache for Redis; CloudFront CDN; S3 for traces |

## 3.7 Additional Libraries

| Library | Purpose | Version |
|---------|---------|---------|
| Zustand | Client state management | ^5.0 |
| TanStack Query | Server state, caching, mutations | ^5.0 |
| Zod | Runtime validation (API input) | ^3.23 |
| BullMQ | Job queue for execution | ^5.0 |
| Dockerode | Docker Engine API client | ^4.0 |
| @babel/core + @babel/traverse | JS instrumentation | ^7.24 |
| Python ast module | Python instrumentation (stdlib) | — |
| tree-sitter | C++/Java parsing | ^0.21 |
| winston | Structured logging | ^3.13 |
| helmet | HTTP security headers | ^7.1 |
| express-rate-limit | API rate limiting | ^7.3 |
| supertest | API testing | ^7.0 |
| Playwright | E2E testing | ^1.44 |
| Jest | Unit/integration testing | ^29.7 |

---

# SECTION 4 — SYSTEM ARCHITECTURE

## 4.1 High-Level Architecture

```
                                    ┌──────────────┐
                                    │   CDN/Edge   │
                                    │   (Vercel)   │
                                    └──────┬───────┘
                                           │
                              ┌────────────▼────────────┐
                              │     Next.js Frontend    │
                              │  ┌─────┐ ┌───────────┐  │
                              │  │ RSC │ │ Client UI │  │
                              │  └──┬──┘ └─────┬─────┘  │
                              └─────┼──────────┼────────┘
                                    │          │
                         ┌──────────▼──────────▼──────────┐
                         │        API Gateway / BFF        │
                         │     (Next.js API Routes OR      │
                         │      Express.js Backend)        │
                         └──────────┬──────────────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
     ┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
     │  Auth Service   │  │ Execution Queue │  │   AI Service    │
     │    (Clerk)      │  │    (BullMQ)     │  │   (OpenAI)      │
     └─────────────────┘  └────────┬────────┘  └─────────────────┘
                                   │
                          ┌────────▼────────┐
                          │ Execution Worker│
                          │  ┌───────────┐  │
                          │  │ Docker    │  │
                          │  │ Engine    │  │
                          │  │ ┌───┐┌───┐│  │
                          │  │ │JS ││Py ││  │
                          │  │ └───┘└───┘│  │
                          │  │ ┌───┐┌───┐│  │
                          │  │ │C++││Java│  │
                          │  │ └───┘└───┘│  │
                          │  └───────────┘  │
                          └────────┬────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
     ┌────────▼────────┐  ┌───────▼───────┐  ┌─────────▼────────┐
     │   PostgreSQL    │  │     Redis     │  │   S3 (Traces)    │
     │   (Prisma)      │  │ Cache/Queue   │  │   Large Blobs    │
     └─────────────────┘  └───────────────┘  └──────────────────┘
```

## 4.2 Request Flow

```
User Action → Frontend Component → TanStack Query Mutation
    → POST /api/executions { code, language, projectId }
        → Auth Middleware (verify Clerk JWT)
        → Validation Middleware (Zod schema)
        → Rate Limit Middleware (Redis counter)
        → Execution Controller
            → Create Execution record (status: QUEUED)
            → Enqueue job to BullMQ
            → Return { executionId, status: "queued" }
    → Frontend polls GET /api/executions/:id (or SSE stream)
        → Worker picks up job
        → Instrument code
        → Spawn Docker container
        → Execute & collect trace
        → Store trace (DB or S3)
        → Update Execution record (status: COMPLETED)
    → Frontend receives trace
    → Visualization Engine renders
```

## 4.3 Execution Flow (Detailed)

```mermaid
sequenceDiagram
    participant U as User Browser
    participant FE as Next.js Frontend
    participant API as Express API
    participant Q as BullMQ Queue
    participant W as Execution Worker
    participant D as Docker Container
    participant DB as PostgreSQL
    participant S3 as S3 Storage

    U->>FE: Click "Run"
    FE->>API: POST /api/executions
    API->>API: Validate & Auth
    API->>DB: Create Execution (QUEUED)
    API->>Q: Enqueue job
    API-->>FE: { executionId, status: "queued" }
    
    FE->>API: GET /api/executions/:id (poll/SSE)
    
    Q->>W: Dequeue job
    W->>W: Select language handler
    W->>W: Instrument source code
    W->>D: Create container
    W->>D: Copy instrumented code
    W->>D: Execute with timeout
    D-->>W: stdout/stderr + trace.json
    W->>W: Parse & validate trace
    
    alt trace > 100KB
        W->>S3: Store trace blob
        W->>DB: Update with S3 reference
    else trace <= 100KB
        W->>DB: Store trace inline (JSONB)
    end
    
    W->>DB: Update Execution (COMPLETED)
    W->>D: Destroy container
    
    API-->>FE: { status: "completed", trace }
    FE->>FE: Build visualization graph
    FE->>U: Render animated visualization
```

## 4.4 Frontend/Backend Interaction

| Layer | Responsibility | Communication |
|-------|---------------|---------------|
| RSC (Server Components) | Dashboard data fetch, SEO pages | Direct Prisma queries or API calls |
| Client Components | Editor, visualizations, playback | TanStack Query → REST API |
| API Routes (BFF) | Auth proxy, request aggregation | Internal Express API or direct DB |
| Express API | Business logic, execution, AI | REST JSON, SSE for streaming |
| WebSocket (P2) | Real-time collaboration | Socket.io with Redis adapter |

## 4.5 AI Interaction Flow

```
User clicks "Explain"
    → Frontend: POST /api/ai/explain { executionId, stepRange? }
    → API: Fetch trace from DB/S3
    → API: Summarize trace (reduce to token budget)
        → Extract: function names, key variables, control flow summary
        → Max 4000 tokens context
    → API: Check Redis cache (hash of code + trace summary)
        → Cache hit → Return cached response
        → Cache miss → Continue
    → API: Build prompt from template
    → API: OpenAI streaming request (GPT-4o)
    → API: Stream SSE chunks to frontend
    → Frontend: Render streaming text in AI panel
    → API: Cache complete response in Redis (TTL: 24h)
    → API: Store AI chat message in DB
```

## 4.6 Docker Execution Lifecycle

```
1. POOL CHECK
   ├── Warm container available? → Reuse (reset filesystem)
   └── No warm container → Create new from base image

2. SETUP (target: <500ms)
   ├── Create tmpfs mount at /tmp (writable)
   ├── Copy instrumented code to /tmp/user_code.*
   ├── Copy trace collector script to /tmp/
   └── Set permissions (non-root user: flowmind:1000)

3. EXECUTE (target: <10s)
   ├── Run language-specific command
   ├── Monitor stdout/stderr streams
   ├── Enforce timeout (SIGKILL at limit)
   ├── Monitor memory ( cgroup limit)
   └── Collect trace output

4. EXTRACT
   ├── Read /tmp/trace.json
   ├── Read stdout/stderr buffers
   ├── Parse exit code
   └── Validate trace schema

5. CLEANUP (target: <200ms)
   ├── Kill remaining processes
   ├── Remove tmpfs data
   ├── Destroy container (if not pooled)
   └── Return container to pool (if pooled)
```

## 4.7 Visualization Rendering Flow

```
Trace JSON received
    → TraceParser: validate schema, build step index
    → GraphBuilder (Web Worker):
        ├── Map trace events → graph nodes/edges
        ├── Compute layout (dagre)
        └── Return graph structure
    → RecursionTreeBuilder: extract call/return pairs
    → VariableExtractor: build per-step variable snapshots
    → TimelineBuilder: create step sequence with durations
    → PlaybackController (Zustand): initialize at step 0
    → React Flow: render graph with initial state
    → VariablePanel: render step 0 variables
    → OutputPanel: render accumulated output
    → User presses Play:
        ├── RAF loop increments step
        ├── Framer Motion animates active node transition
        ├── VariablePanel diffs and highlights changes
        └── OutputPanel appends new lines
```

## 4.8 Monorepo Folder Structure

```
flowmind/
├── apps/
│   ├── web/                          # Next.js frontend
│   │   ├── app/                      # App Router pages
│   │   │   ├── (auth)/               # Auth route group
│   │   │   │   ├── sign-in/
│   │   │   │   └── sign-up/
│   │   │   ├── (dashboard)/          # Protected routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── project/[id]/
│   │   │   │   └── settings/
│   │   │   ├── (marketing)/          # Public pages
│   │   │   │   ├── page.tsx          # Landing
│   │   │   │   └── pricing/
│   │   │   ├── embed/[id]/           # Embeddable viz
│   │   │   ├── api/                  # BFF API routes
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/                   # Design system primitives
│   │   │   ├── editor/               # Monaco wrapper
│   │   │   ├── visualization/        # Graph, tree, memory, timeline
│   │   │   ├── ai/                   # AI chat/explanation panels
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   └── layout/               # Shell, sidebar, header
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/                      # Utilities, API client
│   │   ├── stores/                   # Zustand stores
│   │   ├── workers/                  # Web Workers (graph layout)
│   │   ├── styles/                   # Global styles, themes
│   │   └── types/                    # Frontend-specific types
│   │
│   └── api/                          # Express.js backend
│       ├── src/
│       │   ├── index.ts              # Entry point
│       │   ├── app.ts                # Express app setup
│       │   ├── routes/               # Route definitions
│       │   ├── controllers/          # Request handlers
│       │   ├── services/             # Business logic
│       │   ├── middleware/            # Auth, validation, rate limit
│       │   ├── workers/              # BullMQ job processors
│       │   ├── execution/            # Execution engine
│       │   │   ├── docker/           # Container management
│       │   │   ├── instrumentation/ # Per-language instrumentation
│       │   │   ├── languages/        # Language handlers
│       │   │   └── trace/            # Trace parsing/validation
│       │   ├── ai/                   # AI service
│       │   └── utils/                # Shared utilities
│       ├── prisma/
│       │   └── schema.prisma
│       └── docker/
│           ├── node/Dockerfile
│           ├── python/Dockerfile
│           ├── cpp/Dockerfile
│           └── java/Dockerfile
│
├── packages/
│   ├── types/                        # Shared TypeScript types
│   │   ├── trace.ts                  # FlowTrace schema types
│   │   ├── api.ts                    # API request/response types
│   │   └── index.ts
│   ├── trace-schema/                 # FlowTrace JSON schema
│   │   └── flow-trace-v1.json
│   └── config/                       # Shared configs
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── infra/
│   ├── docker-compose.yml            # Local dev stack
│   ├── docker-compose.prod.yml
│   └── scripts/
│       ├── seed-templates.ts
│       └── build-images.sh
│
├── docs/
│   └── MASTER_PROJECT_DOCUMENTATION.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-web.yml
│       └── deploy-api.yml
│
├── turbo.json                        # Turborepo config
├── package.json
└── pnpm-workspace.yaml
```

## 4.9 Service Architecture

| Service | Type | Responsibility | Scaling |
|---------|------|---------------|---------|
| **web** | Next.js app | UI rendering, BFF | Vercel auto-scale |
| **api** | Express server | REST API, auth, business logic | Horizontal replicas behind LB |
| **execution-worker** | BullMQ consumer | Code execution in Docker | Scale based on queue depth |
| **ai-worker** | BullMQ consumer (P1) | Async AI processing | Scale based on AI queue depth |
| **postgres** | Database | Persistent storage | Vertical → read replicas → Citus |
| **redis** | Cache/Queue | Rate limiting, caching, job queue | Redis Cluster |
| **s3** | Object storage | Large trace blobs | Infinite (AWS managed) |

## 4.10 Future Microservice Migration Path

```
Phase 1 (MVP): Modular Monolith
    └── apps/api contains all services as modules

Phase 2 (10K MAU): Service Extraction
    ├── execution-service (Docker workers)
    ├── ai-service (OpenAI proxy + caching)
    └── api-gateway (routing, auth, rate limit)

Phase 3 (100K MAU): Full Microservices
    ├── auth-service
    ├── project-service
    ├── execution-service (auto-scaling worker pool)
    ├── trace-service (storage + retrieval)
    ├── visualization-service (server-side graph building)
    ├── ai-service (multi-model routing)
    ├── notification-service
    └── analytics-service

Migration Strategy:
    1. Extract services behind internal API interfaces (already modular)
    2. Deploy as separate containers on Railway/AWS ECS
    3. Communication via REST → gRPC for inter-service
    4. Event bus (Redis Streams → Kafka) for async events
    5. API Gateway (Kong/AWS API Gateway) for external routing
```

---

# SECTION 5 — FRONTEND ARCHITECTURE

## 5.1 App Structure (Next.js App Router)

```
app/
├── (marketing)/                 # Public, no auth required
│   ├── layout.tsx               # Marketing layout (navbar, footer)
│   ├── page.tsx                 # Landing page
│   └── pricing/page.tsx
├── (auth)/                      # Auth pages (Clerk)
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── (dashboard)/                 # Protected app shell
│   ├── layout.tsx               # Sidebar + header + auth guard
│   ├── dashboard/page.tsx       # Project grid
│   ├── project/[id]/page.tsx    # Editor + visualization workspace
│   ├── templates/page.tsx       # DSA templates gallery
│   ├── history/page.tsx         # Global execution history
│   └── settings/page.tsx        # User settings, billing
├── embed/[executionId]/page.tsx # Minimal embed view
├── api/                         # BFF routes (optional proxy layer)
│   └── [...proxy]/route.ts
├── layout.tsx                   # Root layout (providers, fonts)
└── globals.css                  # Tailwind imports + CSS variables
```

### Route Protection Strategy

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/embed/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## 5.2 Component Architecture

### Component Hierarchy

```
AppShell
├── Sidebar
│   ├── Logo
│   ├── NavLinks
│   └── UserMenu
├── Header
│   ├── Breadcrumbs
│   ├── ProjectTitle (editable)
│   └── ActionButtons (Run, Share, AI)
└── MainContent
    ├── EditorWorkspace (project/[id])
    │   ├── EditorPanel
    │   │   ├── LanguageSelector
    │   │   ├── CodeEditor (Monaco)
    │   │   └── EditorToolbar
    │   ├── VisualizationPanel
    │   │   ├── VizTabBar (Graph | Recursion | Memory | Output)
    │   │   ├── ExecutionGraph (React Flow)
    │   │   ├── RecursionTree
    │   │   ├── MemoryView
    │   │   └── OutputPanel
    │   ├── VariablePanel
    │   │   ├── VariableList
    │   │   └── VariableDiff
    │   ├── TimelineBar
    │   │   ├── PlaybackControls
    │   │   ├── SpeedSelector
    │   │   └── TimelineScrubber
    │   └── AIPanel (collapsible)
    │       ├── ExplanationView
    │       └── ChatInterface
    └── DashboardGrid (dashboard)
        ├── ProjectCard[]
        ├── QuickStartTemplates
        └── RecentExecutions
```

### Component Classification

| Category | Location | Naming | Props Pattern |
|----------|----------|--------|---------------|
| **UI Primitives** | `components/ui/` | PascalCase | Variant-based (CVA) |
| **Feature Components** | `components/{feature}/` | PascalCase | Domain-specific props |
| **Layout Components** | `components/layout/` | PascalCase | Children + slots |
| **Page Components** | `app/**/page.tsx` | default export | Server or Client |
| **Providers** | `components/providers/` | `{Name}Provider` | Children wrapper |

### Component Standards

```typescript
// Every component follows this structure:
'use client'; // only if needed

import { cn } from '@/lib/utils';
import { type ComponentProps } from '@/types';

interface ExecutionGraphProps {
  trace: FlowTrace;
  currentStep: number;
  onNodeClick: (stepIndex: number) => void;
  className?: string;
}

export function ExecutionGraph({
  trace,
  currentStep,
  onNodeClick,
  className,
}: ExecutionGraphProps) {
  // Implementation
  return (
    <div className={cn('relative h-full w-full', className)}>
      {/* ... */}
    </div>
  );
}
```

## 5.3 Reusable UI System

Built on **shadcn/ui** pattern (copy-paste, not dependency):

| Component | Purpose | Variants |
|-----------|---------|----------|
| `Button` | Actions | primary, secondary, ghost, destructive, icon |
| `Input` | Text input | default, search |
| `Dialog` | Modals | default, fullscreen |
| `Tabs` | Tab navigation | default, pills |
| `Tooltip` | Hover info | default |
| `Badge` | Status indicators | default, success, warning, error |
| `Card` | Content containers | default, interactive, glass |
| `Skeleton` | Loading states | text, card, circle |
| `DropdownMenu` | Context menus | default |
| `Toast` | Notifications | success, error, info |
| `ResizablePanel` | Editor layout | horizontal, vertical |
| `ScrollArea` | Custom scrollbars | default |

### CVA Variant Pattern

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
        secondary: 'bg-surface-2 text-foreground hover:bg-surface-3',
        ghost: 'hover:bg-surface-2 text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
```

## 5.4 Design System Tokens

See Section 12 for full palette. CSS variables in `globals.css`:

```css
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 95%;
  --surface-1: 0 0% 6%;
  --surface-2: 0 0% 9%;
  --surface-3: 0 0% 12%;
  --accent: 262 83% 58%;
  --accent-foreground: 0 0% 100%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 64%;
  --border: 0 0% 15%;
  --ring: 262 83% 58%;
  --destructive: 0 62% 50%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --glass: 0 0% 100% / 0.05;
  --glass-border: 0 0% 100% / 0.1;
}
```

## 5.5 Animation Architecture

### Animation Layers

| Layer | Tool | Use Case |
|-------|------|----------|
| **Micro-interactions** | Framer Motion | Button hover, tab switch, panel open |
| **Graph transitions** | Framer Motion + React Flow | Active node highlight, edge flow |
| **Page transitions** | Framer Motion AnimatePresence | Route changes, modal open/close |
| **Playback animation** | Custom RAF loop | Timeline step progression |
| **Loading states** | Framer Motion + Skeleton | Content loading, execution running |

### Animation Standards

```typescript
// lib/animation.ts — centralized animation configs
export const spring = { type: 'spring', stiffness: 300, damping: 30 };
export const easeOut = { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.3 };
export const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: easeOut,
};

// Always respect reduced motion
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
```

### Playback Animation Pipeline

```
PlaybackController.setStep(n)
    → React Flow: highlight node at step n (CSS class toggle)
    → Framer Motion: animate node scale/glow (layoutId transition)
    → VariablePanel: diff step n-1 vs n, animate changed values
    → OutputPanel: append new output lines with fadeIn
    → TimelineBar: update scrubber position
    → RecursionTree: highlight active call frame
```

## 5.6 State Management

### State Categories

| Category | Tool | Examples |
|----------|------|----------|
| **Server state** | TanStack Query | Projects, executions, user data |
| **Client UI state** | Zustand | Playback step, active tab, panel sizes |
| **Form state** | React Hook Form + Zod | Settings, project creation |
| **URL state** | Next.js searchParams | Active viz tab, step deep-link |
| **Ephemeral state** | useState/useReducer | Modal open, hover states |

### Zustand Store: PlaybackController

```typescript
// stores/playback-store.ts
interface PlaybackState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number; // 0.25 | 0.5 | 1 | 2 | 4
  trace: FlowTrace | null;
  
  // Actions
  setTrace: (trace: FlowTrace) => void;
  setStep: (step: number) => void;
  stepForward: () => void;
  stepBackward: () => void;
  play: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  currentStep: 0,
  totalSteps: 0,
  isPlaying: false,
  speed: 1,
  trace: null,
  // ... actions
}));
```

### TanStack Query Patterns

```typescript
// hooks/use-project.ts
export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.projects.get(projectId),
    staleTime: 30_000,
  });
}

export function useExecuteCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.executions.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['executions', data.projectId] });
    },
  });
}
```

## 5.7 API Layer

```typescript
// lib/api/client.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api';

class ApiClient {
  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    });
    if (!res.ok) throw new ApiError(res.status, await res.json());
    return res.json();
  }

  projects = {
    list: (params?: ProjectListParams) => this.request<Project[]>('/projects', { ... }),
    get: (id: string) => this.request<Project>(`/projects/${id}`),
    create: (data: CreateProjectInput) => this.request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: UpdateProjectInput) => this.request<Project>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => this.request<void>(`/projects/${id}`, { method: 'DELETE' }),
  };

  executions = {
    create: (data: CreateExecutionInput) => this.request<Execution>('/executions', { method: 'POST', body: JSON.stringify(data) }),
    get: (id: string) => this.request<Execution>(`/executions/${id}`),
    poll: (id: string) => this.request<ExecutionStatus>(`/executions/${id}/status`),
  };

  ai = {
    explain: (data: ExplainInput) => this.streamRequest('/ai/explain', data),
    chat: (data: ChatInput) => this.streamRequest('/ai/chat', data),
  };
}

export const api = new ApiClient();
```

## 5.8 Hooks Structure

```
hooks/
├── use-project.ts           # Project CRUD queries
├── use-execution.ts         # Execution create/poll
├── use-auto-save.ts         # Debounced project save
├── use-playback.ts          # Playback controller hook
├── use-keyboard-shortcuts.ts # Global shortcuts
├── use-trace-graph.ts       # Graph building from trace
├── use-variable-diff.ts     # Variable change detection
├── use-ai-stream.ts         # SSE streaming for AI
├── use-media-query.ts       # Responsive breakpoints
├── use-reduced-motion.ts    # Accessibility
└── use-debounce.ts          # Utility
```

## 5.9 Performance Optimization

| Strategy | Implementation |
|----------|---------------|
| **Code splitting** | Dynamic import Monaco, React Flow, Three.js |
| **Web Workers** | Graph layout computation off main thread |
| **Memoization** | `React.memo` on graph nodes; `useMemo` for trace parsing |
| **Virtualization** | `@tanstack/react-virtual` for variable lists, timeline |
| **Debouncing** | Auto-save (2s), search (300ms) |
| **Prefetching** | Preload project on dashboard card hover |
| **Image optimization** | Next.js `<Image>` for marketing pages |
| **Bundle analysis** | `@next/bundle-analyzer` in CI |
| **React Flow optimization** | Custom node components memoized; only active node re-renders |

### Performance Budgets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive (editor) | < 3.5s |
| Graph render (500 nodes) | < 500ms |
| Playback frame rate | 60fps |
| Monaco load | < 1s (after dynamic import) |

## 5.10 Dark Theme Architecture

- Default theme: **dark only** for MVP (light theme P2)
- CSS variables for all colors → single source of truth
- Monaco custom theme registered to match FlowMind palette
- React Flow custom node styles using CSS variables
- Glassmorphism panels: `backdrop-blur-xl bg-glass border-glass-border`

## 5.11 Responsive Strategy

| Breakpoint | Layout |
|------------|--------|
| `< 768px` | Mobile: view-only mode, no editor. "Use desktop" banner |
| `768px–1024px` | Tablet: simplified layout, stacked panels |
| `1024px–1440px` | Desktop: full layout with resizable panels |
| `> 1440px` | Wide: extra space for AI panel, larger graph |

Editor workspace uses `react-resizable-panels` for adjustable panel sizes.

## 5.12 Accessibility Strategy

| Requirement | Implementation |
|-------------|---------------|
| Keyboard navigation | All controls reachable via Tab; shortcuts documented |
| Screen reader | ARIA labels on graph nodes, variable changes announced |
| Color contrast | WCAG AA minimum (4.5:1 text, 3:1 UI) |
| Reduced motion | `prefers-reduced-motion` disables animations |
| Focus indicators | Visible focus rings on all interactive elements |
| Skip links | "Skip to editor" link on page load |

---

# SECTION 6 — BACKEND ARCHITECTURE

## 6.1 Express Application Structure

```typescript
// apps/api/src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error-handler';
import { rateLimiter } from './middleware/rate-limiter';
import { requestLogger } from './middleware/request-logger';
import { projectRoutes } from './routes/projects';
import { executionRoutes } from './routes/executions';
import { aiRoutes } from './routes/ai';
import { userRoutes } from './routes/users';
import { analyticsRoutes } from './routes/analytics';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
  app.use(express.json({ limit: '1mb' }));
  app.use(requestLogger);

  // Public routes
  app.get('/health', (_, res) => res.json({ status: 'ok' }));

  // Protected routes
  app.use('/api/v1/projects', authMiddleware, rateLimiter, projectRoutes);
  app.use('/api/v1/executions', authMiddleware, rateLimiter, executionRoutes);
  app.use('/api/v1/ai', authMiddleware, rateLimiter, aiRoutes);
  app.use('/api/v1/users', authMiddleware, userRoutes);
  app.use('/api/v1/analytics', authMiddleware, analyticsRoutes);

  app.use(errorHandler);
  return app;
}
```

## 6.2 Route Definitions

### Projects Router

```typescript
// routes/projects.ts
const router = Router();

router.get('/', projectController.list);           // List user projects
router.post('/', projectController.create);         // Create project
router.get('/:id', projectController.get);          // Get project
router.patch('/:id', projectController.update);     // Update project (auto-save)
router.delete('/:id', projectController.delete);    // Delete project
router.get('/:id/executions', projectController.listExecutions);
router.post('/:id/duplicate', projectController.duplicate);
router.post('/:id/share', projectController.generateShareLink);
```

### Executions Router

```typescript
// routes/executions.ts
const router = Router();

router.post('/', executionController.create);        // Submit code for execution
router.get('/:id', executionController.get);         // Get execution result
router.get('/:id/status', executionController.status); // Poll execution status
router.get('/:id/trace', executionController.getTrace); // Get full trace
router.delete('/:id', executionController.cancel);  // Cancel running execution
```

### AI Router

```typescript
// routes/ai.ts
const router = Router();

router.post('/explain', aiController.explain);      // Generate explanation (SSE)
router.post('/chat', aiController.chat);            // Chat message (SSE)
router.get('/conversations/:projectId', aiController.getConversation);
router.post('/analyze-complexity', aiController.analyzeComplexity);
```

## 6.3 Controller Pattern

```typescript
// controllers/execution.controller.ts
export class ExecutionController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const input = createExecutionSchema.parse(req.body);
      const execution = await executionService.create({
        userId: req.user.id,
        projectId: input.projectId,
        code: input.code,
        language: input.language,
        stdin: input.stdin,
      });
      res.status(202).json({ data: execution });
    } catch (error) {
      next(error);
    }
  }

  async status(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const status = await executionService.getStatus(req.params.id, req.user.id);
      res.json({ data: status });
    } catch (error) {
      next(error);
    }
  }
}
```

## 6.4 Service Layer

```
services/
├── project.service.ts       # Project CRUD, sharing
├── execution.service.ts     # Execution orchestration
├── trace.service.ts         # Trace storage/retrieval
├── ai.service.ts            # OpenAI integration
├── user.service.ts          # User sync, preferences
├── analytics.service.ts     # Usage tracking
├── subscription.service.ts  # Plan limits enforcement
└── collaboration.service.ts # Session management (P2)
```

### Execution Service (Core)

```typescript
// services/execution.service.ts
export class ExecutionService {
  async create(params: CreateExecutionParams): Promise<Execution> {
    // 1. Validate user plan limits
    await subscriptionService.checkExecutionLimit(params.userId);
    
    // 2. Create DB record
    const execution = await prisma.execution.create({
      data: {
        userId: params.userId,
        projectId: params.projectId,
        code: params.code,
        language: params.language,
        status: 'QUEUED',
      },
    });

    // 3. Enqueue job
    await executionQueue.add('execute', {
      executionId: execution.id,
      code: params.code,
      language: params.language,
      stdin: params.stdin,
    }, {
      jobId: execution.id,
      attempts: 1,
      timeout: 30_000,
    });

    // 4. Track analytics
    await analyticsService.track(params.userId, 'execution.created', {
      language: params.language,
      codeLength: params.code.length,
    });

    return execution;
  }
}
```

## 6.5 Middleware Stack

| Middleware | Order | Purpose |
|------------|-------|---------|
| `helmet` | 1 | Security headers |
| `cors` | 2 | Cross-origin control |
| `express.json` | 3 | Body parsing |
| `requestLogger` | 4 | Structured logging (winston) |
| `authMiddleware` | 5 | Clerk JWT verification |
| `rateLimiter` | 6 | Redis-backed rate limiting |
| `validateMiddleware` | 7 | Zod schema validation (per route) |
| `errorHandler` | 8 | Global error formatting |

### Auth Middleware

```typescript
// middleware/auth.ts
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedError();

    const clerkUser = await clerkClient.verifyToken(token);
    const user = await userService.findOrCreateByClerkId(clerkUser.sub);
    
    req.user = user;
    next();
  } catch {
    next(new UnauthorizedError());
  }
}
```

### Rate Limiter

```typescript
// middleware/rate-limiter.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

export const rateLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  windowMs: 60_000,
  max: async (req) => {
    const plan = await subscriptionService.getPlan(req.user?.id);
    return plan === 'pro' ? 120 : 30;
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const executionRateLimiter = rateLimit({
  windowMs: 60_000,
  max: async (req) => {
    const plan = await subscriptionService.getPlan(req.user?.id);
    return plan === 'pro' ? 30 : 5;
  },
});
```

## 6.6 Logging System

```typescript
// utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'flowmind-api' },
  transports: [
    new winston.transports.Console(),
    // Production: add Datadog/Logtail transport
  ],
});

// Usage in controllers:
logger.info('Execution created', { executionId, userId, language });
logger.error('Execution failed', { executionId, error: err.message, stack: err.stack });
```

## 6.7 Error Handling

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`);
  }
}

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, 'VALIDATION_ERROR', 'Invalid request data', details);
  }
}

export class ExecutionError extends AppError {
  constructor(message: string, details?: unknown) {
    super(422, 'EXECUTION_ERROR', message, details);
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(429, 'RATE_LIMIT', 'Too many requests');
  }
}

// middleware/error-handler.ts
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    logger.warn(err.message, { code: err.code, statusCode: err.statusCode });
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
}
```

## 6.8 Queue Architecture

```typescript
// workers/execution.worker.ts
import { Worker, Queue } from 'bullmq';

export const executionQueue = new Queue('execution', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});

const worker = new Worker('execution', async (job) => {
  const { executionId, code, language, stdin } = job.data;
  
  await executionService.updateStatus(executionId, 'RUNNING');
  
  try {
    const handler = languageHandlers[language];
    const result = await handler.execute({ code, stdin, executionId });
    
    await traceService.store(executionId, result.trace);
    await executionService.complete(executionId, {
      status: 'COMPLETED',
      stdout: result.stdout,
      stderr: result.stderr,
      durationMs: result.durationMs,
      stepCount: result.trace.steps.length,
    });
  } catch (error) {
    await executionService.fail(executionId, error);
    throw error;
  }
}, {
  connection: redisConnection,
  concurrency: parseInt(process.env.WORKER_CONCURRENCY ?? '5'),
});
```

## 6.9 Future WebSocket Architecture (P2)

```typescript
// Future: services/websocket.service.ts
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
  cors: { origin: process.env.ALLOWED_ORIGINS },
});

io.on('connection', (socket) => {
  socket.on('join-session', async ({ sessionId, token }) => {
    const user = await verifyToken(token);
    socket.join(`session:${sessionId}`);
    io.to(`session:${sessionId}`).emit('user-joined', { userId: user.id });
  });

  socket.on('playback-sync', ({ sessionId, step }) => {
    socket.to(`session:${sessionId}`).emit('playback-update', { step });
  });
});
```

## 6.10 Event-Driven Architecture (Future)

```
Events (Redis Streams / Kafka):
├── execution.completed    → analytics, AI auto-explain, notification
├── project.created        → analytics, welcome email
├── user.signup            → analytics, onboarding sequence
├── subscription.upgraded  → analytics, feature unlock
└── collaboration.joined   → presence update, notification

Event Schema:
{
  "id": "uuid",
  "type": "execution.completed",
  "timestamp": "ISO8601",
  "data": { ... },
  "metadata": { "userId", "correlationId" }
}
```

---

# SECTION 7 — EXECUTION ENGINE

> This section is the technical core of FlowMind. Every visualization derives from deterministic execution traces produced here.

## 7.1 Execution Engine Overview

```
User Code
    ↓
Language Router (select handler by language enum)
    ↓
Code Validator (syntax check, size limit, forbidden patterns)
    ↓
Instrumentation Engine (AST transform → instrumented code)
    ↓
Docker Container Manager (create/reuse container)
    ↓
Runtime Executor (compile if needed → run instrumented code)
    ↓
Trace Collector (parse stdout/trace.json → FlowTrace)
    ↓
Trace Validator (schema validation, size limits)
    ↓
Trace Storage (PostgreSQL JSONB or S3)
```

## 7.2 FlowTrace JSON Schema v1

```json
{
  "$schema": "flow-trace-v1",
  "version": "1.0.0",
  "metadata": {
    "language": "javascript",
    "executionId": "exec_abc123",
    "startedAt": "2026-06-03T10:00:00.000Z",
    "completedAt": "2026-06-03T10:00:01.234Z",
    "durationMs": 1234,
    "exitCode": 0,
    "instrumentationVersion": "1.0.0"
  },
  "source": {
    "original": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));",
    "lineCount": 5,
    "hash": "sha256:abc..."
  },
  "steps": [
    {
      "index": 0,
      "timestamp": 0,
      "type": "line",
      "line": 5,
      "column": 0,
      "frameId": "frame_0",
      "variables": {
        "n": { "type": "number", "value": 5 }
      }
    },
    {
      "index": 1,
      "timestamp": 1,
      "type": "call",
      "line": 1,
      "frameId": "frame_1",
      "functionName": "factorial",
      "arguments": { "n": 5 },
      "parentFrameId": "frame_0",
      "depth": 1
    },
    {
      "index": 2,
      "timestamp": 2,
      "type": "condition",
      "line": 2,
      "frameId": "frame_1",
      "expression": "n <= 1",
      "result": false,
      "branch": "false"
    },
    {
      "index": 15,
      "timestamp": 15,
      "type": "return",
      "line": 3,
      "frameId": "frame_1",
      "functionName": "factorial",
      "returnValue": 120,
      "depth": 1
    },
    {
      "index": 16,
      "timestamp": 16,
      "type": "output",
      "line": 5,
      "frameId": "frame_0",
      "text": "120",
      "stream": "stdout"
    }
  ],
  "frames": [
    {
      "id": "frame_0",
      "functionName": "<global>",
      "depth": 0,
      "variables": {}
    },
    {
      "id": "frame_1",
      "functionName": "factorial",
      "depth": 1,
      "parentId": "frame_0",
      "variables": { "n": { "type": "number", "value": 5 } }
    }
  ],
  "stats": {
    "totalSteps": 17,
    "maxDepth": 5,
    "functionCalls": 5,
    "assignments": 4,
    "outputLines": 1,
    "memoryPeakBytes": null
  }
}
```

### Step Event Types

| Type | Description | Required Fields |
|------|-------------|-----------------|
| `line` | Line about to execute | line, frameId |
| `call` | Function call entered | functionName, arguments, depth, parentFrameId |
| `return` | Function returning | functionName, returnValue, depth |
| `assign` | Variable assignment | variable, oldValue, newValue |
| `condition` | Conditional evaluated | expression, result, branch |
| `loop_iter` | Loop iteration start | loopLine, iteration, variables |
| `exception` | Exception thrown | errorType, message, line, stackTrace |
| `output` | stdout/stderr output | text, stream |
| `memory_alloc` | Memory allocation (C++/Java) | address, size, type |
| `memory_free` | Memory deallocation | address |

## 7.3 Docker Container Architecture

### Base Images

```dockerfile
# docker/node/Dockerfile
FROM node:20-alpine
RUN addgroup -g 1000 flowmind && adduser -u 1000 -G flowmind -s /bin/sh -D flowmind
COPY trace-collector.js /opt/flowmind/
USER flowmind
WORKDIR /tmp
CMD ["node", "user_code.js"]
```

```dockerfile
# docker/python/Dockerfile
FROM python:3.12-alpine
RUN addgroup -g 1000 flowmind && adduser -u 1000 -G flowmind -s /bin/sh -D flowmind
COPY trace_collector.py /opt/flowmind/
USER flowmind
WORKDIR /tmp
CMD ["python", "user_code.py"]
```

### Container Security Configuration

```typescript
// execution/docker/container-manager.ts
const CONTAINER_CONFIG = {
  HostConfig: {
    Memory: 256 * 1024 * 1024,        // 256MB
    MemorySwap: 256 * 1024 * 1024,    // No swap
    CpuQuota: 50000,                   // 0.5 CPU
    CpuPeriod: 100000,
    NetworkMode: 'none',               // No network
    ReadonlyRootfs: true,              // Read-only root
    Tmpfs: { '/tmp': 'size=50m,mode=1777' },
    SecurityOpt: ['no-new-privileges'],
    CapDrop: ['ALL'],
    PidsLimit: 64,                     // Max processes
    AutoRemove: false,                 // Manual cleanup for trace extraction
  },
  User: '1000:1000',
};
```

### Container Lifecycle Manager

```typescript
export class ContainerManager {
  private pool: Map<Language, Docker.Container[]> = new Map();
  private docker: Dockerode;

  async execute(params: ExecuteParams): Promise<ExecuteResult> {
    const container = await this.acquireContainer(params.language);
    const startTime = Date.now();

    try {
      await this.copyCode(container, params.instrumentedCode, params.language);
      await container.start();

      const result = await this.waitForCompletion(container, {
        timeoutMs: params.timeoutMs ?? 10_000,
      });

      const trace = await this.extractTrace(container);
      return {
        trace,
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
        durationMs: Date.now() - startTime,
      };
    } finally {
      await this.releaseContainer(container, params.language);
    }
  }

  private async waitForCompletion(
    container: Docker.Container,
    opts: { timeoutMs: number },
  ): Promise<StreamResult> {
    const waitPromise = container.wait();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new ExecutionTimeoutError()), opts.timeoutMs),
    );

    const [waitResult, logs] = await Promise.race([
      Promise.all([waitPromise, this.collectLogs(container)]),
      timeoutPromise.then(() => { throw new ExecutionTimeoutError(); }),
    ]);

    return {
      exitCode: waitResult.StatusCode,
      stdout: logs.stdout,
      stderr: logs.stderr,
    };
  }
}
```

## 7.4 Language Handler Interface

```typescript
// execution/languages/types.ts
interface LanguageHandler {
  language: Language;
  fileExtension: string;
  executeCommand: string[];
  compileCommand?: string[];
  maxCodeSize: number;
  defaultTimeoutMs: number;
  memoryLimitMb: number;

  validate(code: string): ValidationResult;
  instrument(code: string): InstrumentResult;
  execute(params: ExecuteParams): Promise<ExecuteResult>;
  parseTrace(raw: string): FlowTrace;
}
```

## 7.5 JavaScript Instrumentation

### Strategy: Babel AST Plugin

```javascript
// Input
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Instrumented Output (conceptual)
const __trace = require('/opt/flowmind/trace-collector');

function binarySearch(arr, target) {
  __trace.call('binarySearch', { arr, target });
  __trace.line(2);
  let left = 0;
  __trace.assign('left', undefined, 0);
  __trace.line(3);
  let right = arr.length - 1;
  __trace.assign('right', undefined, arr.length - 1);
  __trace.line(4);
  while (left <= right) {
    __trace.loop(4, { left, right });
    __trace.line(5);
    const mid = Math.floor((left + right) / 2);
    __trace.assign('mid', undefined, mid);
    __trace.line(6);
    if (arr[mid] === target) {
      __trace.condition('arr[mid] === target', true, 'true');
      __trace.return(mid);
      return mid;
    }
    __trace.condition('arr[mid] === target', false, 'false');
    // ... etc
  }
  __trace.return(-1);
  return -1;
}
```

### Babel Plugin Implementation

```typescript
// execution/instrumentation/javascript/instrument-plugin.ts
export function instrumentPlugin(babel: typeof Babel): PluginObj {
  const { types: t } = babel;

  return {
    visitor: {
      FunctionDeclaration(path) {
        const fnName = path.node.id?.name ?? '<anonymous>';
        path.node.body.body.unshift(
          t.expressionStatement(
            t.callExpression(t.memberExpression(t.identifier('__trace'), t.identifier('call')), [
              t.stringLiteral(fnName),
              buildArgsObject(path.node.params),
            ]),
          ),
        );
      },

      VariableDeclaration(path) {
        for (const decl of path.node.declarations) {
          if (t.isIdentifier(decl.id) && decl.init) {
            path.insertAfter(
              t.expressionStatement(
                t.callExpression(t.memberExpression(t.identifier('__trace'), t.identifier('assign')), [
                  t.stringLiteral(decl.id.name),
                  t.nullLiteral(),
                  decl.init,
                ]),
              ),
            );
          }
        }
      },

      IfStatement(path) {
        const test = path.node.test;
        path.insertBefore(
          t.expressionStatement(
            t.callExpression(t.memberExpression(t.identifier('__trace'), t.identifier('condition')), [
              t.stringLiteral(generate(test)),
              test,
            ]),
          ),
        );
      },

      ReturnStatement(path) {
        if (path.node.argument) {
          path.insertBefore(
            t.expressionStatement(
              t.callExpression(t.memberExpression(t.identifier('__trace'), t.identifier('return')), [
                path.node.argument,
              ]),
            ),
          );
        }
      },

      WhileStatement(path) {
        path.node.body.body.unshift(
          t.expressionStatement(
            t.callExpression(t.memberExpression(t.identifier('__trace'), t.identifier('loop')), [
              t.numericLiteral(path.node.loc?.start.line ?? 0),
              buildLocalVariables(path),
            ]),
          ),
        );
      },
    },
  };
}
```

### Trace Collector (Node.js Runtime)

```javascript
// docker/node/trace-collector.js
const steps = [];
let stepIndex = 0;
let frameStack = [{ id: 'frame_0', name: '<global>', depth: 0, vars: {} }];
let frameCounter = 1;

function serialize(value, depth = 0) {
  if (depth > 5) return { type: 'object', value: '[Max Depth]' };
  if (value === null) return { type: 'null', value: null };
  if (value === undefined) return { type: 'undefined', value: undefined };
  if (typeof value === 'number' || typeof value === 'boolean') return { type: typeof value, value };
  if (typeof value === 'string') return { type: 'string', value: value.slice(0, 1000) };
  if (Array.isArray(value)) return { type: 'array', value: value.slice(0, 100).map(v => serialize(v, depth + 1)), length: value.length };
  if (typeof value === 'object') {
    const entries = Object.entries(value).slice(0, 50);
    return { type: 'object', value: Object.fromEntries(entries.map(([k, v]) => [k, serialize(v, depth + 1)])) };
  }
  return { type: 'unknown', value: String(value) };
}

function getCurrentFrame() {
  return frameStack[frameStack.length - 1];
}

function getVariables() {
  const frame = getCurrentFrame();
  return Object.fromEntries(
    Object.entries(frame.vars).map(([k, v]) => [k, serialize(v)]),
  );
}

module.exports = {
  line(lineNum) {
    steps.push({ index: stepIndex++, type: 'line', line: lineNum, frameId: getCurrentFrame().id, variables: getVariables(), timestamp: stepIndex });
  },
  call(name, args) {
    const parentFrame = getCurrentFrame();
    const newFrame = { id: `frame_${frameCounter++}`, name, depth: parentFrame.depth + 1, vars: { ...args }, parentId: parentFrame.id };
    frameStack.push(newFrame);
    steps.push({ index: stepIndex++, type: 'call', functionName: name, arguments: Object.fromEntries(Object.entries(args).map(([k, v]) => [k, serialize(v)])), frameId: newFrame.id, parentFrameId: parentFrame.id, depth: newFrame.depth, timestamp: stepIndex });
  },
  return(value) {
    const frame = frameStack.pop();
    steps.push({ index: stepIndex++, type: 'return', functionName: frame.name, returnValue: serialize(value), frameId: frame.id, depth: frame.depth, timestamp: stepIndex });
  },
  assign(name, oldVal, newVal) {
    getCurrentFrame().vars[name] = newVal;
    steps.push({ index: stepIndex++, type: 'assign', variable: name, oldValue: serialize(oldVal), newValue: serialize(newVal), frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  condition(expr, result, branch) {
    steps.push({ index: stepIndex++, type: 'condition', expression: expr, result, branch, frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  loop(line, vars) {
    steps.push({ index: stepIndex++, type: 'loop_iter', loopLine: line, variables: Object.fromEntries(Object.entries(vars).map(([k, v]) => [k, serialize(v)])), frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  output(text, stream = 'stdout') {
    steps.push({ index: stepIndex++, type: 'output', text, stream, frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  getTrace() {
    return { steps, frames: frameStack };
  },
};

// Intercept console.log
const originalLog = console.log;
console.log = (...args) => {
  module.exports.output(args.map(String).join(' '));
  originalLog.apply(console, args);
};

// Write trace on exit
process.on('exit', () => {
  const fs = require('fs');
  fs.writeFileSync('/tmp/trace.json', JSON.stringify(module.exports.getTrace()));
});
```

## 7.6 Python Instrumentation

### Strategy: AST Transformer

```python
# Input
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Instrumented (conceptual)
import sys
sys.path.insert(0, '/opt/flowmind')
from trace_collector import trace

def fibonacci(n):
    trace.call('fibonacci', n=n)
    trace.line(2)
    if n <= 1:
        trace.condition('n <= 1', True, 'true')
        trace.line(3)
        trace.return(n)
        return n
    trace.condition('n <= 1', False, 'false')
    trace.line(4)
    _result = fibonacci(n-1) + fibonacci(n-2)
    trace.return(_result)
    return _result
```

### Python AST Transformer

```python
# execution/instrumentation/python/instrumenter.py
import ast
import astor  # or use ast.unparse in 3.9+

class FlowMindTransformer(ast.NodeTransformer):
    def __init__(self):
        self.step_counter = 0

    def visit_FunctionDef(self, node):
        # Inject trace.call at function entry
        call_stmt = ast.Expr(value=ast.Call(
            func=ast.Attribute(value=ast.Name(id='trace', ctx=ast.Load()), attr='call', ctx=ast.Load()),
            args=[ast.Constant(value=node.name)],
            keywords=[ast.keyword(arg=arg.arg, value=arg) for arg in node.args.args],
        ))
        node.body.insert(0, call_stmt)
        self.generic_visit(node)
        return node

    def visit_Assign(self, node):
        self.generic_visit(node)
        for target in node.targets:
            if isinstance(target, ast.Name):
                trace_assign = ast.Expr(value=ast.Call(
                    func=ast.Attribute(value=ast.Name(id='trace', ctx=ast.Load()), attr='assign', ctx=ast.Load()),
                    args=[ast.Constant(value=target.id), ast.Constant(value=None), node.value],
                    keywords=[],
                ))
                return [node, trace_assign]
        return node

    def visit_If(self, node):
        self.generic_visit(node)
        trace_cond = ast.If(
            test=node.test,
            body=[ast.Expr(value=ast.Call(
                func=ast.Attribute(value=ast.Name(id='trace', ctx=ast.Load()), attr='condition', ctx=ast.Load()),
                args=[ast.Constant(value=ast.dump(node.test)), node.test],
                keywords=[],
            ))] + node.body,
            orelse=node.orelse,
        )
        return trace_cond

    def visit_While(self, node):
        self.generic_visit(node)
        loop_trace = ast.Expr(value=ast.Call(
            func=ast.Attribute(value=ast.Name(id='trace', ctx=ast.Load()), attr='loop', ctx=ast.Load()),
            args=[ast.Constant(value=node.lineno)],
            keywords=[],
        ))
        node.body.insert(0, loop_trace)
        return node

    def visit_Return(self, node):
        if node.value:
            trace_ret = ast.Expr(value=ast.Call(
                func=ast.Attribute(value=ast.Name(id='trace', ctx=ast.Load()), attr='return', ctx=ast.Load()),
                args=[node.value],
                keywords=[],
            ))
            return [trace_ret, node]
        return node
```

## 7.7 C++ Instrumentation

### Strategy: Source-to-Source Macro Injection

C++ uses compile-time instrumentation via injected trace macros:

```cpp
// trace_macros.h (copied into container)
#define TRACE_LINE() trace.line(__LINE__)
#define TRACE_CALL(fn, ...) trace.call(#fn, __VA_ARGS__)
#define TRACE_ASSIGN(var, val) trace.assign(#var, var, val)
#define TRACE_CONDITION(expr) trace.condition(#expr, (expr))
#define TRACE_RETURN(val) do { trace.return(val); return val; } while(0)

// Input
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Instrumented
#include "trace_macros.h"
int factorial(int n) {
    TRACE_CALL(factorial, n);
    TRACE_LINE();
    if (n <= 1) {
        TRACE_CONDITION(n <= 1);
        TRACE_RETURN(1);
    }
    TRACE_CONDITION(n <= 1);
    TRACE_LINE();
    int __result = n * factorial(n - 1);
    TRACE_RETURN(__result);
}
```

### C++ Instrumentation Pipeline

```typescript
// execution/instrumentation/cpp/instrumenter.ts
import Parser from 'tree-sitter';
import Cpp from 'tree-sitter-cpp';

export function instrumentCpp(source: string): string {
  const parser = new Parser();
  parser.setLanguage(Cpp);
  const tree = parser.parse(source);

  // Walk AST and inject TRACE_* macros at:
  // - Function definitions → TRACE_CALL
  // - Statement boundaries → TRACE_LINE
  // - If conditions → TRACE_CONDITION
  // - Return statements → TRACE_RETURN
  // - Variable declarations → TRACE_ASSIGN

  return injectMacros(source, tree);
}
```

### C++ Execution Flow

```
1. Instrument source code
2. Copy instrumented code + trace_macros.h + trace_collector.cpp to container
3. Compile: g++ -std=c++17 -O0 -o user_code user_code.cpp trace_collector.cpp
4. If compile error → return compile errors as stderr
5. Execute: ./user_code
6. Collect trace.json + stdout/stderr
```

## 7.8 Java Instrumentation

### Strategy: Java Agent (JVMTI) — Preferred

```java
// flowmind-agent.jar — Java Agent loaded via -javaagent
public class FlowMindAgent {
    public static void premain(String args, Instrumentation inst) {
        inst.addTransformer(new FlowMindClassTransformer());
    }
}

public class FlowMindClassTransformer implements ClassFileTransformer {
    public byte[] transform(ClassLoader loader, String className,
                           Class<?> classBeingRedefined,
                           ProtectionDomain protectionDomain,
                           byte[] classfileBuffer) {
        if (!className.equals("UserCode")) return null;
        
        // Use ASM to inject trace calls:
        // - Method entry → TraceCollector.call()
        // - Method exit → TraceCollector.return()
        // - Line numbers → TraceCollector.line()
        // - Field access → TraceCollector.assign()
        
        return asmInstrumentedBytes;
    }
}
```

### Java Execution Flow

```
1. Copy user code (UserCode.java) to container
2. Compile: javac UserCode.java
3. Execute: java -javaagent:/opt/flowmind/flowmind-agent.jar -Xmx256m UserCode
4. Agent instruments at class load time
5. TraceCollector writes JSON lines to stdout (prefixed with @@TRACE@@)
6. Worker separates trace lines from program output
7. Parse trace lines into FlowTrace JSON
```

## 7.9 Execution Limits & Safety

| Limit | Value | Enforcement |
|-------|-------|-------------|
| Max code size | 100 KB | API validation |
| Max execution time | 10s (JS/Python), 15s (C++/Java) | Container timeout + SIGKILL |
| Max memory | 256MB (JS/Py), 512MB (Java) | Docker cgroup |
| Max trace steps | 10,000 | Trace collector counter |
| Max trace size | 10 MB | File size check |
| Max stdout/stderr | 1 MB | Stream size limit |
| Max concurrent executions/user | 3 | Redis counter |
| Max function call depth | 500 | Trace collector |
| Max variable serialization depth | 5 | Serializer |
| Max array/object keys displayed | 100/50 | Serializer |
| Forbidden patterns | `require('child_process')`, `import os; os.system`, `#include <filesystem>` | Static analysis blocklist |

### Forbidden Pattern Detection

```typescript
const BLOCKLIST: Record<Language, RegExp[]> = {
  javascript: [
    /require\s*\(\s*['"]child_process['"]\)/,
    /require\s*\(\s*['"]fs['"]\)/,
    /require\s*\(\s*['"]net['"]\)/,
    /eval\s*\(/,
    /Function\s*\(/,
    /process\.exit/,
  ],
  python: [
    /import\s+os\s*;?\s*os\.(system|popen|exec)/,
    /subprocess/,
    /import\s+socket/,
    /__import__/,
    /exec\s*\(/,
    /eval\s*\(/,
  ],
  cpp: [
    /#include\s*<unistd\.h>/,
    /system\s*\(/,
    /popen\s*\(/,
    /fork\s*\(/,
  ],
  java: [
    /Runtime\.getRuntime/,
    /ProcessBuilder/,
    /System\.exit/,
    /java\.net/,
    /java\.io\.File/,
  ],
};
```

## 7.10 Trace Generation Pipeline

```typescript
// execution/trace/trace-processor.ts
export class TraceProcessor {
  process(rawTrace: RawTrace, metadata: TraceMetadata): FlowTrace {
    // 1. Validate step count
    if (rawTrace.steps.length > MAX_STEPS) {
      rawTrace.steps = rawTrace.steps.slice(0, MAX_STEPS);
      rawTrace.truncated = true;
    }

    // 2. Build frame index
    const frames = this.buildFrameIndex(rawTrace.steps);

    // 3. Compute stats
    const stats = {
      totalSteps: rawTrace.steps.length,
      maxDepth: Math.max(...rawTrace.steps.map(s => s.depth ?? 0)),
      functionCalls: rawTrace.steps.filter(s => s.type === 'call').length,
      assignments: rawTrace.steps.filter(s => s.type === 'assign').length,
      outputLines: rawTrace.steps.filter(s => s.type === 'output').length,
    };

    // 4. Validate against schema
    const trace: FlowTrace = {
      version: '1.0.0',
      metadata,
      source: metadata.source,
      steps: rawTrace.steps,
      frames,
      stats,
    };

    flowTraceSchema.parse(trace); // Zod validation
    return trace;
  }
}
```

## 7.11 Scaling Concerns

| Concern | Mitigation |
|---------|-----------|
| Container cold start (2-5s) | Pre-warmed container pool (5 per language) |
| Instrumentation CPU time | Cache instrumented code by source hash in Redis |
| Large traces (deep recursion) | Step limit, truncation, compression |
| Worker saturation | Auto-scale workers based on BullMQ queue depth |
| Docker host resource exhaustion | Max containers per host, queue backpressure |
| Concurrent execution spikes | Rate limiting per user, priority queue for paid users |

---

# SECTION 8 — VISUALIZATION ENGINE

## 8.1 Visualization Architecture Overview

```
FlowTrace JSON
    ├── GraphBuilder → ExecutionGraph (React Flow nodes/edges)
    ├── RecursionTreeBuilder → RecursionTree (hierarchical call data)
    ├── MemoryModelBuilder → MemorySnapshot[] (stack/heap per step)
    ├── VariableExtractor → VariableSnapshot[] (per-step variable state)
    ├── OutputCollector → OutputLine[] (stdout/stderr per step)
    └── TimelineBuilder → TimelineStep[] (ordered step sequence)

PlaybackController (Zustand)
    └── currentStep → drives all visualization components
```

All builders run once when trace is received. Playback only updates `currentStep` — no re-computation during animation.

## 8.2 Execution Graph (React Flow)

### Graph Building Algorithm

```typescript
// workers/graph-builder.worker.ts (Web Worker)
export function buildGraph(trace: FlowTrace): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  let nodeId = 0;
  let prevNodeId: string | null = null;

  for (const step of trace.steps) {
    switch (step.type) {
      case 'line':
      case 'assign': {
        const id = `node_${nodeId++}`;
        nodes.push({
          id,
          type: 'statement',
          data: { label: getLineLabel(step), line: step.line, stepIndex: step.index },
          position: { x: 0, y: 0 }, // Layout computed later
        });
        if (prevNodeId) {
          edges.push({ id: `edge_${prevNodeId}_${id}`, source: prevNodeId, target: id, type: 'sequential' });
        }
        prevNodeId = id;
        break;
      }
      case 'condition': {
        const id = `node_${nodeId++}`;
        nodes.push({
          id,
          type: 'condition',
          data: { label: step.expression, result: step.result, stepIndex: step.index },
          position: { x: 0, y: 0 },
        });
        if (prevNodeId) {
          edges.push({
            id: `edge_${prevNodeId}_${id}`,
            source: prevNodeId,
            target: id,
            type: 'sequential',
          });
        }
        // Branch edges added when next steps are known
        prevNodeId = id;
        break;
      }
      case 'call': {
        const id = `node_${nodeId++}`;
        nodes.push({
          id,
          type: 'call',
          data: { label: `${step.functionName}()`, stepIndex: step.index },
          position: { x: 0, y: 0 },
        });
        if (prevNodeId) {
          edges.push({ id: `edge_${prevNodeId}_${id}`, source: prevNodeId, target: id, type: 'call' });
        }
        prevNodeId = id;
        break;
      }
    }
  }

  // Apply dagre layout
  const layouted = applyDagreLayout(nodes, edges);
  return { nodes: layouted.nodes, edges };
}
```

### Custom Node Components

```typescript
// components/visualization/nodes/StatementNode.tsx
const StatementNode = memo(({ data, selected }: NodeProps<StatementNodeData>) => {
  const isActive = usePlaybackStore(s => s.currentStep === data.stepIndex);
  const isPast = usePlaybackStore(s => s.currentStep > data.stepIndex);

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 1,
        boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
      }}
      transition={spring}
      className={cn(
        'rounded-lg border px-4 py-2 text-sm font-mono',
        isActive && 'border-accent bg-accent/10 text-accent-foreground',
        isPast && 'border-muted bg-surface-2 text-muted-foreground',
        !isActive && !isPast && 'border-border bg-surface-1',
      )}
    >
      <Handle type="target" position={Position.Top} />
      <span>L{data.line}: {data.label}</span>
      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
});
```

## 8.3 Recursion Tree

```typescript
// lib/visualization/recursion-tree-builder.ts
export function buildRecursionTree(trace: FlowTrace, targetFunction?: string): RecursionTreeNode | null {
  const callStack: RecursionTreeNode[] = [];
  let root: RecursionTreeNode | null = null;

  for (const step of trace.steps) {
    if (step.type === 'call' && (!targetFunction || step.functionName === targetFunction)) {
      const node: RecursionTreeNode = {
        id: step.frameId,
        functionName: step.functionName,
        arguments: step.arguments,
        depth: step.depth,
        stepIndex: step.index,
        returnValue: null,
        children: [],
      };

      if (callStack.length === 0) {
        root = node;
      } else {
        callStack[callStack.length - 1].children.push(node);
      }
      callStack.push(node);
    }

    if (step.type === 'return') {
      const node = callStack.pop();
      if (node) node.returnValue = step.returnValue;
    }
  }

  return root;
}
```

## 8.4 Memory Visualization

```typescript
interface MemorySnapshot {
  stepIndex: number;
  stack: StackFrame[];
  heap: HeapObject[];
}

interface StackFrame {
  id: string;
  functionName: string;
  variables: Record<string, SerializedValue>;
  returnAddress?: string;
}

interface HeapObject {
  id: string;
  type: string;
  size: number;
  address: string;
  references: string[];
  value: SerializedValue;
}

// For JS/Python: derive from trace frames (simulated memory model)
// For C++/Java: use memory_alloc/memory_free events from trace
```

## 8.5 Timeline & Playback Engine

```typescript
// stores/playback-store.ts — playback engine
export function usePlaybackEngine() {
  const { isPlaying, speed, currentStep, totalSteps, setStep, pause } = usePlaybackStore();
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  const STEP_DURATION_MS = 500; // base duration per step

  useEffect(() => {
    if (!isPlaying) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      accumulatedRef.current += delta * speed;

      if (accumulatedRef.current >= STEP_DURATION_MS) {
        accumulatedRef.current = 0;
        const next = currentStep + 1;
        if (next >= totalSteps) {
          pause();
          return;
        }
        setStep(next);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [isPlaying, speed, currentStep, totalSteps]);
}
```

## 8.6 Variable Tracking

```typescript
// hooks/use-variable-diff.ts
export function useVariableDiff(trace: FlowTrace, currentStep: number) {
  return useMemo(() => {
    const current = trace.steps[currentStep]?.variables ?? {};
    const previous = currentStep > 0 ? trace.steps[currentStep - 1]?.variables ?? {} : {};

    const changed: string[] = [];
    const added: string[] = [];
    const removed: string[] = [];

    for (const key of Object.keys(current)) {
      if (!(key in previous)) added.push(key);
      else if (JSON.stringify(current[key]) !== JSON.stringify(previous[key])) changed.push(key);
    }
    for (const key of Object.keys(previous)) {
      if (!(key in current)) removed.push(key);
    }

    return { current, previous, changed, added, removed };
  }, [trace, currentStep]);
}
```

## 8.7 Rendering Optimization

| Technique | Application |
|-----------|-------------|
| Web Worker graph building | Offload dagre layout from main thread |
| React.memo on nodes | Prevent re-render of inactive nodes |
| Step-index driven updates | Only active node subscribes to current step |
| Canvas rendering (P2) | Switch to Canvas for 1000+ node graphs |
| Virtual scrolling | Variable panel, output panel |
| Lazy tab loading | Only render active visualization tab |
| Graph super-nodes | Collapse sequential statement chains |

---

# SECTION 9 — AI SYSTEM

## 9.1 AI Architecture Overview

```
Frontend AI Panel
    → POST /api/v1/ai/explain (SSE stream)
    → AI Service
        ├── Context Builder (code + trace summary)
        ├── Token Budget Manager (truncate to fit)
        ├── Cache Check (Redis: hash(code+trace))
        ├── Prompt Template Engine
        ├── OpenAI API (streaming)
        ├── Response Streamer (SSE to client)
        └── Cache Store + DB persist
```

## 9.2 AI Features

| Feature | Model | Priority | Token Budget |
|---------|-------|----------|-------------|
| Execution Explanation | GPT-4o | P0 | 4000 context + 1500 output |
| Debugging Assistant | GPT-4o | P1 | 6000 context + 2000 output |
| Complexity Analysis | GPT-4o-mini | P2 | 2000 context + 500 output |
| Recursion Explanation | GPT-4o-mini | P1 | 3000 context + 1000 output |
| Optimization Suggestions | GPT-4o | P2 | 4000 context + 1500 output |
| Conversational Chat | GPT-4o | P1 | 8000 context + 2000 output |

## 9.3 Prompt Engineering System

```typescript
// ai/prompts/explain-execution.ts
export function buildExplainPrompt(context: ExplainContext): ChatMessage[] {
  return [
    {
      role: 'system',
      content: `You are FlowMind AI, an expert code execution analyst. You explain code behavior based on ACTUAL execution traces, not assumptions.

Rules:
- Reference specific step numbers and variable values from the trace
- Explain control flow decisions (why if/else branches were taken)
- Highlight key variable mutations
- Use clear, educational language
- Never invent execution paths not present in the trace
- Format with markdown headers and bullet points
- Keep explanations concise but thorough`,
    },
    {
      role: 'user',
      content: `Explain the execution of this ${context.language} code:

\`\`\`${context.language}
${context.code}
\`\`\`

Execution Summary:
- Total steps: ${context.traceSummary.totalSteps}
- Duration: ${context.traceSummary.durationMs}ms
- Functions called: ${context.traceSummary.functionCalls.join(', ')}
- Output: ${context.traceSummary.output}

Key Execution Steps:
${context.traceSummary.keySteps.map(s => `Step ${s.index}: [${s.type}] Line ${s.line} - ${s.description}`).join('\n')}

Final Variable State:
${JSON.stringify(context.traceSummary.finalVariables, null, 2)}`,
    },
  ];
}
```

## 9.4 Context Handling & Token Optimization

```typescript
// ai/context/trace-summarizer.ts
export function summarizeTrace(trace: FlowTrace, maxTokens: number = 3000): TraceSummary {
  const keySteps = selectKeySteps(trace.steps, {
    maxSteps: 50,
    includeTypes: ['call', 'return', 'condition', 'assign', 'exception', 'output'],
    sampleInterval: Math.ceil(trace.steps.length / 50),
  });

  return {
    totalSteps: trace.stats.totalSteps,
    durationMs: trace.metadata.durationMs,
    functionCalls: extractUniqueFunctions(trace.steps),
    output: trace.steps.filter(s => s.type === 'output').map(s => s.text).join('\n'),
    keySteps: keySteps.map(formatStepDescription),
    finalVariables: trace.steps[trace.steps.length - 1]?.variables ?? {},
    maxDepth: trace.stats.maxDepth,
    hadException: trace.steps.some(s => s.type === 'exception'),
  };
}

function selectKeySteps(steps: TraceStep[], opts: SelectOptions): TraceStep[] {
  const keyByType = steps.filter(s => opts.includeTypes.includes(s.type));
  if (keyByType.length <= opts.maxSteps) return keyByType;

  // Evenly sample across execution
  const interval = Math.ceil(steps.length / opts.maxSteps);
  return steps.filter((_, i) => i % interval === 0).slice(0, opts.maxSteps);
}
```

## 9.5 Streaming Response Handler

```typescript
// ai/services/ai.service.ts
export class AIService {
  async explain(params: ExplainParams): Promise<ReadableStream> {
    const cacheKey = `ai:explain:${hash(params.code)}:${hash(JSON.stringify(params.traceSummary))}`;
    const cached = await redis.get(cacheKey);
    if (cached) return createStreamFromString(cached);

    const messages = buildExplainPrompt(params);
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      stream: true,
      max_tokens: 1500,
      temperature: 0.3,
    });

    let fullResponse = '';
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          fullResponse += text;
          controller.enqueue(`data: ${JSON.stringify({ text })}\n\n`);
        }
        controller.enqueue('data: [DONE]\n\n');
        controller.close();

        await redis.setex(cacheKey, 86400, fullResponse);
        await prisma.aIMessage.create({
          data: {
            projectId: params.projectId,
            userId: params.userId,
            role: 'assistant',
            content: fullResponse,
            type: 'EXPLANATION',
            tokenCount: estimateTokens(fullResponse),
          },
        });
      },
    });

    return readable;
  }
}
```

## 9.6 AI Safety

| Concern | Mitigation |
|---------|-----------|
| Hallucinated execution paths | System prompt forbids invention; trace data required |
| Code injection via prompts | Sanitize user code in prompts; no eval of AI output |
| Token cost explosion | Token budgets per request; model selection by feature |
| Inappropriate content | OpenAI moderation API on input and output |
| Data privacy | No code stored by OpenAI (API data policy); user opt-out |
| Rate abuse | 10 AI requests/day free, 100/day pro |

## 9.7 Caching Strategy

```
Cache Key Pattern: ai:{feature}:{sha256(code)}:{sha256(traceSummary)}

TTL:
- Explanations: 24 hours
- Complexity analysis: 7 days
- Chat messages: no cache (conversational)

Storage:
- Redis for hot cache (fast retrieval)
- PostgreSQL for persistent chat history
```

---

# SECTION 10 — DATABASE DESIGN

## 10.1 Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────────┐
│     User     │──1:N──│   Project    │──1:N──│    Execution     │
│              │       │              │       │                  │
│ id           │       │ id           │       │ id               │
│ clerkId      │       │ userId (FK)  │       │ projectId (FK)   │
│ email        │       │ title        │       │ userId (FK)      │
│ name         │       │ code         │       │ code             │
│ plan         │       │ language     │       │ language         │
│ createdAt    │       │ isTemplate   │       │ status           │
└──────┬───────┘       │ isPublic     │       │ stdout           │
       │               │ shareToken   │       │ stderr           │
       │               └──────────────┘       │ traceData (JSONB)│
       │                                      │ traceS3Key       │
       │1:N                                   │ durationMs       │
       │                                      │ stepCount        │
┌──────▼───────┐                              └────────┬─────────┘
│ Subscription │                                       │1:N
│              │                              ┌────────▼─────────┐
│ id           │                              │   AIChatMessage  │
│ userId (FK)  │                              │                  │
│ plan         │                              │ id               │
│ status       │                              │ projectId (FK)   │
│ stripeId     │                              │ userId (FK)      │
│ expiresAt    │                              │ executionId (FK?)│
└──────────────┘                              │ role             │
                                              │ content          │
┌──────────────┐       ┌──────────────┐       │ type             │
│  Analytics   │       │ Collaboration│       │ tokenCount       │
│  Event       │       │ Session      │       └──────────────────┘
│              │       │              │
│ id           │       │ id           │
│ userId (FK)  │       │ projectId    │
│ eventType    │       │ hostUserId   │
│ eventData    │       │ shareCode    │
│ createdAt    │       │ isActive     │
└──────────────┘       └──────────────┘
```

## 10.2 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Plan {
  FREE
  PRO
  TEAM
  EDUCATION
}

enum Language {
  JAVASCRIPT
  PYTHON
  CPP
  JAVA
}

enum ExecutionStatus {
  QUEUED
  RUNNING
  COMPLETED
  FAILED
  TIMEOUT
  CANCELLED
}

enum AIMessageType {
  EXPLANATION
  DEBUG
  CHAT
  COMPLEXITY
  OPTIMIZATION
}

model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  email         String    @unique
  name          String?
  avatarUrl     String?
  plan          Plan      @default(FREE)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  projects      Project[]
  executions    Execution[]
  aiMessages    AIChatMessage[]
  subscription  Subscription?
  analyticsEvents AnalyticsEvent[]

  @@index([clerkId])
  @@index([email])
}

model Project {
  id            String    @id @default(cuid())
  userId        String
  title         String    @default("Untitled Project")
  code          String    @default("")
  language      Language  @default(JAVASCRIPT)
  isTemplate    Boolean   @default(false)
  templateMeta  Json?
  isPublic      Boolean   @default(false)
  shareToken    String?   @unique
  version       Int       @default(1)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  executions    Execution[]
  aiMessages    AIChatMessage[]
  collaborationSessions CollaborationSession[]

  @@index([userId, updatedAt(sort: Desc)])
  @@index([shareToken])
  @@index([isTemplate, language])
}

model Execution {
  id            String          @id @default(cuid())
  projectId     String
  userId        String
  code          String
  language      Language
  status        ExecutionStatus @default(QUEUED)
  stdout        String?
  stderr        String?
  exitCode      Int?
  traceData     Json?
  traceS3Key    String?
  traceSize     Int?
  durationMs    Int?
  stepCount     Int?
  errorMessage  String?
  createdAt     DateTime        @default(now())
  completedAt   DateTime?

  project       Project         @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user          User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  aiMessages    AIChatMessage[]

  @@index([projectId, createdAt(sort: Desc)])
  @@index([userId, createdAt(sort: Desc)])
  @@index([status])
}

model AIChatMessage {
  id            String        @id @default(cuid())
  projectId     String
  userId        String
  executionId   String?
  role          String
  content       String
  type          AIMessageType @default(CHAT)
  tokenCount    Int?
  createdAt     DateTime      @default(now())

  project       Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  execution     Execution?    @relation(fields: [executionId], references: [id], onDelete: SetNull)

  @@index([projectId, createdAt(sort: Asc)])
}

model Subscription {
  id              String    @id @default(cuid())
  userId          String    @unique
  plan            Plan      @default(FREE)
  stripeCustomerId String?
  stripeSubId     String?
  status          String    @default("active")
  currentPeriodEnd DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model AnalyticsEvent {
  id            String    @id @default(cuid())
  userId        String?
  eventType     String
  eventData     Json?
  sessionId     String?
  createdAt     DateTime  @default(now())

  user          User?     @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([eventType, createdAt(sort: Desc)])
  @@index([userId, createdAt(sort: Desc)])
}

model CollaborationSession {
  id            String    @id @default(cuid())
  projectId     String
  hostUserId    String
  shareCode     String    @unique
  isActive      Boolean   @default(true)
  maxParticipants Int     @default(25)
  createdAt     DateTime  @default(now())
  expiresAt     DateTime?

  project       Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([shareCode])
}
```

## 10.3 Index Strategy

| Table | Index | Purpose |
|-------|-------|---------|
| User | clerkId (unique) | Auth lookup on every request |
| Project | (userId, updatedAt DESC) | Dashboard project list |
| Project | shareToken (unique) | Public share link lookup |
| Execution | (projectId, createdAt DESC) | Project execution history |
| Execution | status | Worker queue monitoring |
| AIChatMessage | (projectId, createdAt ASC) | Chat history retrieval |
| AnalyticsEvent | (eventType, createdAt DESC) | Analytics queries |

## 10.4 Scaling Strategy

| Phase | Strategy |
|-------|----------|
| MVP (<1K users) | Single PostgreSQL instance on Railway |
| Growth (1K-10K) | Connection pooling (PgBouncer); read replica for analytics |
| Scale (10K-100K) | Trace data migrated to S3; PostgreSQL stores metadata only |
| Enterprise (100K+) | Citus sharding by userId; separate analytics DB |

## 10.5 Normalization Decisions

| Decision | Rationale |
|----------|-----------|
| Trace in JSONB (small) or S3 (large) | Avoid bloating PostgreSQL; S3 for traces >100KB |
| Code duplicated in Execution | Immutable snapshot; project code may change after execution |
| Denormalized stepCount/durationMs | Avoid parsing trace JSON for list views |
| Separate AnalyticsEvent table | High write volume; don't pollute core tables |
| templateMeta as JSON | Flexible schema for template metadata without schema migration |

---

# SECTION 11 — API DESIGN

Base URL: `https://api.flowmind.dev/api/v1`  
Auth: `Authorization: Bearer {clerk_jwt}`  
Content-Type: `application/json`

## 11.1 Standard Response Format

```json
// Success
{
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 45 }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [{ "field": "language", "message": "Invalid enum value" }]
  }
}
```

## 11.2 Authentication APIs

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/webhook` | POST | Clerk signature | Sync user on create/update/delete |
| `/users/me` | GET | Required | Get current user profile |
| `/users/me` | PATCH | Required | Update user preferences |

### GET /users/me

**Response 200:**
```json
{
  "data": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "Alex",
    "plan": "FREE",
    "usage": {
      "executionsToday": 3,
      "executionsLimit": 10,
      "aiRequestsToday": 1,
      "aiRequestsLimit": 5
    },
    "createdAt": "2026-06-01T00:00:00Z"
  }
}
```

## 11.3 Project APIs

### GET /projects

| Field | Value |
|-------|-------|
| **Auth** | Required |
| **Query** | `page=1&limit=20&language=JAVASCRIPT&search=binary` |
| **Rate Limit** | 60/min |

**Response 200:**
```json
{
  "data": [
    {
      "id": "proj_abc",
      "title": "Binary Search",
      "language": "JAVASCRIPT",
      "updatedAt": "2026-06-03T10:00:00Z",
      "executionCount": 12,
      "lastExecutionStatus": "COMPLETED"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 45 }
}
```

### POST /projects

**Request:**
```json
{
  "title": "My Algorithm",
  "language": "PYTHON",
  "code": "def hello():\n    print('world')"
}
```

**Validation (Zod):**
```typescript
const createProjectSchema = z.object({
  title: z.string().min(1).max(200).default('Untitled Project'),
  language: z.enum(['JAVASCRIPT', 'PYTHON', 'CPP', 'JAVA']),
  code: z.string().max(102400).default(''),
});
```

**Response 201:** `{ "data": { Project } }`

### PATCH /projects/:id

**Request:**
```json
{
  "title": "Updated Title",
  "code": "updated code...",
  "version": 3
}
```

**Validation:** Optimistic concurrency via `version` field. Returns 409 if version mismatch.

### DELETE /projects/:id

**Response 204:** No content.

## 11.4 Execution APIs

### POST /executions

| Field | Value |
|-------|-------|
| **Auth** | Required |
| **Rate Limit** | 5/min (free), 30/min (pro) |

**Request:**
```json
{
  "projectId": "proj_abc",
  "code": "function factorial(n) { ... }",
  "language": "JAVASCRIPT",
  "stdin": ""
}
```

**Validation:**
```typescript
const createExecutionSchema = z.object({
  projectId: z.string().cuid(),
  code: z.string().min(1).max(102400),
  language: z.enum(['JAVASCRIPT', 'PYTHON', 'CPP', 'JAVA']),
  stdin: z.string().max(10240).default(''),
});
```

**Response 202:**
```json
{
  "data": {
    "id": "exec_xyz",
    "status": "QUEUED",
    "createdAt": "2026-06-03T10:00:00Z"
  }
}
```

### GET /executions/:id/status

**Response 200 (running):**
```json
{
  "data": {
    "id": "exec_xyz",
    "status": "RUNNING",
    "createdAt": "2026-06-03T10:00:00Z"
  }
}
```

**Response 200 (completed):**
```json
{
  "data": {
    "id": "exec_xyz",
    "status": "COMPLETED",
    "durationMs": 1234,
    "stepCount": 42,
    "stdout": "120\n",
    "stderr": "",
    "exitCode": 0,
    "trace": { /* FlowTrace JSON */ }
  }
}
```

**Response 200 (failed):**
```json
{
  "data": {
    "id": "exec_xyz",
    "status": "FAILED",
    "errorMessage": "ReferenceError: x is not defined",
    "stderr": "ReferenceError: x is not defined\n    at main (user_code.js:3:1)"
  }
}
```

### GET /executions/:id/trace

Returns full trace (for large traces stored in S3, redirects or streams).

## 11.5 AI APIs

### POST /ai/explain

| Field | Value |
|-------|-------|
| **Auth** | Required |
| **Rate Limit** | 5/min (free), 30/min (pro) |
| **Response** | SSE stream |

**Request:**
```json
{
  "executionId": "exec_xyz",
  "stepRange": { "start": 0, "end": 50 }
}
```

**SSE Response:**
```
data: {"text": "## Execution Overview\n\n"}
data: {"text": "This code computes the factorial..."}
data: [DONE]
```

### POST /ai/chat

**Request:**
```json
{
  "projectId": "proj_abc",
  "executionId": "exec_xyz",
  "message": "Why did the recursion not terminate?"
}
```

**Response:** SSE stream (same format as explain).

## 11.6 Dashboard & Analytics APIs

### GET /analytics/usage

**Response 200:**
```json
{
  "data": {
    "executionsToday": 5,
    "executionsThisMonth": 120,
    "aiRequestsToday": 2,
    "mostUsedLanguage": "JAVASCRIPT",
    "totalProjects": 15
  }
}
```

## 11.7 Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid auth token |
| `FORBIDDEN` | 403 | User lacks permission for resource |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request body |
| `RATE_LIMIT` | 429 | Too many requests |
| `EXECUTION_ERROR` | 422 | Code execution failed |
| `EXECUTION_TIMEOUT` | 422 | Code exceeded time limit |
| `PLAN_LIMIT` | 403 | Free tier limit exceeded |
| `FORBIDDEN_CODE` | 400 | Code contains blocked patterns |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

# SECTION 12 — UI/UX SYSTEM

## 12.1 Design Philosophy

FlowMind's design language draws from **Linear** (precision, dark elegance), **Framer** (fluid motion), **Vercel** (developer minimalism), and **Raycast** (command-driven efficiency).

**Core Principles:**
1. **Dark-first developer aesthetic** — reduce eye strain, feel native to coding environments
2. **Information density without clutter** — show rich data, hide complexity until needed
3. **Motion with purpose** — animations guide attention, never decorate
4. **Keyboard-driven** — power users navigate without mouse
5. **Progressive disclosure** — simple by default, powerful when explored

## 12.2 Typography System

| Token | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| `display-lg` | Inter | 36px/40px | 700 | Landing hero |
| `display-md` | Inter | 28px/32px | 600 | Page titles |
| `heading-lg` | Inter | 20px/28px | 600 | Section headers |
| `heading-md` | Inter | 16px/24px | 600 | Panel titles |
| `body-md` | Inter | 14px/20px | 400 | Body text |
| `body-sm` | Inter | 12px/16px | 400 | Secondary text |
| `code-md` | JetBrains Mono | 14px/20px | 400 | Editor, traces |
| `code-sm` | JetBrains Mono | 12px/16px | 400 | Variable values, output |

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

## 12.3 Color Palette

| Token | Hex | HSL | Use |
|-------|-----|-----|-----|
| `background` | #0A0A0A | 0 0% 4% | Page background |
| `surface-1` | #111111 | 0 0% 7% | Card backgrounds |
| `surface-2` | #1A1A1A | 0 0% 10% | Elevated panels |
| `surface-3` | #222222 | 0 0% 13% | Hover states |
| `foreground` | #F5F5F5 | 0 0% 96% | Primary text |
| `muted-foreground` | #A3A3A3 | 0 0% 64% | Secondary text |
| `accent` | #8B5CF6 | 262 83% 58% | Primary accent (violet) |
| `accent-hover` | #7C3AED | 262 80% 52% | Accent hover |
| `success` | #22C55E | 142 76% 36% | Success states |
| `warning` | #F59E0B | 38 92% 50% | Warnings |
| `destructive` | #EF4444 | 0 84% 60% | Errors |
| `border` | #262626 | 0 0% 15% | Borders |
| `glass` | rgba(255,255,255,0.05) | — | Glassmorphism fill |
| `glass-border` | rgba(255,255,255,0.10) | — | Glass borders |

### Visualization Colors

| Element | Color |
|---------|-------|
| Active node | `#8B5CF6` (accent) |
| Visited node | `#6B7280` (muted) |
| Unvisited node | `#374151` (dim) |
| True branch | `#22C55E` (green) |
| False branch | `#EF4444` (red) |
| Loop edge | `#F59E0B` (amber) |
| Call edge | `#3B82F6` (blue) |
| Variable changed | `#F59E0B` highlight |
| Variable new | `#22C55E` highlight |

## 12.4 Spacing System

Base unit: **4px**. Scale: `0, 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px), 10(40px), 12(48px), 16(64px)`

| Context | Spacing |
|---------|---------|
| Component internal padding | 12px–16px |
| Panel padding | 16px–24px |
| Section gap | 24px–32px |
| Card gap (grid) | 16px |
| Inline element gap | 8px |

## 12.5 Glassmorphism Usage

Apply sparingly to floating panels:

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
```

Use on: AI panel, timeline bar, variable panel overlay. Do NOT use on main editor or graph canvas.

## 12.6 Layout Standards

```
┌─────────────────────────────────────────────────────────┐
│ Header (48px)                                           │
├────────┬────────────────────────────────────────────────┤
│        │ Editor Panel (40%)     │ Viz Panel (60%)       │
│ Side   │ ┌────────────────────┐ │ ┌──────────────────┐  │
│ bar    │ │ Monaco Editor      │ │ │ Graph / Tree /   │  │
│ (240px)│ │                    │ │ │ Memory / Output  │  │
│        │ │                    │ │ │                  │  │
│        │ └────────────────────┘ │ └──────────────────┘  │
│        │ Variable Panel (bottom)│                       │
│        │ Timeline Bar (bottom)  │                       │
├────────┴────────────────────────────────────────────────┤
│ AI Panel (collapsible, 320px width, right side)        │
└─────────────────────────────────────────────────────────┘
```

## 12.7 Animation Standards

| Animation | Duration | Easing | Use |
|-----------|----------|--------|-----|
| Micro-interaction | 150ms | ease-out | Button hover, toggle |
| Panel transition | 300ms | spring(300,30) | Tab switch, panel open |
| Node activation | 400ms | spring(200,25) | Graph active node |
| Page transition | 300ms | ease-[0.16,1,0.3,1] | Route change |
| Playback step | 500ms | linear | Timeline step advance |
| Skeleton pulse | 1500ms | ease-in-out | Loading states |

## 12.8 Onboarding UX

```
Step 1: Welcome modal → "Visualize code execution in seconds"
Step 2: Language selection → Pre-fill template code
Step 3: First run → Guided tooltip on Run button
Step 4: Visualization tour → Highlight graph, variables, timeline
Step 5: AI explain → Prompt to try AI explanation
Step 6: Complete → Dashboard with template suggestions
```

## 12.9 Accessibility Standards

- WCAG 2.1 AA compliance minimum
- All interactive elements: focus ring (`ring-2 ring-accent`)
- Graph nodes: `aria-label` describing line and state
- Variable changes: `aria-live="polite"` region
- Color never sole indicator (icons + color)
- Minimum touch target: 44x44px
- Skip navigation link

---

# SECTION 13 — SECURITY ARCHITECTURE

## 13.1 Threat Model

| Threat | Vector | Impact | Mitigation |
|--------|--------|--------|------------|
| Container escape | Malicious code exploits Docker | Host compromise | seccomp, AppArmor, no-new-privileges, non-root user |
| Resource exhaustion | Infinite loops, memory bombs | Service denial | Timeout, memory limits, step limits, rate limiting |
| Network exfiltration | Code makes outbound requests | Data leak | `--network=none` on containers |
| File system access | Code reads/writes host files | Data breach | Read-only rootfs, tmpfs only writable path |
| API abuse | Automated execution requests | Cost spike | Rate limiting, plan limits, CAPTCHA on signup |
| XSS | Malicious code in project titles | User session theft | React auto-escaping, CSP headers, input sanitization |
| SQL injection | Malicious API input | Data breach | Prisma parameterized queries, Zod validation |
| Auth bypass | Forged JWT tokens | Unauthorized access | Clerk JWT verification, short token TTL |
| AI prompt injection | Malicious code comments manipulate AI | Misleading output | System prompt hardening, output validation |
| Secret exposure | API keys in client bundle | Credential theft | Server-side only secrets, env vars |

## 13.2 Docker Isolation (Defense in Depth)

```
Layer 1: Network isolation (--network=none)
Layer 2: Filesystem isolation (--read-only, tmpfs /tmp)
Layer 3: Resource limits (memory, CPU, PIDs)
Layer 4: Capability dropping (--cap-drop=ALL)
Layer 5: No new privileges (--security-opt=no-new-privileges)
Layer 6: Non-root user (UID 1000)
Layer 7: Seccomp profile (restrict syscalls)
Layer 8: Static code analysis (blocklist patterns)
Layer 9: Execution timeout (SIGKILL)
Layer 10: Container auto-destruction after execution
```

## 13.3 API Security

```typescript
// Security middleware stack
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.openai.com"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true },
}));

// CSRF: Not needed for Bearer token API
// XSS: React escaping + CSP
// SQL injection: Prisma ORM
// Input validation: Zod on every endpoint
```

## 13.4 Secret Management

| Secret | Storage | Access |
|--------|---------|--------|
| `DATABASE_URL` | Railway env vars | API server only |
| `REDIS_URL` | Railway env vars | API + workers |
| `CLERK_SECRET_KEY` | Railway env vars | API server only |
| `OPENAI_API_KEY` | Railway env vars | AI service only |
| `AWS_S3_*` | Railway env vars | Trace service only |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Vercel env vars | Frontend (public) |
| `NEXT_PUBLIC_API_URL` | Vercel env vars | Frontend (public) |

Never commit secrets. Use `.env.example` with placeholder values. Rotate keys quarterly.

## 13.5 Execution Security Checklist

- [ ] Code size validated before queueing (<100KB)
- [ ] Blocklist patterns scanned before execution
- [ ] Container created with full security config
- [ ] No network access in container
- [ ] Timeout enforced with SIGKILL
- [ ] Container destroyed after execution (success or failure)
- [ ] Trace output validated against schema (no code injection via trace)
- [ ] stdout/stderr sanitized before storage
- [ ] User can only access own executions (authorization check)

---

# SECTION 14 — TESTING STRATEGY

## 14.1 Testing Pyramid

```
         ┌───────────┐
         │   E2E     │  Playwright (10%)
         │  Tests    │  Critical user flows
         ├───────────┤
         │Integration│  Supertest + Docker (30%)
         │  Tests    │  API routes, execution pipeline
         ├───────────┤
         │   Unit    │  Jest (60%)
         │   Tests   │  Services, utils, instrumentation
         └───────────┘
```

## 14.2 Frontend Testing

| Layer | Tool | Coverage Target |
|-------|------|----------------|
| Unit | Jest + React Testing Library | Components, hooks, stores, utils |
| Integration | Jest + MSW | API client, data fetching flows |
| E2E | Playwright | Critical user journeys |

### Key E2E Tests (Playwright)

```typescript
// e2e/execution-flow.spec.ts
test('user can write code, execute, and see visualization', async ({ page }) => {
  await page.goto('/project/new');
  await page.getByRole('combobox', { name: 'Language' }).selectOption('JAVASCRIPT');
  await page.getByRole('textbox', { name: 'Editor' }).fill('console.log("hello");');
  await page.getByRole('button', { name: 'Run' }).click();
  await expect(page.getByTestId('execution-graph')).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId('output-panel')).toContainText('hello');
});

test('timeline playback works', async ({ page }) => {
  // ... setup execution ...
  await page.getByRole('button', { name: 'Play' }).click();
  await expect(page.getByTestId('timeline-scrubber')).toHaveAttribute('aria-valuenow', '1', { timeout: 5000 });
});
```

## 14.3 Backend Testing

```typescript
// tests/execution/instrumentation.test.ts
describe('JavaScript Instrumentation', () => {
  it('instruments function declarations', () => {
    const code = 'function add(a, b) { return a + b; }';
    const result = instrumentJavaScript(code);
    expect(result.code).toContain('__trace.call');
    expect(result.code).toContain('__trace.return');
  });

  it('preserves semantics after instrumentation', async () => {
    const code = 'function factorial(n) { if (n <= 1) return 1; return n * factorial(n-1); }';
    const instrumented = instrumentJavaScript(code);
    const trace = await executeInContainer(instrumented, 'javascript');
    expect(trace.steps[trace.steps.length - 1].type).toBe('output');
  });
});

// tests/api/executions.test.ts
describe('POST /api/v1/executions', () => {
  it('creates execution and returns 202', async () => {
    const res = await request(app)
      .post('/api/v1/executions')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ projectId, code: 'console.log(1)', language: 'JAVASCRIPT' });
    expect(res.status).toBe(202);
    expect(res.body.data.status).toBe('QUEUED');
  });

  it('rejects forbidden code patterns', async () => {
    const res = await request(app)
      .post('/api/v1/executions')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ projectId, code: "require('child_process').exec('rm -rf /')", language: 'JAVASCRIPT' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('FORBIDDEN_CODE');
  });
});
```

## 14.4 Execution Engine Testing

| Test Category | Examples |
|--------------|---------|
| Instrumentation | AST transforms preserve semantics; all statement types covered |
| Trace generation | Correct event types; variable serialization; depth tracking |
| Container security | Network blocked; timeout enforced; memory limit enforced |
| Language handlers | JS, Python produce valid traces; C++/Java compile errors handled |
| Edge cases | Empty code, syntax errors, infinite loops, deep recursion |

## 14.5 Load Testing

```yaml
# k6 load test scenario
scenarios:
  execution_load:
    executor: ramping-vus
    startVUs: 0
    stages:
      - duration: 2m, target: 50
      - duration: 5m, target: 50
      - duration: 2m, target: 0
    exec: executeCode

# Target: P95 execution latency < 5s at 50 concurrent users
# Target: 0% error rate at 50 concurrent users
```

## 14.6 Security Testing

- OWASP ZAP scan on API endpoints (quarterly)
- Container escape testing with known CVE payloads
- Blocklist pattern fuzzing
- Auth bypass attempts (expired tokens, forged JWTs)
- Rate limit verification

---

# SECTION 15 — DEVOPS & DEPLOYMENT

## 15.1 Environment Setup

| Environment | Frontend | Backend | Database | Purpose |
|-------------|----------|---------|----------|---------|
| **Development** | localhost:3000 | localhost:4000 | Docker PostgreSQL + Redis | Local dev |
| **Staging** | staging.flowmind.dev | api-staging.flowmind.dev | Railway PostgreSQL | Pre-production testing |
| **Production** | flowmind.dev | api.flowmind.dev | Railway PostgreSQL + S3 | Live users |

### Local Development (docker-compose.yml)

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: flowmind
      POSTGRES_PASSWORD: flowmind
      POSTGRES_DB: flowmind
    ports: ['5432:5432']
    volumes: ['pgdata:/var/lib/postgresql/data']

  redis:
    image: redis:7-alpine
    ports: ['6379:6379']

  api:
    build: ./apps/api
    ports: ['4000:4000']
    environment:
      DATABASE_URL: postgresql://flowmind:flowmind@postgres:5432/flowmind
      REDIS_URL: redis://redis:6379
    volumes: ['/var/run/docker.sock:/var/run/docker.sock']
    depends_on: [postgres, redis]

volumes:
  pgdata:
```

## 15.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env: { POSTGRES_USER: test, POSTGRES_PASSWORD: test, POSTGRES_DB: test }
        ports: ['5432:5432']
      redis:
        image: redis:7-alpine
        ports: ['6379:6379']
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - run: pnpm test --coverage
      - run: pnpm test:integration

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test:e2e

  deploy-staging:
    needs: [lint-and-typecheck, test]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: curl -X POST ${{ secrets.RAILWAY_DEPLOY_HOOK_API }}
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 15.3 Deployment Architecture

```
GitHub Push → CI Pipeline → Deploy
                                ├── Vercel (Frontend)
                                │   └── Edge CDN, auto-preview for PRs
                                ├── Railway (API Server)
                                │   └── Auto-deploy from main branch
                                └── Railway (Execution Workers)
                                    └── Docker-enabled nodes
```

## 15.4 Monitoring Stack

| Tool | Purpose | Phase |
|------|---------|-------|
| **Vercel Analytics** | Frontend Web Vitals | MVP |
| **Railway Metrics** | API CPU/memory/requests | MVP |
| **Winston + Logtail** | Structured logging | MVP |
| **Sentry** | Error tracking (FE + BE) | MVP |
| **Uptime Robot** | Health check monitoring | MVP |
| **Datadog** | Full APM, custom metrics | Growth |
| **Grafana + Prometheus** | Worker metrics, queue depth | Scale |

## 15.5 Backup Strategy

| Data | Method | Frequency | Retention |
|------|--------|-----------|-----------|
| PostgreSQL | Railway automated backups | Daily | 30 days |
| S3 traces | S3 versioning + lifecycle | Continuous | 90 days |
| Redis | RDB snapshots (cache only, not critical) | Hourly | 7 days |

## 15.6 Rollback Strategy

1. **Frontend:** Vercel instant rollback to previous deployment (one click)
2. **Backend:** Railway rollback to previous deployment via dashboard
3. **Database:** Point-in-time recovery from backup (Railway supports this)
4. **Feature flags:** Disable new features without deployment rollback

## 15.7 AWS Migration Path (Future)

```
Railway → AWS Timeline:

Phase 1: S3 for trace storage (immediate, low effort)
Phase 2: CloudFront CDN for frontend (when Vercel costs exceed AWS)
Phase 3: ECS Fargate for API + workers (when Railway limits hit)
Phase 4: RDS PostgreSQL with Multi-AZ (when data durability critical)
Phase 5: ElastiCache Redis cluster (when Redis becomes bottleneck)
Phase 6: EKS for Kubernetes orchestration (when microservices needed)
```

---

# SECTION 16 — SCALABILITY PLAN

## 16.1 Scaling Phases

| Phase | Users | Architecture | Key Changes |
|-------|-------|-------------|-------------|
| MVP | 0-1K | Modular monolith | Single Railway deployment |
| Growth | 1K-10K | Monolith + worker scaling | Separate worker instances, S3 traces, Redis cache |
| Scale | 10K-100K | Service extraction | Execution service, AI service, read replicas |
| Enterprise | 100K+ | Microservices on AWS | EKS, Kafka, multi-region |

## 16.2 Horizontal Scaling

| Component | Scaling Strategy |
|-----------|-----------------|
| Frontend (Vercel) | Automatic edge scaling; no action needed |
| API Server | Railway replicas behind load balancer; stateless design |
| Execution Workers | Scale based on BullMQ queue depth; target: queue < 10 jobs |
| PostgreSQL | Read replicas for analytics; PgBouncer connection pooling |
| Redis | Redis Cluster when single instance exceeds 80% memory |
| AI Service | Separate worker pool; request queuing during peak |

## 16.3 Caching Strategy

```
L1: Browser (TanStack Query staleTime: 30s for projects)
L2: CDN (Vercel Edge for static assets, templates)
L3: Redis (API responses, AI explanations, instrumented code)
L4: PostgreSQL (source of truth)
L5: S3 (large trace blobs)
```

| Cache Key | TTL | Invalidation |
|-----------|-----|-------------|
| `project:{id}` | 30s | On PATCH/DELETE |
| `instrumented:{hash}` | 1h | On code change |
| `ai:explain:{hash}` | 24h | Never (immutable) |
| `user:usage:{id}` | 5m | On execution/AI request |
| `rate:{userId}:{endpoint}` | 1m | Sliding window |

## 16.4 Database Scaling

```
Stage 1: Single PostgreSQL (Railway) — 0-10K users
Stage 2: + PgBouncer connection pooling — 10K-50K users
Stage 3: + Read replica for analytics — 50K-100K users
Stage 4: + Citus sharding by userId — 100K+ users
Stage 5: + Separate analytics DB (TimescaleDB) — enterprise
```

## 16.5 Distributed Execution

```
Current: Single worker node with Docker
    ↓
Stage 1: Multiple worker nodes, shared Redis queue
    ↓
Stage 2: Dedicated worker pools per language
    ↓
Stage 3: Auto-scaling worker fleet (AWS ECS/Fargate)
    ↓
Stage 4: Regional execution nodes (US, EU, APAC)
```

## 16.6 AI Scaling

| Strategy | Implementation |
|----------|---------------|
| Model routing | GPT-4o-mini for simple; GPT-4o for complex |
| Response caching | Redis cache by code+trace hash |
| Request queuing | BullMQ AI queue during peak |
| Token budgeting | Strict limits per request and per user |
| Batch processing | Complexity analysis runs as background job |
| Fine-tuned models (future) | Custom model for trace explanation at lower cost |

---

# SECTION 17 — CODING STANDARDS

## 17.1 TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}
```

## 17.2 Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Files (components) | PascalCase.tsx | `ExecutionGraph.tsx` |
| Files (utilities) | kebab-case.ts | `trace-parser.ts` |
| Files (hooks) | kebab-case.ts with use- prefix | `use-playback.ts` |
| Components | PascalCase | `VariablePanel` |
| Hooks | camelCase with use prefix | `useVariableDiff` |
| Functions | camelCase | `buildGraph` |
| Constants | UPPER_SNAKE_CASE | `MAX_TRACE_STEPS` |
| Types/Interfaces | PascalCase | `FlowTrace`, `ExecutionStatus` |
| Enums | PascalCase members | `Language.JAVASCRIPT` |
| API routes | kebab-case | `/api/v1/executions` |
| Database tables | PascalCase (Prisma) | `Execution`, `AIChatMessage` |
| CSS variables | kebab-case | `--surface-1` |
| Environment vars | UPPER_SNAKE_CASE | `DATABASE_URL` |

## 17.3 Component Architecture Rules

1. One component per file
2. Props interface defined above component
3. `'use client'` directive only when necessary (hooks, events, browser APIs)
4. Server Components by default in App Router
5. Co-locate component-specific hooks and types
6. Export named exports (not default) except page.tsx
7. Use `cn()` utility for conditional classNames
8. Memoize expensive components with `React.memo`

## 17.4 API Architecture Rules

1. All routes under `/api/v1/`
2. Controllers handle HTTP; services handle business logic
3. Zod validation on every input
4. Consistent error response format
5. Authentication middleware on all protected routes
6. Rate limiting on execution and AI endpoints
7. Idempotent operations where possible (use job IDs)

## 17.5 Error Handling Standards

```typescript
// DO: Use typed errors
throw new ValidationError(zodError.flatten());
throw new NotFoundError('Project');
throw new ExecutionError('Timeout exceeded', { durationMs: 10000 });

// DO NOT: Throw generic errors
throw new Error('Something went wrong');

// DO: Log with context
logger.error('Execution failed', { executionId, language, error: err.message });

// DO NOT: Log sensitive data
logger.info('User data', { password, token }); // NEVER
```

## 17.6 Commit Message Format

```
type(scope): description

feat(execution): add Python AST instrumentation
fix(viz): prevent graph re-render on playback step change
refactor(api): extract execution service from controller
test(instrument): add recursion trace generation tests
docs(readme): add local development setup guide
chore(deps): upgrade Prisma to 6.1
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `ci`

---

# SECTION 18 — COMPLETE PROJECT BREAKDOWN

## Phase Overview

| Phase | Name | Duration | Dependencies |
|-------|------|----------|-------------|
| 1 | Foundation | 1 week | None |
| 2 | UI Development | 2 weeks | Phase 1 |
| 3 | Authentication | 1 week | Phase 1 |
| 4 | Code Editor | 1 week | Phase 2, 3 |
| 5 | Backend APIs | 2 weeks | Phase 1, 3 |
| 6 | Execution Engine | 3 weeks | Phase 5 |
| 7 | Trace Engine | 1 week | Phase 6 |
| 8 | Visualization Engine | 3 weeks | Phase 7, 2 |
| 9 | AI Integration | 2 weeks | Phase 7, 5 |
| 10 | Database Features | 1 week | Phase 5 |
| 11 | Deployment | 1 week | All prior |
| 12 | Advanced Features | Ongoing | Phase 11 |

---

## Phase 1 — Foundation

### Objectives
Set up monorepo, development environment, shared types, CI pipeline, and project scaffolding.

### Deliverables
- Turborepo monorepo with `apps/web`, `apps/api`, `packages/types`
- Docker Compose for local PostgreSQL + Redis
- ESLint, Prettier, TypeScript strict config
- GitHub Actions CI pipeline
- Shared FlowTrace type definitions
- `.env.example` files

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 1.1 | Initialize monorepo | pnpm workspace, turbo.json, root package.json | Low |
| 1.2 | Scaffold Next.js app | App Router, Tailwind, TypeScript | Low |
| 1.3 | Scaffold Express API | Express, Prisma, TypeScript | Low |
| 1.4 | Shared types package | FlowTrace, API types, enums | Medium |
| 1.5 | Docker Compose | PostgreSQL 16, Redis 7 | Low |
| 1.6 | CI pipeline | Lint, typecheck, test jobs | Medium |
| 1.7 | ESLint + Prettier | Shared config in packages/config | Low |

### Dependencies
None.

### Risk Analysis
| Risk | Mitigation |
|------|-----------|
| Monorepo tooling complexity | Use Turborepo (proven, simple) |
| Docker on Windows dev machines | Document WSL2 requirement |

### Completion Criteria
- [x] `pnpm install` succeeds
- [x] `pnpm dev` starts both web and api
- [x] `pnpm lint && pnpm typecheck` pass
- [x] Docker Compose starts PostgreSQL and Redis
- [x] CI pipeline runs on push

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Section 4.8 and Section 17.
Initialize a Turborepo monorepo named "flowmind" with:
- apps/web (Next.js 15 App Router, TypeScript, Tailwind CSS 4)
- apps/api (Express.js, TypeScript, Prisma)
- packages/types (shared FlowTrace and API types)
- packages/config (shared ESLint, TypeScript configs)
- infra/docker-compose.yml (PostgreSQL 16, Redis 7)
- .github/workflows/ci.yml
Use pnpm workspaces. TypeScript strict mode. Follow naming conventions from Section 17.
```

### Expected Folder Changes
```
+ flowmind/
+ apps/web/
+ apps/api/
+ packages/types/
+ packages/config/
+ infra/docker-compose.yml
+ .github/workflows/ci.yml
+ turbo.json
+ pnpm-workspace.yaml
+ package.json
```

---

## Phase 2 — UI Development

### Objectives
Build the design system, app shell, layout components, and static pages (landing, dashboard skeleton).

### Deliverables
- Design system tokens (colors, typography, spacing)
- UI primitive components (Button, Input, Card, Dialog, Tabs, etc.)
- App shell (Sidebar, Header, layout)
- Landing page (marketing)
- Dashboard page (empty state with project grid skeleton)
- Dark theme fully configured

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 2.1 | Design tokens | CSS variables, tailwind.config.ts | Medium |
| 2.2 | UI primitives | Button, Input, Card, Dialog, Tabs, Badge, Skeleton, Toast | Medium |
| 2.3 | App shell layout | Sidebar, Header, responsive layout | Medium |
| 2.4 | Landing page | Hero, features, CTA, pricing preview | Medium |
| 2.5 | Dashboard skeleton | Project grid, empty state, new project button | Low |
| 2.6 | Loading/error states | Skeleton components, error boundaries | Low |
| 2.7 | Framer Motion setup | Animation utilities, page transitions | Low |

### Dependencies
Phase 1.

### Completion Criteria
- [x] All UI primitives render correctly in dark theme
- [x] Landing page responsive (mobile, tablet, desktop)
- [x] Dashboard shell navigable
- [x] Animation utilities working
- [x] WCAG AA color contrast verified

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Sections 5, 12, and 17.
Build the FlowMind design system and app shell:
1. Configure CSS variables and Tailwind config per Section 12 color/typography/spacing tokens
2. Create shadcn-style UI primitives in apps/web/components/ui/
3. Build app shell layout (Sidebar 240px, Header 48px) per Section 12.6
4. Create landing page at app/(marketing)/page.tsx with hero, features grid, CTA
5. Create dashboard skeleton at app/(dashboard)/dashboard/page.tsx
6. Set up Framer Motion animation utilities in lib/animation.ts
Dark theme only. Font: Inter + JetBrains Mono. Follow component standards from Section 5.2.
```

---

## Phase 3 — Authentication

### Objectives
Integrate Clerk authentication, protect routes, sync users to PostgreSQL.

### Deliverables
- Clerk integration (sign-in, sign-up pages)
- Next.js middleware route protection
- User sync webhook handler
- User API endpoints
- Auth-aware UI (login button, user menu)

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 3.1 | Clerk setup | Install SDK, configure env vars | Low |
| 3.2 | Auth pages | Sign-in, sign-up with Clerk components | Low |
| 3.3 | Middleware | Route protection, public route matcher | Medium |
| 3.4 | User webhook | Clerk webhook → create/update/delete user in DB | Medium |
| 3.5 | User API | GET/PATCH /users/me | Low |
| 3.6 | Auth UI | UserMenu, SignInButton in header | Low |

### Dependencies
Phase 1 (database schema).

### Completion Criteria
- [x] User can sign up with email and Google OAuth
- [x] Protected routes redirect to sign-in
- [x] User record created in PostgreSQL on signup
- [x] User menu shows name and avatar
- [x] Sign out works correctly

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Sections 3.4, 6.5, and 10.2.
Implement Clerk authentication:
1. Install @clerk/nextjs in apps/web
2. Create sign-in/sign-up pages at app/(auth)/ using Clerk components
3. Add middleware.ts per Section 5.1 route protection strategy
4. Create webhook handler at apps/api for Clerk user.created/user.updated events
5. Implement User model sync in Prisma (Section 10.2 schema)
6. Build GET/PATCH /api/v1/users/me endpoints
7. Add UserMenu component to app shell header
Abstract auth behind AuthService interface for future migration.
```

---

## Phase 4 — Code Editor

### Objectives
Integrate Monaco Editor with language support, custom theme, and editor workspace layout.

### Deliverables
- Monaco Editor component with lazy loading
- Custom FlowMind dark theme for Monaco
- Language selector (JS, Python, C++, Java)
- Editor workspace layout with resizable panels
- Keyboard shortcuts (Cmd+Enter to run)
- Auto-save hook (debounced)

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 4.1 | Monaco integration | Dynamic import, wrapper component | Medium |
| 4.2 | Custom theme | FlowMind dark theme registration | Low |
| 4.3 | Language selector | Dropdown with language icons | Low |
| 4.4 | Editor workspace | Resizable panels (editor, viz, variables, timeline) | Medium |
| 4.5 | Keyboard shortcuts | Cmd+Enter run, Cmd+S save | Low |
| 4.6 | Auto-save hook | useAutoSave with 2s debounce | Low |
| 4.7 | Project page | /project/[id] route with editor workspace | Medium |

### Dependencies
Phase 2 (UI), Phase 3 (auth).

### Completion Criteria
- [x] Monaco loads with syntax highlighting for all 4 languages
- [x] Custom theme matches FlowMind design
- [x] Resizable panels work smoothly
- [x] Cmd+Enter triggers run action (console.log for now)
- [x] Auto-save indicator shows "Saved" / "Saving..."

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Sections 5 and F-P0-003.
Build the Monaco code editor integration:
1. Create CodeEditor component with dynamic import (@monaco-editor/react)
2. Register custom FlowMind dark theme matching Section 12 colors
3. Support language modes: javascript, python, cpp, java
4. Build EditorWorkspace layout with react-resizable-panels (40% editor, 60% viz)
5. Add LanguageSelector dropdown component
6. Implement useAutoSave hook (2s debounce)
7. Add keyboard shortcut Cmd+Enter → onRun callback
8. Create project page at app/(dashboard)/project/[id]/page.tsx
Lazy-load Monaco. Disable minimap. Font: JetBrains Mono 14px.
```

---

## Phase 5 — Backend APIs

### Objectives
Implement all core REST API endpoints: projects CRUD, execution submission, user management.

### Deliverables
- Project CRUD endpoints
- Execution submission and status endpoints
- Validation middleware (Zod)
- Auth middleware (Clerk JWT)
- Rate limiting middleware
- Error handling middleware
- BullMQ queue setup

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 5.1 | Express app setup | App factory, middleware stack | Medium |
| 5.2 | Auth middleware | Clerk JWT verification | Medium |
| 5.3 | Project CRUD | 5 endpoints per Section 11.3 | Medium |
| 5.4 | Execution endpoints | POST create, GET status per Section 11.4 | Medium |
| 5.5 | Validation | Zod schemas for all inputs | Medium |
| 5.6 | Rate limiting | Redis-backed rate limiter | Medium |
| 5.7 | Error handling | AppError classes, global handler | Low |
| 5.8 | BullMQ setup | Execution queue, worker skeleton | Medium |
| 5.9 | Prisma migrations | Initial schema migration | Low |
| 5.10 | API client (FE) | Typed API client in apps/web/lib/api | Medium |

### Dependencies
Phase 1, Phase 3.

### Completion Criteria
- [ ] All project CRUD endpoints working with auth
- [ ] Execution submission returns 202 with QUEUED status
- [ ] Rate limiting returns 429 when exceeded
- [ ] Validation errors return 400 with details
- [ ] Frontend API client typed and working

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Sections 6 and 11.
Implement the backend API layer:
1. Create Express app factory per Section 6.1
2. Implement middleware stack: helmet, cors, auth, rate limit, validation, error handler
3. Build Project CRUD routes/controller/service per Section 11.3
4. Build Execution routes (POST create, GET status) per Section 11.4
5. Create Zod validation schemas for all inputs
6. Set up BullMQ execution queue with Redis
7. Run Prisma migration with schema from Section 10.2
8. Create typed API client in apps/web/lib/api/client.ts
Follow controller → service → prisma pattern. Use AppError classes from Section 6.7.
```

---

## Phase 6 — Execution Engine

### Objectives
Build the core execution pipeline: Docker sandboxing, JavaScript and Python instrumentation, trace generation.

### Deliverables
- Docker container manager with security config
- JavaScript Babel instrumentation plugin
- Python AST instrumentation transformer
- Trace collector runtime scripts (Node.js, Python)
- Language handler interface and implementations
- Execution worker (BullMQ consumer)
- Blocklist pattern validation

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 6.1 | Docker base images | Node 20, Python 3.12 Dockerfiles | Medium |
| 6.2 | Container manager | Create, execute, cleanup lifecycle | High |
| 6.3 | JS instrumentation | Babel plugin + trace collector | Very High |
| 6.4 | Python instrumentation | AST transformer + trace collector | Very High |
| 6.5 | Language handlers | JS and Python handler implementations | High |
| 6.6 | Execution worker | BullMQ worker consuming jobs | Medium |
| 6.7 | Blocklist validation | Static pattern analysis | Medium |
| 6.8 | Trace validation | FlowTrace schema validation | Medium |
| 6.9 | Integration tests | End-to-end execution tests | High |

### Dependencies
Phase 5.

### Risk Analysis
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Docker not available on Railway | Blocker | Validate early; fallback to Render |
| Instrumentation breaks code semantics | High | Extensive test suite comparing output |
| Container escape | Critical | Full security config from Section 13 |

### Completion Criteria
- [ ] JavaScript code executes and produces valid FlowTrace JSON
- [ ] Python code executes and produces valid FlowTrace JSON
- [ ] Container security config applied (no network, memory limit, timeout)
- [ ] Blocklist patterns rejected with 400 error
- [ ] Infinite loops timeout after 10s
- [ ] Integration tests pass for 10+ code samples

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Section 7 in FULL (critical).
Implement the execution engine for JavaScript and Python:
1. Create Docker base images (docker/node, docker/python) per Section 7.3
2. Build ContainerManager per Section 7.3 with full security config
3. Implement JavaScript Babel instrumentation plugin per Section 7.5
4. Create Node.js trace collector runtime per Section 7.5
5. Implement Python AST transformer per Section 7.6
6. Create Python trace collector runtime
7. Build LanguageHandler interface and JS/Python implementations per Section 7.4
8. Create BullMQ execution worker per Section 6.8
9. Add blocklist validation per Section 7.9
10. Write integration tests for: factorial, binary search, fibonacci, error cases
Output must conform to FlowTrace JSON schema from Section 7.2.
```

---

## Phase 7 — Trace Engine

### Objectives
Build trace processing, storage, and retrieval pipeline.

### Deliverables
- Trace processor (validation, frame indexing, stats)
- Trace storage service (PostgreSQL JSONB + S3 fallback)
- Trace retrieval API
- Trace summarizer for AI context
- Frontend trace parser

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 7.1 | Trace processor | Validate, index frames, compute stats | Medium |
| 7.2 | Trace storage | JSONB for small, S3 for large traces | Medium |
| 7.3 | Trace retrieval API | GET /executions/:id/trace | Low |
| 7.4 | Trace summarizer | Reduce trace for AI token budget | Medium |
| 7.5 | Frontend trace parser | Parse FlowTrace, build step index | Medium |
| 7.6 | Execution polling | Frontend poll/SSE for execution status | Medium |

### Dependencies
Phase 6.

### Completion Criteria
- [ ] Traces stored and retrieved correctly
- [ ] Large traces (>100KB) stored in S3
- [ ] Trace summarizer produces valid summary under 3000 tokens
- [ ] Frontend receives trace and parses without error
- [ ] Execution polling shows status updates

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Sections 7.10 and 9.4.
Build the trace engine:
1. Create TraceProcessor per Section 7.10 (validate, frame index, stats)
2. Build TraceStorageService (JSONB inline, S3 for >100KB)
3. Implement GET /executions/:id/trace endpoint
4. Create trace summarizer for AI context per Section 9.4
5. Build frontend trace parser in apps/web/lib/trace/
6. Implement execution status polling in useExecution hook
Validate all traces against FlowTrace schema from Section 7.2.
```

---

## Phase 8 — Visualization Engine

### Objectives
Build all core visualization components: execution graph, variable panel, timeline playback, output panel.

### Deliverables
- Execution graph (React Flow)
- Variable panel with diff highlighting
- Timeline bar with playback controls
- Output panel
- Playback controller (Zustand store)
- Graph builder Web Worker

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 8.1 | Playback store | Zustand store with step control | Medium |
| 8.2 | Graph builder | Web Worker + dagre layout | High |
| 8.3 | Execution graph | React Flow with custom nodes | High |
| 8.4 | Variable panel | Variable list with diff highlighting | Medium |
| 8.5 | Timeline bar | Scrubber, play/pause, speed control | Medium |
| 8.6 | Output panel | stdout/stderr synced to timeline | Low |
| 8.7 | Playback engine | RAF loop with speed control | Medium |
| 8.8 | Keyboard shortcuts | Space, arrows, Home, End | Low |
| 8.9 | Integration | Wire all components to playback store | Medium |

### Dependencies
Phase 7, Phase 2.

### Completion Criteria
- [x] Execution graph renders from trace with correct layout
- [x] Active node highlights during playback
- [x] Variable panel shows changes with highlighting
- [x] Timeline scrubbing syncs all panels
- [x] Play/pause/speed control works at 60fps
- [x] Graph handles 500+ nodes without jank

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Section 8 in FULL.
Build the visualization engine:
1. Create PlaybackController Zustand store per Section 5.6
2. Build graph builder Web Worker per Section 8.2
3. Create ExecutionGraph component with React Flow and custom nodes per Section 8.2
4. Build VariablePanel with useVariableDiff hook per Section 8.6
5. Create TimelineBar with scrubber, play/pause, speed selector
6. Build OutputPanel synced to current step
7. Implement playback engine with RAF loop per Section 8.5
8. Add keyboard shortcuts (Space, Arrow keys)
9. Wire all components to PlaybackController
Use Framer Motion for node activation animations. Memoize graph nodes.
```

---

## Phase 9 — AI Integration

### Objectives
Integrate OpenAI for execution explanations and debugging chat.

### Deliverables
- AI service with streaming SSE
- Explanation prompt templates
- Chat interface component
- AI panel in editor workspace
- Response caching (Redis)
- Token budget management

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 9.1 | AI service | OpenAI integration with streaming | Medium |
| 9.2 | Prompt templates | Explain, debug, complexity prompts | Medium |
| 9.3 | AI API endpoints | POST /ai/explain, POST /ai/chat (SSE) | Medium |
| 9.4 | AI panel UI | Explanation view + chat interface | Medium |
| 9.5 | SSE streaming hook | useAIStream for frontend | Medium |
| 9.6 | Response caching | Redis cache by code+trace hash | Low |
| 9.7 | AI message persistence | Store in AIChatMessage table | Low |

### Dependencies
Phase 7, Phase 5.

### Completion Criteria
- [ ] "Explain" button generates streaming explanation
- [ ] Explanation references specific trace steps
- [ ] Chat interface supports follow-up questions
- [ ] Responses cached (second request instant)
- [ ] AI messages persisted in database

### AI Prompt for Cursor
```
Read MASTER_PROJECT_DOCUMENTATION.md Section 9 in FULL.
Implement the AI system:
1. Create AIService with OpenAI streaming per Section 9.5
2. Build prompt templates per Section 9.3 (explain, debug)
3. Implement POST /ai/explain and POST /ai/chat SSE endpoints
4. Create AIPanel component with explanation view and chat interface
5. Build useAIStream hook for SSE consumption
6. Add Redis caching per Section 9.7
7. Persist AIChatMessage records
Use GPT-4o for explanations, GPT-4o-mini for simple queries.
Ground all responses in trace data. Never invent execution paths.
```

---

## Phase 10 — Database Features

### Objectives
Implement project persistence, execution history, and dashboard data.

### Deliverables
- Project auto-save connected to API
- Dashboard with real project data
- Execution history per project
- Usage analytics tracking

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 10.1 | Project CRUD (FE) | Connect auto-save, create, delete | Medium |
| 10.2 | Dashboard data | Fetch and display user projects | Medium |
| 10.3 | Execution history | List past executions, replay traces | Medium |
| 10.4 | Analytics events | Track key user actions | Low |
| 10.5 | Usage dashboard | Show daily/monthly usage stats | Low |

### Dependencies
Phase 5, Phase 8.

### Completion Criteria
- [ ] Projects persist across sessions
- [ ] Dashboard shows all user projects
- [ ] Execution history replayable
- [ ] Usage stats visible in settings

---

## Phase 11 — Deployment

### Objectives
Deploy to production: Vercel (frontend), Railway (backend + workers).

### Deliverables
- Production environment variables configured
- Vercel deployment with custom domain
- Railway deployment for API + workers
- Docker images built and pushed
- Health check endpoints
- Monitoring and error tracking (Sentry)
- Database backups configured

### Tasks

| # | Task | Subtasks | Complexity |
|---|------|----------|------------|
| 11.1 | Env configuration | Production env vars on Vercel + Railway | Low |
| 11.2 | Vercel deploy | Connect repo, configure build | Low |
| 11.3 | Railway deploy | API + worker services | Medium |
| 11.4 | Docker images | Build and push language images | Medium |
| 11.5 | Custom domain | flowmind.dev DNS configuration | Low |
| 11.6 | Sentry setup | Error tracking for FE + BE | Low |
| 11.7 | Health checks | /health endpoint, uptime monitoring | Low |
| 11.8 | DB backups | Railway automated backups | Low |

### Dependencies
All prior phases.

### Completion Criteria
- [ ] flowmind.dev loads landing page
- [ ] Full execution flow works in production
- [ ] Error tracking captures and reports errors
- [ ] Health check monitored
- [ ] Database backups scheduled

---

## Phase 12 — Advanced Features

### Objectives
Implement P1 and P2 features: recursion tree, C++/Java support, AI debugging, DSA templates, collaboration.

### Deliverables (Prioritized)
1. Recursion tree visualization (P1)
2. C++ execution support (P1)
3. Java execution support (P1)
4. AI debugging assistant (P1)
5. DSA template library (P1)
6. Memory visualization (P1)
7. Complexity analysis (P2)
8. Real-time collaboration (P2)
9. Classroom mode (P2)
10. Interview mode (P2)

### Dependencies
Phase 11 (production deployment).

Each sub-feature follows the same pattern: implement per relevant Section spec, test, deploy.

---

# SECTION 19 — TASK PRIORITY MATRIX

## 19.1 Feature Priority Matrix

| ID | Feature | Priority | Phase | Complexity | Dependencies |
|----|---------|----------|-------|------------|-------------|
| F-001 | Authentication | P0 | 3 | Medium | Foundation |
| F-002 | Dashboard | P0 | 2, 10 | Medium | Auth |
| F-003 | Monaco Editor | P0 | 4 | Medium | UI |
| F-004 | Execution Engine | P0 | 6 | Very High | Backend APIs |
| F-005 | Docker Sandboxing | P0 | 6 | High | Execution Engine |
| F-006 | JS Instrumentation | P0 | 6 | Very High | Execution Engine |
| F-007 | Python Instrumentation | P0 | 6 | Very High | Execution Engine |
| F-008 | Execution Tracing | P0 | 6, 7 | High | Instrumentation |
| F-009 | Variable Visualization | P0 | 8 | Medium | Trace Engine |
| F-010 | Execution Graph | P0 | 8 | High | Trace Engine |
| F-011 | Timeline Playback | P0 | 8 | Medium | Trace Engine |
| F-012 | Project Saving | P0 | 5, 10 | Low | Auth, Backend |
| F-013 | AI Explanation | P0 | 9 | Medium | Trace Engine |
| F-014 | Recursion Tree | P1 | 12 | High | Visualization |
| F-015 | Memory Visualization | P1 | 12 | Very High | Trace Engine |
| F-016 | C++ Support | P1 | 12 | Very High | Execution Engine |
| F-017 | Java Support | P1 | 12 | Very High | Execution Engine |
| F-018 | AI Debugging | P1 | 12 | High | AI System |
| F-019 | Execution History | P1 | 10 | Medium | Database |
| F-020 | DSA Templates | P1 | 12 | High | Visualization |
| F-021 | Collaboration | P2 | 12 | Very High | WebSocket infra |
| F-022 | Classroom Mode | P2 | 12 | Very High | Collaboration |
| F-023 | Interview Mode | P2 | 12 | High | DSA, AI |
| F-024 | 3D Visualization | P2 | 12 | Very High | Memory Viz |
| F-025 | Complexity Analysis | P2 | 12 | High | AI, Execution |
| F-026 | Plugin System | P3 | Future | Very High | API |
| F-027 | LMS Integration | P3 | Future | High | Classroom |

## 19.2 Dependency Graph

```
Foundation (P1)
    ├── UI Development (P2)
    ├── Authentication (P3)
    │       └── Backend APIs (P5)
    │               ├── Execution Engine (P6)
    │               │       └── Trace Engine (P7)
    │               │               ├── Visualization Engine (P8)
    │               │               └── AI Integration (P9)
    │               └── Database Features (P10)
    ├── Code Editor (P4) ← UI + Auth
    └── Deployment (P11) ← All
            └── Advanced Features (P12)
```

## 19.3 Implementation Order (Critical Path)

```
P1 Foundation → P2 UI + P3 Auth (parallel) → P5 Backend → P4 Editor → P6 Execution → P7 Trace → P8 Visualization → P9 AI → P10 Database → P11 Deploy → P12 Advanced
```

## 19.4 Engineering Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Instrumentation semantic breakage | High | Critical | Extensive test suite per language |
| Docker cloud platform limitations | Medium | Blocker | Early validation on Railway/Render |
| Monaco bundle size performance | Medium | Medium | Dynamic import, preload strategy |
| OpenAI API cost at scale | Medium | High | Caching, model routing, token budgets |
| React Flow performance (large graphs) | Medium | Medium | Web Worker layout, super-nodes |
| Trace size explosion (deep recursion) | High | Medium | Step limits, truncation, compression |

## 19.5 Scaling Risks

| Risk | Trigger | Mitigation |
|------|---------|------------|
| Execution queue backlog | >100 queued jobs | Auto-scale workers |
| PostgreSQL connection exhaustion | >100 concurrent API requests | PgBouncer |
| Redis memory pressure | >80% memory usage | Separate cache/queue instances |
| S3 storage costs | >1TB traces | Retention policy, compression |
| AI API rate limits | >1000 requests/hour | Queue, cache, model routing |

---

# SECTION 20 — AI DEVELOPMENT WORKFLOW

## 20.1 Cursor Workflow Overview

This project is designed to be built entirely with AI-assisted development in Cursor. Each phase includes specific AI prompts. Follow this workflow for consistent, high-quality output.

## 20.2 How to Prompt Cursor

### Prompt Structure Template

```
CONTEXT: Read MASTER_PROJECT_DOCUMENTATION.md [Section X] before starting.
TASK: [Specific feature or component to build]
CONSTRAINTS:
- Follow naming conventions from Section 17
- Use existing components from [path] where applicable
- TypeScript strict mode
- Do not modify unrelated files
- Match existing code patterns in [reference file]
ACCEPTANCE CRITERIA:
- [ ] [Specific testable outcome 1]
- [ ] [Specific testable outcome 2]
FILES TO CREATE/MODIFY:
- [expected file paths]
DO NOT:
- Add unnecessary abstractions
- Create files not listed in the spec
- Skip error handling
- Use any types
```

### Phase-by-Phase Workflow

```
1. Read the phase spec in Section 18
2. Copy the AI Prompt for Cursor
3. Paste into Cursor with @MASTER_PROJECT_DOCUMENTATION.md referenced
4. Review generated code against Completion Criteria
5. Run tests: pnpm test
6. Fix any issues before moving to next phase
7. Commit with conventional commit message
```

## 20.3 Avoiding AI-Generated Spaghetti Code

| Problem | Prevention |
|---------|-----------|
| Over-abstraction | Spec says "one service per domain" — reject unnecessary layers |
| Inconsistent patterns | Always reference existing code: "Match pattern in execution.service.ts" |
| Missing error handling | Acceptance criteria require error cases |
| Giant files | Max 300 lines per file; split if exceeded |
| Hallucinated imports | Run `pnpm typecheck` after every generation |
| Duplicate logic | Spec defines shared packages; reject inline reimplementation |
| Missing types | Strict mode catches; reject `any` |

## 20.4 Maintaining Architecture Consistency

1. **Always reference this document** — Include section numbers in prompts
2. **One phase at a time** — Never skip ahead
3. **Review against spec** — Check completion criteria before moving on
4. **Run CI locally** — `pnpm lint && pnpm typecheck && pnpm test`
5. **Follow folder structure** — Section 4.8 defines exact locations
6. **Use shared types** — Import from `@flowmind/types`, never redefine

## 20.5 Code Review Checklist (AI-Generated Code)

- [ ] TypeScript compiles with strict mode
- [ ] Follows naming conventions (Section 17)
- [ ] Uses existing UI components (not reinventing)
- [ ] Error handling with AppError classes
- [ ] Input validation with Zod
- [ ] No secrets in code
- [ ] No `any` types
- [ ] No console.log (use logger)
- [ ] Component has proper TypeScript props interface
- [ ] API endpoint has auth middleware
- [ ] Tests included for business logic

## 20.6 Testing Workflow

```
After each phase:
1. pnpm test (unit tests)
2. pnpm test:integration (API tests)
3. Manual smoke test (run dev, test feature)
4. After Phase 8+: pnpm test:e2e (Playwright)
5. Fix failures before proceeding
```

## 20.7 Git Workflow

```
main (protected)
  └── feature/phase-N-description
        ├── Commits follow conventional format
        ├── PR reviewed against phase completion criteria
        └── Merge to main after CI passes
```

Branch naming: `feature/phase-6-execution-engine`, `fix/trace-validation-error`

---

# SECTION 21 — FINAL ENGINEERING RULES

## 21.1 Architecture Principles

1. **Trace-First** — Every visualization must derive from deterministic execution traces, never simulated approximations
2. **Single Source of Truth** — PlaybackController step index drives all visualization components
3. **Modular Monolith First** — Extract services only when scaling demands it
4. **Abstraction Boundaries** — Auth, AI, execution, and storage behind service interfaces
5. **Shared Types** — All cross-boundary types live in `@flowmind/types`

## 21.2 Scalability Principles

1. Stateless API servers — all state in PostgreSQL/Redis/S3
2. Queue-based execution — never execute code synchronously in API request
3. Cache aggressively — instrumented code, AI responses, project metadata
4. Paginate everything — projects, executions, trace steps, variables
5. Lazy load heavy assets — Monaco, React Flow, Three.js

## 21.3 Maintainability Principles

1. One component per file, one service per domain
2. Max 300 lines per file — split when exceeded
3. Co-locate related code (component + hook + types)
4. Explicit over clever — readable code beats compact code
5. Delete dead code immediately — no commented-out blocks

## 21.4 Performance Principles

1. Web Workers for graph layout computation
2. React.memo on all graph node components
3. Pre-compute visualization data on trace receipt, not during playback
4. Virtualize long lists (variables, output, timeline)
5. Dynamic import for heavy libraries (Monaco, React Flow)

## 21.5 Security Principles

1. Never execute code outside Docker sandbox
2. Never trust user input — validate with Zod on every endpoint
3. Never expose secrets to frontend
4. Always apply container security config (Section 13.2)
5. Always scan for blocklist patterns before execution

## 21.6 AI Development Quality Principles

1. Always reference this document by section number in prompts
2. Complete one phase before starting the next
3. Run typecheck and tests after every AI generation
4. Review AI output against phase completion criteria
5. Reject over-engineered abstractions — simplicity wins
6. Keep diffs focused — one feature per AI session

---

# APPENDIX A — QUICK REFERENCE

## Environment Variables

```bash
# apps/web/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
CLERK_SECRET_KEY=sk_test_...

# apps/api/.env
DATABASE_URL=postgresql://flowmind:flowmind@localhost:5432/flowmind
REDIS_URL=redis://localhost:6379
CLERK_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
AWS_S3_BUCKET=flowmind-traces
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
WORKER_CONCURRENCY=5
LOG_LEVEL=debug
ALLOWED_ORIGINS=http://localhost:3000
```

## Key Commands

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start web + api in dev mode
pnpm build            # Build all apps
pnpm test             # Run unit tests
pnpm test:integration # Run integration tests
pnpm test:e2e         # Run Playwright E2E tests
pnpm lint             # ESLint all packages
pnpm typecheck        # TypeScript check all packages
pnpm db:migrate       # Run Prisma migrations
pnpm db:seed          # Seed templates and test data
pnpm docker:build     # Build execution Docker images
```

## FlowTrace Quick Reference

```typescript
interface FlowTrace {
  version: '1.0.0';
  metadata: TraceMetadata;
  source: { original: string; lineCount: number; hash: string };
  steps: TraceStep[];
  frames: StackFrame[];
  stats: TraceStats;
}

type StepType = 'line' | 'call' | 'return' | 'assign' | 'condition' | 'loop_iter' | 'exception' | 'output' | 'memory_alloc' | 'memory_free';
```

---

**END OF DOCUMENT**

*This document is the single source of truth for building FlowMind. All development decisions should reference this specification. Version updates should be tracked via git history on this file.*

