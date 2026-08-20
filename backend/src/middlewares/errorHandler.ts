import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let status = 'error';
  let message = 'Internal Server Error';
  let errors: any = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
    errors = err.errors;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    status = 'fail';
    message = err.message;
  } else if (err.name === 'PrismaClientKnownRequestError') {
    // Catch common database errors
    statusCode = 400;
    status = 'fail';
    message = 'Database Constraint Violation';
    errors = (err as any).meta;
  }

  // Log the error
  logger.error(`${req.method} ${req.originalUrl} - Error: ${err.message}`, {
    stack: err.stack,
    requestId: req.requestId,
  });

  res.status(statusCode).json({
    status,
    message,
    data: null,
    errors: errors || (process.env.NODE_ENV === 'development' ? { stack: err.stack } : null),
    timestamp: new Date().toISOString(),
    requestId: req.requestId || 'unknown',
  });
};

export default errorHandler;
