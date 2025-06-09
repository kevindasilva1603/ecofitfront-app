import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();

  const fetchActivities = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
    } catch {
      // gestion erreur
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

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
  container: { flex: 1, padding: 16, backgroundColor: '#f4f8f5' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#2e7d32', textAlign: 'center' },
  card: {
    backgroundColor: '#daf0cb',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#00000015',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  type: { fontWeight: '700', fontSize: 16, marginBottom: 4, color: '#4caf50' },
});
