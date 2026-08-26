# How to Run & Develop Munder Difflin

This guide outlines the system prerequisites, installation steps, development commands, build processes, and troubleshooting tips for **Munder Difflin**.

---

## 1. Prerequisites

### A. Core Runtime & Tools
* **Node.js**: v18.0.0 or higher (v20+ / v22+ recommended).
* **Package Manager**: `npm` (bundled with Node.js).
* **Git**: Installed and available in your system `PATH`.

### B. Native C/C++ Build Toolchain
Munder Difflin relies on native C++ Node addons (`node-pty` for terminal emulation and `better-sqlite3` for local state storage). A C/C++ compiler is required to build them:

* **Windows**:
  * Install Visual Studio Build Tools with the **Desktop development with C++** workload or run PowerShell as Administrator:
    ```powershell
    npm install --global --production windows-build-tools
    ```
  * Ensure Python (3.10+) is installed and on your `PATH`.
* **macOS**:
  * Install the Xcode Command Line Tools:
    ```bash
    xcode-select --install
    ```
* **Linux (Debian/Ubuntu)**:
  * Install essential build tools and Python:
    ```bash
    sudo apt-get update
    sudo apt-get install -y build-essential python3 make g++ libsecret-1-dev
    ```

### C. Agent CLIs (Optional but Recommended)
Install the CLI coding agents you intend to run in the harness:
* **Claude Code**: `npm install -g @anthropic-ai/claude-code`
* **Google Antigravity / Gemini CLI (`agy`)**: If using Antigravity agents
* **OpenAI Codex / Grok / OpenCode / Qwen / Copilot CLI**: Any CLI agent accessible via your terminal `PATH`

---

## 2. Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chaitanyagiri/munder-difflin.git
   cd munder-difflin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   > [!NOTE]
   > The `postinstall` script will automatically trigger `electron-rebuild -f`, compile native modules against Electron's ABI, and patch `node-pty` permissions and ConPTY shims.

---

## 3. Running in Development Mode

Start the live-reloading development environment (powered by `electron-vite`):

```bash
npm run dev
```

* This spins up Vite for the renderer (`localhost:5173`) and launches the Electron application window.
* Changes to React components (`src/renderer/`) support Hot Module Replacement (HMR).
* Changes to the main process (`src/main/`) or preload (`src/preload/`) will automatically restart the Electron shell.

---

## 4. Verification & Testing

Before committing changes or building binaries:

### Typechecking
Run TypeScript type validation across both Node and Web contexts:
```bash
npm run typecheck
# Or separately:
npm run typecheck:node
npm run typecheck:web
```

### Running Unit & Integration Tests
Execute the Node test runner on focused test suites:
```bash
npm run test:focused
```

---

## 5. Building & Packaging

To compile assets and produce standalone distributables:

### Build Assets Only
```bash
npm run build
```

### Create Standalone Platform Installers (Electron Builder)
* **Windows** (`.exe` / portable):
  ```bash
  npm run dist:win
  ```
* **macOS** (`.dmg` / `.zip`):
  ```bash
  npm run dist:mac
  ```
* **Linux** (`.AppImage` / `.deb`):
  ```bash
  npm run dist:linux
  ```

Packaged installers and executables are output to the `dist/` directory.

---

## 6. Common Troubleshooting & FAQs

### Q1: `NODE_MODULE_VERSION` / `Wrong ELF/Mach-O` error on launch
* **Cause**: `node-pty` or `better-sqlite3` was compiled for the host Node.js ABI instead of Electron's embedded Node runtime ABI.
* **Fix**: Force a native rebuild by running:
  ```bash
  npx @electron/rebuild -f -w node-pty,better-sqlite3
  ```

### Q2: PTY crashes or terminal input unresponsive on Windows
* **Cause**: ConPTY driver initialization issue or missing helper DLL permissions.
* **Fix**: Run the included patch script:
  ```bash
  node tools/patch-node-pty-conpty.cjs
  node tools/ensure-pty-perms.cjs
  ```

### Q3: Missing API keys for Voice / Free Flow
* **Solution**: In the app, open **Settings $\rightarrow$ Secret Broker** and supply your Groq or OpenAI API key.
