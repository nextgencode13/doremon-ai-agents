# Doraemon Image Integration Plan

## 1. Executive Summary

This plan details how to integrate all **15 authentic Doraemon character images** located in `anubhav-work/Doremon-character-img/` directly into **Munder Difflin**. 

The integration will use these official character illustrations for:
1. **High-Definition UI Busts & Avatar Portraits** in all cards, modals, strips, Command Center headers, and inspectors.
2. **In-Scene Pixel-Art Floor Sprites** generated and textured in Pixi.js for live 2D office navigation.
3. **Full 15-Character Expanded Roster** with specialized AI roles across the whole Doraemon family.

---

## 2. Character Image Inventory & Specialized Agent Roles

| Character | Source Image File | AI Agent Specialization & Persona | Accent Color |
| :--- | :--- | :--- | :--- |
| **Doraemon** | `doraemon.png` | **Command Center & 4D Gadget Master** (MCP tools, memory, global missions) | `#1e90ff` (Blue) |
| **Nobita** | `nobita.png` | **Rapid Prototyper & Scripter** (Fast iterations, gadget-assisted tasks) | `#f4d03f` (Yellow) |
| **Shizuka** | `shizuka.png` | **QA, Code Review & Docs Specialist** (Clean tests, flawless docs) | `#ff69b4` (Pink) |
| **Gian (Takeshi)** | `gian.png` | **Heavy Refactors & Build Engineer** (CI fixes, large dependency updates) | `#e67e22` (Orange) |
| **Suneo** | `suneo.png` | **APIs, Webhooks & Integrations** (Slack, cloud services, webhooks) | `#2980b9` (Cyan/Blue)|
| **Dorami** | `dorami.png` | **Subagent Auditor & Safety Watchdog** (Health checks, loop prevention) | `#f1c40f` (Gold) |
| **Dekisugi** | `dekisugi.png` | **Chief Architect & Algorithms** (High-perf optimizations, math) | `#27ae60` (Green) |
| **Jaiko** | `jaiko.png` | **UI/UX & Frontend Designer** (CSS, responsive layout, markdown design)| `#c0392b` (Red) |
| **Sensei** | `sensei.png` | **Strict Linter & Security Auditor** (Zero-warning linter, typecheck) | `#7f8c8d` (Grey) |
| **Sewashi** | `sewashi.png` | **Roadmaps & Scheduled Missions** (22nd-century autonomous crons) | `#9b59b6` (Purple) |
| **Mini-Dora** | `minidora.png` | **Subagent Helper & Quick Tools** (Small fast sub-tasks & helpers) | `#e74c3c` (Bright Red) |
| **Tamako (Mom)** | `tamako.png` | **Resource Budget & Spend Gatekeeper** (Token limits & cost cap enforcement) | `#e67e22` (Warm Amber) |
| **Nobisuke (Dad)** | `nobisuke.png` | **Long-Running Background Worker** (Quiet, durable background jobs) | `#34495e` (Navy) |
| **Gian's Mom** | `gianmom.png` | **Hard Circuit Breaker & Emergency Stop** (Terminates rogue runaway agents) | `#a93226` (Crimson) |
| **Suneo's Mom** | `suneomom.png` | **Premium Model Router & High-Context Ops** (Routes to flagship large models) | `#8e44ad` (Violet) |

---

## 3. Architecture & Technical Pipeline

```
anubhav-work/Doremon-character-img/ (15 PNGs)
   │
   ▼
[1. Asset Pipeline]
   └── Copy & optimize into: `src/renderer/src/assets/doraemon/*.png`
   │
   ├──────────────────────────────┬──────────────────────────────┐
   ▼                              ▼                              ▼
[2. Roster & Cast Metadata]   [3. High-Res UI Portraits]    [4. In-Scene Pixi Sprites]
- Update `cast.ts`            - Update `SpritePortrait.tsx` - Scale & texture in Pixi
- 15 character definitions    - Support image-based busts   - 18×32 animated walking
- Default character: Nobita   - Crisp avatar borders        - Directional facing (L/R/Up/Down)
                              - Fallback to canvas art
```

---

## 4. Implementation Steps (Phased)

### Phase 1: Asset Ingestion & Optimization
1. Create `src/renderer/src/assets/doraemon/` directory.
2. Copy all 15 PNG assets into the project bundle.
3. Add a centralized image registry mapping `OfficeCharacterName` $\rightarrow$ imported asset URL.

### Phase 2: Roster & Metadata Expansion ([`cast.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/cast.ts))
1. Expand `OfficeCharacterName` type union to include all 15 characters:
   ```ts
   export type OfficeCharacterName =
     | 'doraemon' | 'nobita' | 'shizuka' | 'gian' | 'suneo' | 'dorami'
     | 'dekisugi' | 'jaiko' | 'sensei' | 'sewashi' | 'minidora'
     | 'tamako' | 'nobisuke' | 'gianmom' | 'suneomom'
     | 'michael' | 'jim' | 'pam' | 'dwight' | 'kevin' | ...;
   ```
2. Populate `OFFICE_CAST` array with displayName, signature shirt/glow color, and specialized persona blurbs for all 15 characters.

### Phase 3: High-Res UI Avatar Component ([`SpritePortrait.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/components/SpritePortrait.tsx))
1. Update `SpritePortrait.tsx` to detect if an image asset exists for the character.
2. Render high-definition circular / square pixel-framed avatars in:
   * **Add Agent & Edit Agent Modals**
   * **Agent Strip (Active Floor Avatars)**
   * **Command Center Header & Fleet Monitor Cards**
   * **Voice HUD (Realtime Michael / Doraemon)**
   * **Task Kanban Assignment Avatars**
3. Gracefully fall back to procedural canvas generation if an image fails to load.

### Phase 4: Pixi.js 2D Office Floor Sprites ([`cast.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/cast.ts) & [`portraitArt.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/portraitArt.ts))
1. Generate in-scene sprite sheets / textures for all 15 characters with standing, walk-step-left, walk-step-right, and back views.
2. Configure selection glow colors matching each character's palette.

### Phase 5: Briefing Templates & Prompt Catalog ([`AddAgentModal.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/components/AddAgentModal.tsx))
1. Add one-click briefing templates for the expanded characters (e.g. *Gian's Mom - Emergency Circuit Breaker*, *Mini-Dora - Fast Subagent Helper*, *Tamako - Budget Gatekeeper*).

---

## 5. Verification Plan

1. **Typechecking**: Run `npm run typecheck` across Node and Web targets.
2. **Visual Inspection**:
   - Verify that all 15 avatars render crisply in the **Add Agent picker**.
   - Verify that agents spawn and walk on the **2D Office Floor** with correct directional sprites.
   - Verify high-res artwork display in the **Command Center**, **Agent Cards**, and **Task Kanban**.
3. **Regression Testing**: Run `npm run test:focused` to guarantee zero regressions.
