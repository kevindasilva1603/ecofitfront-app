import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import API_URL from '../api/config';

const AddActivityScreen = ({ navigation }) => {
  const [type, setType] = useState('marche');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async () => {
    if (!type || !distance || !duration) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/api/activities`, {
        type,
        distance: parseFloat(distance),
        duration: parseInt(duration),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Alert.alert('Succès', 'Activité ajoutée !');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Impossible d’ajouter l’activité');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle activité</Text>

      <Picker selectedValue={type} onValueChange={(value) => setType(value)} style={styles.picker}>
        <Picker.Item label="Marche" value="marche" />
        <Picker.Item label="Course" value="course" />
        <Picker.Item label="Vélo" value="vélo" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Distance (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />

      <TextInput
        style={styles.input}
        placeholder="Durée (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddActivityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, color: '#2e7d32' },
  picker: { backgroundColor: '#f0f0f0', marginBottom: 20 },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#43a047', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
