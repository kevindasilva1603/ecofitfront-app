// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useAuth() {
  const { signIn, signOut } = useContext(AuthContext);

  return {
    login: signIn,
    logout: signOut,
  };
}
