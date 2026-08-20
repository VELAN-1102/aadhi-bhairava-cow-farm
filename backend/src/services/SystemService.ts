import systemRepository from '../repositories/SystemRepository';
import { NotFoundError } from '../utils/errors';
import { ISystemService } from '../interfaces/services/ISystemService';

export class SystemService implements ISystemService {
  public async getUserNotifications(userId: string) {
    return systemRepository.getUserNotifications(userId);
  }

  public async createNotification(userId: string, title: string, message: string, type: string) {
    return systemRepository.createNotification({ userId, title, message, type });
  }

  public async markNotificationRead(id: string) {
    return systemRepository.markNotificationAsRead(id);
  }

  public async getSettings() {
    return systemRepository.getSettings();
  }

  public async updateSettings(settings: Record<string, string>) {
    const updatedSettings = [];
    for (const [key, value] of Object.entries(settings)) {
      const updated = await systemRepository.updateSetting(key, value);
      updatedSettings.push(updated);
    }
    return updatedSettings;
  }

  public async getAuditLogs(params: { page: number; limit: number; userId?: string }) {
    return systemRepository.getAuditLogs(params);
  }

  public async getActivityLogs(params: { page: number; limit: number; userId?: string }) {
    return systemRepository.getActivityLogs(params);
  }

  public async logAuditTrail(userId: string, action: string, details?: string, ipAddress?: string, userAgent?: string) {
    return systemRepository.logAudit({ userId, action, details, ipAddress, userAgent });
  }

  public async recordUserActivity(userId: string, activityType: string, description: string) {
    return systemRepository.logActivity({ userId, activityType, description });
  }

  public async fetchLocalWeather() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let weather = await systemRepository.getWeatherForDate(today);
    if (!weather) {
      // Simulate smart weather data for agriculture mapping
      weather = await systemRepository.logWeatherData({
        date: today,
        temperature: 32.5, // Celcius
        humidity: 68.0, // percent
        rainfall: 0.0, // mm
        forecast: 'Sunny and warm, perfect for cow grazing',
      });
    }

    return weather;
  }

  public async getAIRecommendations(cowId?: string) {
    return systemRepository.getAIRecommendations(cowId);
  }
}

export default new SystemService();
