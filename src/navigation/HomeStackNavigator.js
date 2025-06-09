import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import RunTrackerScreen from '../screens/RunTrackerScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Stack.Screen name="AddActivity" component={AddActivityScreen} options={{ title: 'Ajouter activité' }} />
      <Stack.Screen name="RunTracker" component={RunTrackerScreen} options={{ title: 'Course en direct' }} />
    </Stack.Navigator>
  );
}
