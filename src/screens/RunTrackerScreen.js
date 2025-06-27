import React from 'react';
import {
  View, Text, TouchableOpacity, Animated, Alert,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { sendNotification } from '../utils/notifications';
import styles from '../styles/runtrackerscreen.styles';
import useRunTracker from '../hooks/useRunTracker';

export default function RunTrackerScreen({ navigation }) {
  const {
    isRunning,
    setIsRunning,
    secondsElapsed,
    formatTime,
    routeCoords,
    region,
    scaleAnim,
    distance,
  } = useRunTracker();

  const calories = (secondsElapsed * 0.1).toFixed(0);

  const handleStop = async () => {
    setIsRunning(false);
    const distNum = parseFloat(distance);
    const pts = Math.round(distNum * 5);

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Erreur', 'Utilisateur non authentifié');
      return;
    }

    const payload = {
      type: 'course',
      distance: distNum,
      duration: secondsElapsed,
      points: pts,
    };

    try {
      const response = await axios.post(`${API_URL}/api/activities`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Bravo', `Course enregistrée : ${distNum.toFixed(2)} km, ${pts} points`);
      await sendNotification(
        '🎉 Course terminée !',
        `Tu as parcouru ${distNum.toFixed(2)} km et gagné ${pts} points !`
      );
      navigation.navigate('Accueil', { screen: 'HomeScreen' });
    } catch (err) {
      console.error("Erreur ajout course :", err.response?.data || err.message);
      Alert.alert('Erreur', 'Impossible d’enregistrer la course');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi de course</Text>

      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          followsUserLocation
        >
          {routeCoords.length > 0 && (
            <>
              <Polyline coordinates={routeCoords} strokeColor="#4caf50" strokeWidth={5} />
              <Marker coordinate={routeCoords[routeCoords.length - 1]} />
            </>
          )}
        </MapView>
      )}

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="walk-outline" size={30} color="#4caf50" />
          <Text style={styles.statValue}>{distance} km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="time-outline" size={30} color="#4caf50" />
          <Text style={styles.statValue}>{formatTime(secondsElapsed)}</Text>
          <Text style={styles.statLabel}>Durée</Text>
        </View>

        <View style={styles.statBox}>
          <MaterialCommunityIcons name="fire" size={30} color="#4caf50" />
          <Text style={styles.statValue}>{calories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>

      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={[styles.actionButton, isRunning ? styles.stopButton : styles.startButton]}
          onPress={() => {
            if (isRunning) handleStop();
            else setIsRunning(true);
          }}
          activeOpacity={0.8}
        >
          <Ionicons name={isRunning ? 'pause' : 'play'} size={50} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.motivation}>
        {isRunning ? 'Bonne course ! 👟' : 'Appuyez sur ▶️ pour démarrer'}
      </Text>
    </View>
  );
}
