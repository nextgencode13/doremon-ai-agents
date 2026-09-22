# Doraemon Transformation Plan for Munder Difflin

## 1. Vision & Architecture Overview

The goal is to convert Munder Difflin's cast, visual avatars, and command interfaces into the **Doraemon universe**, structured as:
* **Doraemon = The Command Center (The 4D Pocket Control Room)**
  * Manages global missions, scheduled tasks, gadget skills (MCP catalog), memory recall ("Memory Bread"), and fleet telemetry.
* **Doraemon = The Floor Boss / Physical Orchestrator**
  * Retained as the tactical boss running the live 2D office floor, moving avatars, dispatching work, and managing terminal sessions.
* **The Doraemon Squad = The Multi-Agent Worker Fleet**
  * Nobita, Shizuka, Gian, Suneo, Dorami, Dekisugi, Jaiko, Sensei, and Sewashi as selectable pixel-art agents with specialized developer roles.

---

## 2. Character & Role Mapping

| Character | Role & Specialization | Persona Blurb | Signature Palette |
| :--- | :--- | :--- | :--- |
| **Doraemon** | **Command Center Overseer & Gadget Master** | "22nd-century cat robot with all the tools" | `#1e90ff` (Blue) + `#e60012` (Red Collar) + `#ffd700` (Bell) |
| **Doraemon** | **Floor Boss & Tactical Orchestrator** | "World's best floor manager" | `#5a6b8c` (Classic Slate) |
| **Nobita** | **Rapid Prototyper / Scripter** | "Fast attempts, relies on gadgets & teamwork" | `#f4d03f` (Yellow Shirt) + `#2c3e50` (Round Glasses) |
| **Shizuka** | **Code Quality & Documentation Reviewer** | "Clean code, tests, and elegant documentation" | `#ff69b4` (Pink Dress) + `#8b4513` (Twin Tails) |
| **Gian (Takeshi)** | **Heavy Refactoring & Build Engineer** | "Brute-force refactors, dependency updates & CI" | `#e67e22` (Orange/Brown Stripe) |
| **Suneo** | **Integrations & API Specialist** | "Latest tools, webhooks, Slack & cloud APIs" | `#2980b9` (Blue Polo) + `#1c2833` (Pointed Hairstyle) |
| **Dorami** | **Subagent Auditor & Safety Monitor** | "Sharp oversight, circuit breaker watchdog" | `#f1c40f` (Yellow Body) + `#e74c3c` (Red Ribbon) |
| **Dekisugi** | **Chief Architect & Algorithm Designer** | "Zero-defect solutions, perf optimizations & math" | `#27ae60` (Green Sweater) |
| **Jaiko** | **UI/UX & Frontend Designer** | "Pixel-perfect styles, CSS, and markdown design" | `#c0392b` (Red Beret) |
| **Sensei (Teacher)**| **Strict Linter & Security Auditor** | "Zero warnings policy, typecheck enforcement" | `#7f8c8d` (Grey Suit & Glasses) |
| **Sewashi** | **Roadmap & Scheduled Missions Planner** | "Future planning and scheduled autonomy" | `#9b59b6` (Futuristic Purple) |

---

## 3. The Doraemon Command Center Metaphor ("4D Pocket")

The Command Center will be themed around Doraemon's iconic secret gadgets:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       DORAEMON COMMAND CENTER                              │
├────────────────────────────────────────────────────────────────────────────┤
│  [ Anywhere Door ]       --> Instant Repo Navigator & File Workspace       │
│  [ Memory Bread ]        --> Semantic Memory Recall & Knowledge Graph      │
│  [ Bamboo Copter ]       --> Quick Task Dispatch & Floating Subagents      │
│  [ Time Machine ]        --> Git Commit History, Timeline & Undo Panes     │
│  [ Translation Konjac ]  --> Slack, Webhooks & Multi-Engine CLI Adapters   │
│  [ Pass-Through Loop ]   --> Sandboxed File I/O & Git Worktrees            │
│  [ Big Light / Small ]   --> Token Cap & Context Compression Controls      │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Technical Implementation Steps

### Phase 1: Roster & Cast Definitions
**Files to update:**
- [`src/renderer/src/scene/office/cast.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/cast.ts)
  - Add `doraemon`, `nobita`, `shizuka`, `gian`, `suneo`, `dorami`, `dekisugi`, `jaiko`, `sensei`, `sewashi` to `OfficeCharacterName`.
  - Update `OFFICE_CAST` list with colors, blurbs, and display names.
  - Set default worker character to `nobita`.

### Phase 2: Procedural Pixel Art & Sprites
**Files to update:**
- [`src/renderer/src/scene/office/portraitArt.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/portraitArt.ts)
  - Create procedural pixel-art recipes for:
    - **Doraemon**: Round blue head, white whiskers, red nose, golden bell collar, white pocket belly.
    - **Nobita**: Yellow polo, navy shorts, distinct circular wire-frame glasses, black bowl-cut hair.
    - **Shizuka**: Pink dress with white collar, brown twin pigtails.
    - **Gian**: Orange shirt with dark horizontal chest stripe, stocky build.
    - **Suneo**: Angular forward-swept hairstyle, cyan/blue polo collar.
    - **Dorami**: Bright yellow body, red ear ribbon bow, checked tail.
    - **Dekisugi**: Neat side-part hair, emerald green crewneck sweater.
  - Implement walking legs and back views in `sceneFrameBufs` for in-scene Pixi.js animations.

### Phase 3: Command Center Branding & Gadget UI
**Files to update:**
- [`src/renderer/src/components/CommandCenterPanel.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/components/CommandCenterPanel.tsx)
  - Add Doraemon header banner and 4D Gadget badges.
  - Relabel MCP skills as **"Secret Gadgets"** (with gadget icons like Bamboo Copter and Anywhere Door).
  - Add quick-trigger mission buttons themed around classic Doraemon episode tools.

### Phase 4: Office Floor Theme & Doraemon Integration
**Files to update:**
- [`src/renderer/src/scene/office/OfficeFloor.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/OfficeFloor.tsx)
- [`src/renderer/src/scene/office/themeRegistry.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/themeRegistry.ts)
  - Add **"22nd-Century Lab"** or **"Nobita's Tatami Room"** theme alongside standard Dunder Mifflin office themes.
  - Keep Doraemon seated in the corner manager office coordinating the Nobita/Gian/Suneo desk cluster.

### Phase 5: Voice & Speech Integration
**Files to update:**
- [`src/renderer/src/realtime/session.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/realtime/session.ts)
  - Update system prompt instructions to recognize the Doraemon fleet names while maintaining Doraemon as the floor boss voice.

---

## 5. Verification & Testing Checklist

1. **Pixel Art Alignment**:
   - Verify that static portraits in the Add Agent modal match the 2D walking sprites on the Pixi canvas.
2. **Animation Cycles**:
   - Check walk cycles (stand, left-step, right-step), desk-seated back views, and tool bubbles.
3. **Agent Spawning**:
   - Spawn multiple agents (e.g. Nobita on Gemini, Gian on Codex, Shizuka on Claude) and verify message envelope transfers.
4. **Command Center Operation**:
   - Test gadget enablement, scheduled missions, and task board coordination under the new Doraemon branding.
