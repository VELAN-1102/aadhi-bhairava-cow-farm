# Aadhi Bhairava Cow Farm — Enterprise Security Specification

> **Security & Access Control Manual**  
> *© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.*

---

## 1. Security Architecture Controls

1. **Password Hashing**: Uses `bcryptjs` with salt rounds = 10. Raw passwords are never stored in plain text.
2. **JWT Token Security**: Access tokens expire in 15 minutes; refresh tokens expire in 7 days. Automatic refresh handling on status 401.
3. **Role-Based Access Control (RBAC)**: Fine-grained permission verification enforced by `requirePermissions` middleware.
4. **CORS Protection**: Restricted to configured origins (`CORS_ORIGIN`).
5. **Security Headers**: Standard headers injected on Express responses:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Strict-Transport-Security: max-age=31536000`
6. **Audit Trail Logging**: Database table `AuditLog` captures user ID, timestamp, action type, IP address, and user agent.
