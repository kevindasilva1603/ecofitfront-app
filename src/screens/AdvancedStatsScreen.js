// src/screens/AdvancedStatsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

const screenWidth = Dimensions.get('window').width;

const AdvancedStatsScreen = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(`${API_URL}/api/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(res.data);
      } catch (error) {
        console.error('Erreur récupération activités :', error);
      }
    };

    fetchActivities();
  }, []);

  // Préparer les données pour le graphique en ligne
  const distancesByDate = activities.reduce((acc, activity) => {
    const date = new Date(activity.created_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + activity.distance;
    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(distancesByDate).length ? Object.keys(distancesByDate) : ['Aucun'],
    datasets: [
      {
        data: Object.values(distancesByDate).length
          ? Object.values(distancesByDate).map(v => (isFinite(v) ? v : 0))
          : [0],
        strokeWidth: 2,
      },
    ],
  };

  // Préparer les données pour le camembert
  const typeCounts = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(typeCounts).map((key, index) => ({
    name: key,
    count: typeCounts[key],
    color: ['#81c784', '#4db6ac', '#9575cd'][index % 3],
    legendFontColor: '#444',
    legendFontSize: 14,
    population: typeCounts[key],
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Évolution des distances</Text>
      <LineChart
        data={lineChartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
      />

      <Text style={styles.title}>🍃 Répartition des activités</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#e8f5e9',
  backgroundGradientTo: '#a5d6a7',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(56, 142, 60, ${opacity})`,
  labelColor: () => '#444',
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f8e9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#33691e',
  },
  chart: {
    marginBottom: 24,
    borderRadius: 16,
  },
});

export default AdvancedStatsScreen;