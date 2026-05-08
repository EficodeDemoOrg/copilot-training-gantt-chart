# 🤖 GitHub Copilot Exercises

This repository is a hands-on playground for **GitHub Copilot exercises**.

The exercises live in the [EXERCISES](EXERCISES/) directory:

- [MCP Exercises](EXERCISES/MCP_EXERCISES.md)
- [Plan Agent Exercises](EXERCISES/PLAN_AGENT_EXERCISES.md)
- [Ralph Loop Exercise](EXERCISES/RALPH_LOOP_EXERCISE.md)
- [Spec-Driven Development Exercises](EXERCISES/SPEC_DRIVEN_DEV_EXERCISES.md)

The exercises are performed against the small full-stack **Gantt chart application** included in this repo. The app is intentionally simple so you can focus on practicing Copilot workflows rather than learning a complex codebase.

> No prior knowledge of TypeScript or Node.js is required for the exercises.

---

# 📊 The Gantt Chart App

A full-stack Gantt chart app for planning and tracking tasks across time, used as the playground for the exercises above.

## 🛠️ Technology stack

- 🎨 **Frontend**: React + TypeScript + Vite
- ⚙️ **Backend**: Express + TypeScript
- 💾 **Storage**: JSON file via `lowdb` (single-file DB)

## ✅ Requirements

- Node.js **20+**

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

The Vite dev server proxies `/api` requests to the backend at http://localhost:3000.

## 📁 Project layout

```
backend/   Express + lowdb REST API
frontend/  Vite + React UI
```

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
