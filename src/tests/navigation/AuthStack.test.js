import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock onboarding swiper
jest.mock('react-native-onboarding-swiper', () => 'OnboardingMock');

import AuthStack from '../../navigation/AuthStack';

describe('AuthStack', () => {
  it('renderise sans crash', () => {
    const tree = render(
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
    expect(tree).toBeTruthy();
  });
});
