# Production Multi-Stage / Lightweight Python 3.11 Image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

WORKDIR /app

# Install system dependencies if required
RUN apt-get update && apt-get install -y --no-install-recommends     curl     && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Expose container port (Default 8080 for Google Cloud Run / Render / Railway)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3   CMD curl -f http://localhost:8080/healthz || exit 1

# Run with Gunicorn production WSGI server
CMD exec gunicorn --bind 0.0.0.0: --workers 2 --threads 4 --timeout 0 server:app
