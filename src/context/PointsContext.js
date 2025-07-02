import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [ecoPoints, setEcoPoints] = useState(0);

  const loadPoints = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/api/points`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEcoPoints(res.data.points || 0);
    } catch (err) {
      console.error('Erreur lors du refresh des points :', err);
    }
  };

  const addPoints = (amount) => setEcoPoints((prev) => prev + amount);
  const subtractPoints = (amount) => setEcoPoints((prev) => Math.max(prev - amount, 0));

  useEffect(() => {
    loadPoints();
  }, []);

  return (
    <PointsContext.Provider
      value={{
        ecoPoints,          // ✅ le nom utilisé dans les écrans
        addPoints,
        subtractPoints,
        refreshPoints: loadPoints,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);
