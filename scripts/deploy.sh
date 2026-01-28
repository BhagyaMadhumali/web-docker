#!/bin/bash
set -e

AWS_ACCESS_KEY=$1
AWS_SECRET_KEY=$2
AWS_REGION=$3
ECS_CLUSTER=$4
ECS_SERVICE=$5

if [ -z "$AWS_ACCESS_KEY" ] || [ -z "$AWS_SECRET_KEY" ] || [ -z "$AWS_REGION" ] || [ -z "$ECS_CLUSTER" ] || [ -z "$ECS_SERVICE" ]; then
  echo "❌ Missing deploy arguments!"
  echo "Usage: ./deploy.sh <AWS_ACCESS_KEY> <AWS_SECRET_KEY> <AWS_REGION> <ECS_CLUSTER> <ECS_SERVICE>"
  exit 1
fi

echo "=============================="
echo " Configuring AWS CLI..."
echo "=============================="

aws configure set ***REMOVED*** "$AWS_ACCESS_KEY"
aws configure set ***REMOVED*** "$AWS_SECRET_KEY"
aws configure set default.region "$AWS_REGION"

echo "=============================="
echo " Deploying to ECS..."
echo "=============================="

aws ecs update-service \
  --cluster "$ECS_CLUSTER" \
  --service "$ECS_SERVICE" \
  --force-new-deployment

echo "✅ ECS Deployment triggered successfully!"
