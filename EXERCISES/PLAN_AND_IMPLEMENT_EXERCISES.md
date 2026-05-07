# Copilot Advanced Training - Session 2 Exercises 🚀


## Plan Mode

In this exercise we use Copilot CLI's **Plan mode** to design a feature, then use the experimental **rubber-duck** agent to get a second-opinion critique on the plan from a different model. Only after revising the plan based on that feedback do we let Copilot implement it.

The feature we'll plan and build is **task reordering by drag-and-drop**.

### Why rubber-duck?

The rubber-duck agent (added in Copilot CLI 1.0.42, available behind `/experimental`) reviews the current plan with a *complementary model* from a different model family.

### Steps

1. Make sure you have the latest Copilot CLI:
    ```bash
    copilot --version
    copilot update   # or: npm i -g @github/copilot@latest
    ```

1. From the repo root, launch the CLI:
    ```bash
    copilot
    ```

1. Enable experimental features (this unlocks the rubber-duck / critic agent):
    ```
    /experimental on
    ```
    The CLI restarts automatically. Run `/experimental` afterwards to confirm the feature list.

1. Enter Plan mode and describe the feature. Either press `Shift+Tab` until the mode indicator shows **Plan**, or use the slash command in one go:
    ```
    /plan Enable reordering tasks within a chart by dragging task rows vertically.
    ```
    Plan mode will analyze the codebase, ask clarifying questions, and produce a structured plan instead of writing code.

1. Answer any clarifying questions Copilot may asks.

1. **Do not accept the plan yet.** When the plan approval menu appears, dismiss it (Esc) so the plan stays in context for review.

1. Ask Copilot to critique the plan. This is the step that triggers the rubber-duck / critic review:
    ```
    Critique this plan with the rubber-duck agent.
    ```
    A complementary model now reviews the plan and reports its findings inline. Read the critique carefully.

1. Revise the plan based on the critique. For example:
    ```
    Update the plan to address the rubber-duck feedback. Specifically: <one or two of the most useful points from the critique, in your own words>.
    ```
    You can iterate: critique again, revise again, until the plan looks solid.

1. Once you're happy, accept the plan from the approval menu (or press `Ctrl+Y` to edit it in your terminal editor first). Continue implementation in the same session, or restart in autopilot for hands-off execution:
    ```bash
    copilot --autopilot --allow-all --max-autopilot-continues 10
    ```
    Then:
    ```
    Implement the approved plan that's saved in this session's memory.
    ```

1. After Copilot finishes, verify manually:
    ```bash
    npm run dev
    ```
    Try dragging tasks vertically in the chart, refresh the browser, and confirm the new order persists. Run the tests:
    ```bash
    npm test -w backend
    ```

### Reflection

- Did the rubber-duck critique surface anything your initial plan missed?
- How did the revised plan compare to the original in terms of completeness and risk?
- Was the implementation closer to "first try works" because of the planning round?




### Creating a simple app using the Plan and Agent modes
This exercise is completed using GitHub Copilot CLI. You can also use VS Code or another IDE that supports Plan mode and Autopilot.

1. Start in an empty folder and initialize a repository:
    ```bash
    git init
    ```
1. Start Copilot cli in the "allow all" mode
    ```bash
    copilot --allow-all
    or
    copilot --yolo
    ```
1. Ask Copilot (Agent mode) to generate project-level instructions. For example:
    ```text
    Add custom instructions in the file @.github/copilot-instructions.md for my new application. The application is a web app for organizing ToDo items, implemented with TypeScript and Vite, and ToDo items are stored in local storage. Include at least the sections "Application purpose and scope", "Technology stack", and "Coding practices".
    ```
1. Create a first implementation plan in Plan mode:
    ```text
    /plan A simple web application for managing ToDo items.
    ```
1. Since the initial prompt is intentionally vague, Plan mode will prompt you to answer detailed questions about implementation requirements. Address all questions thoroughly.
1. When prompted to accept the plan, review the generated plan and identify one or two improvements.
1. Ask Copilot to revise the plan. Example changes:
    - ToDo categorization (for example: priority, status, or tags)
    - Storage strategy (for example: in-memory, session storage, or local storage)
1. When you're happy with the plan, carry on with implementation in *autopilot mode* and *allow all* approvals.

1. Alternatively exit Copilot CLI 
    ```
    /exit
    ```
1. And restart it in Autopilot mode:
    ```bash
    copilot --autopilot --allow-all --max-autopilot-continues 10
    ```
1. Ask Copilot to implement the plan, which should be saved in the session memory.

Autopilot mode with the `--allow-all` flag enables Copilot to automatically approve all tool, path, and URL requests, make additional LLM requests, and make autonomous decisions at decision points rather than requesting developer input, continuing until the entire plan is fully implemented.

## Advanced Planning Techniques

### Ralph
Next let's build a Ralph loop to iterate over a product requirements document, each iteration performed in a fresh Copilot session.
- Create a plan for a feature. Specify a sepcific format in the the plan mode that suit Ralph Loops well. 
- Use a Ralph loop (inlcuded in the repo) to implement the plan.

### OpenSpec
- Install OpenSpec
- Explain that we are using the simple/default workflow of OpenSpec.
- Ask user to 

## MCP

### PalyWright MCP exercise
- Setup playwright MCP
- Make a prompt that uses google: make a search, return the first link on the page

### GitHub MCP exercise
- Setup the GitHub MCP server
- Make a prompt that fetches all pull requests that the user currenlty has open

### MPC + Skills Exercise
- Create a new Skill call "what should I work on next?". Specs of the Skill:
    - The skill must use GitHub MCP to retrieve issues and PRs assigned to the user
    - First the skil gets all open issues and PRs assigned to the user in this repository
    - If there are PRs assigned to the user, they should first review them before doing anythng else
    - If there are no PRs, check the issues. High priority issues should be done first. If there are multiple high-priority issues, then the oldest should get the presedence.
    - based on thsi logig, give the user instructions on what to work on next.
- Create a skill using /create-skill or manually
- Test that the skill works

