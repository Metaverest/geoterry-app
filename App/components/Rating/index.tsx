import { View, ViewStyle } from 'react-native';
import React from 'react';
import { styles } from './styles';
import GoldStarIcon from 'App/media/GoldStarIcon';
import StarIcon from 'App/media/StarIcon';

const Rating = ({ rate, style }: { rate: number; style?: ViewStyle }) => {
  return (
    <View style={[styles.row, style]}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <View key={index.toString()} style={item !== 1 ? styles.ml2 : null}>
            {Math.round(rate) >= item ? <GoldStarIcon /> : <StarIcon />}
          </View>
        );
      })}
    </View>
  );
};

export default Rating;
