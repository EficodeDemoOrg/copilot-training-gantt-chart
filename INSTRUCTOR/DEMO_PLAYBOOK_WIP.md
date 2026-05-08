# 🎬 Demo Playbook 2

## 📝 Custom Instructions

1. Open the `gant-chart-copilot` project, which ships with custom instructions in several locations under `.github/`.
2. Walk through the different custom instruction files and explain what each one does:
    - `.github/copilot-instructions.md` — repository-wide guidance
    - `.github/instructions/backend.instructions.md` — backend-scoped guidance via `applyTo: backend/**`
    - `.github/instructions/frontend.instructions.md` — frontend-scoped guidance via `applyTo: frontend/**`
3. Discuss the level of granularity each file offers, and when to choose one over another.
4. Show how to scaffold instruction files automatically inside VS Code:
    - Run `/create-instructions` to generate Python coding guidelines
    - Use the gear-wheel menu as an alternative entry point

## 🛠️ Skills

1. Show where skills live in VS Code and how they are discovered. Point out the existing `.github/skills/conventional-commits/` skill as a reference.
2. Create a skill from scratch, by hand:
    - Add a new folder `.github/skills/ts-function-docs/` and drop a `SKILL.md` into it (use the `conventional-commits` skill as a template)
    - Demonstrate that the skill can now be invoked as a slash command
    - Use it to generate documentation for `getChart` in `backend/src/repo.ts`
3. Create a skill with the built-in helper:
    - Run `/create-skill` and ask it to scaffold a REST API endpoint security review skill (handy given the Express routes in `backend/src/app.ts`)
4. Demonstrate skill discovery via `gh skill search refactor`.

## 🤖 Custom Agents

1. Note that this repo does not ship a custom agent yet — a perfect excuse to build one.
2. Build a silly custom agent from scratch — *the snobbish taunter*:
    - Tab-complete the frontmatter and instructions to assemble it quickly
    - Show that the new agent appears in the VS Code agent menu
    - Run a short prompt against it to demonstrate the persona
3. Scaffold a more useful agent using the `create-agent` skill:
    - `/create-agent Create an agent specialized in writing Pulumi-based IaC scripts according to industry best practices.`
4. Tour the awesome-copilot repository for community-contributed agents.
5. Show how organization-wide skills are surfaced in the editor.

## 💻 Copilot CLI

1. Open the Copilot CLI inside the `gant-chart-copilot` project.
2. Run a simple prompt: *"Summarize this project"*.
3. Show the **experimental features** slash command and what it unlocks.
4. Tour the available slash commands and explain a few key ones: `/ask`, `/plan`, `/model`, `/fleet`.
5. Demonstrate that the CLI is connected to the IDE:
    - Select some code in `frontend/src/components/GanttChart.tsx` and show that the CLI sees the selection
    - Ask the CLI to refactor the selection, then walk through the resulting diff
6. Show that custom agents are also selectable from the CLI.
7. Quit the CLI and explain how prompts can be piped in non-interactively.
8. Run a piped prompt with `--model`, `--autopilot`, and `--allow-all`:
    ```bash
    copilot --model claude-haiku-4.5 --autopilot --allow-all \
      -p "Add a CSV export endpoint to the Gantt backend that returns all tasks for the current chart."
    ```
9. Demonstrate worktree isolation:
    - In the **Delegate Session** menu, pick *Copilot CLI*
    - Enable *Worktree isolation*
    - Select a snippet and prompt *"Refactor this code"*
    - Confirm that a new worktree was created with `git worktree list`
    - Show the worktree on the filesystem (e.g. `cd ../gant-chart-copilot.worktrees/...`)
    - Once the run finishes, point out the dedicated branch that was created
    - Inspect the changes in the terminal with `git diff`
