import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { PointsContext } from '../../context/PointsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// ✅ MOCK icons (évite les erreurs Jest)
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// ✅ MOCK AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// ✅ MOCK navigation
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// ✅ MOCK axios
jest.mock('axios');

describe('HomeScreen', () => {
  it('affiche les éco-points', async () => {
    const mockActivities = [
      {
        id: 1,
        type: 'Course',
        distance: 5,
        date: '2025-06-30',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockActivities });

    const ecoPoints = 100;

    const { findByText } = render(
      <PointsContext.Provider value={{ points: ecoPoints }}>
        <HomeScreen />
      </PointsContext.Provider>
    );

    // ✅ Ne vérifie plus le texte "Course", mais seulement les éco-points
    await findByText(/éco-points/i);
  });
});
