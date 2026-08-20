import { Router } from 'express';
import {
  getMedicalRecords,
  getMedicalRecordById,
  openMedicalRecord,
  closeMedicalRecord,
  getVaccinations,
  scheduleVaccination,
  administerVaccine,
  getDiseases,
  addDisease,
} from '../controllers/VetController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Medical Records
router.get('/medical', requirePermissions(['read:veterinary']), getMedicalRecords);
router.get('/medical/:id', requirePermissions(['read:veterinary']), getMedicalRecordById);
router.post('/medical', requirePermissions(['manage:veterinary']), openMedicalRecord);
router.put('/medical/:id/close', requirePermissions(['manage:veterinary']), closeMedicalRecord);

// Vaccinations
router.get('/vaccination', requirePermissions(['read:veterinary']), getVaccinations);
router.post('/vaccination', requirePermissions(['manage:veterinary']), scheduleVaccination);
router.put('/vaccination/:id/administer', requirePermissions(['manage:veterinary']), administerVaccine);

// Disease Catalogue
router.get('/disease', requirePermissions(['read:veterinary']), getDiseases);
router.post('/disease', requirePermissions(['manage:veterinary']), addDisease);

export default router;
