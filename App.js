// App.js
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import * as Notifications from 'expo-notifications';


import { requestPermissions, scheduleDailyNotification } from './src/utils/notifications';

export default function App() {
  useEffect(() => {
    (async () => {
      const granted = await requestPermissions();
      if (granted) {
        await scheduleDailyNotification();
        Alert.alert('Notifications activées', 'Vous recevrez un rappel quotidien à 9h.');
      } else {
        Alert.alert('Notifications refusées', 'Vous ne recevrez pas de rappels.');
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
