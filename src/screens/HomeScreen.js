import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [activities, setActivities] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('http://192.168.1.2:3000/api/activities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
    } catch (err) {
      console.error('Erreur récupération activités :', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setEmail(payload.email);
      }
      fetchData();
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue, {email} 👋</Text>
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+ Ajouter une activité</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e8f5e9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#2e7d32' },
  subtitle: { fontSize: 16, marginBottom: 20, color: '#555' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: '#43a047', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
