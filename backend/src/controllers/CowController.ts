import { Request, Response, NextFunction } from 'express';
import cowService from '../services/CowService';
import sendResponse from '../utils/response';
import systemService from '../services/SystemService';

export const getBreeds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const breeds = await cowService.getBreeds();
    return sendResponse(res, req, 200, 'Breeds fetched successfully', breeds);
  } catch (error) {
    next(error);
  }
};

export const createBreed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const breed = await cowService.createBreed(name, description);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'CREATE_BREED', `Created breed ${name}`);
    }

    return sendResponse(res, req, 210, 'Breed created successfully', breed);
  } catch (error) {
    next(error);
  }
};

export const getCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const breedId = req.query.breedId as string;
    const status = req.query.status as string;
    const gender = req.query.gender as string;
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc';

    const result = await cowService.getCows({
      page,
      limit,
      search,
      breedId,
      status,
      gender,
      sortBy,
      sortOrder,
    });

    return sendResponse(res, req, 200, 'Cows list fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getCowById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cow = await cowService.getCowById(req.params.id);
    return sendResponse(res, req, 200, 'Cow details fetched successfully', cow);
  } catch (error) {
    next(error);
  }
};

export const registerCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cow = await cowService.registerCow({
      ...req.body,
      dateOfBirth: new Date(req.body.dateOfBirth),
      purchaseDate: req.body.purchaseDate ? new Date(req.body.purchaseDate) : undefined,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'CREATE_COW', `Registered cow tag ${cow.tagNumber}`);
    }

    return sendResponse(res, req, 201, 'Cattle registered successfully', cow);
  } catch (error) {
    next(error);
  }
};

export const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cow = await cowService.updateCow(req.params.id, req.body);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'UPDATE_COW', `Updated cow ID ${req.params.id}`);
    }

    return sendResponse(res, req, 200, 'Cattle record updated successfully', cow);
  } catch (error) {
    next(error);
  }
};

export const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cowService.deleteCow(req.params.id);

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'DELETE_COW', `Deleted cow ID ${req.params.id}`);
    }

    return sendResponse(res, req, 200, 'Cattle record deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const uploadCowPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { photoBase64, fileName, mimeType, isCover } = req.body;
    const fileBuffer = Buffer.from(photoBase64, 'base64');

    const result = await cowService.uploadCowPhoto(
      req.params.id,
      fileBuffer,
      fileName,
      mimeType,
      isCover
    );

    return sendResponse(res, req, 200, 'Cow photo uploaded successfully', result);
  } catch (error) {
    next(error);
  }
};

export const registerPregnancy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pregnancy = await cowService.registerPregnancy({
      cowId: req.params.id,
      breedingDate: new Date(req.body.breedingDate),
      breedingMethod: req.body.breedingMethod,
      bullTag: req.body.bullTag,
      notes: req.body.notes,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'CREATE_PREGNANCY', `Registered pregnancy for Cow ID ${req.params.id}`);
    }

    return sendResponse(res, req, 201, 'Pregnancy cycle registered successfully', pregnancy);
  } catch (error) {
    next(error);
  }
};

export const registerCalving = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const calving = await cowService.registerCalving({
      cowId: req.params.id,
      pregnancyId: req.body.pregnancyId,
      calvingDate: new Date(req.body.calvingDate),
      calfGender: req.body.calfGender,
      calfTagNumber: req.body.calfTagNumber,
      calfName: req.body.calfName,
      notes: req.body.notes,
    });

    if (req.user) {
      await systemService.logAuditTrail(req.user.userId, 'CREATE_CALVING', `Registered birth from pregnancy ID ${req.body.pregnancyId}`);
    }

    return sendResponse(res, req, 201, 'Calving birth event logged successfully', calving);
  } catch (error) {
    next(error);
  }
};
