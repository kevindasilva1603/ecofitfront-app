// src/context/PointsContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [ecoPoints, setEcoPoints] = useState(0);

  const loadInitialPoints = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const res = await axios.get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const total = res.data.reduce((sum, a) => sum + (a.points || 0), 0);
      const used = await AsyncStorage.getItem('ecoPointsUsed');
      const totalUsed = parseInt(used || '0', 10);
      setEcoPoints(total - totalUsed);
    } catch (err) {
      console.error('Erreur chargement ecoPoints :', err);
    }
  };

  useEffect(() => {
    loadInitialPoints();
  }, []);

  const refreshPoints = () => {
    loadInitialPoints();
  };

  const addPoints = async (pts) => {
    setEcoPoints(prev => prev + pts);
    // Ajout de points non persisté ici car ce sont des points gagnés temporairement
  };

  const subtractPoints = async (pts) => {
    try {
      const used = await AsyncStorage.getItem('ecoPointsUsed');
      const totalUsed = parseInt(used || '0', 10);
      const newUsed = totalUsed + pts;
      await AsyncStorage.setItem('ecoPointsUsed', newUsed.toString());
      setEcoPoints(prev => prev - pts);
    } catch (err) {
      console.error('Erreur soustraction ecoPoints :', err);
    }
  };

  return (
    <PointsContext.Provider value={{ ecoPoints, addPoints, subtractPoints, refreshPoints }}>
      {children}
    </PointsContext.Provider>
  );
};
