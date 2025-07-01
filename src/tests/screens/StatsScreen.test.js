import React from 'react';
import { render } from '@testing-library/react-native';
import StatsScreen from '../../screens/StatsScreen';

jest.mock('react-native-chart-kit', () => ({
  LineChart: () => null,
  BarChart: () => null,
}));

describe('StatsScreen', () => {
  it('affiche bien le texte principal', () => {
    const { getAllByText } = render(<StatsScreen />);
    expect(getAllByText(/Statistiques/i).length).toBeGreaterThan(0);
  });
});
