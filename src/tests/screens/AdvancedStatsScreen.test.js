import React from 'react';
import { render } from '@testing-library/react-native';
import AdvancedStatsScreen from '../../screens/AdvancedStatsScreen';

jest.mock('react-native-chart-kit', () => ({
  LineChart: () => null,
  PieChart: () => null,
}));

jest.mock('../../hooks/useActivities', () => ({
  __esModule: true,
  default: () => ({
    activities: [],
    loading: false,
    error: null,
  }),
}));

describe('AdvancedStatsScreen', () => {
  it('rend la vue sans erreur', () => {
    const { getByText } = render(<AdvancedStatsScreen />);
    expect(getByText(/Répartition/i)).toBeTruthy();
  });
});
