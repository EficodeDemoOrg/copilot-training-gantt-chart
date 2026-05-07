---
description: "Use when editing the Express + SQLite backend in backend/. Covers route handler style, zod validation, repo/db layering, and ESM import rules."
applyTo: "backend/**"
---

# Backend Instructions

Express 4 + TypeScript (ESM) + `better-sqlite3` + `zod`. Single-process, synchronous SQLite — no async DB layer.

## Layering

- `src/index.ts` — boots the server. Keep it tiny.
- `src/app.ts` — builds the Express app, declares routes, validates input with `zod`, enforces business rules.
- `src/repo.ts` — only place that runs SQL. Exposes a typed `repo` object; converts `snake_case` rows to `camelCase` domain types via `rowToTask`.
- `src/db.ts` — opens the SQLite database, sets pragmas (`journal_mode = WAL`, `foreign_keys = ON`), declares schema with `CREATE TABLE IF NOT EXISTS`, seeds default chart.

Keep these boundaries: route handlers must not run SQL directly, and `repo` must not know about HTTP.

## Routes & validation

- All API routes live under `/api` and return JSON. Use status codes `200`, `201`, `204`, `400`, `404`, `500`.
- Validate every request body with a `zod` schema and `safeParse`. On failure return `res.status(400).json({ error: parsed.error.flatten() })`.
- Validate IDs from `req.params` with `Number.isInteger` before use.
- Dates are ISO `YYYY-MM-DD` strings. Reuse the `isoDate` regex schema. Never accept or return `Date` objects.
- Enforce chart-range invariants in the route layer (see `withinChart`); the repo trusts its inputs.

## Database

- Use synchronous `better-sqlite3` APIs (`db.prepare(...).get/run/all`). Don't introduce async wrappers, ORMs, or migration tools.
- Schema changes go in `src/db.ts` as additive `CREATE TABLE`/`ALTER TABLE IF NOT EXISTS` statements that work against a fresh DB and an existing one.
- Column names are `snake_case`; convert at the repo boundary.

## ESM specifics

- Local imports must include the `.js` extension (e.g. `import { repo } from './repo.js'`) so the compiled output resolves under Node ESM.
- Use `import type` for type-only imports from `express` (`type Request`, `type Response`, `type NextFunction`).
