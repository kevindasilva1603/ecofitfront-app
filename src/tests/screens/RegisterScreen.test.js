import React from 'react';
import { render } from '@testing-library/react-native';
import RegisterScreen from '../../screens/RegisterScreen';

describe('RegisterScreen', () => {
  it('affiche le titre du formulaire', () => {
    const { getByText } = render(<RegisterScreen />);
    expect(getByText('Créer un compte')).toBeTruthy();
  });
});
