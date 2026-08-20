import employeeRepository from '../repositories/EmployeeRepository';
import financeRepository from '../repositories/FinanceRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IEmployeeService } from '../interfaces/services/IEmployeeService';

export class EmployeeService implements IEmployeeService {
  public async getEmployees(params: {
    page: number;
    limit: number;
    search?: string;
    department?: string;
    status?: string;
  }) {
    return employeeRepository.getEmployees(params);
  }

  public async getEmployeeById(id: string) {
    const employee = await employeeRepository.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundError(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  public async registerEmployee(data: {
    userId?: string;
    name: string;
    email: string;
    phone: string;
    designation: string;
    department: string;
    joinDate: Date;
    salary: number;
  }) {
    return employeeRepository.createEmployee({
      userId: data.userId || null,
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation,
      department: data.department,
      joinDate: data.joinDate,
      salary: data.salary,
      status: 'ACTIVE',
    });
  }

  public async updateEmployee(id: string, data: any) {
    await this.getEmployeeById(id); // Throws NotFound if not exists
    return employeeRepository.updateEmployee(id, data);
  }

  public async deleteEmployee(id: string) {
    await this.getEmployeeById(id);
    return employeeRepository.deleteEmployee(id);
  }

  public async logAttendance(data: {
    employeeId: string;
    date: Date;
    checkIn?: Date;
    checkOut?: Date;
    status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'LATE';
    notes?: string;
  }) {
    await this.getEmployeeById(data.employeeId);
    return employeeRepository.logAttendance({
      employeeId: data.employeeId,
      date: data.date,
      checkIn: data.checkIn || null,
      checkOut: data.checkOut || null,
      status: data.status,
      notes: data.notes || null,
    });
  }

  public async getAttendance(params: { date: Date; department?: string }) {
    return employeeRepository.getAttendance(params);
  }

  public async getPayrollRecords(params: { startDate?: Date; endDate?: Date; status?: string }) {
    return employeeRepository.getPayrollRecords(params);
  }

  public async issuePayroll(data: {
    employeeId: string;
    payPeriodStart: Date;
    payPeriodEnd: Date;
    allowances?: number;
    deductions?: number;
  }) {
    const employee = await this.getEmployeeById(data.employeeId);

    const basicSalary = Number(employee.salary);
    const allowances = data.allowances || 0;
    const deductions = data.deductions || 0;
    const netSalary = basicSalary + allowances - deductions;

    // Create payroll record
    const payroll = await employeeRepository.generatePayroll({
      employeeId: data.employeeId,
      payPeriodStart: data.payPeriodStart,
      payPeriodEnd: data.payPeriodEnd,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      status: 'PENDING',
    });

    return payroll;
  }

  public async processPayrollPayment(payrollId: string, recordedByUserId: string) {
    const payrolls = await employeeRepository.getPayrollRecords({});
    const payroll = payrolls.find((p) => p.id === payrollId);

    if (!payroll) {
      throw new NotFoundError(`Payroll entry ${payrollId} not found`);
    }

    if (payroll.status === 'PAID') {
      throw new BadRequestError('This payroll record has already been marked as PAID');
    }

    // Set as paid
    const updatedPayroll = await employeeRepository.updatePayrollStatus(payrollId, 'PAID', new Date());

    // Record as Finance Expense record
    await financeRepository.createExpense({
      category: 'SALARY',
      amount: payroll.netSalary,
      date: new Date(),
      description: `Salary release for ${payroll.employee.name} (Period: ${payroll.payPeriodStart.toISOString().split('T')[0]} to ${payroll.payPeriodEnd.toISOString().split('T')[0]})`,
      recordedById: recordedByUserId,
    });

    return updatedPayroll;
  }

  public async getTasks(params: { assignedToId?: string; status?: string; priority?: string }) {
    return employeeRepository.getTasks(params);
  }

  public async createTask(data: {
    title: string;
    description?: string;
    assignedToId: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate: Date;
  }) {
    await this.getEmployeeById(data.assignedToId);
    return employeeRepository.createTask({
      title: data.title,
      description: data.description || null,
      assignedToId: data.assignedToId,
      priority: data.priority || 'MEDIUM',
      dueDate: data.dueDate,
      status: 'TODO',
    });
  }

  public async updateTaskStatus(taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE') {
    const data: any = { status };
    if (status === 'COMPLETED') {
      data.completedAt = new Date();
    }
    return employeeRepository.updateTask(taskId, data);
  }
}

export default new EmployeeService();
