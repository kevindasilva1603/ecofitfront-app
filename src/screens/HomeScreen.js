import React, { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ActivityCard from '../components/ActivityCard';
import { Ionicons } from '@expo/vector-icons';  // <-- Ajout de l'import manquant

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.error('Erreur récupération activités :', err);
    }
  };

  const getTotalPoints = () => activities.reduce((total, a) => total + a.points, 0);

  useFocusEffect(
    useCallback(() => {
      fadeAnim.setValue(0);
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

  const renderItem = ({ item, index }) => (
    <ActivityCard item={item} fadeAnim={fadeAnim} index={index} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Bienvenue, <Text style={styles.email}>{email}</Text> <Text>👋</Text>
      </Text>
      <Text style={styles.points}>
        🌿 Total éco-points : <Text style={styles.pointsNumber}>{getTotalPoints()}</Text> pts
      </Text>
      <Text style={styles.subtitle}>Vos dernières activités :</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.runButton}
        onPress={() => navigation.navigate('RunTracker')}
        activeOpacity={0.8}
      >
        <Text style={styles.runButtonText}>🏃‍♂️ Commencer une course</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddActivity')}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faf5',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 10,
  },
  email: {
    fontWeight: '900',
    color: '#558b2f',
  },
  points: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 28,
    color: '#4caf50',
  },
  pointsNumber: {
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#6a8a5b',
  },
  runButton: {
    position: 'absolute',
    bottom: 90,
    left: 24,
    right: 24,
    backgroundColor: '#f4a261',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#b67237',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.45,
    shadowRadius: 11,
  },
  runButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#70b541',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#4e7c23',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
});
