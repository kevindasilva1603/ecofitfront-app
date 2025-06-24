import * as Notifications from 'expo-notifications';

export async function showWelcomeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bienvenue sur EcoFit 👋',
      body: 'Prêt pour une nouvelle session écologique ? 💪🌱',
    },
    trigger: null, // immédiat
  });
}
