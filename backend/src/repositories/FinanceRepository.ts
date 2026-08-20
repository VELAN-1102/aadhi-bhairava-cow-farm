import prisma from '../utils/prisma';
import { Income, Expense, Invoice, Customer, Prisma } from '@prisma/client';
import { IFinanceRepository } from '../interfaces/repositories/IFinanceRepository';

export class FinanceRepository implements IFinanceRepository {
  // --- Incomes ---
  public async getIncomes(params: {
    startDate?: Date;
    endDate?: Date;
    source?: string;
  }) {
    const { startDate, endDate, source } = params;
    const whereClause: Prisma.IncomeWhereInput = {};

    if (source) whereClause.source = source;
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = startDate;
      if (endDate) whereClause.date.lte = endDate;
    }

    return prisma.income.findMany({
      where: whereClause,
      include: { customer: true, invoice: true },
      orderBy: { date: 'desc' },
    });
  }

  public async createIncome(data: Prisma.IncomeUncheckedCreateInput): Promise<Income> {
    return prisma.income.create({ data });
  }

  // --- Expenses ---
  public async getExpenses(params: {
    startDate?: Date;
    endDate?: Date;
    category?: string;
  }) {
    const { startDate, endDate, category } = params;
    const whereClause: Prisma.ExpenseWhereInput = {};

    if (category) whereClause.category = category;
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = startDate;
      if (endDate) whereClause.date.lte = endDate;
    }

    return prisma.expense.findMany({
      where: whereClause,
      include: { invoice: true },
      orderBy: { date: 'desc' },
    });
  }

  public async createExpense(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense> {
    return prisma.expense.create({ data });
  }

  // --- Invoices ---
  public async getInvoices(params: {
    status?: string;
    type?: string;
  }) {
    const { status, type } = params;
    const whereClause: Prisma.InvoiceWhereInput = {};

    if (status) whereClause.status = status;
    if (type) whereClause.type = type;

    return prisma.invoice.findMany({
      where: whereClause,
      include: { customer: true, supplier: true },
      orderBy: { invoiceDate: 'desc' },
    });
  }

  public async createInvoice(data: Prisma.InvoiceUncheckedCreateInput): Promise<Invoice> {
    return prisma.invoice.create({ data });
  }

  public async updateInvoicePayment(id: string, paidAmount: number, balanceAmount: number, status: string): Promise<Invoice> {
    return prisma.invoice.update({
      where: { id },
      data: { paidAmount, balanceAmount, status },
    });
  }

  // --- Customers ---
  public async getCustomers(): Promise<Customer[]> {
    return prisma.customer.findMany({
      orderBy: { name: 'asc' },
    });
  }

  public async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return prisma.customer.create({ data });
  }

  // --- Ledger Breakdown Summary ---
  public async getFinanceSummary(startDate: Date, endDate: Date) {
    const [totalIncome, totalExpense] = await prisma.$transaction([
      prisma.income.aggregate({
        where: { date: { gte: startDate, lte: endDate } },
        _sum: { amount: true },
      }),
      prisma.expense.aggregate({
        where: { date: { gte: startDate, lte: endDate } },
        _sum: { amount: true },
      }),
    ]);

    return {
      income: totalIncome._sum.amount ? Number(totalIncome._sum.amount) : 0,
      expense: totalExpense._sum.amount ? Number(totalExpense._sum.amount) : 0,
    };
  }
}

export default new FinanceRepository();
