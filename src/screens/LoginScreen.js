import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api/config';
import useAuth from '../hooks/useAuth'; 
import styles from '../styles/loginscreen.styles'
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // on utilise le hook au lieu de useContext(AuthContext)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Merci de remplir tous les champs');
      return;
    }

    try {
      console.log('Tentative de connexion avec :', { email, password });

      const res = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });

      console.log('Réponse du serveur :', res.data);

      await AsyncStorage.setItem('token', res.data.token);
      Alert.alert('Connecté !', `Bienvenue ${res.data.email}`);
      login(res.data.token); // ✅ remplace signIn()
    } catch (error) {
      console.log('Erreur de connexion :', error.response?.data || error.message);
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

