// src/tests/screens/LoginScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { AuthContext } from '../../context/AuthContext';

describe('LoginScreen', () => {
  it('affiche les champs email et mot de passe', () => {
    const fakeContext = {
      signIn: jest.fn(),
      signOut: jest.fn(),
    };

    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={fakeContext}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
  });
});
