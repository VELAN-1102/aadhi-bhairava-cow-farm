import { Income, Expense, Invoice, Customer, Prisma } from '@prisma/client';

export interface IFinanceRepository {
  getIncomes(params: { startDate?: Date; endDate?: Date; source?: string }): Promise<any[]>;
  createIncome(data: Prisma.IncomeUncheckedCreateInput): Promise<Income>;
  
  getExpenses(params: { startDate?: Date; endDate?: Date; category?: string }): Promise<any[]>;
  createExpense(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>;
  
  getInvoices(params: { status?: string; type?: string }): Promise<any[]>;
  createInvoice(data: Prisma.InvoiceUncheckedCreateInput): Promise<Invoice>;
  updateInvoicePayment(id: string, paidAmount: number, balanceAmount: number, status: string): Promise<Invoice>;
  
  getCustomers(): Promise<Customer[]>;
  createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer>;
  
  getFinanceSummary(startDate: Date, endDate: Date): Promise<{ income: number; expense: number }>;
}
