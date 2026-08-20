import prisma from '../utils/prisma';
import { Notification, Setting, AuditLog, ActivityLog, Weather, AIRecommendation, Prisma } from '@prisma/client';
import { ISystemRepository } from '../interfaces/repositories/ISystemRepository';

export class SystemRepository implements ISystemRepository {
  // --- Notifications ---
  public async getUserNotifications(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async createNotification(data: Prisma.NotificationUncheckedCreateInput): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  public async markNotificationAsRead(id: string): Promise<Notification> {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  // --- Audit & Activity Logs ---
  public async logAudit(data: Prisma.AuditLogUncheckedCreateInput): Promise<AuditLog> {
    return prisma.auditLog.create({ data });
  }

  public async getAuditLogs(params: {
    page: number;
    limit: number;
    userId?: string;
  }) {
    const { page, limit, userId } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.AuditLogWhereInput = {};
    if (userId) whereClause.userId = userId;

    const [total, data] = await prisma.$transaction([
      prisma.auditLog.count({ where: whereClause }),
      prisma.auditLog.findMany({
        where: whereClause,
        include: { user: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, data };
  }

  public async logActivity(data: Prisma.ActivityLogUncheckedCreateInput): Promise<ActivityLog> {
    return prisma.activityLog.create({ data });
  }

  public async getActivityLogs(params: {
    page: number;
    limit: number;
    userId?: string;
  }) {
    const { page, limit, userId } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.ActivityLogWhereInput = {};
    if (userId) whereClause.userId = userId;

    const [total, data] = await prisma.$transaction([
      prisma.activityLog.count({ where: whereClause }),
      prisma.activityLog.findMany({
        where: whereClause,
        include: { user: true },
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
      }),
    ]);

    return { total, data };
  }

  // --- Settings ---
  public async getSettings(): Promise<Setting[]> {
    return prisma.setting.findMany();
  }

  public async updateSetting(key: string, value: string): Promise<Setting> {
    return prisma.setting.update({
      where: { key },
      data: { value },
    });
  }

  // --- Weather ---
  public async getWeatherForDate(date: Date): Promise<Weather | null> {
    return prisma.weather.findUnique({
      where: { date },
    });
  }

  public async logWeatherData(data: Prisma.WeatherCreateInput): Promise<Weather> {
    return prisma.weather.upsert({
      where: { date: data.date },
      update: data,
      create: data,
    });
  }

  // --- AI Recommendations ---
  public async getAIRecommendations(cowId?: string): Promise<AIRecommendation[]> {
    const whereClause: Prisma.AIRecommendationWhereInput = {};
    if (cowId) whereClause.cowId = cowId;

    return prisma.aIRecommendation.findMany({
      where: whereClause,
      include: { cow: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async createAIRecommendation(data: Prisma.AIRecommendationUncheckedCreateInput): Promise<AIRecommendation> {
    return prisma.aIRecommendation.create({ data });
  }
}

export default new SystemRepository();
