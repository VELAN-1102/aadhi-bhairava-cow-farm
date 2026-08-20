# Security Practices - Aadhi Bhairava Cow Farm

This document outlines key security protocols, configuration rules, and scanning processes.

## DevSecOps Protocols

1. **Non-Root Execution**: Both `backend` and `web` containers run under non-privileged users (`node` and `nextjs` respectively).
2. **Secrets Prevention**: Sensitive passwords, keys, or credentials must never be committed to Git. Files like `.env` and `.env.local` are blocked in `.gitignore`.
3. **Helmet Security Headers**: Express app utilizes custom headers to block XSS injections, clickjacking, and mime-sniffing:
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Content-Security-Policy`

## CORS Policy

In production, CORS is locked down. The server only listens to validated frontend origins:
- `CORS_ORIGIN="https://www.aadhibhairavacowfarm.com"`

## Dependency Audit

Continuous integration pipelines run:
- `npm audit --audit-level=high`
- Automatically check code files for leaked secrets prior to package updates.
