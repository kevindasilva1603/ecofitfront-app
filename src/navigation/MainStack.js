import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import StatsScreen from '../screens/StatsScreen';
import ChallengeRewardScreen from '../screens/ChallengeRewardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';
import RunTrackerScreen from '../screens/RunTrackerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdvancedStatsScreen from '../screens/AdvancedStatsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="AddActivity" component={AddActivityScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="Challenges" component={ChallengeRewardScreen} />
      <Stack.Screen name="RunTracker" component={RunTrackerScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AdvancedStats" component={AdvancedStatsScreen} />
    </Stack.Navigator>
  );
}
