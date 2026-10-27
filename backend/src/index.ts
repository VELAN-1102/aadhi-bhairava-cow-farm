import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import cowRoutes from './routes/cow';
import milkRoutes from './routes/milk';
import employeeRoutes from './routes/employee';
import vetRoutes from './routes/vet';
import inventoryRoutes from './routes/inventory';
import financeRoutes from './routes/finance';
import systemRoutes from './routes/system';
import { requestIdMiddleware } from './middlewares/requestId';
import { errorHandler } from './middlewares/errorHandler';
import logger from './utils/logger';
import prisma from './utils/prisma';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Configure CORS
const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',');
app.use(
  cors({
    origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
  })
);

// Logging Middlewares
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.http(message.trim()),
  }
}));

// Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom identifiers
app.use(requestIdMiddleware);

// API Router Mounts (Standard /api and /api/v1 endpoints for broad client compatibility)
app.use('/api/auth', authRoutes);
app.use('/api/v1/auth', authRoutes);

app.use('/api/cows', cowRoutes);
app.use('/api/v1/cows', cowRoutes);

app.use('/api/milk', milkRoutes);
app.use('/api/v1/milk', milkRoutes);

app.use('/api/employees', employeeRoutes);
app.use('/api/v1/employees', employeeRoutes);

app.use('/api/vet', vetRoutes);
app.use('/api/v1/vet', vetRoutes);

app.use('/api/inventory', inventoryRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

app.use('/api/finance', financeRoutes);
app.use('/api/v1/finance', financeRoutes);

app.use('/api/system', systemRoutes);
app.use('/api/v1/system', systemRoutes);

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    // Verify Postgres database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'healthy',
      service: 'aadhi-bhairava-cow-farm-api',
      database: 'connected',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    });
  } catch (error: any) {
    logger.error('Healthcheck failed due to database connectivity issue:', error);
    res.status(500).json({
      status: 'error',
      service: 'aadhi-bhairava-cow-farm-api',
      database: 'disconnected',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    });
  }
});

// Liveness Probe Endpoint
app.get('/liveness', (req, res) => {
  res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
});

// Readiness Probe Endpoint
app.get('/readiness', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ready', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'not_ready', database: 'disconnected' });
  }
});

// Global Error Handler
app.use(errorHandler);

// Listen to port
app.listen(PORT, () => {
  logger.info(`Server successfully started on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
