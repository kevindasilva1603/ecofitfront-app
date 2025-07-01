import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock map
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    Marker: View,
    Polyline: View,
  };
});

import HistoryStackNavigator from '../../navigation/HistoryStackNavigator';

describe('HistoryStackNavigator', () => {
  it('renderise sans crash', () => {
    const tree = render(
      <NavigationContainer>
        <HistoryStackNavigator />
      </NavigationContainer>
    );
    expect(tree).toBeTruthy();
  });
});
