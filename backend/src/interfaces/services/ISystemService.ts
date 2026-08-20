import { Notification, Setting, AuditLog, ActivityLog, Weather, AIRecommendation } from '@prisma/client';

export interface ISystemService {
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(userId: string, title: string, message: string, type: string): Promise<Notification>;
  markNotificationRead(id: string): Promise<Notification>;
  
  getSettings(): Promise<Setting[]>;
  updateSettings(settings: Record<string, string>): Promise<Setting[]>;
  
  getAuditLogs(params: { page: number; limit: number; userId?: string }): Promise<{ total: number; data: any[] }>;
  getActivityLogs(params: { page: number; limit: number; userId?: string }): Promise<{ total: number; data: any[] }>;
  
  logAuditTrail(userId: string, action: string, details?: string, ipAddress?: string, userAgent?: string): Promise<AuditLog>;
  recordUserActivity(userId: string, activityType: string, description: string): Promise<ActivityLog>;
  
  fetchLocalWeather(): Promise<Weather>;
  getAIRecommendations(cowId?: string): Promise<any[]>;
}
