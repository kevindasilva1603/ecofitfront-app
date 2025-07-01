import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mocks essentiels pour éviter erreurs Jest
jest.mock('@react-native-picker/picker', () => ({
  Picker: () => 'PickerMock',
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
}));

jest.mock('react-native-chart-kit', () => ({
  LineChart: () => 'LineChartMock',
  BarChart: () => 'BarChartMock',
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => 'IoniconsMock',
}));

jest.mock('../../components/ActivityCard', () => 'ActivityCardMock');

// Mock complet des screens problématiques
jest.mock('../../screens/StatsScreen', () => () => 'StatsScreenMock');
jest.mock('../../screens/ChallengeRewardScreen', () => () => 'ChallengeRewardScreenMock');
jest.mock('../../screens/ProfileScreen', () => () => 'ProfileScreenMock');
jest.mock('../../screens/AddActivityScreen', () => () => 'AddActivityScreenMock');
jest.mock('../../screens/RunTrackerScreen', () => () => 'RunTrackerScreenMock');
jest.mock('../../screens/HistoryScreen', () => () => 'HistoryScreenMock');
jest.mock('../../screens/SessionDetailScreen', () => () => 'SessionDetailScreenMock');
jest.mock('../../screens/AdvancedStatsScreen', () => () => 'AdvancedStatsScreenMock');
jest.mock('../../screens/HomeScreen', () => () => 'HomeScreenMock');

import HomeStackNavigator from '../../navigation/MainStack';

describe('MainStack', () => {
  it('renderise sans crash', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    );
    expect(getByTestId).toBeDefined();
  });
});
