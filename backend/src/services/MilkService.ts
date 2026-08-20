import milkRepository from '../repositories/MilkRepository';
import cowService from './CowService';
import financeRepository from '../repositories/FinanceRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IMilkService } from '../interfaces/services/IMilkService';

export class MilkService implements IMilkService {
  public async getCollections(params: {
    page: number;
    limit: number;
    startDate?: Date;
    endDate?: Date;
    cowId?: string;
    shift?: string;
  }) {
    return milkRepository.getCollections(params);
  }

  public async logCollection(data: {
    cowId?: string;
    quantity: number;
    shift: 'MORNING' | 'EVENING';
    date: Date;
    fatPercentage: number;
    snfPercentage: number;
    temperature?: number;
    collectedBy?: string;
    notes?: string;
  }) {
    if (data.cowId) {
      const cow = await cowService.getCowById(data.cowId);
      if (cow.status !== 'LACTATING') {
        throw new BadRequestError(`Cattle with tag ${cow.tagNumber} is currently not in lactating status (status: ${cow.status})`);
      }
    }

    // Create the milk collection record
    const collection = await milkRepository.createCollection({
      cowId: data.cowId || null,
      quantity: data.quantity,
      shift: data.shift,
      date: data.date,
      fatPercentage: data.fatPercentage,
      snfPercentage: data.snfPercentage,
      temperature: data.temperature || null,
      collectedBy: data.collectedBy || null,
      notes: data.notes || null,
    });

    // Auto-calculate milk quality rating
    // Standard fat levels: Excellent (>4.5% fat), Good (>3.5% fat), Poor (<3.0%)
    let status = 'GOOD';
    if (data.fatPercentage >= 4.5) status = 'EXCELLENT';
    else if (data.fatPercentage < 3.2) status = 'FAIR';
    else if (data.fatPercentage < 2.8) status = 'POOR';

    // Auto calculate density from fat and SNF (typical formula: Density = (SNF / 0.25) + (Fat * 0.72) + 1000)
    // For representation, we use density as fat/snf ratio indices
    const density = 1.0 + (data.snfPercentage / 100);

    await milkRepository.createQualityRecord({
      collectionId: collection.id,
      fatPercent: data.fatPercentage,
      snfPercent: data.snfPercentage,
      density,
      acidity: 0.15, // standard lactic acidity percentage
      status,
    });

    return milkRepository.getCollectionById(collection.id);
  }

  public async getMilkSales(params: {
    page: number;
    limit: number;
    customerId?: string;
    paymentStatus?: string;
  }) {
    return milkRepository.getMilkSales(params);
  }

  public async logMilkSale(data: {
    customerId: string;
    date: Date;
    quantity: number;
    ratePerLiter: number;
    notes?: string;
  }) {
    const totalAmount = data.quantity * data.ratePerLiter;

    // Create invoice record first (Milestone 4 Finance dependency)
    const invoiceNum = `INV-SALE-${Date.now()}`;
    const invoice = await financeRepository.createInvoice({
      invoiceNumber: invoiceNum,
      invoiceDate: data.date,
      dueDate: new Date(data.date.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days due
      totalAmount,
      balanceAmount: totalAmount,
      status: 'UNPAID',
      customerId: data.customerId,
      type: 'SALE',
    });

    // Create milk sale record
    const sale = await milkRepository.createMilkSale({
      customerId: data.customerId,
      date: data.date,
      quantity: data.quantity,
      ratePerLiter: data.ratePerLiter,
      totalAmount,
      paymentStatus: 'UNPAID',
      invoiceId: invoice.id,
    });

    // Log corresponding business Income
    await financeRepository.createIncome({
      source: 'MILK_SALES',
      amount: totalAmount,
      date: data.date,
      description: `Milk Sales: ${data.quantity}L @ Rs.${data.ratePerLiter}/L to Customer ID: ${data.customerId}`,
      invoiceId: invoice.id,
      recordedById: 'system-agent', // System auto log
      customerId: data.customerId,
    });

    return sale;
  }
}

export default new MilkService();
