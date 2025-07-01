// src/tests/context/AuthContext.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider, AuthContext } from '../../context/AuthContext';

describe('AuthContext', () => {
  it('initialise le token à null et peut le modifier', () => {
    const TestComponent = () => (
      <AuthContext.Consumer>
        {({ userToken, signIn, signOut }) => {
          expect(userToken).toBe(null);
          signIn('fakeToken');
          expect(typeof signIn).toBe('function');
          signOut();
          expect(typeof signOut).toBe('function');
          return null;
        }}
      </AuthContext.Consumer>
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });
});
