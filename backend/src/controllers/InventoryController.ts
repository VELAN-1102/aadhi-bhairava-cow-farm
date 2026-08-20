import { Request, Response, NextFunction } from 'express';
import inventoryService from '../services/InventoryService';
import sendResponse from '../utils/response';
import systemService from '../services/SystemService';

export const getFeedStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const result = await inventoryService.getFeedStock({ search });
    return sendResponse(res, req, 200, 'Feed inventory levels fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const addFeedItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await inventoryService.addFeedItem({
      ...req.body,
      expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : undefined,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'RESTOCK_FEED', `Added feed stock: ${req.body.name}`);
    }

    return sendResponse(res, req, 201, 'Feed item added to stock successfully', item);
  } catch (error) {
    next(error);
  }
};

export const consumeFeed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    const feed = await inventoryService.consumeFeed(req.params.id, Number(quantity));

    return sendResponse(res, req, 200, 'Feed consumption logged successfully', feed);
  } catch (error) {
    next(error);
  }
};

export const getMedicineStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const result = await inventoryService.getMedicineStock({ search });
    return sendResponse(res, req, 200, 'Medicine cabinet stocks fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const addMedicineItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await inventoryService.addMedicineItem({
      ...req.body,
      expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : undefined,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'RESTOCK_MEDICINE', `Added medicine stock: ${req.body.name}`);
    }

    return sendResponse(res, req, 201, 'Medicine cabinet restocked successfully', item);
  } catch (error) {
    next(error);
  }
};

export const consumeMedicine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    const med = await inventoryService.consumeMedicine(req.params.id, parseInt(quantity));

    return sendResponse(res, req, 200, 'Medicine consumption logged successfully', med);
  } catch (error) {
    next(error);
  }
};

export const getEquipment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string;
    const result = await inventoryService.getEquipment({ status });
    return sendResponse(res, req, 200, 'Equipment inventory list fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const registerEquipment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eq = await inventoryService.registerEquipment({
      ...req.body,
      purchaseDate: new Date(req.body.purchaseDate),
    });

    return sendResponse(res, req, 201, 'Equipment asset registered successfully', eq);
  } catch (error) {
    next(error);
  }
};

export const updateEquipmentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eq = await inventoryService.updateEquipmentStatus(req.params.id, req.body.status);
    return sendResponse(res, req, 200, 'Equipment asset status updated successfully', eq);
  } catch (error) {
    next(error);
  }
};

export const getSuppliers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await inventoryService.getSuppliers();
    return sendResponse(res, req, 200, 'Suppliers directory fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const registerSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await inventoryService.registerSupplier(req.body);
    return sendResponse(res, req, 201, 'Supplier profile created successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getPurchaseOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId = req.query.supplierId as string;
    const status = req.query.status as string;

    const result = await inventoryService.getPurchaseOrders({ supplierId, status });
    return sendResponse(res, req, 200, 'Purchase orders fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const placePurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedByUserId = req.user?.userId || 'unknown-user';
    const order = await inventoryService.placePurchaseOrder(req.body, loggedByUserId);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'CREATE_PURCHASE_ORDER', `Created PO for supplier ID ${req.body.supplierId}`);
    }

    return sendResponse(res, req, 201, 'Purchase order placed and expense invoice logged successfully', order);
  } catch (error) {
    next(error);
  }
};
