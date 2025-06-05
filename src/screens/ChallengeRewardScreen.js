
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../api/config';

const ChallengeRewardScreen = () => {
  const [challenges, setChallenges] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [activities, setActivities] = useState([]);
  const [unlockedRewards, setUnlockedRewards] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const [challengeRes, rewardRes, activityRes, unlockedRes] = await Promise.all([
        axios.get(`${API_URL}/api/challenges`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/rewards`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/activities`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/user-rewards`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setChallenges(challengeRes.data);
      setRewards(rewardRes.data);
      setActivities(activityRes.data);
      setUnlockedRewards(unlockedRes.data.map(r => r.id));
    } catch (err) {
      console.error('Erreur récupération données :', err);
    }
  };

  const getTotalPoints = () => {
    return activities.reduce((total, a) => total + a.points, 0);
  };

  const handleRedeem = async (reward) => {
    const token = await AsyncStorage.getItem('token');
    const userPoints = getTotalPoints();

    if (unlockedRewards.includes(reward.id)) {
      Alert.alert("⛔", "Récompense déjà débloquée");
      return;
    }

    if (userPoints < reward.points_required) {
      Alert.alert("⛔ Points insuffisants", `Il vous manque ${reward.points_required - userPoints} éco-points.`);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/user-rewards`, { reward_id: reward.id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("🎉 Récompense débloquée !", `${reward.name} vous a été attribuée.`);
      fetchData();
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Impossible de débloquer la récompense");
    }
  };

  const getProgress = (challenge) => {
    if (challenge.goal_type === 'distance') {
      const total = activities.reduce((sum, a) => sum + a.distance, 0);
      return Math.min(total, challenge.goal_value);
    } else if (challenge.goal_type === 'activités') {
      return Math.min(activities.length, challenge.goal_value);
    }
    return 0;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 Défis disponibles</Text>
      {challenges.map((item) => {
        const progress = getProgress(item);
        const completed = progress >= item.goal_value;
        const percentage = Math.min(progress / item.goal_value, 1) * 100;

        return (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.cardSub}>Objectif : {item.goal_value} ({item.goal_type})</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {progress} / {item.goal_value} {item.goal_type}
              {completed ? " ✅ Terminé" : ""}
            </Text>
          </View>
        );
      })}

      <Text style={styles.title}>🏆 Récompenses</Text>
      {rewards.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.cardSub}>🔸 {item.points_required} éco-points</Text>

          {unlockedRewards.includes(item.id) ? (
            <Text style={styles.unlocked}>✅ Récompense débloquée</Text>
          ) : (
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={() => handleRedeem(item)}
            >
              <Text style={styles.redeemText}>🎁 Débloquer</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default ChallengeRewardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fbe7', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 12, color: '#33691e' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#558b2f' },
  cardSub: { marginTop: 4, fontStyle: 'italic', color: '#777' },
  progressBar: { height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, marginTop: 8 },
  progressFill: { height: 10, backgroundColor: '#8bc34a', borderRadius: 5 },
  progressText: { marginTop: 4, fontSize: 13, color: '#444' },
  redeemButton: { marginTop: 10, backgroundColor: '#8bc34a', padding: 10, borderRadius: 8 },
  redeemText: { textAlign: 'center', color: '#fff', fontWeight: 'bold' },
  unlocked: { marginTop: 10, color: '#4caf50', fontWeight: 'bold' },
});
