# Plan: Task Dependencies (Finish-to-Start)

Add finish-to-start task dependencies to the Gantt app. Each task gets an optional list of predecessor task IDs. The backend validates dependencies (no cycles, no self-link, predecessor exists) and, on a task move, cascades **forward-only** shifts to dependents (preserving duration). If any cascaded dependent would exceed the chart end date, the entire PATCH is rejected (400) and the frontend reverts. The frontend renders SVG arrows from each predecessor's right edge to its dependent's left edge, and lets users create a dependency by dragging a handle on a bar's right edge onto another bar. Drops onto the source itself, the same bar, an existing predecessor (duplicate), or any task that would form a cycle are rejected client-side with a brief visual cue.

This plan targets the Ralph loop: each task is a single, verifiable step that builds on prior ones.

## PRD Tasks (paste into ralph/PRD.md)

- [ ] Add `dependencies: number[]` to backend `Task` type and migrate existing rows in `db.ts` to default to `[]` on load
- [ ] Add `dependencies: number[]` to frontend `Task` type in `frontend/src/types.ts` (keep in sync with backend)
- [ ] Add a `dependencies` repo helper in `backend/src/repo.ts`: `setDependencies(id, deps)` and include `dependencies` in returned tasks
- [ ] Add a pure helper module `backend/src/dependencies.ts` with: `wouldCreateCycle(tasks, fromId, toId)`, `topoOrder(tasks)`, and `cascadeShift(tasks, movedId)` returning the updated task list (forward-only, preserves duration); cover with unit tests in `backend/src/dependencies.test.ts`
- [ ] Extend `PATCH /api/tasks/:id` zod schema to accept optional `dependencies: number[]`; validate that ids exist, no self-reference, and adding them creates no cycle; return 400 with a clear message otherwise
- [ ] Apply forward-only cascade in `PATCH /api/tasks/:id` after a date change: compute shifted dependents via `cascadeShift`; if any would exceed `chart.endDate`, reject with 400 and do not persist; otherwise persist all updates and return the full updated chart instead of a single task
- [ ] Update frontend `api.updateTask` and `useChart.updateTask` to accept the chart-shaped response and replace the whole `tasks` array (keep optimistic update for the directly edited task only)
- [ ] Add `setDependencies(taskId, deps)` to `frontend/src/api/client.ts` and `useChart` (calls `PATCH /api/tasks/:id` with `{ dependencies }`); on 400, surface the error and refresh
- [ ] Render dependency arrows as a single SVG overlay inside the chart body in `GanttChart.tsx`: for each task, draw an L-shaped path from each predecessor's right edge (end-of-day) to that task's left edge (start-of-day), accounting for row index and `DAY_WIDTH`
- [ ] Add a "link" handle on the right edge of `TaskBar` (separate from the resize handle) that, when dragged, shows a temporary SVG line following the cursor across rows
- [ ] On drop of the link handle onto another `TaskBar`, call `setDependencies(targetId, [...existing, sourceId])`; reject drops that are: same task, duplicate, or would create a cycle (computed client-side using current chart state) with a brief shake/flash on the target
- [ ] Add a way to remove a dependency: clicking an arrow selects it and shows a small "×" affordance that calls `setDependencies(targetId, deps.filter(id => id !== sourceId))`
- [ ] Constrain `TaskBar` drag/resize so the dragged bar cannot start earlier than `max(predecessor.endDate)+1`; clamp during `move`, and on `end` rely on backend to also enforce
- [ ] When a successful PATCH cascades dependents, the chart re-renders with the server response so dependents visibly shift; verify arrows update too
- [ ] Add a brief section to `README.md` documenting the new dependency model, the API change (PATCH returns the chart), and the UI gestures

## Relevant Files

- [backend/src/db.ts](backend/src/db.ts) — extend `Task` with `dependencies`, migrate existing rows on load (default `[]`)
- [backend/src/repo.ts](backend/src/repo.ts) — re-export updated `Task`, add `setDependencies`
- [backend/src/app.ts](backend/src/app.ts) — extend `updateTaskSchema`, integrate cycle check + cascade, change PATCH response shape to `Chart`
- [backend/src/dependencies.ts](backend/src/dependencies.ts) — new pure module: cycle detection, topo order, forward-only cascade
- [backend/src/dependencies.test.ts](backend/src/dependencies.test.ts) — new unit tests (mirror style of `validation.test.ts`)
- [frontend/src/types.ts](frontend/src/types.ts) — add `dependencies` to `Task`
- [frontend/src/api/client.ts](frontend/src/api/client.ts) — `updateTask` returns `Chart`; add `setDependencies`
- [frontend/src/hooks/useChart.ts](frontend/src/hooks/useChart.ts) — handle chart-shaped PATCH response, add `setDependencies`, revert on 400
- [frontend/src/components/GanttChart.tsx](frontend/src/components/GanttChart.tsx) — SVG arrows overlay, render link interactions across rows
- [frontend/src/components/TaskBar.tsx](frontend/src/components/TaskBar.tsx) — link handle, draggable line, drop target, predecessor-based drag clamp
- [frontend/src/styles.css](frontend/src/styles.css) — styles for link handle, arrows, error/shake state
- [README.md](README.md) — short docs update

## Verification

1. `npm run build` succeeds at the repo root after each PRD step.
2. `npm test -w backend` (or the existing test runner used by `validation.test.ts`) passes, including new `dependencies.test.ts` covering: self-link rejected, cycle rejected, multi-level cascade shifts dependents, cascade exceeding `chart.endDate` rejected.
3. Manual: in `npm run dev`, create two tasks A→B; drag A later → B shifts forward by the same delta; arrow re-renders. Move B earlier than A's end+1 → reverts. Try to create A→B then B→A → second link rejected. Delete a dependency by clicking the arrow.
4. Manual: delete `backend/data/gantt.json`, restart; default chart loads, all tasks have `dependencies: []`.

## Decisions

- Predecessor list lives on the **dependent** task (`task.dependencies = [predecessorId, ...]`). Simpler queries: "who blocks me".
- Cascade is **forward-only**: dependents shift later only when needed (predecessor.end ≥ dependent.start). They never auto-pull back.
- Cascade is **server-side** inside `PATCH /api/tasks/:id`. Response shape changes to the full `Chart` so the frontend can replace all affected tasks atomically.
- If cascade would push a dependent past `chart.endDate`, the entire PATCH is rejected (400, no partial writes). Frontend reverts via `refresh()`.
- Dependency creation UI: drag a dedicated link handle on the right edge of a bar onto another bar (separate from the resize handle to avoid mode confusion).
- Out of scope: lag/lead, other dependency types (SS/FF/SF), bulk import, undo, keyboard-only creation.
