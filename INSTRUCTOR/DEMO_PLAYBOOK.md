# 🎬 Demo Playbooks for Copilot Instructors

Use these playbooks to demonstrate different Copilot features and workflows. Each section is self-contained — pick the ones that fit your audience and time budget.

## 🗺️ Plan Mode

1. Introduce the demo app.
1. Open the agent selector and switch to Plan mode.
1. Point out that Plan mode is just another custom agent. Open its specification and walk through:
    - Tools (read-only tools enabled), especially `vscode/askQuestions`
    - Agents
    - Handoffs
    - Workflow: Explore → Alignment → Design (similar to RPI)
1. Create a plan for a simple feature:
    ```
    Enable users to define the color of each task and change it at any point.
    ```
1. Iterate on the plan together with Copilot.
1. Demonstrate the handoffs.
1. Highlight the benefits of saving the plan as a separate file:
    - You can edit the file directly before implementation begins.
    - You can restart implementation from the same file if the first attempt doesn't work out.

## 🔁 Ralph Loops

1. Walk through the contents of the `ralph` directory:
    1. The script is essentially a simple loop that calls Copilot.
    1. The following parameters can be configured via environment variables:
        - Maximum number of iterations
        - Model
    1. Explain the PRD.
    1. Explain the PROMPT — the brain of the loop, which never changes.
1. Shortcut: skip the planning phase by copying `PRD.md` from TextEdit.
1. Run the loop for a couple of iterations and narrate what is happening.

## 📐 Spec-Driven Development

1. Run `openspec init`.
1. Show the available skills.
1. Explain the basic flow using the exercise file.
1. Run `/opsx-propose` with the prompt:
    ```
    Enable users to define the color of each task and change it at any point.
    ```
1. Walk through the proposal artifacts:
    - `proposal.md` — why and what is changing
    - `specs/` — requirement and scenario delta specs
    - `design.md` — technical approach
    - `tasks.md` — implementation checklist
1. Run `/opsx-apply` (this takes a while).
1. Explain `/opsx-archive`:
    1. The change proposal is moved into a separate archive directory.
    1. The delta becomes part of the official specifications — the source of truth for how the application works.

## 🔌 MCP

### Before you start

1. Delete the database:
    ```bash
    rm backend/data/gantt.json
    ```
1. Restart the server.

### Demo

1. Install Playwright: `npx -y @playwright/mcp@latest`.
1. Open `.vscode/mcp.json`.
1. Walk through the configuration and show the controls above it.
1. Open the tools menu in the chat panel and point out that the Playwright tools are now available.
1. Turn on autopilot, then prompt:
    ```
    Browse to http://localhost:5174/. Edit the chart timeline so that it spans from today until three months from now. Create three tasks: planning (2 weeks), execution (3 weeks), wrap-up (1 week). Place them so each task starts after the previous one ends.
    ```
1. Mention that MCPs can also be installed from the CLI using the `/mcp add` command.
