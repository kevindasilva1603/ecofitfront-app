// src/tests/context/PointsContext.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { PointsProvider, PointsContext } from '../../context/PointsContext';

// Mocks
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async (key) => {
    if (key === 'token') return 'mockToken';
    if (key === 'ecoPointsUsed') return '0';
    return null;
  }),
  setItem: jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [{ points: 10 }, { points: 20 }],
    })
  ),
}));

describe('PointsContext', () => {
  it('charge et affiche correctement les ecoPoints', async () => {
    const TestComponent = () => (
      <PointsContext.Consumer>
        {({ ecoPoints }) => <Text testID="ecoPoints">{ecoPoints}</Text>}
      </PointsContext.Consumer>
    );

    const { getByTestId } = render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    await waitFor(() => {
      expect(getByTestId('ecoPoints').props.children).toBe(30); // 10 + 20
    });
  });
});
