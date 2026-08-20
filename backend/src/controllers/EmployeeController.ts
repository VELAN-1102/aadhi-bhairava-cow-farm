import { Request, Response, NextFunction } from 'express';
import employeeService from '../services/EmployeeService';
import sendResponse from '../utils/response';
import systemService from '../services/SystemService';

export const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const department = req.query.department as string;
    const status = req.query.status as string;

    const result = await employeeService.getEmployees({
      page,
      limit,
      search,
      department,
      status,
    });

    return sendResponse(res, req, 200, 'Employee directory fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    return sendResponse(res, req, 200, 'Employee details fetched successfully', employee);
  } catch (error) {
    next(error);
  }
};

export const registerEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.registerEmployee({
      ...req.body,
      joinDate: new Date(req.body.joinDate),
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'CREATE_EMPLOYEE', `Registered employee ${employee.name}`);
    }

    return sendResponse(res, req, 201, 'Employee registered successfully', employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'UPDATE_EMPLOYEE', `Updated employee ID ${req.params.id}`);
    }

    return sendResponse(res, req, 200, 'Employee details updated successfully', employee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await employeeService.deleteEmployee(req.params.id);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'DELETE_EMPLOYEE', `Deleted employee ID ${req.params.id}`);
    }

    return sendResponse(res, req, 200, 'Employee removed successfully');
  } catch (error) {
    next(error);
  }
};

export const logAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await employeeService.logAttendance({
      ...req.body,
      date: new Date(req.body.date),
      checkIn: req.body.checkIn ? new Date(req.body.checkIn) : undefined,
      checkOut: req.body.checkOut ? new Date(req.body.checkOut) : undefined,
    });

    return sendResponse(res, req, 200, 'Attendance logged successfully', attendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = req.query.date ? new Date(req.query.date as string) : new Date();
    const department = req.query.department as string;

    const result = await employeeService.getAttendance({ date, department });
    return sendResponse(res, req, 200, 'Attendance register fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getPayrollRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const status = req.query.status as string;

    const result = await employeeService.getPayrollRecords({ startDate, endDate, status });
    return sendResponse(res, req, 200, 'Payroll ledger fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const issuePayroll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payroll = await employeeService.issuePayroll({
      ...req.body,
      payPeriodStart: new Date(req.body.payPeriodStart),
      payPeriodEnd: new Date(req.body.payPeriodEnd),
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'ISSUE_PAYROLL', `Generated payroll slip for Employee ID ${req.body.employeeId}`);
    }

    return sendResponse(res, req, 201, 'Payroll payslip generated successfully', payroll);
  } catch (error) {
    next(error);
  }
};

export const processPayrollPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordedByUserId = req.user?.userId || 'unknown-user';
    const payroll = await employeeService.processPayrollPayment(req.params.id, recordedByUserId);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'PAY_PAYROLL', `Approved payroll disbursement ID ${req.params.id}`);
    }

    return sendResponse(res, req, 200, 'Payroll salary paid successfully and logged as expense', payroll);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignedToId = req.query.assignedToId as string;
    const status = req.query.status as string;
    const priority = req.query.priority as string;

    const result = await employeeService.getTasks({ assignedToId, status, priority });
    return sendResponse(res, req, 200, 'Task board logs fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await employeeService.createTask({
      ...req.body,
      dueDate: new Date(req.body.dueDate),
    });

    return sendResponse(res, req, 201, 'Task assigned successfully', task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await employeeService.updateTaskStatus(req.params.id, req.body.status);
    return sendResponse(res, req, 200, 'Task status updated successfully', task);
  } catch (error) {
    next(error);
  }
};
