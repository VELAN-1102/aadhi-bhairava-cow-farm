import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { requestIdMiddleware } from './middlewares/requestId';
import { errorHandler } from './middlewares/errorHandler';
import logger from './utils/logger';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable security headers middleware (standard security practices)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

// Configure CORS
app.use(
  cors({
    origin: '*', // Adjust origins accordingly in production
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

import cowRoutes from './routes/cow';
import milkRoutes from './routes/milk';
import employeeRoutes from './routes/employee';
import vetRoutes from './routes/vet';
import inventoryRoutes from './routes/inventory';
import financeRoutes from './routes/finance';
import systemRoutes from './routes/system';

// API Router Mounts
app.use('/api/auth', authRoutes);
app.use('/api/cows', cowRoutes);
app.use('/api/milk', milkRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/vet', vetRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/system', systemRoutes);

import prisma from './utils/prisma';

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    // Verify Postgres database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'success',
      message: 'Aadhi Bhairava Cow Farm REST API is online and healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    });
  } catch (error: any) {
    logger.error('Healthcheck failed due to database connectivity issue:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    });
  }
});

// Global Error Handler
app.use(errorHandler);

// Listen to port
app.listen(PORT, () => {
  logger.info(`Server successfully started on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
