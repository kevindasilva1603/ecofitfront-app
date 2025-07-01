import React from 'react';
import { render } from '@testing-library/react-native';
import useRegisterForm from '../../hooks/useRegisterForm';

describe('useRegisterForm', () => {
  it('ne plante pas au montage', () => {
    const Dummy = () => {
      useRegisterForm({ navigate: jest.fn() });
      return null;
    };

    render(<Dummy />);
  });
});
