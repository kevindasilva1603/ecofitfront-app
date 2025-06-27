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
import styles from '../styles/homescreen.styles';



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

