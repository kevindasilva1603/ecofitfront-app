import React, { useContext } from 'react';
import { render } from '@testing-library/react-native';
import { PointsContext } from '../../context/PointsContext';
import { Text } from 'react-native';

describe('useEcoPoints', () => {
  it('lit les points depuis le contexte', () => {
    const Dummy = () => {
      const { points } = useContext(PointsContext);
      return (
        <>
          <Text>Points:</Text>
          <Text>{points}</Text>
        </>
      );
    };

    const { getByText } = render(
      <PointsContext.Provider value={{ points: 42 }}>
        <Dummy />
      </PointsContext.Provider>
    );

    expect(getByText('Points:')).toBeTruthy();
    expect(getByText('42')).toBeTruthy();
  });
});
