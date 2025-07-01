// src/tests/components/AnimatedButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AnimatedButton from '../../components/AnimatedButton';

// ✅ Mock complet de react-native-reanimated
jest.mock('react-native-reanimated', () => {
  return {
    useSharedValue: () => ({ value: 1 }),
    useAnimatedStyle: () => ({}),
    withSpring: (_val, _config, callback) => {
      if (callback) callback();
      return _val;
    },
    View: ({ children }) => children,
    default: 'Animated',
  };
});

// ✅ Mock propre du TapGestureHandler
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    TapGestureHandler: ({ onActivated, children }) => (
      <View onTouchEnd={onActivated}>{children}</View>
    ),
  };
});

describe('AnimatedButton', () => {
  it('affiche le texte et déclenche onPress', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <AnimatedButton onPress={mockPress}>Valider</AnimatedButton>
    );

    fireEvent(getByText('Valider'), 'onTouchEnd');

    expect(mockPress).toHaveBeenCalled();
  });
});
