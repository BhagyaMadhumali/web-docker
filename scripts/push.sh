#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

echo "🔐 Logging in to Docker Hub..."
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

echo "🏷️ Tagging frontend and backend images..."
docker tag my-frontend1-image $DOCKER_USER/my-frontend1-image:latest
docker tag my-backend1-image $DOCKER_USER/my-backend1-image:latest

echo "📤 Pushing images to Docker Hub..."
docker push $DOCKER_USER/my-frontend1-image:latest
docker push $DOCKER_USER/my-backend1-image:latest

echo "✅ Images pushed successfully"
