import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api/config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Merci de remplir tous les champs');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
  email,
  password,

      });

      await AsyncStorage.setItem('token', res.data.token);
      Alert.alert('Connecté !', `Bienvenue ${res.data.email}`);
      // Tu peux naviguer ici vers la Home
       navigation.replace('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={styles.link}>Pas encore de compte ? S’inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    color: '#1b5e20',
    textAlign: 'center',
    marginTop: 15,
  },
});
