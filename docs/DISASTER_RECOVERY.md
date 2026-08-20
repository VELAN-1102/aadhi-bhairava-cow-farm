# Disaster Recovery & Rollback Guide

Procedures to handle system failure scenarios and apply operational rollbacks.

## Incident Response Plans

### 1. Application Server Failure (Express REST API)
- **Staging/Prod Indicators**: Health checks return `503` or timeout.
- **Remediation**:
  - Review cluster logs via Railway CLI: `railway logs`.
  - Restart container instance: `railway restart`.
  - Verify environment variables injection.

### 2. Database Connectivity Failures
- **Indicators**: Health check returns `500` database disconnected.
- **Remediation**:
  - Ping Neon PostgreSQL service health.
  - Review connection pooling quota thresholds.
  - If schema migration fails, review local migrations logs and rollback:
    ```bash
    npx prisma migrate resolve --rolled-back "migration_name"
    ```

### 3. Deployments Rollback
- **Vercel Rollback**:
  - Run Vercel CLI rollback or target a specific Git commit SHA to redeploy:
    ```bash
    vercel deploy --prod --prebuilt
    ```
- **Railway Rollback**:
  - Rollback to previous Docker build via Railway UI dashboard under Deployments tab.
- **EAS Rollback**:
  - Publish update rollbacks using EAS CLI:
    ```bash
    eas update --branch production --message "reverting hotfix"
    ```
