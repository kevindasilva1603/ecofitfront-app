import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import API_URL from '../api/config';
import styles from '../styles/profilescreen.styles';

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hasBadge, setHasBadge] = useState(false);

  useEffect(() => {
    loadProfile();
    checkBadge();
  }, []);

  const checkBadge = async () => {
    const unlocked = await AsyncStorage.getItem('badge_feuille');
    setHasBadge(unlocked === 'true');
  };

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
    } catch {
      Alert.alert('Erreur', 'Impossible de charger les données');
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
      Alert.alert('Succès', 'Profil mis à jour');
    } catch {
      Alert.alert('Erreur', 'Échec de la sauvegarde');
    }
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnexion', onPress: () => signOut() },
    ]);
  };

  const imc = weight && height ? (weight / ((height / 100) ** 2)).toFixed(1) : '-';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#f0f4f2' }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Profil résumé */}
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{name || 'Nom utilisateur'}</Text>
          <Text style={styles.imc}>IMC : {imc}</Text>
        </View>

        {/* Infos modifiables */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes informations</Text>

          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Âge"
            value={age}
            keyboardType="numeric"
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Poids (kg)"
            value={weight}
            keyboardType="numeric"
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Taille (cm)"
            value={height}
            keyboardType="numeric"
            onChangeText={setHeight}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>💾 Sauvegarder</Text>
          </TouchableOpacity>
        </View>

        {/* Valeurs ECO-fit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos valeurs 🌍</Text>
          <Text style={styles.textValue}>
            Chez ECO-fit, nous croyons en une activité physique responsable et durable.
            Chaque pas compte pour votre santé... et pour la planète 🌿
          </Text>
        </View>

        {/* Conditions générales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conditions générales</Text>
          <Text style={styles.textValue}>
            En utilisant ECO-fit, vous acceptez de respecter notre charte d’utilisation.
            Vos données sont sécurisées et ne seront jamais revendues.
          </Text>
        </View>

        {/* Badges obtenus */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎖 Mes badges</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>🏃‍♂️ 10 km</Text>
            <Text style={styles.badge}>🌱 1er défi validé</Text>
            <Text style={styles.badge}>♻️ 100 éco-points</Text>
            {hasBadge && <Text style={styles.badge}>🍃 Feuille verte</Text>}
          </View>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Déconnexion</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
