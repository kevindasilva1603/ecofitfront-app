import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthContext } from '../../context/AuthContext';
import ProfileScreen from '../../screens/ProfileScreen';

describe('ProfileScreen', () => {
  it('affiche les sections principales', () => {
    const mockSignOut = jest.fn();

    const { getByText } = render(
      <AuthContext.Provider value={{ signOut: mockSignOut }}>
        <ProfileScreen />
      </AuthContext.Provider>
    );

    expect(getByText('Nom utilisateur')).toBeTruthy();
    expect(getByText('Mes informations')).toBeTruthy();
    expect(getByText(/Nos valeurs/i)).toBeTruthy();
    expect(getByText(/Conditions générales/i)).toBeTruthy();
    expect(getByText(/Mes badges/i)).toBeTruthy();
  });
});
