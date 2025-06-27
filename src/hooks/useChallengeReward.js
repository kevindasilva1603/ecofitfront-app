import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

export default function useChallengeReward({ refreshPoints, subtractPoints }) {
  const [completedChallenges, setCompletedChallenges] = useState({});

  const completeChallenge = async (challenge) => {
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
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCompletedChallenges(prev => ({ ...prev, [challenge.id]: true }));
      await refreshPoints();

      return { success: true, message: `+${challenge.ecoPointValue} éco-points 🌿` };
    } catch (error) {
      console.error('Erreur défi :', error);
      return { success: false, message: 'Erreur serveur' };
    }
  };

  const redeemReward = async (reward, currentPoints) => {
    if (currentPoints < reward.pointsRequired) {
      return { success: false, message: 'Pas assez de points' };
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) return { success: false, message: 'Non authentifié' };

    try {
      subtractPoints(reward.pointsRequired);
      await refreshPoints();
      return { success: true, message: `${reward.name} débloqué 🎉` };
    } catch (error) {
      console.error('Erreur récompense :', error);
      return { success: false, message: 'Erreur serveur' };
    }
  };

  return {
    completedChallenges,
    completeChallenge,
    redeemReward,
  };
}
