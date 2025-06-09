// src/screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
    } catch (err) {
      console.error('Erreur récupération activités :', err);
    }
  };

  const getTotalPoints = () => {
    return activities.reduce((total, activity) => total + activity.points, 0);
  };

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setEmail(payload.email);
        }
        fetchData();
      };
      init();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.replace('Login');
        }}
      >
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bienvenue, {email} 👋</Text>
      <Text style={styles.points}>🌿 Total éco-points : {getTotalPoints()} pts</Text>
      <Text style={styles.subtitle}>Voici vos dernières activités :</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.type} – {item.distance} km – {item.points} pts</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddActivity')}>
        <Text style={styles.buttonText}>+ Ajouter une activité</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statsButton} onPress={() => navigation.navigate('Stats')}>
        <Text style={styles.buttonText}>📊 Statistiques</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.challengeButton} onPress={() => navigation.navigate('Challenges')}>
        <Text style={styles.buttonText}>🎯 Défis & Récompenses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.runButton} onPress={() => navigation.navigate('RunTracker')}>
        <Text style={styles.buttonText}>🏃‍♂️ Commencer une course</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>📜 Historique</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e8f5e9' },
  logoutButton: { alignSelf: 'flex-end', padding: 8, marginBottom: 10 },
  logoutText: { color: '#d32f2f', fontWeight: 'bold', fontSize: 14 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#2e7d32' },
  subtitle: { fontSize: 16, marginBottom: 10, color: '#555' },
  points: { fontSize: 18, fontWeight: 'bold', color: '#388e3c', marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: '#43a047', padding: 15, borderRadius: 10, marginTop: 10 },
  statsButton: { backgroundColor: '#1e88e5', padding: 15, borderRadius: 10, marginTop: 10 },
  challengeButton: { backgroundColor: '#8bc34a', padding: 15, borderRadius: 10, marginTop: 10 },
  runButton: { backgroundColor: '#ff9800', padding: 15, borderRadius: 10, marginTop: 10 },
  historyButton: { backgroundColor: '#795548', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
