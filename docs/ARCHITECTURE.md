# System Architecture - Aadhi Bhairava Cow Farm

This document outlines the software design, patterns, and principles applied across the platform.

## Design Principles

We follow **Clean Architecture**, **SOLID**, **DRY** (Don't Repeat Yourself), and **DDD** (Domain Driven Design) guidelines.

- **Separation of Concerns**: Clearly divided folders separating Web UI, Mobile clients, Backend server logic, and Database mappings.
- **Repository Pattern**: All database access is decoupled from services and controllers using repositories.
- **Service Layer Pattern**: Core business models logic, checks, and calculations are kept within dedicated service files.

## Monorepo Layout

```
aadhi-bhairava-cow-farm/
├── backend/
│   ├── prisma/             # Schema mappings and seed scripts
│   └── src/
│       ├── controllers/    # Express route request handlers
│       ├── interfaces/     # Repository/Service contracts
│       ├── middlewares/    # Request authentication filters
│       ├── repositories/   # Concrete database querying classes
│       ├── routes/         # Mounted REST API endpoints
│       └── services/       # Core business workflows
├── mobile/                 # React Native + Expo App
├── web/                    # Next.js 15 Web Application
└── docs/                   # System design & operations manuals
```
