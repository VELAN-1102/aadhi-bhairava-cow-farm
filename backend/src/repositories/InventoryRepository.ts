import prisma from '../utils/prisma';
import { FeedInventory, MedicineInventory, Equipment, Supplier, PurchaseOrder, Prisma } from '@prisma/client';
import { IInventoryRepository } from '../interfaces/repositories/IInventoryRepository';

export class InventoryRepository implements IInventoryRepository {
  // --- Feed Stock CRUD ---
  public async getFeedStock(params: {
    search?: string;
  }) {
    const { search } = params;
    const whereClause: Prisma.FeedInventoryWhereInput = {};
    if (search) {
      whereClause.name = { contains: search, mode: 'insensitive' };
    }
    return prisma.feedInventory.findMany({
      where: whereClause,
      include: { supplier: true },
      orderBy: { name: 'asc' },
    });
  }

  public async createFeedItem(data: Prisma.FeedInventoryUncheckedCreateInput): Promise<FeedInventory> {
    return prisma.feedInventory.create({ data });
  }

  public async updateFeedItem(id: string, data: Prisma.FeedInventoryUncheckedUpdateInput): Promise<FeedInventory> {
    return prisma.feedInventory.update({ where: { id }, data });
  }

  // --- Medicine Stock CRUD ---
  public async getMedicineStock(params: {
    search?: string;
  }) {
    const { search } = params;
    const whereClause: Prisma.MedicineInventoryWhereInput = {};
    if (search) {
      whereClause.name = { contains: search, mode: 'insensitive' };
    }
    return prisma.medicineInventory.findMany({
      where: whereClause,
      include: { supplier: true },
      orderBy: { name: 'asc' },
    });
  }

  public async createMedicineItem(data: Prisma.MedicineInventoryUncheckedCreateInput): Promise<MedicineInventory> {
    return prisma.medicineInventory.create({ data });
  }

  public async updateMedicineItem(id: string, data: Prisma.MedicineInventoryUncheckedUpdateInput): Promise<MedicineInventory> {
    return prisma.medicineInventory.update({ where: { id }, data });
  }

  // --- Equipment Logs ---
  public async getEquipment(params: {
    status?: string;
  }) {
    const { status } = params;
    const whereClause: Prisma.EquipmentWhereInput = {};
    if (status) whereClause.status = status;
    return prisma.equipment.findMany({
      where: whereClause,
      orderBy: { name: 'asc' },
    });
  }

  public async createEquipmentItem(data: Prisma.EquipmentCreateInput): Promise<Equipment> {
    return prisma.equipment.create({ data });
  }

  public async updateEquipmentItem(id: string, data: Prisma.EquipmentUpdateInput): Promise<Equipment> {
    return prisma.equipment.update({ where: { id }, data });
  }

  // --- Supplier Directory ---
  public async getSuppliers(): Promise<Supplier[]> {
    return prisma.supplier.findMany({
      orderBy: { name: 'asc' },
    });
  }

  public async createSupplier(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    return prisma.supplier.create({ data });
  }

  // --- Purchase Orders ---
  public async getPurchaseOrders(params: {
    supplierId?: string;
    status?: string;
  }) {
    const { supplierId, status } = params;
    const whereClause: Prisma.PurchaseOrderWhereInput = {};
    if (supplierId) whereClause.supplierId = supplierId;
    if (status) whereClause.status = status;

    return prisma.purchaseOrder.findMany({
      where: whereClause,
      include: { supplier: true },
      orderBy: { orderDate: 'desc' },
    });
  }

  public async createPurchaseOrder(data: Prisma.PurchaseOrderUncheckedCreateInput): Promise<PurchaseOrder> {
    return prisma.purchaseOrder.create({ data });
  }

  public async updatePurchaseOrderStatus(id: string, status: string): Promise<PurchaseOrder> {
    return prisma.purchaseOrder.update({
      where: { id },
      data: { status },
    });
  }
}

export default new InventoryRepository();
