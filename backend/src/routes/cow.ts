import { Router } from 'express';
import {
  getBreeds,
  createBreed,
  getCows,
  getCowById,
  registerCow,
  updateCow,
  deleteCow,
  uploadCowPhoto,
  registerPregnancy,
  registerCalving,
} from '../controllers/CowController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Breed endpoints
router.get('/breeds', requirePermissions(['read:cows']), getBreeds);
router.post('/breeds', requirePermissions(['manage:cows']), createBreed);

// Cow CRUD endpoints
router.get('/', requirePermissions(['read:cows']), getCows);
router.post('/', requirePermissions(['manage:cows']), registerCow);
router.get('/:id', requirePermissions(['read:cows']), getCowById);
router.put('/:id', requirePermissions(['manage:cows']), updateCow);
router.delete('/:id', requirePermissions(['manage:cows']), deleteCow);

// Actions/Events
router.post('/:id/photos', requirePermissions(['manage:cows']), uploadCowPhoto);
router.post('/:id/pregnancy', requirePermissions(['manage:cows']), registerPregnancy);
router.post('/:id/calving', requirePermissions(['manage:cows']), registerCalving);

export default router;
