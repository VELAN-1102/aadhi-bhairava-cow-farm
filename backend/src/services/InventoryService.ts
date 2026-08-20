import inventoryRepository from '../repositories/InventoryRepository';
import systemRepository from '../repositories/SystemRepository';
import financeRepository from '../repositories/FinanceRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IInventoryService } from '../interfaces/services/IInventoryService';

export class InventoryService implements IInventoryService {
  // --- Feed Stocks ---
  public async getFeedStock(params: { search?: string }) {
    return inventoryRepository.getFeedStock(params);
  }

  public async addFeedItem(data: {
    name: string;
    quantity: number;
    minQuantityAlert: number;
    unitPrice: number;
    supplierId?: string;
    expiryDate?: Date;
  }) {
    return inventoryRepository.createFeedItem({
      name: data.name,
      quantity: data.quantity,
      minQuantityAlert: data.minQuantityAlert,
      unitPrice: data.unitPrice,
      supplierId: data.supplierId || null,
      expiryDate: data.expiryDate || null,
      lastRestocked: new Date(),
    });
  }

  public async consumeFeed(feedId: string, quantityToConsume: number) {
    const feeds = await inventoryRepository.getFeedStock({});
    const feed = feeds.find((f) => f.id === feedId);

    if (!feed) {
      throw new NotFoundError(`Feed stock with ID ${feedId} not found`);
    }

    const currentQty = Number(feed.quantity);
    if (currentQty < quantityToConsume) {
      throw new BadRequestError(`Insufficient feed stock. Current: ${currentQty}kg, Requested: ${quantityToConsume}kg`);
    }

    const updatedQty = currentQty - quantityToConsume;
    const updatedFeed = await inventoryRepository.updateFeedItem(feedId, {
      quantity: updatedQty,
    });

    // Check low stock threshold alert
    if (updatedQty <= Number(feed.minQuantityAlert)) {
      // Trigger user alerts
      await systemRepository.createNotification({
        userId: 'system-alerts', // Generic channel or owner ID
        title: 'LOW STOCK ALERT: Feed Inventory',
        message: `Feed stock "${feed.name}" is running low. Current quantity: ${updatedQty}kg (Alert threshold: ${feed.minQuantityAlert}kg)`,
        type: 'INVENTORY',
      });
    }

    return updatedFeed;
  }

  // --- Medicine Stocks ---
  public async getMedicineStock(params: { search?: string }) {
    return inventoryRepository.getMedicineStock(params);
  }

  public async addMedicineItem(data: {
    name: string;
    batchNumber: string;
    quantity: number;
    minQuantityAlert: number;
    unitPrice: number;
    supplierId?: string;
    expiryDate?: Date;
  }) {
    return inventoryRepository.createMedicineItem({
      name: data.name,
      batchNumber: data.batchNumber,
      quantity: data.quantity,
      minQuantityAlert: data.minQuantityAlert,
      unitPrice: data.unitPrice,
      supplierId: data.supplierId || null,
      expiryDate: data.expiryDate || null,
      lastRestocked: new Date(),
    });
  }

  public async consumeMedicine(medicineId: string, quantityToConsume: number) {
    const medicines = await inventoryRepository.getMedicineStock({});
    const medicine = medicines.find((m) => m.id === medicineId);

    if (!medicine) {
      throw new NotFoundError(`Medicine batch with ID ${medicineId} not found`);
    }

    const currentQty = medicine.quantity;
    if (currentQty < quantityToConsume) {
      throw new BadRequestError(`Insufficient medicine stock. Current: ${currentQty} units, Requested: ${quantityToConsume} units`);
    }

    const updatedQty = currentQty - quantityToConsume;
    const updatedMed = await inventoryRepository.updateMedicineItem(medicineId, {
      quantity: updatedQty,
    });

    // Check low stock threshold alert
    if (updatedQty <= medicine.minQuantityAlert) {
      await systemRepository.createNotification({
        userId: 'system-alerts',
        title: 'LOW STOCK ALERT: Medicine Cabinet',
        message: `Medicine stock "${medicine.name}" (Batch: ${medicine.batchNumber}) is running low. Current level: ${updatedQty} units`,
        type: 'INVENTORY',
      });
    }

    return updatedMed;
  }

  // --- Equipment ---
  public async getEquipment(params: { status?: string }) {
    return inventoryRepository.getEquipment(params);
  }

  public async registerEquipment(data: { name: string; serialNumber?: string; cost: number; purchaseDate: Date }) {
    return inventoryRepository.createEquipmentItem({
      name: data.name,
      serialNumber: data.serialNumber || null,
      cost: data.cost,
      purchaseDate: data.purchaseDate,
      status: 'OPERATIONAL',
    });
  }

  public async updateEquipmentStatus(id: string, status: 'OPERATIONAL' | 'UNDER_MAINTENANCE' | 'BROKEN') {
    return inventoryRepository.updateEquipmentItem(id, { status });
  }

  // --- Suppliers & Purchase Orders ---
  public async getSuppliers() {
    return inventoryRepository.getSuppliers();
  }

  public async registerSupplier(data: { name: string; contactPerson?: string; phone: string; email?: string; address?: string }) {
    return inventoryRepository.createSupplier(data);
  }

  public async getPurchaseOrders(params: { supplierId?: string; status?: string }) {
    return inventoryRepository.getPurchaseOrders(params);
  }

  public async placePurchaseOrder(data: {
    supplierId: string;
    totalAmount: number;
    items: any[];
  }, loggedByUserId: string) {
    const order = await inventoryRepository.createPurchaseOrder({
      supplierId: data.supplierId,
      totalAmount: data.totalAmount,
      items: JSON.stringify(data.items),
      status: 'PENDING',
    });

    // Create financial purchase invoice
    const invoiceNum = `INV-PO-${Date.now()}`;
    const invoice = await financeRepository.createInvoice({
      invoiceNumber: invoiceNum,
      invoiceDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days credit terms
      totalAmount: data.totalAmount,
      balanceAmount: data.totalAmount,
      status: 'UNPAID',
      supplierId: data.supplierId,
      type: 'PURCHASE',
    });

    // Record as Finance Expense record
    await financeRepository.createExpense({
      category: 'FEED', // Typically inventory rests are logged here
      amount: data.totalAmount,
      date: new Date(),
      description: `Purchase Order placed to Supplier ID: ${data.supplierId}`,
      invoiceId: invoice.id,
      recordedById: loggedByUserId,
    });

    return order;
  }
}

export default new InventoryService();
