# Aadhi Bhairava Cow Farm - Deployment Guide

This guide describes the step-by-step procedure to deploy the dairy farm management application to staging and production.

## Staging & Production Deployment Services

- **Web Frontend**: Deployed to **Vercel** for high availability, static caching, and edge routing.
- **Backend Service**: Deployed to **Railway** running on node production cluster.
- **Relational Database**: Deployed to **Neon PostgreSQL** serverless instance.
- **Cache**: Deployed to **Upstash Redis** or **Railway Redis**.
- **Object Storage**: Deployed to **AWS S3** private/public buckets.

## Preparation Checklist

1. **Verify Database Connection**: Ensure `DATABASE_URL` contains SSL flags (`sslmode=require`).
2. **Execute Migrations**: Run the prisma migration deployment:
   ```bash
   npx prisma migrate deploy
   ```
3. **Configure CORS**: Ensure `CORS_ORIGIN` in backend environment variable points to the production frontend domain (`https://www.aadhibhairavacowfarm.com`).
4. **Publish S3 Bucket CORS**: Configure IAM access permissions and publish CORS bucket configuration on AWS console.

## Production Build & Deploy Commands

### Backend deployment on Railway:
```bash
# Install CLI
npm install -g @railway/cli

# Link project and deploy
railway link
railway deploy
```

### Frontend deployment on Vercel:
```bash
# Install CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```
