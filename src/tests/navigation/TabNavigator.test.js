import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock des icônes
jest.mock('@expo/vector-icons/Ionicons', () => 'IoniconsMock');

// Mock complet des composants et stacks
jest.mock('../../screens/StatsScreen', () => () => 'StatsMock');
jest.mock('../../screens/ChallengeRewardScreen', () => () => 'ChallengeMock');
jest.mock('../../screens/ProfileScreen', () => () => 'ProfileMock');
jest.mock('../../navigation/MainStack', () => () => 'MainStackMock');

import TabNavigator from '../../navigation/TabNavigator';

describe('TabNavigator', () => {
  it('renderise sans crash', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
    expect(getByTestId).toBeDefined();
  });
});
