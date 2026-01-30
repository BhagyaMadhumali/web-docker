#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Go to project root
cd "$(dirname "$0")/.."

# Log in to Docker Hub
docker login -u bhagya122 -p $DOCKERHUB_PASS

# Stop old containers
docker compose down

# Start new containers
docker compose up -d

echo "✅ Application deployed successfully"
