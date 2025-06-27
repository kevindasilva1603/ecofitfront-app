import { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import API_URL from '../api/config';

export default function useRegisterForm(navigation) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/users/register`, {
        email,
        password,
      });

      Alert.alert('Compte créé !', 'Vous pouvez maintenant vous connecter');
      navigation.replace('Login');
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Utilisateur déjà existant ou erreur serveur');
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleRegister,
  };
}
