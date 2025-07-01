// src/tests/components/ActivityCard.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityCard from '../../components/ActivityCard';
import { Animated } from 'react-native';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('ActivityCard', () => {
  it('affiche les infos de l’activité', () => {
    const item = {
      type: 'course',
      distance: 3.2,
      points: 20,
    };
    const fadeAnim = new Animated.Value(1);
    const { getByText } = render(<ActivityCard item={item} fadeAnim={fadeAnim} index={0} />);
    expect(getByText('course')).toBeTruthy();
    expect(getByText('3.2 km – 20 pts')).toBeTruthy();
  });
});
