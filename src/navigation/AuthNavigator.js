// src/navigation/AuthNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'; // Assuming you have a RegisterScreen
import HomeScreen from '../screens/HomeScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import StatsScreen from '../screens/StatsScreen';
import ChallengeRewardScreen from '../screens/ChallengeRewardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';
import RunTrackerScreen from '../screens/RunTrackerScreen';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="AddActivity" component={AddActivityScreen} />
    <Stack.Screen name="Stats" component={StatsScreen} />
    <Stack.Screen name="Challenges" component={ChallengeRewardScreen} />
    <Stack.Screen name="RunTracker" component={RunTrackerScreen} />
    <Stack.Screen name="History" component={HistoryScreen} />
    <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />

  </Stack.Navigator>
);

export default AuthNavigator;
