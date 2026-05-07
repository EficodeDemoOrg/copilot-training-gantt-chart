# 📋 Spec-Driven Development with OpenSpec

OpenSpec is a lightweight, AI-friendly workflow that captures proposed changes as versioned spec documents (proposal, deltas, tasks). The assistant reads these documents, implements against them, and then archives them — keeping intent, code, and history in sync.

## 🛠️ Installing OpenSpec

1. Install OpenSpec globally:
    ```bash
    npm install -g @fission-ai/openspec@latest
    ```
2. Initialize OpenSpec in this repository:
    ```bash
    cd copilot-training-gantt-chart
    openspec init
    ```
3. Select GitHub Copilot from the menu.
4. Inspect the `.github/prompts` and `.github/skills` directories. You should see the OpenSpec tools listed there.
5. Without executing any commands, verify that the OpenSpec slash commands are available in chat by typing `/opsx-` and checking that the commands appear in the suggestion list.

## 🔄 The Default OpenSpec Workflow

OpenSpec offers two modes:
1. The default "quick path".
2. Expanded mode, which provides more granular workflows and additional tools.

In this exercise we use the default mode, where the workflow typically looks like this:

```
/opsx-propose ──► /opsx-apply ──► /opsx-archive
```

For details, see the [official documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md).

## 🎯 Exercises

Let's use OpenSpec to specify and implement a feature that lets users add milestones to a chart.

1. Start by creating a proposal for the new feature:
    ```
    /opsx-propose The user can add milestones to the Gantt chart. A milestone is a zero-duration marker representing a key event (release, deadline, sign-off) rather than a span of work. It is rendered as a diamond marker, and hovering over it reveals a label with the milestone title.
    ```
2. Once `/opsx-propose` finishes, a new directory will appear under `openspec/changes`, likely named `add-milestones` or similar. Open `add-milestones/specs/milestones/spec.md` (the exact directory names may differ). This is the *delta spec* — a description of what is changing. Note the other files as well:
    - `proposal.md` — the "why" and "what": intent, scope, and approach.
    - `design.md` — the "how": technical approach and architecture decisions.
    - `tasks.md` — the implementation checklist with checkboxes.
3. At this point, review the design documents and make any necessary changes, either manually or with Copilot's assistance.
4. Apply the changes:
    ```
    /opsx-apply
    ```
    This starts the implementation based on the specs.
5. When the implementation finishes, verify the result in the browser.
6. Once you are satisfied with the implementation, archive the change:
    ```
    /opsx-archive
    ```
    Choose "sync now" when prompted.
7. Inspect the `openspec/specs` directory. The delta specs should now be part of the official specification — the source of truth for how the system works.
