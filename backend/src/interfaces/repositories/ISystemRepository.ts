import { Notification, Setting, AuditLog, ActivityLog, Weather, AIRecommendation, Prisma } from '@prisma/client';

export interface ISystemRepository {
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(data: Prisma.NotificationUncheckedCreateInput): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<Notification>;
  
  logAudit(data: Prisma.AuditLogUncheckedCreateInput): Promise<AuditLog>;
  getAuditLogs(params: { page: number; limit: number; userId?: string }): Promise<{ total: number; data: any[] }>;
  
  logActivity(data: Prisma.ActivityLogUncheckedCreateInput): Promise<ActivityLog>;
  getActivityLogs(params: { page: number; limit: number; userId?: string }): Promise<{ total: number; data: any[] }>;
  
  getSettings(): Promise<Setting[]>;
  updateSetting(key: string, value: string): Promise<Setting>;
  
  getWeatherForDate(date: Date): Promise<Weather | null>;
  logWeatherData(data: Prisma.WeatherCreateInput): Promise<Weather>;
  
  getAIRecommendations(cowId?: string): Promise<any[]>;
  createAIRecommendation(data: Prisma.AIRecommendationUncheckedCreateInput): Promise<AIRecommendation>;
}
