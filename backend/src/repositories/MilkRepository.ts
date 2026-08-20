import prisma from '../utils/prisma';
import { MilkCollection, MilkQuality, MilkSale, Prisma } from '@prisma/client';
import { IMilkRepository } from '../interfaces/repositories/IMilkRepository';

export class MilkRepository implements IMilkRepository {
  // --- Milk Collection CRUD ---
  public async getCollections(params: {
    page: number;
    limit: number;
    startDate?: Date;
    endDate?: Date;
    cowId?: string;
    shift?: string;
  }) {
    const { page, limit, startDate, endDate, cowId, shift } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.MilkCollectionWhereInput = {};

    if (cowId) whereClause.cowId = cowId;
    if (shift) whereClause.shift = shift;
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = startDate;
      if (endDate) whereClause.date.lte = endDate;
    }

    const [total, data] = await prisma.$transaction([
      prisma.milkCollection.count({ where: whereClause }),
      prisma.milkCollection.findMany({
        where: whereClause,
        include: { cow: true, qualityRecords: true },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
    ]);

    return { total, data };
  }

  public async getCollectionById(id: string) {
    return prisma.milkCollection.findUnique({
      where: { id },
      include: { cow: true, qualityRecords: true },
    });
  }

  public async createCollection(data: Prisma.MilkCollectionUncheckedCreateInput): Promise<MilkCollection> {
    return prisma.milkCollection.create({ data });
  }

  public async updateCollection(id: string, data: Prisma.MilkCollectionUncheckedUpdateInput): Promise<MilkCollection> {
    return prisma.milkCollection.update({ where: { id }, data });
  }

  public async deleteCollection(id: string): Promise<MilkCollection> {
    return prisma.milkCollection.delete({ where: { id } });
  }

  // --- Quality Control ---
  public async getQualityRecords(collectionId: string): Promise<MilkQuality[]> {
    return prisma.milkQuality.findMany({ where: { collectionId } });
  }

  public async createQualityRecord(data: Prisma.MilkQualityUncheckedCreateInput): Promise<MilkQuality> {
    return prisma.milkQuality.create({ data });
  }

  // --- Milk Sales ---
  public async getMilkSales(params: {
    page: number;
    limit: number;
    customerId?: string;
    paymentStatus?: string;
  }) {
    const { page, limit, customerId, paymentStatus } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.MilkSaleWhereInput = {};
    if (customerId) whereClause.customerId = customerId;
    if (paymentStatus) whereClause.paymentStatus = paymentStatus;

    const [total, data] = await prisma.$transaction([
      prisma.milkSale.count({ where: whereClause }),
      prisma.milkSale.findMany({
        where: whereClause,
        include: { customer: true, invoice: true },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
    ]);

    return { total, data };
  }

  public async createMilkSale(data: Prisma.MilkSaleUncheckedCreateInput): Promise<MilkSale> {
    return prisma.milkSale.create({ data });
  }

  public async updateMilkSaleStatus(id: string, paymentStatus: string): Promise<MilkSale> {
    return prisma.milkSale.update({
      where: { id },
      data: { paymentStatus },
    });
  }

  // --- Aggregations & Analytics ---
  public async getMilkProductionSummary(startDate: Date, endDate: Date) {
    const summary = await prisma.milkCollection.groupBy({
      by: ['shift'],
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        quantity: true,
      },
      _avg: {
        fatPercentage: true,
        snfPercentage: true,
      },
    });

    return summary;
  }
}

export default new MilkRepository();
