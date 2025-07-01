import React from 'react';
import { render } from '@testing-library/react-native';
import RunTrackerScreen from '../../screens/RunTrackerScreen';

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockMapView = (props) => <View>{props.children}</View>;
  const MockPolyline = () => <View />;
  const MockMarker = () => <View />;
  return {
    __esModule: true,
    default: MockMapView,
    Polyline: MockPolyline,
    Marker: MockMarker,
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
  MaterialCommunityIcons: () => null,
}));

jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(),
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  watchPositionAsync: jest.fn(() => ({
    remove: jest.fn(),
  })),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
    })
  ),
  LocationAccuracy: {},
}));

describe('RunTrackerScreen', () => {
  it('s’affiche sans erreur', () => {
    const { getByText } = render(<RunTrackerScreen />);
    expect(getByText(/Appuyez sur/i)).toBeTruthy(); // Texte existant dans l’écran
  });
});
