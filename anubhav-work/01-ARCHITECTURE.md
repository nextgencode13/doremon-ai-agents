# Munder Difflin — System Architecture Documentation

## 1. Executive Summary

**Munder Difflin** is an open-source, local-first **multi-agent desktop harness** that turns standalone CLI coding agents (Claude Code, Antigravity / Gemini CLI `agy`, OpenAI Codex, xAI Grok, Kimi, Qwen, OpenCode, Crush, pi.dev, GitHub Copilot CLI, Cursor) into an autonomous, self-coordinating team.

The application presents a Sims-like 2D pixel-art office floor where individual agents sit at desks, visit specialized stations when invoking tools, pass atomic message envelopes, and maintain long-term memory. A supervisor agent ("Doraemon") runs the floor, delegating tasks and escalating critical human-in-the-loop (HITL) decisions to the user.

---

## 2. Core Architectural Pillars

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                ELECTRON APP                                      │
├──────────────────────────────────────────────────────────────────────────────────┤
│  RENDERER PROCESS (React 18 + Pixi.js + xterm.js + Monaco Editor + Zustand)      │
│  ┌─────────────────────────┐  ┌───────────────────────┐  ┌────────────────────┐  │
│  │ 2D Office Floor         │  │ Built-in IDE & Git    │  │ Terminal Matrix    │  │
│  │ (Pixi.js v8 Canvas)     │  │ (Monaco + Diff View)  │  │ (xterm.js PTYs)    │  │
│  └───────────▲─────────────┘  └──────────▲────────────┘  └─────────▲──────────┘  │
│              │ (Avatar Events)           │ (FS / Git IPC)          │ (PTY Stream)│
├──────────────┼───────────────────────────┼─────────────────────────┼─────────────┤
│  PRELOAD (Context Isolation Bridge - window.cth)                                 │
├──────────────┼───────────────────────────┼─────────────────────────┼─────────────┤
│  MAIN PROCESS (Node.js + Electron Core)                                          │
│  ┌───────────┴─────────────┐  ┌──────────┴────────────┐  ┌─────────┴──────────┐  │
│  │ Event Plane             │  │ Hive Coordinator      │  │ Terminal Plane     │  │
│  │ (Hook Shims + IPC)      │  │ (Git Broker + Router) │  │ (node-pty Manager) │  │
│  └───────────▲─────────────┘  └──────────▲────────────┘  └─────────▲──────────┘  │
│              │                           │                         │             │
│              │ JSON Hook Payloads        │ Atomic Mailbox & Memory │ PTY I/O     │
├──────────────┼───────────────────────────┼─────────────────────────┼─────────────┤
│  OS / HOST ENVIRONMENT                   │                         │             │
│  ┌───────────┴───────────────────────────┴─────────────────────────┴──────────┐  │
│  │ Agent CLI Processes (claude, agy, codex, grok, opencode, custom)           │  │
│  │ Git Worktrees · SQLite Database · Local Filesystem · Webhooks / Slack API  │  │
│  └────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The Dual Data-Plane Model

To achieve both **authentic terminal interaction** and **structured visual simulation**, Munder Difflin separates execution into two independent data planes:

### A. Terminal Plane (Raw Byte Stream)
* **Engine**: Powered by `node-pty` in the Electron main process ([`src/main/pty.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/main/pty.ts)) and rendered using `xterm.js` in the renderer ([`src/renderer/src/components/TerminalView.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/components/TerminalView.tsx)).
* **Responsibility**: Provides byte-for-byte fidelity with the underlying CLI processes, supporting full ANSI escape sequences, color palettes, interactive prompts, and keyboard inputs.

### B. Event Plane (Structured Lifecycle)
* **Engine**: Intercepts lifecycle triggers using hook shims (`cth-hook`) configured per agent.
* **Hook Events**:
  * `UserPromptSubmit` → Agent transitions from idle to active / working state.
  * `PreToolUse` → Agent walks toward the corresponding station (e.g., file cabinet for file tools, web portal for browse tools).
  * `PostToolUse` → Agent returns to desk carrying the result.
  * `Notification` → Agent waves or triggers UI toast notifications.
  * `Stop` → Agent settles into idle or processes pending inbox messages.
* **Decoupling Rationale**: Parsing raw terminal output for agent intent is brittle. Hook lifecycle events deliver clean JSON schemas, while raw PTY handles rendering.

---

## 4. The Hive — Autonomous Multi-Agent Coordination

Multi-agent coordination is designed around robust distributed systems patterns adapted for the local filesystem ([`src/main/hive.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/main/hive.ts)):

```
<harnessHome>/hive/
├── PROTOCOL.md              # Agent contract: communication rules and formatting
├── registry.json            # Agent roster: identities, roles, capabilities, seats
├── board.md                 # Shared blackboard / co-authored plans
├── tasks.json               # Task ledger (status, assignee, dependencies)
├── log.jsonl                # Append-only global event stream
└── agents/<agentId>/
    ├── identity.md          # Agent identity, persona, and assigned capabilities
    ├── memory.md            # Markdown long-term memory (read/updated per run)
    ├── inbox/               # Messages delivered TO this agent (<ts>-<msgid>.json)
    │   └── .done/           # Historical archive of processed messages
    ├── outbox/              # Messages waiting to be sent
    └── cursor.json          # Tracked processing position
```

### Core Invariants:
1. **Single-Committer Git Architecture**:
   * All coordination state lives in a local Git repository.
   * **Only the Electron main process commits**. Agents never run `git commit` or `git push` directly in the hive, preventing `.git/index.lock` collisions.
2. **Single-Writer Atomic Mailboxes**:
   * Agents write solely to their own directory (`agents/<id>/outbox/`).
   * Main process file router moves messages atomically from sender `outbox/` to receiver `inbox/`.
   * Files are created with unique timestamps (`<timestamp>-<uuid>.json`) via write-then-rename to guarantee atomicity.
3. **The "GOD" Supervisor (Doraemon)**:
   * Acts as the chief router and adjudicator.
   * Resolves routine queries and subtasks autonomously.
   * Escalates high-risk operations (financial spend, destructive commands, major scope changes) to human-in-the-loop prompts.
4. **Markdown-First Memory & Fast Semantic Recall**:
   * Agents read and update plain Markdown files (`memory.md`).
   * Indexed via embedded SQLite ([`better-sqlite3`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/main/db.ts)) with Full-Text Search (FTS5) to deliver sub-millisecond retrieval without bloated cloud vector databases.

---

## 5. Directory Structure & Module Responsibilities

```
src/
├── main/                               # Electron Main Process (Node.js runtime)
│   ├── index.ts                        # Electron bootstrap, window creation, IPC handlers
│   ├── pty.ts                          # node-pty lifecycle, process management, ConPTY shims
│   ├── hive.ts                         # Mailbox router, Git committer, hive FS coordination
│   ├── breaker.ts                      # Safety circuit breaker (runaway loop & cost throttle)
│   ├── db.ts                           # SQLite connection (better-sqlite3) & schema migrations
│   ├── memory.ts                       # Memory indexing, topic clustering & semantic recall
│   ├── git.ts                          # Sandboxed Git operations for the Monaco IDE
│   ├── realtimeActions.ts              # Realtime voice AI bridge & function calls
│   ├── webhook.ts & slack.ts           # External trigger ingestion (Webhooks, Slack bot)
│   ├── config.ts                       # App configuration, persistent settings, BYOK secrets
│   └── updater.ts                      # Auto-update manager & release notes delivery
│
├── preload/                            # IPC Security Layer
│   └── index.ts                        # Context bridge exposing safe window.cth APIs
│
├── renderer/src/                       # React Frontend Application
│   ├── App.tsx                         # Primary view layout, modals & sidebar orchestrator
│   ├── scene/office/                   # Pixi.js 2D Office Engine
│   │   ├── OfficeFloor.tsx             # Pixi application canvas container
│   │   ├── Character.ts & Sprite.ts    # Animated agent avatars, state machine & pathfinding
│   │   ├── TiledMapRenderer.ts         # Tilemap rendering for office furniture & desks
│   │   └── MessageEnvelope.ts          # Envelope flight animations during inter-agent messaging
│   ├── ide/                            # Built-in Monaco IDE
│   │   ├── IdePanel.tsx                # File tree, tabs, and code workspace
│   │   ├── MonacoEditor.tsx            # Monaco code editor integration
│   │   ├── MonacoDiff.tsx              # Git visual diff viewer
│   │   └── GitPanes.tsx                # Commit graph & branch history
│   ├── components/                     # UI Panels & Subsystems
│   │   ├── TerminalView.tsx            # xterm.js terminal instance & pool manager
│   │   ├── TasksKanban.tsx             # Kanban board for multi-agent task tracking
│   │   ├── MemoryGraphPanel.tsx        # Force-directed knowledge graph visualization
│   │   ├── SettingsModal.tsx           # Settings (keys, models, themes, triggers)
│   │   └── RealtimeDoraemonToggle.tsx   # Voice interface HUD & controls
│   └── store/                          # State Management
│       ├── store.ts                    # Zustand primary state store
│       └── config.ts                   # Client-side configuration state
│
└── shared/                             # Shared TypeScript Declarations & Utilities
    ├── agentProvider.ts                # Supported LLM/CLI engines and capability specs
    ├── triggers.ts                     # Webhook, cron schedule, and org event schemas
    ├── taskLedger.ts                   # Task lifecycle states and dependency definitions
    └── toolCatalog.ts                  # Tool specifications and station routing maps
```

---

## 6. Security, Safety, and Circuit Breakers

* **Circuit Breaker ([`src/main/breaker.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/main/breaker.ts))**:
  * Monitors API spend rates, token burn counters, and repeated error cycles.
  * Employs a graduated safety ladder: **Steer → Constrain → Halt** to prevent runaway billing or infinite error loops.
* **Secret Broker**:
  * API keys and secrets (Groq, OpenAI, Anthropic, OpenRouter) are stored in encrypted/secure local storage and exposed write-only to renderer views.
* **Context Isolation**:
  * Renderer process runs with strict context isolation; filesystem and process operations are exclusively brokered via IPC in `preload/index.ts`.

---

## 7. Voice & Realtime Control Plane

* **Realtime Voice Engine**: Integrated with OpenAI Realtime API and Groq Whisper (`Free Flow`).
* **Microphone HUD**: Allows users to hold Option / click to verbally instruct Doraemon ("GOD orchestrator"), who analyzes floor state, creates tasks on the Kanban board, and dispatches them to specialized agents.
