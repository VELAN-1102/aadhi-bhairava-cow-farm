# Aadhi Bhairava Cow Farm – Enterprise Dairy Farm Management System

> "Smart Dairy. Smarter Farming."

Aadhi Bhairava Cow Farm is an enterprise-grade, clean-architecture smart dairy platform designed to monitor cattle profiles, daily milk collection shifts, veterinary health logs, warehouse feeds/meds inventory, financial bookkeeping ledger accounts, and employee schedules.

---

## 🛠️ Technology Stack

- **Backend API Server**: Node.js + Express.js + TypeScript
- **Database Layer**: PostgreSQL (neon.tech / local) + Prisma ORM + Redis Cache
- **Web Portal**: Next.js 15 + React 19 + Tailwind CSS
- **Mobile Client**: React Native + Expo + SQLite Offline Sync + Camera QR Scanner
- **Infrastructure**: Docker Multi-stage containers, LocalStack Mock S3 Client, PM2 Process Cluster Manager

---

## 📁 Workspace Folder Structure

```
aadhi-bhairava-cow-farm/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Express route controllers
│   │   ├── interfaces/       # Service/Repository layer abstraction contracts
│   │   ├── middlewares/      # JWT, Refresh Tokens, and RBAC validators
│   │   ├── repositories/     # Concrete Prisma database queries
│   │   ├── routes/           # Endpoint modules (cows, milk, employees, vet, etc.)
│   │   ├── services/         # Core business logic rules
│   │   └── utils/            # Winston logger, error wrappers, S3 client
│   ├── prisma/               # Schema models & Upsert seeds script
│   ├── Dockerfile            # Multi-stage production container setup
│   └── ecosystem.config.js   # PM2 Cluster mode settings
├── web/
│   ├── app/                  # Next.js 15 App router (cows, milk, finance, vet pages)
│   ├── public/               # Static assets & icons
│   └── Dockerfile            # Standalone runner container setup
├── mobile/                   # React Native Expo app container
├── docs/                     # Operations and architecture guides
└── docker-compose.yml        # Orchestration configurations for local services
```

---

## ⚙️ Environment Configuration

Copy the sample configurations templates:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp web/.env.example web/.env
```

Ensure the following critical parameters are populated:
- `DATABASE_URL`: Connection pool string targeting PostgreSQL.
- `JWT_SECRET` / `JWT_REFRESH_SECRET`: Encrypting keys for auth tokens.
- `REDIS_URL`: Endpoint for queue cache storage.
- `AWS_S3_BUCKET_NAME`: Target cloud storage container name.

---

## 🚀 Running the Application

### Local Database Setup & Seed
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Apply database migrations:
   ```bash
   npx prisma migrate dev
   ```
3. Run seeds:
   ```bash
   npx prisma db seed
   ```

### Running Backend API
```bash
npm run dev
```

### Running Web UI
```bash
cd ../web
npm install --legacy-peer-deps
npm run dev
```

---

## 🐳 Docker Deployment

To launch the complete infrastructure cluster (Postgres, Redis, LocalStack, Express Backend, NextJS Frontend) locally:
```bash
docker-compose up --build -d
```

---

## 🔒 Security & Disaster Recovery

- **Token Validation**: Uses double-token verification (short-lived access token + secure HTTPOnly refresh tokens) with RBAC permissions checking.
- **Backups**: Standard backup routines are detailed in [DATABASE.md](file:///C:/Users/Harinath/.gemini/antigravity/scratch/aadhi-bhairava-cow-farm/docs/DATABASE.md).
- **Rollback Plans**: Expressed in [DISASTER_RECOVERY.md](file:///C:/Users/Harinath/.gemini/antigravity/scratch/aadhi-bhairava-cow-farm/docs/DISASTER_RECOVERY.md).

---

## 📄 Licensing & Intellectual Copyrights

Copyright © 2026 Velan. All Rights Reserved.

The Aadhi Bhairava Cow Farm – Enterprise Dairy Farm Management System, including all source code, database schema, application architecture, documentation, APIs, user interface designs, mobile applications, cloud infrastructure, and related assets, is the intellectual property of Velan.

Designed, Architected & Developed by:
**VELAN**
Master of Computer Applications (MCA)
Software Engineer

Contact: `+91 93444 60611`

Unauthorized copying, reproduction, modification, redistribution, reverse engineering, or commercial use of this software is strictly prohibited without prior written permission from the copyright owner.
