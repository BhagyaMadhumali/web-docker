#!/bin/bash
set -e

echo "🔨 Building Docker images..."

# Go to repo root
cd "$(dirname "$0")/.."

# Build the images
docker build -t my-frontend1-image ./frontend
docker build -t my-backend1-image ./backend

echo "✅ Docker images built successfully"
