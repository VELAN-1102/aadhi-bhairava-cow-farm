import { Router } from 'express';
import {
  getCollections,
  logCollection,
  getMilkSales,
  logMilkSale,
} from '../controllers/MilkController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Milk Collection endpoints
router.get('/collection', requirePermissions(['read:milk']), getCollections);
router.post('/collection', requirePermissions(['manage:milk']), logCollection);

// Milk Sales endpoints
router.get('/sales', requirePermissions(['read:milk']), getMilkSales);
router.post('/sales', requirePermissions(['manage:milk']), logMilkSale);

export default router;
