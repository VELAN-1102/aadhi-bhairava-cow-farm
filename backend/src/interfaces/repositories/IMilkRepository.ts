import { MilkCollection, MilkQuality, MilkSale, Prisma } from '@prisma/client';

export interface IMilkRepository {
  getCollections(params: {
    page: number;
    limit: number;
    startDate?: Date;
    endDate?: Date;
    cowId?: string;
    shift?: string;
  }): Promise<{ total: number; data: any[] }>;
  getCollectionById(id: string): Promise<any>;
  createCollection(data: Prisma.MilkCollectionUncheckedCreateInput): Promise<MilkCollection>;
  updateCollection(id: string, data: Prisma.MilkCollectionUncheckedUpdateInput): Promise<MilkCollection>;
  deleteCollection(id: string): Promise<MilkCollection>;
  
  getQualityRecords(collectionId: string): Promise<MilkQuality[]>;
  createQualityRecord(data: Prisma.MilkQualityUncheckedCreateInput): Promise<MilkQuality>;
  
  getMilkSales(params: {
    page: number;
    limit: number;
    customerId?: string;
    paymentStatus?: string;
  }): Promise<{ total: number; data: MilkSale[] }>;
  createMilkSale(data: Prisma.MilkSaleUncheckedCreateInput): Promise<MilkSale>;
  updateMilkSaleStatus(id: string, paymentStatus: string): Promise<MilkSale>;
  
  getMilkProductionSummary(startDate: Date, endDate: Date): Promise<any>;
}
