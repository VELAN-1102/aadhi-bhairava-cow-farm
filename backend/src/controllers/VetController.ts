import { Request, Response, NextFunction } from 'express';
import vetService from '../services/VetService';
import sendResponse from '../utils/response';
import systemService from '../services/SystemService';

export const getMedicalRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const cowId = req.query.cowId as string;
    const status = req.query.status as string;

    const result = await vetService.getMedicalRecords({ page, limit, cowId, status });
    return sendResponse(res, req, 200, 'Medical history fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getMedicalRecordById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await vetService.getMedicalRecordById(req.params.id);
    return sendResponse(res, req, 200, 'Medical record details fetched successfully', record);
  } catch (error) {
    next(error);
  }
};

export const openMedicalRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await vetService.openMedicalRecord({
      ...req.body,
      date: new Date(req.body.date),
    });

    if (req.user) {
      await systemService.logAuditTrail(
        req.user.userId,
        'OPEN_MEDICAL_RECORD',
        `Opened medical treatment for Cow ID ${req.body.cowId}: ${req.body.diagnosis}`
      );
    }

    return sendResponse(res, req, 201, 'Medical record opened successfully and cow status set to SICK', record);
  } catch (error) {
    next(error);
  }
};

export const closeMedicalRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const additionalCost = Number(req.body.additionalCost) || 0;
    const loggedByUserId = req.user?.userId || 'unknown-user';

    const record = await vetService.closeMedicalRecord(req.params.id, additionalCost, loggedByUserId);

    if (req.user) {
      await systemService.logAuditTrail(
        req.user.userId,
        'CLOSE_MEDICAL_RECORD',
        `Closed medical record ID ${req.params.id}. final cost: ${record.cost}`
      );
    }

    return sendResponse(res, req, 200, 'Medical record closed successfully and cow status set to HEALTHY', record);
  } catch (error) {
    next(error);
  }
};

export const getVaccinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const cowId = req.query.cowId as string;
    const status = req.query.status as string;
    const dueDateRangeStart = req.query.dueDateRangeStart ? new Date(req.query.dueDateRangeStart as string) : undefined;
    const dueDateRangeEnd = req.query.dueDateRangeEnd ? new Date(req.query.dueDateRangeEnd as string) : undefined;

    const result = await vetService.getVaccinations({
      page,
      limit,
      cowId,
      status,
      dueDateRangeStart,
      dueDateRangeEnd,
    });

    return sendResponse(res, req, 200, 'Vaccination schedule fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const scheduleVaccination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vaccine = await vetService.scheduleVaccination({
      ...req.body,
      dueDate: new Date(req.body.dueDate),
    });

    return sendResponse(res, req, 201, 'Vaccination scheduled successfully', vaccine);
  } catch (error) {
    next(error);
  }
};

export const administerVaccine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const administeredBy = req.user?.email || 'Veterinarian Officer';
    const result = await vetService.administerVaccine(req.params.id, administeredBy, req.body.notes);

    if (req.user) {
      await systemService.logAuditTrail(
        req.user.userId,
        'ADMINISTER_VACCINE',
        `Administered vaccine for record ID ${req.params.id}`
      );
    }

    return sendResponse(res, req, 200, 'Vaccination updated as COMPLETED', result);
  } catch (error) {
    next(error);
  }
};

export const getDiseases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diseases = await vetService.getDiseases();
    return sendResponse(res, req, 200, 'Diseases list fetched successfully', diseases);
  } catch (error) {
    next(error);
  }
};

export const addDisease = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, symptoms, severity } = req.body;
    const disease = await vetService.addDisease(name, description, symptoms, severity);

    return sendResponse(res, req, 201, 'Disease registered successfully', disease);
  } catch (error) {
    next(error);
  }
};
