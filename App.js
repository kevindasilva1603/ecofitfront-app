import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthStack';
import TabNavigator from './src/navigation/TabNavigator';

function RootNavigation() {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
