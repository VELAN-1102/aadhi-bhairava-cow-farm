import { FeedInventory, MedicineInventory, Equipment, Supplier, PurchaseOrder, Prisma } from '@prisma/client';

export interface IInventoryRepository {
  getFeedStock(params: { search?: string }): Promise<any[]>;
  createFeedItem(data: Prisma.FeedInventoryUncheckedCreateInput): Promise<FeedInventory>;
  updateFeedItem(id: string, data: Prisma.FeedInventoryUncheckedUpdateInput): Promise<FeedInventory>;
  
  getMedicineStock(params: { search?: string }): Promise<any[]>;
  createMedicineItem(data: Prisma.MedicineInventoryUncheckedCreateInput): Promise<MedicineInventory>;
  updateMedicineItem(id: string, data: Prisma.MedicineInventoryUncheckedUpdateInput): Promise<MedicineInventory>;
  
  getEquipment(params: { status?: string }): Promise<Equipment[]>;
  createEquipmentItem(data: Prisma.EquipmentCreateInput): Promise<Equipment>;
  updateEquipmentItem(id: string, data: Prisma.EquipmentUpdateInput): Promise<Equipment>;
  
  getSuppliers(): Promise<Supplier[]>;
  createSupplier(data: Prisma.SupplierCreateInput): Promise<Supplier>;
  
  getPurchaseOrders(params: { supplierId?: string; status?: string }): Promise<any[]>;
  createPurchaseOrder(data: Prisma.PurchaseOrderUncheckedCreateInput): Promise<PurchaseOrder>;
  updatePurchaseOrderStatus(id: string, status: string): Promise<PurchaseOrder>;
}
