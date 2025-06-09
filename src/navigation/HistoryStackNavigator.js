import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../screens/HistoryScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';

const Stack = createNativeStackNavigator();

export default function HistoryStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HistoryMain" component={HistoryScreen} options={{ title: 'Historique' }} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} options={{ title: 'Détail session' }} />
    </Stack.Navigator>
  );
}
