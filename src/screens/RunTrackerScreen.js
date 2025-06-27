import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { sendNotification } from '../utils/notifications';
import styles from '../styles/runtrackerscreen.styles';

const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

export default function RunTrackerScreen({ navigation }) {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [routeCoords, setRouteCoords] = useState([]);
  const [region, setRegion] = useState(null);
  const intervalRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const locationSubscription = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Permission GPS nécessaire pour suivre la course');
        return;
      }
      const lastLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: lastLocation.coords.latitude,
        longitude: lastLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);

  useEffect(() => {
    if (isRunning) {
      setSecondsElapsed(0);
      setRouteCoords([]);

      locationSubscription.current = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setRouteCoords((coords) => [...coords, { latitude, longitude }]);
          setRegion((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        }
      );

      intervalRef.current = setInterval(() => {
        setSecondsElapsed((sec) => sec + 1);
      }, 1000);

      animatePulse();
    } else {
      if (locationSubscription.current) {
        locationSubscription.current.then(sub => sub.remove());
        locationSubscription.current = null;
      }
      clearInterval(intervalRef.current);
      scaleAnim.setValue(1);
    }

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.then(sub => sub.remove());
        locationSubscription.current = null;
      }
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const animatePulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const calculateDistance = () => {
    if (routeCoords.length < 2) return 0;
    let dist = 0;
    for (let i = 1; i < routeCoords.length; i++) {
      const prev = routeCoords[i - 1];
      const curr = routeCoords[i];
      const dLat = (curr.latitude - prev.latitude) * 111000;
      const dLon = (curr.longitude - prev.longitude) * 111000 * Math.cos(curr.latitude * Math.PI / 180);
      dist += Math.sqrt(dLat * dLat + dLon * dLon);
    }
    return (dist / 1000).toFixed(2);
  };

  const distance = calculateDistance();
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
    // path: routeCoords, // ⛔️ Commenté pour éviter erreur 400
  };

  console.log("Payload envoyé :", payload);

  try {
    const response = await axios.post(`${API_URL}/api/activities`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Réponse serveur :", response.data);

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

