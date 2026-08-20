import { Router } from 'express';
import {
  getNotifications,
  markNotificationRead,
  getSettings,
  updateSettings,
  getAuditLogs,
  getWeather,
  getRecommendations,
} from '../controllers/SystemController';
import { authenticate, requirePermissions } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

// Notification endpoints
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationRead);

// Settings
router.get('/settings', requirePermissions(['read:settings']), getSettings);
router.put('/settings', requirePermissions(['manage:settings']), updateSettings);

// Logs
router.get('/audit', requirePermissions(['read:settings']), getAuditLogs);

// Weather
router.get('/weather', getWeather);

// AI recommendations
router.get('/recommendations', getRecommendations);

export default router;
