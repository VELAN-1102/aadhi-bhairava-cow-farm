import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  logAttendance,
  getAttendance,
  getPayrollRecords,
  issuePayroll,
  processPayrollPayment,
  getTasks,
  createTask,
  updateTaskStatus,
} from '../controllers/EmployeeController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Attendance routes
router.get('/attendance', requirePermissions(['read:employees']), getAttendance);
router.post('/attendance', requirePermissions(['manage:employees']), logAttendance);

// Payroll routes
router.get('/payroll', requirePermissions(['read:employees']), getPayrollRecords);
router.post('/payroll', requirePermissions(['manage:employees']), issuePayroll);
router.post('/payroll/:id/pay', requirePermissions(['manage:employees']), processPayrollPayment);

// Tasks routes
router.get('/tasks', requirePermissions(['read:employees']), getTasks);
router.post('/tasks', requirePermissions(['manage:employees']), createTask);
router.put('/tasks/:id', requirePermissions(['manage:employees']), updateTaskStatus);

// Core Employee CRUD
router.get('/', requirePermissions(['read:employees']), getEmployees);
router.post('/', requirePermissions(['manage:employees']), registerEmployee);
router.get('/:id', requirePermissions(['read:employees']), getEmployeeById);
router.put('/:id', requirePermissions(['manage:employees']), updateEmployee);
router.delete('/:id', requirePermissions(['manage:employees']), deleteEmployee);

export default router;
