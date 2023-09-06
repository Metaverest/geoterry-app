import { OnboardingBackgroundImage } from 'App/components/image';

import CustomSafeArea from 'App/components/CustomSafeArea';
import React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';

const HomeScreen = () => {
  return (
    <CustomSafeArea style={styles.container} isOnboardingScreen>
      <ImageBackground source={OnboardingBackgroundImage} />
    </CustomSafeArea>
  );
};

export default HomeScreen;
