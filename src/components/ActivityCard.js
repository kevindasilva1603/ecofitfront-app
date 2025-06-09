import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityCard = ({ item, fadeAnim, index }) => {
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, index]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons
        name={
          item.type === 'course'
            ? 'walk-outline'
            : item.type === 'vélo'
            ? 'bicycle-outline'
            : 'trail-sign-outline'
        }
        size={28}
        color="#4caf50"
        style={{ marginRight: 20 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.activityType}>{item.type}</Text>
        <Text style={styles.activityDetails}>
          {item.distance} km – {item.points} pts
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d7e9cd',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 26,
    marginBottom: 16,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
  activityType: {
    fontSize: 20,
    fontWeight: '800',
    color: '#386635',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 16,
    color: '#53753f',
  },
});

export default ActivityCard;
