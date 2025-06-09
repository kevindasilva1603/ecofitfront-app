import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [weeklyDistances, setWeeklyDistances] = useState([]);
  const [dailyPoints, setDailyPoints] = useState([]);

  const fetchStats = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const activities = res.data;

      // Calcul totaux
      setTotalDistance(activities.reduce((a, b) => a + b.distance, 0));
      setTotalPoints(activities.reduce((a, b) => a + b.points, 0));
      setTotalDuration(activities.reduce((a, b) => a + b.duration, 0));

      // Exemple données avancées : distances par jour de la semaine (mock)
      const distancesByDay = [3.4, 5.2, 4.1, 6.0, 0, 0, 7.3]; // km
      setWeeklyDistances(distancesByDay);

      // Points par jour (mock)
      const pointsByDay = [20, 35, 25, 40, 0, 0, 50];
      setDailyPoints(pointsByDay);
    } catch (error) {
      console.error('Erreur récupération données :', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Statistiques</Text>

      <View style={styles.statCard}>
        <Text style={styles.statTitle}>Distance totale</Text>
        <Text style={styles.statValue}>{totalDistance.toFixed(2)} km</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statTitle}>Durée totale</Text>
        <Text style={styles.statValue}>{totalDuration} min</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statTitle}>Éco-points totaux</Text>
        <Text style={styles.statValue}>{totalPoints}</Text>
      </View>

      <Text style={[styles.title, { marginTop: 30 }]}>Statistiques avancées</Text>

      <Text style={styles.chartTitle}>Distances parcourues (km) par jour de la semaine</Text>
      <BarChart
        data={{
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{ data: weeklyDistances }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={20}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Points gagnés par jour</Text>
      <LineChart
        data={{
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{ data: dailyPoints }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </ScrollView>
  );
};

export default StatsScreen;

const chartConfig = {
  backgroundGradientFrom: '#e8f5e9',
  backgroundGradientTo: '#f4fbf6',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(70, 120, 60, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#2e7d32',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f8f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  statCard: {
    backgroundColor: '#daf0cb',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 3,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#386635',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4caf50',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
    marginTop: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },
});
