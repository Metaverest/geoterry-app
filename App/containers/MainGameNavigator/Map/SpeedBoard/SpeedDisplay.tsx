import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

interface SpeedBoardProps {
  speed: number;
}

const SpeedBoard = ({ speed }: SpeedBoardProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.speedContainer}>
        <Text style={styles.speedText}>{Math.floor(speed)}</Text>
        <Text style={styles.unitText}>{t('km/h')}</Text>
      </View>
    </View>
  );
};

export default SpeedBoard;
