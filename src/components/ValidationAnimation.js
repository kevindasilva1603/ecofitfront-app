import React from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function ValidationAnimation({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <LottieView
          source={require('../../assets/validation.json')}
          autoPlay
          loop={false}
          style={styles.animation}
          onAnimationFinish={onClose}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.6,
    height: width * 0.6,
  },
});
