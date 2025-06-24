import React, { useEffect, useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthStack';
import TabNavigator from './src/navigation/TabNavigator';
import { showWelcomeNotification } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';
import { PointsProvider } from './src/context/PointsContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function RootNavigation() {
  const { userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {userToken ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    showWelcomeNotification();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <PointsProvider>
          <RootNavigation />
        </PointsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
