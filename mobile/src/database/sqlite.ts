import * as SQLite from 'expo-sqlite';
import { logger } from '../utils/logger';

// Open or create the local SQLite database
const db = SQLite.openDatabaseSync('cowfarm_offline.db');

export interface OfflineAction {
  id: number;
  action: string;
  payload: string;
  timestamp: number;
  attempts: number;
}

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS offline_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        payload TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        attempts INTEGER DEFAULT 0
      );
    `);
    logger.info('Offline SQLite Database initialized successfully.');
  } catch (error) {
    logger.error('Failed to initialize SQLite Database:', error);
  }
};

/**
 * Queue an action to be synchronized offline
 */
export const queueOfflineAction = (action: string, payload: any): void => {
  try {
    const payloadStr = JSON.stringify(payload);
    const timestamp = Date.now();
    
    db.runSync(
      'INSERT INTO offline_queue (action, payload, timestamp, attempts) VALUES (?, ?, ?, 0)',
      [action, payloadStr, timestamp]
    );
    logger.info(`Action '${action}' queued locally in SQLite.`);
  } catch (error) {
    logger.error(`Failed to queue offline action '${action}':`, error);
  }
};

/**
 * Get all queued offline actions
 */
export const getOfflineActions = (): OfflineAction[] => {
  try {
    return db.getAllSync<OfflineAction>('SELECT * FROM offline_queue ORDER BY timestamp ASC');
  } catch (error) {
    logger.error('Failed to fetch offline queued actions:', error);
    return [];
  }
};

/**
 * Increment retry attempts for an action
 */
export const incrementAttempts = (id: number): void => {
  try {
    db.runSync('UPDATE offline_queue SET attempts = attempts + 1 WHERE id = ?', [id]);
  } catch (error) {
    logger.error(`Failed to update retry attempts for action ID ${id}:`, error);
  }
};

/**
 * Delete a synchronized action from the queue
 */
export const deleteOfflineAction = (id: number): void => {
  try {
    db.runSync('DELETE FROM offline_queue WHERE id = ?', [id]);
    logger.info(`SQLite offline queue action ID ${id} removed.`);
  } catch (error) {
    logger.error(`Failed to delete synchronized action ID ${id}:`, error);
  }
};
