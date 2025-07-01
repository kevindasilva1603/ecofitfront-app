import React from 'react';
import { render } from '@testing-library/react-native';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../context/AuthContext';

describe('useAuth', () => {
  it('utilise signIn depuis le contexte', () => {
    const signInMock = jest.fn();
    const TestComponent = () => {
      const { login } = useAuth();
      login('email', 'password');
      return null;
    };

    render(
      <AuthContext.Provider value={{ signIn: signInMock, signOut: jest.fn() }}>
        <TestComponent />
      </AuthContext.Provider>
    );

    expect(signInMock).toHaveBeenCalledWith('email', 'password');
  });
});
