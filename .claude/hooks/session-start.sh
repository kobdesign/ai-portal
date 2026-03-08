#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "Setting up ai-portal development environment..."

cd "$CLAUDE_PROJECT_DIR"

# Install Node.js dependencies
echo "Installing npm dependencies..."
npm install

echo "Setup complete. Dev server can be started with: npm run dev"

# Auto-install MCP servers
echo "Installing MCP servers..."

# Load tokens from .env.mcp if it exists
if [ -f "$CLAUDE_PROJECT_DIR/.env.mcp" ]; then
  set -a
  source "$CLAUDE_PROJECT_DIR/.env.mcp"
  set +a
fi

# GitHub MCP (requires GITHUB_PAT)
if [ -n "${GITHUB_PAT:-}" ]; then
  claude mcp add --transport http github --scope user \
    https://api.githubcopilot.com/mcp \
    --header "Authorization: Bearer $GITHUB_PAT" 2>/dev/null || true
  echo "  ✓ GitHub MCP"
else
  echo "  ✗ GitHub MCP skipped (GITHUB_PAT not set in .env.mcp)"
fi

# Add more token-based MCPs here as needed:
# if [ -n "${SOME_TOKEN:-}" ]; then
#   claude mcp add --transport http myserver --scope user https://... --header "Authorization: Bearer $SOME_TOKEN"
# fi

echo "MCP setup complete."
