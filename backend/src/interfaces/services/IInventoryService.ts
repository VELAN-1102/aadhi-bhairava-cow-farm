import { FeedInventory, MedicineInventory, Equipment, Supplier, PurchaseOrder } from '@prisma/client';

export interface IInventoryService {
  getFeedStock(params: { search?: string }): Promise<any[]>;
  addFeedItem(data: {
    name: string;
    quantity: number;
    minQuantityAlert: number;
    unitPrice: number;
    supplierId?: string;
    expiryDate?: Date;
  }): Promise<FeedInventory>;
  consumeFeed(feedId: string, quantityToConsume: number): Promise<FeedInventory>;
  
  getMedicineStock(params: { search?: string }): Promise<any[]>;
  addMedicineItem(data: {
    name: string;
    batchNumber: string;
    quantity: number;
    minQuantityAlert: number;
    unitPrice: number;
    supplierId?: string;
    expiryDate?: Date;
  }): Promise<MedicineInventory>;
  consumeMedicine(medicineId: string, quantityToConsume: number): Promise<MedicineInventory>;
  
  getEquipment(params: { status?: string }): Promise<Equipment[]>;
  registerEquipment(data: { name: string; serialNumber?: string; cost: number; purchaseDate: Date }): Promise<Equipment>;
  updateEquipmentStatus(id: string, status: 'OPERATIONAL' | 'UNDER_MAINTENANCE' | 'BROKEN'): Promise<Equipment>;
  
  getSuppliers(): Promise<Supplier[]>;
  registerSupplier(data: { name: string; contactPerson?: string; phone: string; email?: string; address?: string }): Promise<Supplier>;
  
  getPurchaseOrders(params: { supplierId?: string; status?: string }): Promise<any[]>;
  placePurchaseOrder(data: {
    supplierId: string;
    totalAmount: number;
    items: any[];
  }, loggedByUserId: string): Promise<PurchaseOrder>;
}
