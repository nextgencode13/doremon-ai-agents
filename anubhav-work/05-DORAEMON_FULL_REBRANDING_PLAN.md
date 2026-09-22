# Doraemon AI Agents — Complete Rebranding & Migration Plan

## 1. Why the Old Stuff Was Still Showing

In the current live UI, you saw:
1. **Window Title & Top-Left Logo**: The Electron window title, HTML `<title>`, and top-left header brand still say **"Munder Difflin"** with the old yellow icon.
2. **Active Agents (Doraemon, Angela, Kelly)**: Munder Difflin persists your active session in local storage (`~/.munder-difflin/` and SQLite). Because those agents were created in previous sessions before the Doraemon conversion, the persisted database reloads them on startup instead of auto-spawning the new Doraemon fleet.
3. **Scranton Office Map**: The 2D floor tileset and map layout are still themed as the Dunder Mifflin paper office.

---

## 2. Complete Rebranding Architecture

```
                               ┌────────────────────────────────────────┐
                               │       DORAEMON AI AGENTS (v0.4.5)      │
                               │        ドラえもん AI エージェント        │
                               └────────────────────────────────────────┘
                                                   │
         ┌─────────────────────────────────────────┼────────────────────────────────────────┐
         ▼                                         ▼                                        ▼
[1. Full Brand & UI Overhaul]              [2. Fleet Auto-Migration]              [3. 2D Floor Re-Theming]
• App Name: "Doraemon AI Agents"           • Instant "Transform Fleet" button     • Sky-Blue & 22nd Century palette
• Top Bar Logo: Doraemon / Bell mark       • Starter Fleet Auto-Spawn:            • Anywhere Door (🚪) exit warp
• Window Title: "Doraemon AI Agents"         - Doraemon (Command Center & God)    • Time Machine (⏳) gadget corner
• Package / App metadata rebranding          - Nobita (Rapid Prototyper)          • 4D Pocket Workbench for Doraemon
                                             - Shizuka (Docs & QA)
                                             - Gian (Heavy Refactor)
                                             - Suneo (APIs & Integrations)
                                             - Dorami (Safety Watchdog)
```

---

## 3. Detailed Implementation Plan

### Step 1: Complete App Title & Brand Rebranding
* **[`src/renderer/index.html`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/index.html)**:
  * Update `<title>` from `Munder Difflin` to `Doraemon AI Agents`.
* **[`src/renderer/src/App.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/App.tsx)**:
  * Replace the top-left logo and title with **Doraemon's icon** and title **"DORAEMON AI AGENTS"** (with glowing **4D POCKET** badge).
  * Update header subtitle and tooltips.
* **[`src/main/index.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/main/index.ts)**:
  * Update native window title from `Munder Difflin` to `Doraemon AI Agents`.
  * Update about dialogs and tray menu labels.
* **[`electron-builder.yml`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/electron-builder.yml) & [`package.json`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/package.json)**:
  * Update `productName` to `Doraemon AI Agents`.

---

### Step 2: One-Click Fleet Transformation & Default Roster Migration
* **Add a "Transform to Doraemon Fleet" Quick-Action**:
  * In the top bar and Settings modal, add a one-click button: **"Switch to Doraemon Squad (ドラえもん隊)"**.
  * When clicked (or on first clean launch), it converts existing persisted agents into:
    * `Doraemon (God)` $\rightarrow$ **Doraemon** (Command Center & 4D Gadget Orchestrator)
    * `Angela` $\rightarrow$ **Shizuka** (Docs & QA)
    * `Kelly` $\rightarrow$ **Nobita** (Rapid Prototyper)
    * Spawns **Gian**, **Suneo**, and **Dorami** if desired.
* **Update Store Defaults ([`store.ts`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/store/store.ts))**:
  * Ensure default God agent character is `doraemon` and worker character is `nobita`.

---

### Step 3: Doraemon 2D Floor Re-Theming ([`OfficeFloor.tsx`](file:///c:/Users/anubh/Desktop/2026/August/munder-difflin/src/renderer/src/scene/office/OfficeFloor.tsx))
* **22nd-Century Gadget Room Theme**:
  * Re-theme the floor carpet and walls to Doraemon Sky-Blue (`#e8f4fd`), Tatami Warm Green, and futuristic metallic tones.
  * Re-label interactive furniture anchors:
    * Boss Desk $\rightarrow$ **Doraemon's 4D Command Desk**
    * Conference Room $\rightarrow$ **Future Gadget Lab (ひみつ道具研究室)**
    * Exit Door $\rightarrow$ **Anywhere Door (どこでもドア)**
    * Break Room / Coffee $\rightarrow$ **Dorayaki & Tea Station (どら焼きカフェ)**

---

### Step 4: High-Res Authentic Avatars in All Views
* Verify that `SpritePortrait.tsx` displays the real high-definition Doraemon character PNGs in:
  1. The bottom agent card strip (replacing old pixel faces with high-res Doraemon art).
  2. The active terminal header.
  3. The top status bar.
  4. The Command Center fleet monitor.

---

## 4. Verification & Testing

1. **Clean State Validation**:
   - Trigger the one-click fleet transformer and verify that bottom cards immediately switch from Doraemon/Angela/Kelly to **Doraemon**, **Nobita**, **Shizuka**, **Gian**, etc.
2. **Visual Inspection**:
   - Verify top-left brand says **"Doraemon AI Agents"** with Doraemon icon.
   - Verify window title is **"Doraemon AI Agents"**.
   - Verify all 15 characters display authentic PNG illustrations.
3. **Build & Test**:
   - Run `npm run typecheck` (zero TypeScript errors).
   - Run `npm test` (all unit tests pass).
