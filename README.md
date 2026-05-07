# 📊 Gantt Chart

A minimal full-stack Gantt chart app for planning and tracking tasks across time.

- 🎨 **Frontend**: React + TypeScript + Vite
- ⚙️ **Backend**: Express + TypeScript
- 💾 **Storage**: JSON file via `lowdb` (single-file DB, no server, no Docker, no native build)

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

The database lives at `backend/data/gantt.json`. Delete that file to start fresh; the backend will recreate it with a default chart on the next start.

## 📁 Project layout

```
backend/   Express + lowdb REST API
frontend/  Vite + React UI
```
