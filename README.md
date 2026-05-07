# 📊 Gantt Chart

A minimal full-stack Gantt chart app for planning and tracking tasks across time.

- 🎨 **Frontend**: React + TypeScript + Vite
- ⚙️ **Backend**: Express + TypeScript
- 💾 **Storage**: SQLite via `better-sqlite3` (single-file DB, no server, no Docker)

## ✅ Requirements

- Node.js **20+**

## 🚀 Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

The Vite dev server proxies `/api` requests to the backend at http://localhost:3000.

## 📜 Scripts

- `npm run dev` — runs backend and frontend concurrently
- `npm run build` — builds both packages
- `npm run start` — starts the built backend (serves the API only)

## 🧪 Tests

Backend unit tests use [Vitest](https://vitest.dev/):

```bash
npm test -w backend           # run once
npm run test:watch -w backend # watch mode
```

## 🗑️ Resetting the data

The database lives at `backend/data/gantt.db`. Delete that file to start fresh; the backend will recreate the schema and a default chart on the next start.

## 🛠️ Troubleshooting `better-sqlite3`

`better-sqlite3` ships prebuilt native binaries for common platforms. If `npm install` fails to find a prebuilt binary for your system, you may need a C/C++ toolchain:

- **macOS**: `xcode-select --install`
- **Linux**: install `build-essential` (Debian/Ubuntu) or equivalent
- **Windows**: install the "Desktop development with C++" workload from Visual Studio Build Tools

## 📁 Project layout

```
backend/   Express + SQLite REST API
frontend/  Vite + React UI
```
