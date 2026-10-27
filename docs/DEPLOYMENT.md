# Aadhi Bhairava Cow Farm — Enterprise Deployment Guide

> **Production Deployment Manual**  
> *© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.*

---

## 1. Target Architecture Breakdown

- **Web Frontend**: Deployed to **Vercel** (Root: `web`, Build: `npm run build`, Install: `npm install --legacy-peer-deps`).
- **Backend Service**: Deployed to **Kubernetes** using Docker image `ghcr.io/velan-1102/aadhi-bhairava-cow-farm-backend:latest`.
- **Database**: Managed PostgreSQL (AWS RDS / Neon) using non-destructive Prisma migrations (`npx prisma migrate deploy`).
- **File Storage**: AWS S3 Bucket (`cowfarm-assets`).

---

## 2. Deployment Sequence

### Step 1: Database Migration
```bash
cd backend
$env:DATABASE_URL="postgresql://user:password@host:5432/cowfarm_db?sslmode=require"
npx prisma migrate deploy
npm run prisma:seed
```

### Step 2: Backend Container Build & Push
```bash
docker build -t ghcr.io/velan-1102/aadhi-bhairava-cow-farm-backend:latest ./backend
docker push ghcr.io/velan-1102/aadhi-bhairava-cow-farm-backend:latest
```

### Step 3: Kubernetes Manifest Application
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl create secret generic cow-farm-secrets \
  --namespace=aadhi-bhairava-cow-farm \
  --from-literal=DATABASE_URL="postgresql://user:pass@host:5432/db" \
  --from-literal=JWT_SECRET="PROD_JWT_SECRET_32CHARS" \
  --from-literal=JWT_REFRESH_SECRET="PROD_REFRESH_SECRET_32CHARS" \
  --from-literal=AWS_ACCESS_KEY_ID="AKIA..." \
  --from-literal=AWS_SECRET_ACCESS_KEY="SecretKey..."

kubectl apply -f k8s/services.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml
```

### Step 4: Vercel Frontend Deployment
1. Import repository `VELAN-1102/aadhi-bhairava-cow-farm`.
2. Root directory: `web`.
3. Set environment variable: `NEXT_PUBLIC_API_URL` = `https://api.aadhibhairavacowfarm.com/api/v1`.
4. Deploy.
