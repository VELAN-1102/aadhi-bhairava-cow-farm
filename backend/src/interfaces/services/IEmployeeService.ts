import { Employee, Attendance, Payroll, Task } from '@prisma/client';

export interface IEmployeeService {
  getEmployees(params: {
    page: number;
    limit: number;
    search?: string;
    department?: string;
    status?: string;
  }): Promise<{ total: number; data: any[] }>;
  
  getEmployeeById(id: string): Promise<any>;
  
  registerEmployee(data: {
    userId?: string;
    name: string;
    email: string;
    phone: string;
    designation: string;
    department: string;
    joinDate: Date;
    salary: number;
  }): Promise<Employee>;
  
  updateEmployee(id: string, data: any): Promise<Employee>;
  deleteEmployee(id: string): Promise<Employee>;
  
  logAttendance(data: {
    employeeId: string;
    date: Date;
    checkIn?: Date;
    checkOut?: Date;
    status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'LATE';
    notes?: string;
  }): Promise<Attendance>;
  
  getAttendance(params: { date: Date; department?: string }): Promise<any[]>;
  getPayrollRecords(params: { startDate?: Date; endDate?: Date; status?: string }): Promise<any[]>;
  
  issuePayroll(data: {
    employeeId: string;
    payPeriodStart: Date;
    payPeriodEnd: Date;
    allowances?: number;
    deductions?: number;
  }): Promise<Payroll>;
  
  processPayrollPayment(payrollId: string, recordedByUserId: string): Promise<Payroll>;
  
  getTasks(params: { assignedToId?: string; status?: string; priority?: string }): Promise<any[]>;
  createTask(data: {
    title: string;
    description?: string;
    assignedToId: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate: Date;
  }): Promise<Task>;
  
  updateTaskStatus(taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'): Promise<Task>;
}
