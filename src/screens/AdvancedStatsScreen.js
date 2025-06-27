import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import styles from '../styles/AdvancedStatsScreen.styles';
import useActivities from '../hooks/useActivities';

const screenWidth = Dimensions.get('window').width;

const AdvancedStatsScreen = () => {
  const { activities, loading } = useActivities();

  if (loading) {
    return <Text style={styles.title}>Chargement des stats...</Text>;
  }

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

export default AdvancedStatsScreen;
