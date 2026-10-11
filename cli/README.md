<div align="center">
  <img src="https://raw.githubusercontent.com/Badroel07/9router/master/images/9router.png?1" alt="67Router Dashboard" width="800"/>

  # 67Router - High-Performance AI Router, Token Saver & Agent Skills Hub

  **Enhanced & Hardened Fork of 9Router • Never stop coding. Save 20-40% tokens with RTK + auto-fallback to FREE & cheap AI models.**

  **Connect All AI Code Tools (Claude Code, Cursor, Antigravity, Copilot, Codex, Gemini, OpenCode, Cline, OpenClaw...) to 40+ AI Providers & 100+ Models.**

  [![npm](https://img.shields.io/npm/v/67router.svg)](https://www.npmjs.com/package/67router)
  [![Downloads](https://img.shields.io/npm/dm/67router.svg)](https://www.npmjs.com/package/67router)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Badroel07/9router/blob/master/LICENSE)
  [![GitHub Repository](https://img.shields.io/badge/GitHub-Badroel07%2F9router-orange?logo=github)](https://github.com/Badroel07/9router)
  [![Upstream](https://img.shields.io/badge/Upstream-decolua%2F9router-lightgrey?logo=github)](https://github.com/decolua/9router)

</div>

---

## ⚡ Quick Start

### 1. Install & Run CLI (Recommended for Desktop)

```bash
# Install globally
npm install -g 67router

# Launch 67Router
67router

# Or run directly without permanent install
npx 67router
```
*(Note: `9router` is provided as an alias command for seamless backwards compatibility)*

🎉 Dashboard opens at `http://localhost:20128/dashboard`

---

### 2. Connect a FREE Provider (No Signup Needed)

1. Open **Dashboard** → **Providers**
2. Click **Connect Kiro AI** (unlimited Claude) or **OpenCode Free** (no auth required) → Done!

---

### 3. Use in Your AI Coding Tools

```text
Claude Code / Codex / OpenClaw / Cursor / Cline / Antigravity Settings:
  Endpoint: http://localhost:20128/v1
  API Key:  [copy from dashboard]
  Model:    kr/claude-sonnet-4.5
```

That's it! Start coding with FREE AI models with zero token waste.

---

## 🔍 Key Highlights & Upgrades in 67Router

- 🛡️ **Zero-Vulnerability Security Architecture**:
  Completely purged legacy `node-forge` vulnerability (GHSA-86w9-cpqp-85rv). Built on modern `selfsigned` and Node.js native `crypto.X509Certificate` with asynchronous SNI queue promise memoization. `npm audit` yields **0 vulnerabilities**.
- 🚀 **RTK Token Saver**:
  Compresses tool results (`git diff`, `grep`, test outputs) automatically to slash prompt token usage by 20–40% per request.
- 🤖 **Agent Skills Hub & `@antislop-code` Comment Hygiene**:
  Eliminates repetitive and low-value AI comment slop (decorative headers, step narration) while retaining vital architectural rationale and security considerations.
- 🔄 **Automated OpenCode Full Model Discovery**:
  One-click fetching of all models, automatically detecting context windows, maximum output limits, and multimodal vision parameters into compliant schemas.
- 💎 **Monolithic Luxury Design System**:
  Refined high-contrast dark theme with Momo Trust Sans typography, champagne bronze accents, and pixel-perfect `h-[69px]` header and sidebar alignment.
- 🪟 **Resilient Windows System Tray & Background Recovery**:
  Non-blocking background IPC with zero UI-thread freeze and universal crash recovery in system tray mode.

---

## 🚀 CLI Options

```bash
67router                    # Start with default settings (port 20128)
67router --port 8080        # Custom port
67router --host 127.0.0.1   # Bind to local loopback only
67router --no-browser       # Don't open browser automatically
67router --log              # Show server logs in console
67router --tray             # Run directly in system tray mode
67router --skip-update      # Skip auto-update check
67router --help             # Show all options
```

---

## 🔌 Connect to a Remote 67Router

Already running 67Router on another machine (e.g. VPS or LAN server)? Point this machine's CLI tools to it without starting a local server:

```bash
npx 67router connect http://<server-host>:20128                       # interactive tool picker
npx 67router connect http://<server-host>:20128 --tools claude,codex  # specify tools directly
npx 67router connect --reset --tools claude,codex                     # revert configuration
```

Supported tools: `claude`, `codex`, `opencode`, `droid`, `crush`, `kilo`, `cline`, `pi`, `omp`, or `all`.

### Check Active CLI Tool Configuration

```bash
npx 67router show                 # inspect all configured tools
npx 67router show claude          # inspect single tool
npx 67router show claude --json   # output JSON format
```

---

## 🛠️ Supported AI Coding Tools

Claude-Code • OpenClaw • Codex • OpenCode • Cursor • Antigravity • Cline • Continue • Droid • Roo • Copilot • Kilo Code • Gemini CLI • Qwen Code • iFlow • Crush • Crusher • Aider

Any client supporting standard OpenAI or Anthropic Claude API endpoints works seamlessly.

---

## 💾 Data & Configuration Location

- **macOS / Linux**: `~/.67router/db/data.sqlite` (fallback: `~/.9router/`)
- **Windows**: `%APPDATA%\67router\db\data.sqlite` (fallback: `%APPDATA%\9router\`)

---

## 📚 Resources & Documentation

- **GitHub Repository**: [https://github.com/Badroel07/9router](https://github.com/Badroel07/9router)
- **Upstream Repository**: [https://github.com/decolua/9router](https://github.com/decolua/9router)
- **Original Go Implementation**: [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)

---

## 📄 License

MIT License — see [LICENSE](https://github.com/Badroel07/9router/blob/master/LICENSE) for details.
