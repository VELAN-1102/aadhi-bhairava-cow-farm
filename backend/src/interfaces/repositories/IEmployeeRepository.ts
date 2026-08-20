import { Employee, Attendance, Payroll, Task, Prisma } from '@prisma/client';

export interface IEmployeeRepository {
  getEmployees(params: {
    page: number;
    limit: number;
    search?: string;
    department?: string;
    status?: string;
  }): Promise<{ total: number; data: any[] }>;
  getEmployeeById(id: string): Promise<any>;
  createEmployee(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>;
  updateEmployee(id: string, data: Prisma.EmployeeUncheckedUpdateInput): Promise<Employee>;
  deleteEmployee(id: string): Promise<Employee>;
  
  getAttendance(params: { date: Date; department?: string }): Promise<any[]>;
  getEmployeeAttendanceHistory(employeeId: string, startDate?: Date, endDate?: Date): Promise<Attendance[]>;
  logAttendance(data: Prisma.AttendanceUncheckedCreateInput): Promise<Attendance>;
  
  getPayrollRecords(params: { startDate?: Date; endDate?: Date; status?: string }): Promise<any[]>;
  generatePayroll(data: Prisma.PayrollUncheckedCreateInput): Promise<Payroll>;
  updatePayrollStatus(id: string, status: string, paymentDate?: Date): Promise<Payroll>;
  
  getTasks(params: { assignedToId?: string; status?: string; priority?: string }): Promise<any[]>;
  createTask(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;
  updateTask(id: string, data: Prisma.TaskUncheckedUpdateInput): Promise<Task>;
}
