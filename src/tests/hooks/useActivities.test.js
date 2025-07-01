import React from 'react';
import { render } from '@testing-library/react-native';
import useActivities from '../../hooks/useActivities';

describe('useActivities', () => {
  it('monte sans crash', () => {
    const Dummy = () => {
      useActivities();
      return null;
    };

    render(<Dummy />);
  });
});
