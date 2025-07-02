import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

// Helper pour extraire l'ID utilisateur depuis le token
const getUserIdFromToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (error) {
    console.error('Erreur décodage token', error);
    return null;
  }
};

export default function useChallengeReward({ refreshPoints, subtractPoints }) {
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [unlockedRewards, setUnlockedRewards] = useState({});

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const userId = await getUserIdFromToken();
    if (!userId) return;

    const storedChallenges = await AsyncStorage.getItem(`completedChallenges_${userId}`);
    const storedRewards = await AsyncStorage.getItem(`unlockedRewards_${userId}`);

    setCompletedChallenges(storedChallenges ? JSON.parse(storedChallenges) : {});
    setUnlockedRewards(storedRewards ? JSON.parse(storedRewards) : {});
  };

  const completeChallenge = async (challenge) => {
    const userId = await getUserIdFromToken();
    if (!userId) return { success: false, message: 'Non authentifié' };

    if (completedChallenges[challenge.id]) {
      return { success: false, message: 'Déjà validé' };
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) return { success: false, message: 'Non authentifié' };

    try {
      await axios.post(`${API_URL}/api/activities`, {
        type: 'defi',
        distance: 0,
        duration: 0,
        points: challenge.ecoPointValue,
        path: [],
        photo: null,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updated = { ...completedChallenges, [challenge.id]: true };
      setCompletedChallenges(updated);
      await AsyncStorage.setItem(`completedChallenges_${userId}`, JSON.stringify(updated));
      await refreshPoints();

      return { success: true, message: `+${challenge.ecoPointValue} éco-points 🌿` };
    } catch (error) {
      console.error('Erreur défi :', error);
      return { success: false, message: 'Erreur serveur' };
    }
  };

  const redeemReward = async (reward, currentPoints) => {
    const userId = await getUserIdFromToken();
    if (!userId) return { success: false, message: 'Non authentifié' };

    if (unlockedRewards[reward.id]) {
      return { success: false, message: 'Récompense déjà débloquée' };
    }

    if (currentPoints < reward.pointsRequired) {
      return { success: false, message: 'Pas assez de points' };
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) return { success: false, message: 'Non authentifié' };

    try {
      await subtractPoints(reward.pointsRequired);

      const updated = { ...unlockedRewards, [reward.id]: true };
      setUnlockedRewards(updated);
      await AsyncStorage.setItem(`unlockedRewards_${userId}`, JSON.stringify(updated));
      await refreshPoints();

      // Sauvegarde d'un badge spécifique si besoin
      if (reward.id === 'r1') {
        await AsyncStorage.setItem('badge_feuille', 'true');
      }

      return { success: true, message: `${reward.name} débloqué 🎉` };
    } catch (error) {
      console.error('Erreur récompense :', error);
      return { success: false, message: 'Erreur serveur' };
    }
  };

  return {
    completedChallenges,
    unlockedRewards,
    completeChallenge,
    redeemReward,
  };
}
