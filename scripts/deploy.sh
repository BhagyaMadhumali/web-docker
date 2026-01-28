#!/bin/bash
set -e

AWS_REGION=$1
ECS_CLUSTER=$2
ECS_SERVICE=$3

if [ -z "$AWS_REGION" ] || [ -z "$ECS_CLUSTER" ] || [ -z "$ECS_SERVICE" ]; then
  echo "Usage: ./deploy.sh <AWS_REGION> <ECS_CLUSTER> <ECS_SERVICE>"
  exit 1
fi

echo "Deploying to ECS..."
aws ecs update-service \
  --region "$AWS_REGION" \
  --cluster "$ECS_CLUSTER" \
  --service "$ECS_SERVICE" \
  --force-new-deployment

echo "✅ ECS deployment triggered!"
