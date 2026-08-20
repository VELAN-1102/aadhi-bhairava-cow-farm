import { Router } from 'express';
import {
  getFeedStock,
  addFeedItem,
  consumeFeed,
  getMedicineStock,
  addMedicineItem,
  consumeMedicine,
  getEquipment,
  registerEquipment,
  updateEquipmentStatus,
  getSuppliers,
  registerSupplier,
  getPurchaseOrders,
  placePurchaseOrder,
} from '../controllers/InventoryController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Feed stock endpoints
router.get('/feed', requirePermissions(['read:inventory']), getFeedStock);
router.post('/feed', requirePermissions(['manage:inventory']), addFeedItem);
router.put('/feed/:id/consume', requirePermissions(['manage:inventory']), consumeFeed);

// Medicine endpoints
router.get('/medicine', requirePermissions(['read:inventory']), getMedicineStock);
router.post('/medicine', requirePermissions(['manage:inventory']), addMedicineItem);
router.put('/medicine/:id/consume', requirePermissions(['manage:inventory']), consumeMedicine);

// Equipment endpoints
router.get('/equipment', requirePermissions(['read:inventory']), getEquipment);
router.post('/equipment', requirePermissions(['manage:inventory']), registerEquipment);
router.put('/equipment/:id/status', requirePermissions(['manage:inventory']), updateEquipmentStatus);

// Suppliers endpoints
router.get('/supplier', requirePermissions(['read:inventory']), getSuppliers);
router.post('/supplier', requirePermissions(['manage:inventory']), registerSupplier);

// Purchase Orders endpoints
router.get('/po', requirePermissions(['read:inventory']), getPurchaseOrders);
router.post('/po', requirePermissions(['manage:inventory']), placePurchaseOrder);

export default router;
