# Database & Storage Guide

This document describes the schema management, connection pooling, and storage configurations.

## Relational Database Management

We use **Prisma ORM** coupled with a PostgreSQL database.

- **Development**: Runs Postgres 15 inside Docker. Seed scripts populate the database with breeds, settings, and cows.
- **Production**: Deployed to **Neon PostgreSQL** serverless cluster.
- **Connection Strings**:
  - `DATABASE_URL`: Transaction pooler endpoint used by runtime query engines.
  - `DIRECT_URL`: Direct endpoint used by prisma schema migrations.

## Production Migrations Workflow

To prevent data loss and locking during live production runs:
1. **Never run** `prisma migrate reset` in production!
2. **Apply migrations** using the deploy utility:
   ```bash
   npx prisma migrate deploy
   ```
   This executes pending migrations in chronological transaction batches.
3. **Database Backup**: Neon performs automated daily point-in-time backups.
4. **Manual Backup Dump**:
   ```bash
   pg_dump -H $HOST -U $USER -d cowfarm_db > backup.sql
   ```

## S3 Object Storage Schema

File assets (e.g. Cow profiles, medical documents) are kept in **AWS S3**:
- Bucket name: `cowfarm-assets`
- Key convention: `<timestamp>-<filename>`
- Backend resolves signed upload transactions, preventing client exposure of AWS credentials.
