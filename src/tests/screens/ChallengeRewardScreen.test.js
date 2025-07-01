import React from 'react';
import { render } from '@testing-library/react-native';
import { PointsContext } from '../../context/PointsContext';
import ChallengeRewardScreen from '../../screens/ChallengeRewardScreen';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('ChallengeRewardScreen', () => {
  it('affiche les titres', () => {
    const { getAllByText } = render(
      <PointsContext.Provider value={{ points: 100 }}>
        <ChallengeRewardScreen />
      </PointsContext.Provider>
    );

    expect(getAllByText(/Défis/i).length).toBeGreaterThan(0);
    expect(getAllByText(/Récompenses/i).length).toBeGreaterThan(0);
  });
});
