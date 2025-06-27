import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import API_URL from '../api/config';
import styles from '../styles/AddActivityScreen.styles';

const AddActivityScreen = ({ navigation }) => {
  const [type, setType] = useState('marche');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [photo, setPhoto] = useState(null);
  const [canAdd, setCanAdd] = useState(true);

  useEffect(() => {
    const checkLastAdd = async () => {
      const lastDate = await AsyncStorage.getItem('lastManualActivityDate');
      if (lastDate) {
        const last = new Date(lastDate);
        const now = new Date();
        const diff = now - last;
        const twoDays = 2 * 24 * 60 * 60 * 1000;
        if (diff < twoDays) setCanAdd(false);
      }
    };
    checkLastAdd();
  }, []);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Autorisez l’accès à la caméra.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!type || !distance || !duration || !photo) {
      Alert.alert('Erreur', 'Tous les champs et une photo sont requis');
      return;
    }

    if (!canAdd) {
      Alert.alert('Limite atteinte', 'Vous pouvez ajouter une activité manuelle tous les 2 jours seulement.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    try {
      const dist = parseFloat(distance);
      const pts = Math.round(dist * 2); // moins de points que course automatique

      await axios.post(`${API_URL}/api/activities`, {
        type,
        distance: dist,
        duration: parseInt(duration),
        points: pts,
        path: [],
        photo, // <--- ici on envoie l'URI
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await AsyncStorage.setItem('lastManualActivityDate', new Date().toISOString());

      Alert.alert('Succès', 'Activité ajoutée avec photo !');
      navigation.goBack();
    } catch (err) {
      console.error('Erreur ajout activité:', err);
      Alert.alert('Erreur', 'Impossible d’ajouter l’activité');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle activité (manuelle)</Text>

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

      <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>{photo ? 'Photo prise ✅' : 'Prendre une photo'}</Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.preview} />}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddActivityScreen;
