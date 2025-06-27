// hooks/useAddActivity.js
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

export default function useAddActivity(navigation) {
  const [canAdd, setCanAdd] = useState(true);
  const [photo, setPhoto] = useState(null);

  // Vérifie si l'utilisateur peut ajouter une activité manuelle (tous les 2 jours)
  useEffect(() => {
    const checkLastAdd = async () => {
      const lastDate = await AsyncStorage.getItem('lastManualActivityDate');
      if (lastDate) {
        const last = new Date(lastDate);
        const now = new Date();
        const diff = now - last;
        const twoDays = 2 * 24 * 60 * 60 * 1000;
        if (diff < twoDays) setCanAdd(false);
      }
    };
    checkLastAdd();
  }, []);

  const submitActivity = async ({ type, distance, duration }) => {
    if (!type || !distance || !duration || !photo) {
      throw new Error('Tous les champs et une photo sont requis');
    }

    if (!canAdd) {
      throw new Error('Vous pouvez ajouter une activité manuelle tous les 2 jours seulement.');
    }

    const token = await AsyncStorage.getItem('token');
    const dist = parseFloat(distance);
    const pts = Math.round(dist * 2); // moins de points que course automatique

    await axios.post(
      `${API_URL}/api/activities`,
      {
        type,
        distance: dist,
        duration: parseInt(duration),
        points: pts,
        path: [],
        photo,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await AsyncStorage.setItem('lastManualActivityDate', new Date().toISOString());
    navigation.goBack();
  };

  return {
    canAdd,
    photo,
    setPhoto,
    submitActivity,
  };
}
