import React from 'react';
import { render } from '@testing-library/react-native';
import useAddActivity from '../../hooks/useAddActivity';

describe('useAddActivity', () => {
  it('se monte sans crash', () => {
    const Dummy = () => {
      useAddActivity({ navigate: jest.fn() });
      return null;
    };

    render(<Dummy />);
  });
});
