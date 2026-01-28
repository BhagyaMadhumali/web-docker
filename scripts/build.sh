#!/bin/bash
set -e

echo "=============================="
echo " Building Docker Images..."
echo "=============================="

FRONTEND_IMAGE="my-frontend1-image:latest"
BACKEND_IMAGE="my-backend1-image:latest"

# Build frontend
if [ -d "frontend" ]; then
  echo "Building frontend image..."
  docker build -t $FRONTEND_IMAGE ./frontend
else
  echo "⚠️ frontend folder not found. Skipping frontend build."
fi

# Build backend
if [ -d "backend" ]; then
  echo "Building backend image..."
  docker build -t $BACKEND_IMAGE ./backend
else
  echo "⚠️ backend folder not found. Skipping backend build."
fi

echo "✅ Docker build completed!"
