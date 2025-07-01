// src/tests/screens/HistoryScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HistoryScreen from '../../screens/HistoryScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('HistoryScreen', () => {
  it('affiche historique des activités', () => {
    const { getByText } = render(<HistoryScreen />);
    expect(getByText(/Historique/i)).toBeTruthy();
  });
});
