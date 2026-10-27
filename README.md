# Aadhi Bhairava Cow Farm — Enterprise Dairy Farm Management System

> **Tagline**: Healthy Cows, Happy Future  
> *© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.*

---

## 1. Overview

**Aadhi Bhairava Cow Farm** is an enterprise-grade, production-ready, India-compliant dairy farm management platform. The system combines modern software engineering (Next.js 15, Node.js Express REST API, PostgreSQL, Prisma ORM, Docker, Kubernetes) with agricultural excellence to manage livestock, milk collection quality, veterinary care, employee payroll, supply chain inventory, and statutory compliance.

---

## 2. Key Modules & Features

- **Livestock Management**: Ear-tag ID tracking, indigenous & commercial breeds (Gir, Sahiwal, Hallikar, Ongole, Murrah), date of birth, weight histories, and maternal lineage.
- **Milk Production & Quality**: Morning & evening shift collection logs, Fat %, SNF %, temperature logs, and commercial customer dispatches.
- **Veterinary Clinical Diaries**: Scheduled vaccinations (FMD, HS, BQ), disease diagnoses, antibiotic treatment diaries, and mandatory withdrawal period tracking.
- **Breeding & Calving**: AI breeding dates, bull tag tracking, expected calving date calculations, pregnancy monitoring, and calf birth logs.
- **Supply Chain & Inventory**: Green fodder, dry feed, concentrate reorder alerts, veterinary medicines, equipment maintenance, and purchase orders.
- **Financial Ledgers & Payroll**: Customer invoices, income & expense entries, employee attendance register, and basic salary/allowance calculations.
- **Compliance Readiness Framework**: Pre-configured support for FSSAI food safety chilling standards (4°C limit), Legal Metrology packaging metadata, MeitY DPDP Act 2023 privacy controls, and GST tax invoice breakdowns.

---

## 3. Technology Stack

- **Frontend**: Next.js 15.1, React 19, TypeScript 5.3, Tailwind CSS 3.4.
- **Backend**: Node.js 20, Express 4.18, TypeScript 5.3, Prisma ORM 5.10.
- **Database**: PostgreSQL 15 (27 domain relational models).
- **Storage**: AWS S3 (`cowfarm-assets`) with local disk fallback (`uploads/`).
- **Containerization & Deployment**: Docker multi-stage images, Kubernetes manifests (`/k8s`), Vercel edge deployment, GitHub Actions (`.github/workflows`).

---

## 4. Getting Started (Development Mode)

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm 10+

### Step 1: Clone Repository & Install Dependencies
```bash
# Backend Setup
cd backend
npm install
npx prisma generate

# Frontend Setup
cd ../web
npm install --legacy-peer-deps
```

### Step 2: Seed Database
```bash
cd backend
$env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cowfarm_db?schema=public"
npx prisma migrate dev
npm run prisma:seed
```

### Step 3: Run Development Servers
```bash
# Backend Terminal (Port 5000)
cd backend && npm run dev

# Web Frontend Terminal (Port 3000)
cd web && npm run dev
```

### Demo Login Credentials
- **Email**: `admin@cowfarm.com`
- **Password**: `admin123`

---

## 5. System Health Check
- Health Check: `GET http://localhost:5000/health`
- Liveness Probe: `GET http://localhost:5000/liveness`
- Readiness Probe: `GET http://localhost:5000/readiness`

---

## 6. Documentation Index
- [Architecture Guide](docs/architecture.md)
- [Compliance Matrix](docs/compliance/compliance-matrix.md)
- [Deployment Manual](docs/deployment.md)
- [Security Specification](docs/security.md)
- [Database Schema](docs/database.md)
- [API Manual](docs/api.md)

---

## 7. Copyright & License
*© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.*
