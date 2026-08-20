import financeRepository from '../repositories/FinanceRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IFinanceService } from '../interfaces/services/IFinanceService';

export class FinanceService implements IFinanceService {
  public async getIncomes(params: { startDate?: Date; endDate?: Date; source?: string }) {
    return financeRepository.getIncomes(params);
  }

  public async logIncome(data: {
    source: 'MILK_SALES' | 'CATTLE_SALES' | 'OTHER';
    amount: number;
    date: Date;
    description?: string;
    invoiceId?: string;
    recordedById: string;
  }) {
    return financeRepository.createIncome({
      source: data.source,
      amount: data.amount,
      date: data.date,
      description: data.description || null,
      invoiceId: data.invoiceId || null,
      recordedById: data.recordedById,
    });
  }

  public async getExpenses(params: { startDate?: Date; endDate?: Date; category?: string }) {
    return financeRepository.getExpenses(params);
  }

  public async logExpense(data: {
    category: 'FEED' | 'MEDICINE' | 'SALARY' | 'UTILITIES' | 'EQUIPMENT' | 'VET' | 'OTHER';
    amount: number;
    date: Date;
    description?: string;
    invoiceId?: string;
    recordedById: string;
  }) {
    return financeRepository.createExpense({
      category: data.category,
      amount: data.amount,
      date: data.date,
      description: data.description || null,
      invoiceId: data.invoiceId || null,
      recordedById: data.recordedById,
    });
  }

  public async getInvoices(params: { status?: string; type?: string }) {
    return financeRepository.getInvoices(params);
  }

  public async applyInvoicePayment(invoiceId: string, paymentAmount: number) {
    const invoices = await financeRepository.getInvoices({});
    const invoice = invoices.find((i) => i.id === invoiceId);

    if (!invoice) {
      throw new NotFoundError(`Invoice with ID ${invoiceId} not found`);
    }

    const currentBalance = Number(invoice.balanceAmount);
    if (paymentAmount > currentBalance) {
      throw new BadRequestError(`Payment amount (Rs.${paymentAmount}) exceeds invoice balance (Rs.${currentBalance})`);
    }

    const paidAmount = Number(invoice.paidAmount) + paymentAmount;
    const balanceAmount = currentBalance - paymentAmount;
    const status = balanceAmount === 0 ? 'PAID' : 'PARTIAL';

    return financeRepository.updateInvoicePayment(invoiceId, paidAmount, balanceAmount, status);
  }

  public async getCustomers() {
    return financeRepository.getCustomers();
  }

  public async registerCustomer(data: { name: string; email?: string; phone: string; address?: string }) {
    return financeRepository.createCustomer(data);
  }

  public async getFinanceSummary(startDate: Date, endDate: Date) {
    const ledger = await financeRepository.getFinanceSummary(startDate, endDate);
    const netProfit = ledger.income - ledger.expense;

    return {
      totalIncome: ledger.income,
      totalExpense: ledger.expense,
      netProfit,
      marginPercentage: ledger.income > 0 ? (netProfit / ledger.income) * 100 : 0,
    };
  }
}

export default new FinanceService();
