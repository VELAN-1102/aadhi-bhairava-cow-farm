# Cloud Architecture - Aadhi Bhairava Cow Farm

This document outlines the cloud infrastructure topology for the platform.

```
                  +--------------------------------+
                  |           Developer            |
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |         GitHub Repository      |
                  +--------------------------------+
                                  |
            +---------------------+---------------------+
            |                                           |
            v                                           v
+-----------------------+                   +-----------------------+
|  GitHub Actions CI    |                   |      Expo EAS         |
|  (Lint, test, build)  |                   |   (Mobile App Bundle) |
+-----------------------+                   +-----------------------+
            |                                           |
      +-----+-----+                                     v
      v           v                               +-------------+
+-----------+ +-----------+                       | Android APK |
|  Vercel   | |  Railway  |                       | iOS Bundle  |
|  (Web UI) | | (Backend) |                       +-------------+
+-----------+ +-----------+
      |             |
      |             +--------+----------------+
      v                      v                v
[HTTPS Request]       +-------------+   +-------------+
                      | Neon PG DB  |   | Upstash Redis|
                      +-------------+   +-------------+
                             |
                             v
                       +-------------+
                       |   AWS S3    |
                       | (Cow Images)|
                       +-------------+
```

## Service Selection Rationale

1. **NextJS on Vercel**: Extremely optimized compilation and out-of-the-box edge networks for optimal page loading speeds.
2. **Express on Railway**: Simplified cluster auto-healing, lightweight node deployments, and zero-ops hosting.
3. **Neon serverless Postgres**: Automatic scaling, database branch isolation, and high integration with Prisma.
4. **Upstash Redis**: Serverless Redis cache with minimal latency and automatic scaling.
5. **AWS S3**: Industry-standard robust object storage with presigned file upload security options.
