#!/bin/bash
set -e

# Petal Project Setup Script
# Checks Node version and installs dependencies

echo "🌱 Petal Setup"
echo "=============="

# Check Node version
REQUIRED_NODE="24.15.0"
CURRENT_NODE=$(node --version | cut -d'v' -f2)

echo "Required Node: $REQUIRED_NODE"
echo "Current Node:  $CURRENT_NODE"

# Compare versions (simple check: if current < required, fail)
if ! [[ "$CURRENT_NODE" > "$REQUIRED_NODE" || "$CURRENT_NODE" == "$REQUIRED_NODE" ]]; then
  echo ""
  echo "❌ Node version mismatch!"
  echo ""
  echo "To fix, choose one:"
  echo "  1. Use nvm:  nvm install 24.15.0 && nvm use 24.15.0"
  echo "  2. Use brew: brew install node@24 && export PATH=/opt/homebrew/opt/node@24/bin:\$PATH"
  echo "  3. Use direnv: Install direnv, then 'direnv allow' in this directory"
  echo ""
  exit 1
fi

echo "✓ Node version OK"
echo ""

# Install dependencies
echo "Installing dependencies..."
pnpm install

echo ""
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start dev server: pnpm dev"
echo "  2. Test /admin dashboard: open http://localhost:5173/admin"
echo ""
