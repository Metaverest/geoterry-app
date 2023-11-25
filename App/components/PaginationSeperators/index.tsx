import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';

const PaginationSeperators = ({ length, index }: { length: number; index: number }) => {
  const arr = [...Array(length).keys()];
  return (
    <View style={styles.containerDots}>
      {arr.map(x => (
        <View key={x} style={[styles.dot, { backgroundColor: x === index ? styles.dot.borderColor : undefined }]} />
      ))}
    </View>
  );
};

export default PaginationSeperators;
