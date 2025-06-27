import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../api/config';

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token manquant');

        const res = await axios.get(`${API_URL}/api/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setActivities(res.data);
      } catch (err) {
        console.error('Erreur useActivities :', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
};

export default useActivities;
