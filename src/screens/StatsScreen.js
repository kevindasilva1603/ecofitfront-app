import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import API_URL from '../api/config';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [activities, setActivities] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
    } catch (err) {
      console.error('Erreur récupération stats :', err);
    }
  };

  const countByType = (type) =>
    activities.filter((a) => a.type === type).length;

  const totalDistance = activities.reduce(
    (total, a) => total + a.distance,
    0
  );

  const data = [
    {
      name: 'Marche',
      count: countByType('marche'),
      color: '#81c784',
      legendFontColor: '#444',
      legendFontSize: 14,
    },
    {
      name: 'Course',
      count: countByType('course'),
      color: '#4db6ac',
      legendFontColor: '#444',
      legendFontSize: 14,
    },
    {
      name: 'Vélo',
      count: countByType('vélo'),
      color: '#9575cd',
      legendFontColor: '#444',
      legendFontSize: 14,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Statistiques d'activité</Text>

      <Text style={styles.subtitle}>Répartition par type :</Text>

      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: () => `#388e3c`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.total}>🚴‍♂️ Distance totale : {totalDistance.toFixed(1)} km</Text>
    </ScrollView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f8e9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#33691e',
  },
});
