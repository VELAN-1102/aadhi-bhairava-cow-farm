export interface RegisterEmployeeDto {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joinDate: string;
  salary: number;
}

export interface UpdateEmployeeDto {
  name?: string;
  email?: string;
  phone?: string;
  designation?: string;
  department?: string;
  salary?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'LEAVE';
}

export interface LogAttendanceDto {
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'LATE';
  notes?: string;
}

export interface IssuePayrollDto {
  employeeId: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  allowances?: number;
  deductions?: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  assignedToId: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}
