import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import API_URL from '../api/config';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S’inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 25,
    textAlign: 'center',
    color: '#388e3c',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#43a047',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#1b5e20',
    textAlign: 'center',
    marginTop: 10,
  },
});
