# Aadhi Bhairava Cow Farm - DevOps Guide

This guide details the containerization, local development, and continuous integration strategy for the dairy farm management platform.

## Containerization Layout

We use **Docker** for local service emulation and multi-stage containerization.

- **Backend**: Configured with a multi-stage production Dockerfile (`backend/Dockerfile`) utilizing `node:20-alpine`, building typescript, generating prisma client, and executing as a non-root user `node`.
- **Frontend (Web)**: Configured with a multi-stage production Dockerfile (`web/Dockerfile`) utilizing Next.js `standalone` output and running as a non-root user `nextjs`.
- **Compose**: Run local containers for DB, cache, S3 storage, and app endpoints using:
  ```bash
  docker compose up --build -d
  ```

## Local Development Infrastructure

Local development services configured in `docker-compose.yml`:
1. **PostgreSQL 15**: Exposes port `5432` with volume mapping `postgres_data`. Includes automated pg_isready health checks.
2. **Redis 7**: Exposes port `6379` with volume mapping `redis_data` and health checks.
3. **LocalStack (Mock S3)**: Exposes port `4566` to mock S3 object storage bucket `cowfarm-assets` and configure local CORS policies.

## CI/CD Pipelines

Our pipelines are automated via **GitHub Actions** in `.github/workflows/`:
1. **ci.yml**: Triggered on push or PR to `main` and `develop` branches.
   - Installs dependencies, runs typescript checks, and builds backend/frontend components.
   - Validates prisma client compilation and generates static build bundles.
2. **deploy.yml**: Triggered on push to `main` branch.
   - Packages and pushes Docker builds to **GitHub Container Registry (GHCR)**.
   - Executes Vercel frontend deployments and Railway backend migrations.
