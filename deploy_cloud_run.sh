#!/usr/bin/env bash
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="chpl-guide"
REGION="us-central1"

echo "Building and Deploying $SERVICE_NAME to Google Cloud Run in $REGION..."

gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080 \
    --set-env-vars CREATOR_PIN=1357

echo "Deployment complete! Check the Service URL above for your live site."
