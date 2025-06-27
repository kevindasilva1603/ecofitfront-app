import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { Animated, Alert } from 'react-native';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * (360 / 640); // format 9:16 approx

export default function useRunTracker() {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [routeCoords, setRouteCoords] = useState([]);
  const [region, setRegion] = useState(null);
  const intervalRef = useRef(null);
  const locationSubscription = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Permission GPS nécessaire pour suivre la course');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
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
      cleanup();
    }

    return cleanup;
  }, [isRunning]);

  const cleanup = () => {
    if (locationSubscription.current) {
      locationSubscription.current.then(sub => sub.remove());
      locationSubscription.current = null;
    }
    clearInterval(intervalRef.current);
    scaleAnim.setValue(1);
  };

  const animatePulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.15, duration: 700, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
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
    return parseFloat((dist / 1000).toFixed(2));
  };

  return {
    isRunning,
    setIsRunning,
    secondsElapsed,
    formatTime,
    routeCoords,
    region,
    scaleAnim,
    distance: calculateDistance(),
  };
}
