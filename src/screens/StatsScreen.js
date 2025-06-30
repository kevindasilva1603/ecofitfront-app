import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit';
import styles from '../styles/statsscreen.styles';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [weeklyDistances, setWeeklyDistances] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [dailyPoints, setDailyPoints] = useState([0, 0, 0, 0, 0, 0, 0]);

  const fetchStats = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const activities = res.data;

      let totalDist = 0;
      let totalDur = 0;
      let totalPts = 0;
      const distancesByDay = [0, 0, 0, 0, 0, 0, 0]; // Lundi -> Dimanche
      const pointsByDay = [0, 0, 0, 0, 0, 0, 0];

      activities.forEach((activity) => {
        const date = new Date(activity.createdAt);
        const day = (date.getDay() + 6) % 7; // Ajustement : 0 = lundi
        distancesByDay[day] += activity.distance;
        pointsByDay[day] += activity.points;

        totalDist += activity.distance;
        totalDur += activity.duration;
        totalPts += activity.points;
      });

      setTotalDistance(totalDist);
      setTotalDuration(totalDur);
      setTotalPoints(totalPts);
      setWeeklyDistances(distancesByDay);
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

      <Text style={styles.chartTitle}>Distances parcourues (km) par jour</Text>
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
