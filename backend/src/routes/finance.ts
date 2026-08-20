import { Router } from 'express';
import {
  getIncomes,
  logIncome,
  getExpenses,
  logExpense,
  getInvoices,
  applyInvoicePayment,
  getCustomers,
  registerCustomer,
  getFinanceSummary,
} from '../controllers/FinanceController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Ledger details
router.get('/income', requirePermissions(['read:finance']), getIncomes);
router.post('/income', requirePermissions(['manage:finance']), logIncome);

router.get('/expense', requirePermissions(['read:finance']), getExpenses);
router.post('/expense', requirePermissions(['manage:finance']), logExpense);

// Invoicing
router.get('/invoice', requirePermissions(['read:finance']), getInvoices);
router.put('/invoice/:id/pay', requirePermissions(['manage:finance']), applyInvoicePayment);

// Customers
router.get('/customer', requirePermissions(['read:finance']), getCustomers);
router.post('/customer', requirePermissions(['manage:finance']), registerCustomer);

// Analytics
router.get('/summary', requirePermissions(['read:finance']), getFinanceSummary);

export default router;
