# Deploy to Google Cloud Run in PowerShell
$PROJECT_ID = (gcloud config get-value project)
$SERVICE_NAME = "chpl-guide"
$REGION = "us-central1"

Write-Host "🚀 Building and Deploying $SERVICE_NAME to Google Cloud Run ($REGION)..." -ForegroundColor Cyan

gcloud builds submit --tag "gcr.io/$PROJECT_ID/$SERVICE_NAME"
gcloud run deploy $SERVICE_NAME `
    --image "gcr.io/$PROJECT_ID/$SERVICE_NAME" `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated `
    --port 8080 `
    --set-env-vars CREATOR_PIN=1357

Write-Host "🎉 Deployment complete! Visit your live Cloud Run URL." -ForegroundColor Green
