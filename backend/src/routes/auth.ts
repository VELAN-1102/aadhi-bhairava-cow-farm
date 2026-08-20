import { Router } from 'express';
import { register, login, refresh, getMe, logout } from '../controllers/auth';
import { registerSchema, loginSchema, refreshTokenSchema, validateBody } from '../validators/auth';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Public routes
router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', validateBody(refreshTokenSchema), refresh);

// Protected routes
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;
