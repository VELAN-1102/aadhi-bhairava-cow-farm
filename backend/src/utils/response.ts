import { Request, Response } from 'express';

export const sendResponse = (
  res: Response,
  req: Request,
  statusCode: number,
  message: string,
  data: any = null
) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
    errors: null,
    timestamp: new Date().toISOString(),
    requestId: req.requestId || 'unknown',
  });
};

export default sendResponse;
