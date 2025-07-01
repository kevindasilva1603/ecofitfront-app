import React from 'react';
import { render } from '@testing-library/react-native';
import useChallengeReward from '../../hooks/useChallengeReward';

describe('useChallengeReward', () => {
  it('se monte sans erreur', () => {
    const Dummy = () => {
      useChallengeReward({
        refreshPoints: jest.fn(),
        subtractPoints: jest.fn(),
      });
      return null;
    };

    render(<Dummy />);
  });
});
