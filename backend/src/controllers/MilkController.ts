import { Request, Response, NextFunction } from 'express';
import milkService from '../services/MilkService';
import sendResponse from '../utils/response';
import systemService from '../services/SystemService';

export const getCollections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const cowId = req.query.cowId as string;
    const shift = req.query.shift as string;

    const result = await milkService.getCollections({
      page,
      limit,
      startDate,
      endDate,
      cowId,
      shift,
    });

    return sendResponse(res, req, 200, 'Milk collections fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const logCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await milkService.logCollection({
      ...req.body,
      date: new Date(req.body.date),
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'LOG_MILK_COLLECTION', `Logged milk collection: ${req.body.quantity}L`);
    }

    return sendResponse(res, req, 201, 'Milk collection logged successfully', collection);
  } catch (error) {
    next(error);
  }
};

export const getMilkSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const customerId = req.query.customerId as string;
    const paymentStatus = req.query.paymentStatus as string;

    const result = await milkService.getMilkSales({
      page,
      limit,
      customerId,
      paymentStatus,
    });

    return sendResponse(res, req, 200, 'Milk sales logs fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const logMilkSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await milkService.logMilkSale({
      ...req.body,
      date: new Date(req.body.date),
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'LOG_MILK_SALE', `Sold ${req.body.quantity}L to customer ${req.body.customerId}`);
    }

    return sendResponse(res, req, 201, 'Milk sale logged and invoice generated successfully', sale);
  } catch (error) {
    next(error);
  }
};
