import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

const AnimatedButton = ({ onPress, children }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onTap = () => {
    scale.value = withSpring(1.1, undefined, () => {
      scale.value = withSpring(1);
      onPress && onPress();
    });
  };

  return (
    <TapGestureHandler onActivated={onTap}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#43a047',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default AnimatedButton;
