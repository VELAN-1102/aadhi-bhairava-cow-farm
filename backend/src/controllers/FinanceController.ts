import { Request, Response, NextFunction } from 'express';
import financeService from '../services/FinanceService';
import sendResponse from '../utils/response';
import systemService from '../services/SystemService';

export const getIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const source = req.query.source as string;

    const result = await financeService.getIncomes({ startDate, endDate, source });
    return sendResponse(res, req, 200, 'Revenues register fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const logIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordedById = req.user?.userId || 'unknown-user';
    const result = await financeService.logIncome({
      ...req.body,
      date: new Date(req.body.date),
      recordedById,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'LOG_INCOME', `Logged income: ${req.body.amount} (${req.body.source})`);
    }

    return sendResponse(res, req, 201, 'Revenue logged successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const category = req.query.category as string;

    const result = await financeService.getExpenses({ startDate, endDate, category });
    return sendResponse(res, req, 200, 'Expenses register fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const logExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordedById = req.user?.userId || 'unknown-user';
    const result = await financeService.logExpense({
      ...req.body,
      date: new Date(req.body.date),
      recordedById,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'LOG_EXPENSE', `Logged expense: ${req.body.amount} (${req.body.category})`);
    }

    return sendResponse(res, req, 201, 'Expense logged successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getInvoices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string;
    const type = req.query.type as string;

    const result = await financeService.getInvoices({ status, type });
    return sendResponse(res, req, 200, 'Invoices ledger fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const applyInvoicePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;
    const result = await financeService.applyInvoicePayment(req.params.id, Number(amount));

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'PAY_INVOICE', `Applied payment of Rs.${amount} to Invoice ID ${req.params.id}`);
    }

    return sendResponse(res, req, 200, 'Payment applied successfully to invoice', result);
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await financeService.getCustomers();
    return sendResponse(res, req, 200, 'Customers directory fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const registerCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await financeService.registerCustomer(req.body);
    return sendResponse(res, req, 201, 'Customer account created successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getFinanceSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

    const result = await financeService.getFinanceSummary(startDate, endDate);
    return sendResponse(res, req, 200, 'P&L ledger financial summary calculated successfully', result);
  } catch (error) {
    next(error);
  }
};
