// src/screens/OnboardingScreen.js
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#a8e6cf',
          image: <Image source={require('../../assets/eco1.png')} style={{ width: 200, height: 200 }} />,
          title: 'Bouge pour la planète',
          subtitle: 'Chaque pas compte pour la Terre 🌍',
        },
        {
          backgroundColor: '#dcedc1',
          image: <Image source={require('../../assets/eco2.png')} style={{ width: 200, height: 200 }} />,
          title: 'Gagne des éco-points',
          subtitle: 'Marche, cours, pédale... et cumule des points 💚',
        },
        {
          backgroundColor: '#ffd3b6',
          image: <Image source={require('../../assets/eco3.png')} style={{ width: 200, height: 200 }} />,
          title: 'Transforme tes efforts',
          subtitle: 'Plante des arbres, soutiens des causes écolos 🌱',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
