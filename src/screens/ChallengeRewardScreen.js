import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';
import { PointsContext } from '../context/PointsContext';
import styles from '../styles/ChallengeRewardScreen.styles';

const { width } = Dimensions.get('window');

const localChallenges = [
  { id: 'c1', title: 'Marchez 5 km', description: 'Pour la planète 🌱', goal: 5, ecoPointValue: 25 },
  { id: 'c2', title: 'Économisez 10 kWh', description: 'Réduisez votre conso 💡', goal: 10, ecoPointValue: 40 },
  { id: 'c3', title: 'Recyclez 3 déchets', description: 'Tri sélectif ♻️', goal: 3, ecoPointValue: 30 },
];

const localRewards = [
  { id: 'r1', name: 'Badge Feuille Verte', description: 'Engagement écologique 🌿', pointsRequired: 50 },
  { id: 'r2', name: 'Réduction Bio 10%', description: 'Chez un commerçant local', pointsRequired: 120 },
  { id: 'r3', name: 'T-shirt Eco-fit', description: 'Coton bio', pointsRequired: 200 },
];

export default function ChallengeRewardScreen() {
  const [completedChallenges, setCompletedChallenges] = useState({});
  const { ecoPoints, subtractPoints, refreshPoints } = useContext(PointsContext);

  const handleCompleteChallenge = async (challenge) => {
    if (completedChallenges[challenge.id]) {
      Alert.alert('Déjà validé !', 'Ce défi a déjà été complété.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      // Sauvegarder une activité "défi" dans la base
      await axios.post(`${API_URL}/api/activities`, {
        type: 'defi',
        distance: 0,
        duration: 0,
        points: challenge.ecoPointValue,
        path: [],
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCompletedChallenges((prev) => ({ ...prev, [challenge.id]: true }));
      await refreshPoints();

      Alert.alert('Défi validé !', `+${challenge.ecoPointValue} éco-points 🌿`);
    } catch (err) {
      console.error('Erreur validation défi :', err);
      Alert.alert('Erreur', 'Impossible de valider ce défi.');
    }
  };

  const handleRedeemReward = async (reward) => {
    if (ecoPoints < reward.pointsRequired) {
      Alert.alert('Pas assez de points', 'Complétez plus de défis !');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      // Simuler une "utilisation" de points
      // Tu peux aussi enregistrer une table user_rewards si besoin
      // Ici on fait juste une décrémentation
      subtractPoints(reward.pointsRequired);
      await refreshPoints();

      Alert.alert('Récompense débloquée 🎉', `${reward.name} est à vous !`);
    } catch (err) {
      console.error('Erreur débloquage récompense :', err);
      Alert.alert('Erreur', 'Impossible de débloquer cette récompense.');
    }
  };

  const renderChallenge = ({ item }) => {
    const completed = completedChallenges[item.id];

    return (
      <View style={[styles.challengeCard, completed && styles.challengeCompleted]}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDesc}>{item.description}</Text>
        <Text style={styles.challengeGoal}>Objectif : {item.goal}</Text>
        <Text style={styles.challengePoints}>Points offerts : {item.ecoPointValue}</Text>

        <TouchableOpacity
          style={[styles.challengeButton, completed && styles.buttonDisabled]}
          onPress={() => handleCompleteChallenge(item)}
          disabled={completed}
        >
          <Text style={styles.challengeButtonText}>{completed ? 'Validé ✔️' : 'Valider le défi'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReward = ({ item }) => {
    const available = ecoPoints >= item.pointsRequired;

    return (
      <View style={[styles.rewardCard, !available && styles.rewardLocked]}>
        <Ionicons name="gift-outline" size={36} color={available ? '#4caf50' : '#a5d6a7'} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.rewardName}>{item.name}</Text>
          <Text style={styles.rewardDesc}>{item.description}</Text>
          <Text style={[styles.pointsRequired, !available && { color: '#a5d6a7' }]}>
            {item.pointsRequired} pts requis
          </Text>
          {available && (
            <TouchableOpacity style={styles.redeemButton} onPress={() => handleRedeemReward(item)}>
              <Text style={styles.redeemButtonText}>Débloquer</Text>
            </TouchableOpacity>
          )}
          {!available && <Text style={styles.lockedText}>Pas assez de points</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Défis & Récompenses</Text>
      <Text style={styles.points}>
        Vos éco-points : <Text style={styles.pointsNumber}>{ecoPoints}</Text>
      </Text>

      <Text style={styles.subHeader}>Défis à relever</Text>
      <FlatList
        data={localChallenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 30 }}
      />

      <Text style={styles.subHeader}>Récompenses</Text>
      <FlatList
        data={localRewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
