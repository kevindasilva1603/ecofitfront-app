import React from 'react';
import { render } from '@testing-library/react-native';
import AddActivityScreen from '../../screens/AddActivityScreen';

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: jest.fn(),
}));

it('affiche les champs de formulaire', () => {
  const { getByPlaceholderText } = render(<AddActivityScreen />);
  expect(getByPlaceholderText(/Distance/i)).toBeTruthy();
});
