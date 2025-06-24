import React, { useState, useCallback, useRef, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ActivityCard from '../components/ActivityCard';
import { Ionicons } from '@expo/vector-icons';
import { PointsContext } from '../context/PointsContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { ecoPoints, refreshPoints } = useContext(PointsContext);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data);
      refreshPoints(); // rafraîchir les points en parallèle
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.error('Erreur récupération activités :', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fadeAnim.setValue(0);
      const init = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setEmail(payload.email);
        }
        await fetchData();
      };
      init();
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <ActivityCard item={item} fadeAnim={fadeAnim} index={index} />
  );

  return (
    <View style={styles.container}>
      {/* Header with logo and welcome */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/leaf_bg.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.greeting}>
          Bonjour, <Text style={styles.email}>{email || 'Utilisateur'}</Text> 👋
        </Text>
      </View>

      {/* Total points panel */}
      <View style={styles.pointsPanel}>
        <Ionicons name="leaf" size={36} color="#4caf50" />
        <Text style={styles.pointsText}>
          Vous avez accumulé <Text style={styles.pointsNumber}>{ecoPoints}</Text> éco-points !
        </Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Activités récentes</Text>

      {/* Activities list */}
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 160 }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.activitiesList}
      />

      {/* Big Call to Action: Start run */}
      <TouchableOpacity
        style={styles.runButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('RunTracker')}
      >
        <Ionicons name="walk-outline" size={28} color="#fff" />
        <Text style={styles.runButtonText}>Commencer une course</Text>
      </TouchableOpacity>

      {/* Floating button to add activity */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddActivity')}
      >
        <Ionicons name="add" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 60,
    marginBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
  },
  email: {
    color: '#558b2f',
  },
  pointsPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a5d6a7',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 28,
    shadowColor: '#4caf50',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsText: {
    color: '#2e7d32',
    fontSize: 18,
    marginLeft: 14,
    flex: 1,
    fontWeight: '600',
  },
  pointsNumber: {
    fontWeight: '900',
    fontSize: 22,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
    color: '#4a7c3b',
  },
  activitiesList: {
    marginBottom: 10,
  },
  runButton: {
    position: 'absolute',
    bottom: 80,
    left: 24,
    right: 24,
    flexDirection: 'row',
    backgroundColor: '#66bb6a',
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#438839',
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
  runButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    marginLeft: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#388e3c',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    shadowColor: '#2a5d22',
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
});
