import * as Network from 'expo-network';
import { getOfflineActions, deleteOfflineAction, incrementAttempts, OfflineAction } from '../database/sqlite';
import apiClient from '../api/client';
import { logger } from '../utils/logger';
import * as Notifications from 'expo-notifications';

class SyncService {
  private isSyncing = false;

  /**
   * Monitor network connection status and run sync automatically
   */
  public async checkAndSync(): Promise<void> {
    try {
      const state = await Network.getNetworkStateAsync();
      
      if (state.isConnected && state.isInternetReachable && !this.isSyncing) {
        await this.syncQueue();
      }
    } catch (error) {
      logger.error('Failed checking network status for sync:', error);
    }
  }

  /**
   * Sync all queued local SQLite operations to the REST API
   */
  private async syncQueue(): Promise<void> {
    const queue = getOfflineActions();
    if (queue.length === 0) return;

    this.isSyncing = true;
    logger.info(`Starting synchronization of ${queue.length} offline operations...`);

    let successCount = 0;
    let failCount = 0;

    for (const item of queue) {
      const success = await this.syncItem(item);
      if (success) {
        successCount++;
        deleteOfflineAction(item.id);
      } else {
        failCount++;
        incrementAttempts(item.id);
      }
    }

    this.isSyncing = false;
    logger.info(`Sync finished. Successes: ${successCount}, Failures: ${failCount}`);

    // Trigger local push notification alert on sync completion
    if (successCount > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Offline Data Synced',
          body: `Successfully synchronized ${successCount} queued records to the server.`,
          sound: true,
        },
        trigger: null, // deliver immediately
      });
    }
  }

  /**
   * Sync a single item to the REST API
   */
  private async syncItem(item: OfflineAction): Promise<boolean> {
    const payload = JSON.parse(item.payload);
    
    try {
      switch (item.action) {
        case 'milk_collection':
          await apiClient.post('/milk/collection', payload);
          return true;
        case 'attendance':
          await apiClient.post('/employee/attendance', payload);
          return true;
        case 'cow_register':
          await apiClient.post('/cows', payload);
          return true;
        case 'cow_health':
          await apiClient.put(`/cows/${payload.id}`, payload);
          return true;
        case 'vaccination':
          await apiClient.post('/vet/vaccination', payload);
          return true;
        case 'inventory_update':
          await apiClient.post('/inventory', payload);
          return true;
        default:
          logger.warn(`Unknown offline action type: ${item.action}`);
          return true; // Skip and remove invalid items
      }
    } catch (error) {
      logger.error(`Syncing action ID ${item.id} (${item.action}) failed:`, error);
      return false;
    }
  }
}

export default new SyncService();
