#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Go to project root
cd "$(dirname "$0")/.."

# Stop and remove old containers
docker compose down

# Start new containers
docker compose up -d

echo "✅ Application deployed successfully"
