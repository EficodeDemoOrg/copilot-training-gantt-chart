# 🧩 MCP Exercises

## 🎭 Playwright MCP Setup

Playwright is a testing framework that enables browser automation. With the Playwright MCP and the tools it exposes, Copilot can open a browser, navigate to any website, and interact with it just like a human user.

Let's start by setting up the MCP server.

### 💻 Playwright MCP setup in Copilot CLI

1. Open the Copilot CLI.
1. Check which MCP servers are already running:
    ```
    /mcp show
    ```
1. Press `esc` to exit, then add a new MCP server:
    ```
    /mcp add playwright
    ```
1. Fill in the form in the CLI:
    - Server name: `playwright`
    - Command: `npx -y @playwright/mcp@latest`
    - Environment Variables: leave empty
    - Tools: `*`

   Press `ctrl+s` to save the changes.
1. Verify the server is running with `/mcp show`.
1. Check your local MCP configuration file:
    ```bash
    cat ~/.copilot/mcp-config.json
    ```
    It should look like this:
    ```json
    {
        "mcpServers": {
            "playwright": {
            "type": "local",
            "command": "npx",
            "tools": [
                "*"
            ],
            "args": [
                "-y",
                "@playwright/mcp@latest"
            ]
            }
        }
    }
    ```

### 🆚 Playwright MCP setup in VS Code

1. Open the command palette (`shift + command/ctrl + P`).
1. Type "MCP add" and select **MCP: Add Server...**.
1. Select the **Command (stdio)** option from the list.
1. When prompted for the command, enter `npx -y @playwright/mcp@latest`.
1. Press enter when prompted for the server ID.
1. Verify that the file `.vscode/mcp.json` was created and open it. Its contents should look like this:
    ```json
    {
        "servers": {
            "my-mcp-server-ee630b18": {
                "type": "stdio",
                "command": "npx",
                "args": [
                    "-y",
                    "@playwright/mcp@latest"
                ]
            }
        },
        "inputs": []
    }
    ```
1. Notice the inline controls above the server definition in the JSON file. Use them to start, stop, and restart the server.
1. Check the tools menu in Copilot Chat. Can you see Playwright and all of its tools?

## 💬 Playwright MCP Server Prompting

Now let's try some prompts that use the browser tools provided by the MCP server.

1. Make sure both the Playwright MCP and the exercise application are up and running.
1. In either Copilot CLI or VS Code (Agent mode), send the following prompt:
    ```
    Browse to http://localhost:5173/. Edit the timeline of the chart so that it spans from today until three months. Create three tasks: planning (2 weeks), execution (3 weeks), wrap up (1 week). Place them so each task starts after the previous ends.
    ```
1. Verify that a browser window opens and that Copilot is able to navigate the user interface.

## 🐙 GitHub MCP Registry

The [GitHub MCP Registry](https://github.com/mcp) is a GitHub-maintained, curated list of MCP servers. It makes it easy to discover and install MCP servers directly in VS Code with one-click installation.

1. Browse to the [GitHub MCP Registry](https://github.com/mcp) and explore some of the available servers. A few interesting ones:
    - Azure DevOps MCP
    - Azure MCP
    - Context7
    - GitHub MCP
1. In VS Code, open the Extensions view and type `@mcp` to see the MCP servers available for one-click install.
