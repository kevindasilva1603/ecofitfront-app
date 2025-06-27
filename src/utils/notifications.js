// src/utils/notifications.js

import * as Notifications from 'expo-notifications';

export async function showWelcomeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bienvenue sur EcoFit 👋',
      body: 'Prêt pour une nouvelle session écologique ? 💪🌱',
    },
    trigger: null,
  });
}

export async function sendNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null, // notification immédiate
  });
}
