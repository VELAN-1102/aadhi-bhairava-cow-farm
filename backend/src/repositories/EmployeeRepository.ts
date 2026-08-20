import prisma from '../utils/prisma';
import { Employee, Attendance, Payroll, Task, Prisma } from '@prisma/client';
import { IEmployeeRepository } from '../interfaces/repositories/IEmployeeRepository';

export class EmployeeRepository implements IEmployeeRepository {
  // --- Employee Directory ---
  public async getEmployees(params: {
    page: number;
    limit: number;
    search?: string;
    department?: string;
    status?: string;
  }) {
    const { page, limit, search, department, status } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.EmployeeWhereInput = {};
    if (department) whereClause.department = department;
    if (status) whereClause.status = status;

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { designation: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await prisma.$transaction([
      prisma.employee.count({ where: whereClause }),
      prisma.employee.findMany({
        where: whereClause,
        include: { user: true },
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]);

    return { total, data };
  }

  public async getEmployeeById(id: string) {
    return prisma.employee.findUnique({
      where: { id },
      include: {
        user: true,
        attendance: { orderBy: { date: 'desc' }, take: 30 },
        payrolls: { orderBy: { payPeriodEnd: 'desc' } },
        tasks: { orderBy: { dueDate: 'asc' } },
      },
    });
  }

  public async createEmployee(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee> {
    return prisma.employee.create({ data });
  }

  public async updateEmployee(id: string, data: Prisma.EmployeeUncheckedUpdateInput): Promise<Employee> {
    return prisma.employee.update({ where: { id }, data });
  }

  public async deleteEmployee(id: string): Promise<Employee> {
    return prisma.employee.delete({ where: { id } });
  }

  // --- Attendance ---
  public async getAttendance(params: {
    date: Date;
    department?: string;
  }) {
    const { date, department } = params;
    const whereClause: Prisma.AttendanceWhereInput = {
      date: {
        equals: date,
      },
    };

    if (department) {
      whereClause.employee = { department };
    }

    return prisma.attendance.findMany({
      where: whereClause,
      include: { employee: true },
    });
  }

  public async getEmployeeAttendanceHistory(employeeId: string, startDate?: Date, endDate?: Date) {
    const whereClause: Prisma.AttendanceWhereInput = { employeeId };

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = startDate;
      if (endDate) whereClause.date.lte = endDate;
    }

    return prisma.attendance.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });
  }

  public async logAttendance(data: Prisma.AttendanceUncheckedCreateInput): Promise<Attendance> {
    return prisma.attendance.upsert({
      where: {
        id: `${data.employeeId}-${new Date(data.date).toISOString().split('T')[0]}`, // or create custom composite constraints, or select match
      },
      update: {
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        status: data.status,
        notes: data.notes,
      },
      create: data,
    });
  }

  // --- Payroll ---
  public async getPayrollRecords(params: {
    startDate?: Date;
    endDate?: Date;
    status?: string;
  }) {
    const { startDate, endDate, status } = params;
    const whereClause: Prisma.PayrollWhereInput = {};

    if (status) whereClause.status = status;
    if (startDate) {
      whereClause.payPeriodStart = { gte: startDate };
    }
    if (endDate) {
      whereClause.payPeriodEnd = { lte: endDate };
    }

    return prisma.payroll.findMany({
      where: whereClause,
      include: { employee: true },
      orderBy: { payPeriodEnd: 'desc' },
    });
  }

  public async generatePayroll(data: Prisma.PayrollUncheckedCreateInput): Promise<Payroll> {
    return prisma.payroll.create({ data });
  }

  public async updatePayrollStatus(id: string, status: string, paymentDate?: Date): Promise<Payroll> {
    return prisma.payroll.update({
      where: { id },
      data: { status, paymentDate },
    });
  }

  // --- Tasks ---
  public async getTasks(params: {
    assignedToId?: string;
    status?: string;
    priority?: string;
  }) {
    const { assignedToId, status, priority } = params;
    const whereClause: Prisma.TaskWhereInput = {};

    if (assignedToId) whereClause.assignedToId = assignedToId;
    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;

    return prisma.task.findMany({
      where: whereClause,
      include: { assignedTo: true },
      orderBy: { dueDate: 'asc' },
    });
  }

  public async createTask(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    return prisma.task.create({ data });
  }

  public async updateTask(id: string, data: Prisma.TaskUncheckedUpdateInput): Promise<Task> {
    return prisma.task.update({ where: { id }, data });
  }
}

export default new EmployeeRepository();
