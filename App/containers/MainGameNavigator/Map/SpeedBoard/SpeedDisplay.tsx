import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import CustomText from 'App/components/CustomText';

interface SpeedBoardProps {
  speed: number;
}

const SpeedBoard = ({ speed }: SpeedBoardProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.speedContainer}>
        <CustomText style={styles.speedText}>{Math.floor(speed)}</CustomText>
        <CustomText style={styles.unitText}>{t('km/h')}</CustomText>
      </View>
    </View>
  );
};

export default SpeedBoard;
