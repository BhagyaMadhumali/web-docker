#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Go to project root
cd "$(dirname "$0")/.."

# Create backend .env file (from Jenkins credentials)
echo "🔐 Creating backend .env file..."
cat <<EOF > backend/.env
PORT=$PORT
MONGO_URI=$MONGO_URI
JWT_SECRET=$JWT_SECRET
EOF

# Docker Hub login
echo "$2" | docker login -u "$1" --password-stdin

# Stop old containers
docker compose down

# Start new containers
docker compose up -d

echo "✅ Application deployed successfully"
