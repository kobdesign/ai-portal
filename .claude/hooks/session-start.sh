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
