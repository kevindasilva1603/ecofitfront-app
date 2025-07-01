import React from 'react';
import { render } from '@testing-library/react-native';
import OnboardingScreen from '../../screens/OnboardingScreen';

jest.mock('react-native-onboarding-swiper', () => {
  return () => <></>;
});

describe('OnboardingScreen', () => {
  it('se rend sans crasher', () => {
    const screen = render(<OnboardingScreen />);
    expect(screen).toBeTruthy();
  });
});
