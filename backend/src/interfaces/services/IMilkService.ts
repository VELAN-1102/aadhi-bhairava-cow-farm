import { MilkCollection, MilkSale } from '@prisma/client';

export interface IMilkService {
  getCollections(params: {
    page: number;
    limit: number;
    startDate?: Date;
    endDate?: Date;
    cowId?: string;
    shift?: string;
  }): Promise<{ total: number; data: any[] }>;
  
  logCollection(data: {
    cowId?: string;
    quantity: number;
    shift: 'MORNING' | 'EVENING';
    date: Date;
    fatPercentage: number;
    snfPercentage: number;
    temperature?: number;
    collectedBy?: string;
    notes?: string;
  }): Promise<any>;
  
  getMilkSales(params: {
    page: number;
    limit: number;
    customerId?: string;
    paymentStatus?: string;
  }): Promise<{ total: number; data: MilkSale[] }>;
  
  logMilkSale(data: {
    customerId: string;
    date: Date;
    quantity: number;
    ratePerLiter: number;
    notes?: string;
  }): Promise<MilkSale>;
}
