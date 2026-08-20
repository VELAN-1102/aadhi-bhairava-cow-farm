import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

// Extend Express Request interface to store requestId
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqId = req.header('x-request-id') || randomUUID();
  req.requestId = reqId;
  res.setHeader('x-request-id', reqId);
  next();
};

export default requestIdMiddleware;
