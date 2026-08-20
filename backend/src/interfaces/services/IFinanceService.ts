import { Income, Expense, Invoice, Customer } from '@prisma/client';

export interface IFinanceService {
  getIncomes(params: { startDate?: Date; endDate?: Date; source?: string }): Promise<any[]>;
  logIncome(data: {
    source: 'MILK_SALES' | 'CATTLE_SALES' | 'OTHER';
    amount: number;
    date: Date;
    description?: string;
    invoiceId?: string;
    recordedById: string;
  }): Promise<Income>;
  
  getExpenses(params: { startDate?: Date; endDate?: Date; category?: string }): Promise<any[]>;
  logExpense(data: {
    category: 'FEED' | 'MEDICINE' | 'SALARY' | 'UTILITIES' | 'EQUIPMENT' | 'VET' | 'OTHER';
    amount: number;
    date: Date;
    description?: string;
    invoiceId?: string;
    recordedById: string;
  }): Promise<Expense>;
  
  getInvoices(params: { status?: string; type?: string }): Promise<any[]>;
  applyInvoicePayment(invoiceId: string, paymentAmount: number): Promise<Invoice>;
  
  getCustomers(): Promise<Customer[]>;
  registerCustomer(data: { name: string; email?: string; phone: string; address?: string }): Promise<Customer>;
  
  getFinanceSummary(startDate: Date, endDate: Date): Promise<{
    totalIncome: number;
    totalExpense: number;
    netProfit: number;
    marginPercentage: number;
  }>;
}
