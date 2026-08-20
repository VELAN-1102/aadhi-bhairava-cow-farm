import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initDatabase } from '../src/database/sqlite';
import syncService from '../src/offline/syncService';
import useAuthStore from '../src/store/authStore';
import * as Notifications from 'expo-notifications';
import { logger } from '../src/utils/logger';

// Setup TanStack Query Client
const queryClient = new QueryClient();

// Configure local push notifications handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const loadStoredSession = useAuthStore((state) => state.loadStoredSession);

  useEffect(() => {
    // 1. Initialize SQLite Database
    initDatabase();

    // 2. Load cached JWT session
    loadStoredSession();

    // 3. Request Push Notification permissions
    const requestNotificationPermissions = async () => {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          logger.warn('Push notification permissions denied by user.');
        }
      } catch (err) {
        logger.error('Error fetching notification permissions:', err);
      }
    };
    requestNotificationPermissions();

    // 4. Setup periodic network checks for offline sync queue (e.g. every 15s)
    const syncInterval = setInterval(() => {
      syncService.checkAndSync();
    }, 15000);

    return () => clearInterval(syncInterval);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
