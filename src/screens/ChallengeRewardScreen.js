import React, { useState, useEffect } from 'react';
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

const { width } = Dimensions.get('window');

// Données locales fictives des défis
const localChallenges = [
  {
    id: 'c1',
    title: 'Marchez 5 km',
    description: 'Faites une belle marche pour la planète 🌱',
    goal: 5,
    ecoPointValue: 25,
  },
  {
    id: 'c2',
    title: 'Économisez 10 kWh',
    description: 'Réduisez votre consommation électrique 💡',
    goal: 10,
    ecoPointValue: 40,
  },
  {
    id: 'c3',
    title: 'Recyclez 3 déchets',
    description: 'Contribuez au tri sélectif ♻️',
    goal: 3,
    ecoPointValue: 30,
  },
];

// Données locales fictives des récompenses
const localRewards = [
  {
    id: 'r1',
    name: 'Badge Feuille Verte',
    description: 'Montrez votre engagement écologique 🌿',
    pointsRequired: 50,
  },
  {
    id: 'r2',
    name: 'Réduction 10% Magasin Bio',
    description: 'Bénéficiez d’une remise chez un commerçant local',
    pointsRequired: 120,
  },
  {
    id: 'r3',
    name: 'T-shirt Eco-fit',
    description: 'Un t-shirt fabriqué en coton bio pour vous',
    pointsRequired: 200,
  },
];

export default function ChallengeRewardScreen() {
  const [ecoPoints, setEcoPoints] = useState(0); // Simule points utilisateur
  const [challenges, setChallenges] = useState(localChallenges);
  const [rewards, setRewards] = useState(localRewards);
  const [completedChallenges, setCompletedChallenges] = useState({});

  useEffect(() => {
    // Simule récupération éco-points stockés (ici fixe)
    const storedPoints = 80; // tu peux récupérer depuis AsyncStorage / API plus tard
    setEcoPoints(storedPoints);
  }, []);

  const handleCompleteChallenge = (challenge) => {
    if (completedChallenges[challenge.id]) {
      Alert.alert('Déjà validé !', 'Vous avez déjà complété ce défi.');
      return;
    }

    if (ecoPoints >= challenge.ecoPointValue) {
      Alert.alert('Bravo !', `Vous avez déjà assez de points pour ce défi.`);
      return;
    }

    // Simule ajout de points et validation du défi
    setCompletedChallenges((prev) => ({ ...prev, [challenge.id]: true }));
    setEcoPoints((prev) => prev + challenge.ecoPointValue);

    Alert.alert('Défi validé !', `+${challenge.ecoPointValue} éco-points gagnés 🌿`);
  };

  const canRedeem = (reward) => ecoPoints >= reward.pointsRequired;

  const renderChallenge = ({ item }) => {
    const completed = completedChallenges[item.id] === true;

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
          <Text style={styles.challengeButtonText}>
            {completed ? 'Validé ✔️' : 'Valider le défi'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReward = ({ item }) => {
    const available = canRedeem(item);

    return (
      <View style={[styles.rewardCard, !available && styles.rewardLocked]}>
        <Ionicons name="gift-outline" size={36} color={available ? '#4caf50' : '#a5d6a7'} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.rewardName}>{item.name}</Text>
          <Text style={styles.rewardDesc}>{item.description}</Text>
          <Text style={[styles.pointsRequired, available ? {} : { color: '#a5d6a7' }]}>
            {item.pointsRequired} pts requis
          </Text>
          {available && (
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={() => Alert.alert('Récompense débloquée', `Félicitations pour ${item.name} ! 🎉`)}
            >
              <Text style={styles.redeemButtonText}>Débloquer</Text>
            </TouchableOpacity>
          )}
          {!available && <Text style={styles.lockedText}>Plus de points nécessaires</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Défis & Récompenses</Text>
      <Text style={styles.points}>Vos éco-points : <Text style={styles.pointsNumber}>{ecoPoints}</Text></Text>

      <Text style={styles.subHeader}>Défis à relever</Text>
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
        style={{ marginBottom: 30 }}
      />

      <Text style={styles.subHeader}>Récompenses à débloquer</Text>
      <FlatList
        data={rewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7faf5', paddingTop: 30 },
  header: { fontSize: 32, fontWeight: '900', color: '#2e7d32', paddingHorizontal: 20, marginBottom: 10 },
  points: { fontSize: 18, fontWeight: '700', color: '#4caf50', paddingHorizontal: 20, marginBottom: 20 },
  pointsNumber: { fontSize: 22, fontWeight: '900', color: '#2e7d32' },
  subHeader: { fontSize: 24, fontWeight: '800', color: '#4caf50', paddingHorizontal: 20, marginBottom: 15 },

  challengeCard: {
    backgroundColor: '#dcedc8',
    borderRadius: 20,
    padding: 20,
    marginRight: 20,
    width: width * 0.75,
    shadowColor: '#2e7d32',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
  },
  challengeCompleted: {
    backgroundColor: '#a5d6a7',
  },
  challengeTitle: {
    fontWeight: '900',
    fontSize: 22,
    color: '#2e7d32',
    marginBottom: 8,
  },
  challengeDesc: {
    fontSize: 14,
    color: '#53753f',
    marginBottom: 15,
  },
  challengeGoal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#33691e',
  },
  challengePoints: {
    fontSize: 14,
    fontWeight: '700',
    color: '#558b2f',
    marginBottom: 15,
  },
  challengeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 15,
  },
  challengeButtonText: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#8bc34a',
  },

  rewardCard: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#2e7d32',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    alignItems: 'center',
  },
  rewardLocked: {
    opacity: 0.5,
  },
  rewardName: {
    fontWeight: '900',
    fontSize: 20,
    color: '#2e7d32',
  },
  rewardDesc: {
    fontSize: 14,
    color: '#558b2f',
  },
  pointsRequired: {
    fontWeight: '800',
    marginTop: 8,
    fontSize: 14,
    color: '#4caf50',
  },
  redeemButton: {
    marginTop: 10,
    backgroundColor: '#4caf50',
    borderRadius: 15,
    paddingVertical: 8,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'center',
  },
  lockedText: {
    marginTop: 10,
    color: '#8bc34a',
    fontWeight: '700',
    fontStyle: 'italic',
  },
});
