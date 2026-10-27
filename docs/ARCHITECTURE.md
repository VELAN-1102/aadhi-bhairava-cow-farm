# Aadhi Bhairava Cow Farm — Enterprise System Architecture

> **System Architecture & Design Document**  
> *© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.*

---

## 1. Executive Summary

The **Aadhi Bhairava Cow Farm Enterprise Platform** is a multi-tier dairy management system designed to track cattle herds, milk collection telemetry, veterinary clinical diagnostics, breeding timelines, inventory reorders, financial ledgers, and Indian regulatory compliance (FSSAI, Legal Metrology, MeitY DPDP Act 2023, GST).

---

## 2. High-Level Topology

```text
                  [ CLIENT LAYER ]
      ┌───────────────────┴───────────────────┐
      │                                       │
      ▼                                       ▼
┌─────────────────────────┐       ┌─────────────────────────┐
│ Next.js 15 Web App      │       │ React Native / Expo     │
│ (Vercel Edge Platform)  │       │ Mobile Application      │
└────────────┬────────────┘       └────────────┬────────────┘
             │                                 │
             └────────────────┬────────────────┘
                              │ HTTPS / REST API
                              ▼
               ┌─────────────────────────────┐
               │ NGINX Ingress Controller    │
               │ (Cert-Manager TLS)          │
               └──────────────┬──────────────┘
                              │ Port 5000
                              ▼
               ┌─────────────────────────────┐
               │ Kubernetes Pod Cluster      │
               │ Namespace: cow-farm         │
               │ Express 4 + Node 20 Runtime │
               └──────────────┬──────────────┘
                              │
             ┌────────────────┴────────────────┐
             │ Prisma ORM                      │ AWS SDK / Local Disk
             ▼                                 ▼
┌─────────────────────────┐       ┌─────────────────────────┐
│ Managed PostgreSQL 15   │       │ AWS S3 Bucket           │
│ (Encrypted Storage)     │       │ ("cowfarm-assets")      │
└─────────────────────────┘       └─────────────────────────┘
```

---

## 3. Technology Stack

- **Web Frontend**: Next.js 15.1, React 19, TypeScript 5.3, Tailwind CSS 3.4.
- **Backend Service**: Node.js 20, Express 4.18, TypeScript 5.3, Prisma ORM 5.10.
- **Database**: PostgreSQL 15 with 27 relational domain models.
- **Storage**: AWS S3 (`cowfarm-assets`) with fallback to local `./uploads` disk storage.
- **Containerization**: Docker (multi-stage non-root images) & Kubernetes 1.28+ (`/k8s`).
- **CI/CD Pipeline**: GitHub Actions (`.github/workflows/ci.yml` & `deploy.yml`).
