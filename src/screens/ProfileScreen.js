import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import API_URL from '../api/config';

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setName(res.data.name || '');
        setAge(res.data.age ? String(res.data.age) : '');
        setWeight(res.data.weight ? String(res.data.weight) : '');
        setHeight(res.data.height ? String(res.data.height) : '');
      }
    } catch (err) {
      Alert.alert('Erreur', "Impossible de charger le profil");
    }
  };

  const handleSave = async () => {
    if (!name || !age || !weight || !height) {
      Alert.alert('Erreur', 'Merci de remplir tous les champs');
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert('Succès', 'Profil sauvegardé');
    } catch (err) {
      Alert.alert('Erreur', "Impossible de sauvegarder le profil");
    }
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnexion', onPress: () => signOut() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4f8f5' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Mon Profil</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Âge</Text>
          <TextInput
            style={styles.input}
            placeholder="Âge"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Poids (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Poids"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Taille (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Taille"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2e7d32',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    color: '#4caf50',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#daf0cb',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#2e7d32',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
