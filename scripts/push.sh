#!/bin/bash
set -e

DOCKER_USERNAME=$1
DOCKER_PASSWORD=$2

if [ -z "$DOCKER_USERNAME" ] || [ -z "$DOCKER_PASSWORD" ]; then
  echo "❌ DockerHub username/password not provided!"
  echo "Usage: ./push.sh <DOCKER_USERNAME> <DOCKER_PASSWORD>"
  exit 1
fi

echo "=============================="
echo " DockerHub Login..."
echo "=============================="

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Tag images to DockerHub username
FRONTEND_LOCAL="my-frontend1-image:latest"
BACKEND_LOCAL="my-backend1-image:latest"

FRONTEND_REMOTE="$DOCKER_USERNAME/my-frontend1-image:latest"
BACKEND_REMOTE="$DOCKER_USERNAME/my-backend1-image:latest"

echo "=============================="
echo " Tagging Images..."
echo "=============================="

docker tag $FRONTEND_LOCAL $FRONTEND_REMOTE
docker tag $BACKEND_LOCAL $BACKEND_REMOTE

echo "=============================="
echo " Pushing Docker Images..."
echo "=============================="

docker push $FRONTEND_REMOTE
docker push $BACKEND_REMOTE

echo "✅ Docker push completed!"
