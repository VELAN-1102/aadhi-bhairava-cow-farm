import { Request, Response, NextFunction } from 'express';
import systemService from '../services/SystemService';
import sendResponse from '../utils/response';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || '';
    const notifications = await systemService.getUserNotifications(userId);
    return sendResponse(res, req, 200, 'Notifications fetched successfully', notifications);
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await systemService.markNotificationRead(req.params.id);
    return sendResponse(res, req, 200, 'Notification marked as read successfully', notification);
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await systemService.getSettings();
    return sendResponse(res, req, 200, 'System settings fetched successfully', settings);
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await systemService.updateSettings(req.body);
    return sendResponse(res, req, 200, 'System settings updated successfully', updated);
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const userId = req.query.userId as string;

    const logs = await systemService.getAuditLogs({ page, limit, userId });
    return sendResponse(res, req, 200, 'Audit logs fetched successfully', logs);
  } catch (error) {
    next(error);
  }
};

export const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const weather = await systemService.fetchLocalWeather();
    return sendResponse(res, req, 200, 'Weather details fetched successfully', weather);
  } catch (error) {
    next(error);
  }
};

export const getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cowId = req.query.cowId as string;
    const recs = await systemService.getAIRecommendations(cowId);
    return sendResponse(res, req, 200, 'AI recommendations fetched successfully', recs);
  } catch (error) {
    next(error);
  }
};
