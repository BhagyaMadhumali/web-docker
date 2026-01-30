#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Go to project root
cd "$(dirname "$0")/.."

# Docker Hub login
echo "$2" | docker login -u "$1" --password-stdin

# Stop old containers
docker compose down

# Start new containers
docker compose up -d

echo "✅ Application deployed successfully"
