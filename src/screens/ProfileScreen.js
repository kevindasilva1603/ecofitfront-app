import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api/config';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const fetchProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setName(res.data.name || '');
        setAge(res.data.age ? res.data.age.toString() : '');
        setWeight(res.data.weight ? res.data.weight.toString() : '');
        setHeight(res.data.height ? res.data.height.toString() : '');
      }
    } catch {
      Alert.alert('Erreur', 'Impossible de charger le profil');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!name || !age || !weight || !height) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    try {
      await axios.post(
        `${API_URL}/api/profile`,
        {
          name,
          age: parseInt(age),
          weight: parseFloat(weight),
          height: parseFloat(height),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Succès', 'Profil sauvegardé');
    } catch {
      Alert.alert('Erreur', 'Impossible de sauvegarder le profil');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Âge" value={age} keyboardType="numeric" onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Poids (kg)" value={weight} keyboardType="numeric" onChangeText={setWeight} />
      <TextInput style={styles.input} placeholder="Taille (cm)" value={height} keyboardType="numeric" onChangeText={setHeight} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f8f5', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: '#2e7d32', marginBottom: 30, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    fontSize: 16,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 18 },
});
