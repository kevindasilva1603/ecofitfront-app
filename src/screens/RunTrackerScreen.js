import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

const RunTrackerScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]); // Tableau des coordonnées GPS
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const watchId = useRef(null);
  const startTime = useRef(null);
  const lastPosition = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission GPS refusée');
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
      setPath([current.coords]); // Initialise le chemin avec la position de départ
    })();
  }, []);

  const startRun = async () => {
    setIsRunning(true);
    startTime.current = Date.now();
    lastPosition.current = null;
    setPath([]); // Reset chemin au début de la course

    watchId.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        const newPos = { latitude, longitude };

        setLocation(newPos);
        setPath((prevPath) => [...prevPath, newPos]); // Ajoute la nouvelle position au chemin

        if (lastPosition.current) {
          const dist = getDistanceFromLatLonInKm(
            lastPosition.current.latitude,
            lastPosition.current.longitude,
            newPos.latitude,
            newPos.longitude
          );
          setDistance((prev) => prev + dist);
        }

        lastPosition.current = newPos;
        const elapsed = (Date.now() - startTime.current) / 1000 / 60;
        setDuration(elapsed);
        setCalories((0.05 * elapsed * 60).toFixed(0)); // estimation simple
      }
    );
  };

  const stopRun = async () => {
    setIsRunning(false);
    if (watchId.current) {
      watchId.current.remove();
    }

    const token = await AsyncStorage.getItem('token');
    await axios.post(
      `${API_URL}/api/activities`,
      {
        type: 'course',
        distance: Number(distance.toFixed(2)),
        duration: Math.round(duration),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    navigation.goBack();
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏃‍♂️ Entraînement en cours</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={location} title="Position actuelle" />
          {path.length > 1 && <Polyline coordinates={path} strokeWidth={5} strokeColor="#43a047" />}
        </MapView>
      )}

      <Text style={styles.stat}>Distance : {distance.toFixed(2)} km</Text>
      <Text style={styles.stat}>Durée : {Math.round(duration)} min</Text>
      <Text style={styles.stat}>Calories : {calories} kcal</Text>

      {isRunning ? (
        <TouchableOpacity style={styles.buttonStop} onPress={stopRun}>
          <Text style={styles.buttonText}>Terminer</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonStart} onPress={startRun}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RunTrackerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#e8f5e9' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 40, color: '#2e7d32' },
  stat: { fontSize: 18, marginTop: 10 },
  error: { color: 'red', margin: 10 },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 250,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonStart: { backgroundColor: '#43a047', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonStop: { backgroundColor: '#d32f2f', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
