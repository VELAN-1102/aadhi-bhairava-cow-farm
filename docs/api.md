# Aadhi Bhairava Cow Farm — REST API Documentation

> **API Specification Manual**  
> *© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.*

---

## 1. Endpoints Overview

Base URLs:
- Development: `http://localhost:5000/api/v1`
- Production: `https://api.aadhibhairavacowfarm.com/api/v1`

### Health Endpoints
- `GET /health` → Database Connectivity and System Health
- `GET /liveness` → Container Liveness Probe
- `GET /readiness` → Container Readiness Probe

### Authentication Endpoints
- `POST /api/v1/auth/login` → Authenticate user credentials & return JWT tokens
- `POST /api/v1/auth/refresh` → Refresh access token using refresh token
- `GET /api/v1/auth/me` → Retrieve current authenticated profile

### Module Endpoints
- `/api/v1/cows` → Cattle CRUD & Image Uploads
- `/api/v1/milk` → Shift Collection & Quality Tests
- `/api/v1/vet` → Vaccinations, Medical Records, & Treatments
- `/api/v1/employees` → Employees, Attendance, & Payroll
- `/api/v1/inventory` → Feed, Medicine, & Equipment Stock
- `/api/v1/finance` → Invoices, Income, & Expense Ledgers
- `/api/v1/system` → System Settings, RBAC Roles, Audit Logs
