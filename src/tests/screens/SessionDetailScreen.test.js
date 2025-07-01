import React from 'react';
import { render } from '@testing-library/react-native';
import SessionDetailScreen from '../../screens/SessionDetailScreen';

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockMapView = (props) => <View>{props.children}</View>;
  const MockPolyline = (props) => <View>{props.children}</View>;
  return {
    __esModule: true,
    default: MockMapView,
    Polyline: MockPolyline,
  };
});

describe('SessionDetailScreen', () => {
  it('affiche les détails d\'une session', () => {
    const route = {
      params: {
        activity: {
          type: 'course',
          distance: 5.3,
          duration: 42,
          points: 30,
          date: new Date().toISOString(),
        },
      },
    };
    const { getByText } = render(<SessionDetailScreen route={route} />);
    expect(getByText(/Distance/i)).toBeTruthy();
  });
});
