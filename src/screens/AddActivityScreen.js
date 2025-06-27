import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/AddActivityScreen.styles';
import useAddActivity from '../hooks/useAddActivity';

const AddActivityScreen = ({ navigation }) => {
  const [type, setType] = useState('marche');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { canAdd, photo, setPhoto, submitActivity } = useAddActivity(navigation);

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
    try {
      await submitActivity({ type, distance, duration });
      Alert.alert('Succès', 'Activité ajoutée avec photo !');
    } catch (err) {
      console.error('Erreur ajout activité:', err);
      Alert.alert('Erreur', err.message || 'Impossible d’ajouter l’activité');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle activité (manuelle)</Text>

      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
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
