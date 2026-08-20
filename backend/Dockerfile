# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install build dependencies
RUN npm ci

# Copy source files
COPY tsconfig.json ./
COPY src ./src/

# Generate Prisma Client and build TypeScript
RUN npx prisma generate
RUN npm run build

# Remove development dependencies to keep the image slim
RUN npm prune --production

# Stage 2: Runtime stage
FROM node:20-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=5000

# Copy node_modules, dist and prisma folder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Use non-root node user for secure execution
USER node

EXPOSE 5000

# Configure health check for health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

CMD ["node", "dist/index.js"]
