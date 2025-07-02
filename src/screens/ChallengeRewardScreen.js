import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Alert, ScrollView, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ChallengeRewardScreen.styles';
import useChallengeReward from '../hooks/useChallengeReward';
import { PointsContext } from '../context/PointsContext';
import ValidationAnimation from '../components/ValidationAnimation';

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
  const { ecoPoints, subtractPoints, refreshPoints } = useContext(PointsContext);
  const {
    completedChallenges,
    unlockedRewards,
    completeChallenge,
    redeemReward
  } = useChallengeReward({ refreshPoints, subtractPoints });

  const [animationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    console.log('🎯 Éco-points récupérés :', ecoPoints);
  }, [ecoPoints]);

  const handleCompleteChallenge = async (challenge) => {
    const result = await completeChallenge(challenge);
    if (result.success) setAnimationVisible(true);
    Alert.alert(result.success ? 'Défi validé !' : 'Erreur', result.message);
  };

  const handleRedeemReward = async (reward) => {
  const result = await redeemReward(reward, ecoPoints);
  if (result.success) {
    subtractPoints(reward.pointsRequired); // décrémentation ici
    setAnimationVisible(true);
  }
  Alert.alert(result.success ? 'Récompense 🎁' : 'Erreur', result.message);
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
          <Text style={styles.challengeButtonText}>
            {completed ? 'Validé ✔️' : 'Valider le défi'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReward = ({ item }) => {
    const available = ecoPoints >= item.pointsRequired;
    const alreadyRedeemed = unlockedRewards[item.id];

    return (
      <View style={[styles.rewardCard, (!available || alreadyRedeemed) && styles.rewardLocked]}>
        <Ionicons name="gift-outline" size={36} color={available && !alreadyRedeemed ? '#4caf50' : '#a5d6a7'} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.rewardName}>{item.name}</Text>
          <Text style={styles.rewardDesc}>{item.description}</Text>
          <Text style={[styles.pointsRequired, (!available || alreadyRedeemed) && { color: '#a5d6a7' }]}>
            {item.pointsRequired} pts requis
          </Text>

          {available ? (
            <TouchableOpacity
              style={[styles.redeemButton, alreadyRedeemed && styles.buttonDisabled]}
              onPress={() => !alreadyRedeemed && handleRedeemReward(item)}
              disabled={alreadyRedeemed}
            >
              <Text style={styles.redeemButtonText}>
                {alreadyRedeemed ? 'Déjà débloqué ✔️' : 'Débloquer'}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.lockedText}>Pas assez de points</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Défis & Récompenses</Text>

      {/* ✅ Bloc éco-points dynamique */}
      <View style={styles.pointsPanel}>
        <Ionicons name="leaf" size={26} color="#4caf50" />
        <Text style={styles.pointsText}>
          Éco-points : <Text style={styles.pointsNumber}>{ecoPoints ?? 0}</Text>
        </Text>
      </View>

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
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      <ValidationAnimation visible={animationVisible} onClose={() => setAnimationVisible(false)} />
    </ScrollView>
  );
}
