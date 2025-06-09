import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

const HistoryScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
    } catch (error) {
      console.error('Erreur récupération historique :', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des sessions</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SessionDetail', { activity: item })}
          >
            <Text style={styles.type}>{item.type.toUpperCase()}</Text>
            <Text>Date : {formatDate(item.created_at)}</Text>
            <Text>Distance : {item.distance.toFixed(2)} km</Text>
            <Text>Durée : {item.duration} min</Text>
            <Text>Points : {item.points}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f1f8e9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#33691e', textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#558b2f',
  },
});
