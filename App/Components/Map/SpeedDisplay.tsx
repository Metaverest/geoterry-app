import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface SpeedDisplayProps {
  speed: number;
}

const { width } = Dimensions.get('window');

const SpeedDisplay = ({ speed }: SpeedDisplayProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.speedContainer}>
        <Text style={styles.speedText}>{Math.floor(speed)}</Text>
        <Text style={styles.unitText}>km/h</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: (width - 100) / 2,
    transform: [{ translateX: 50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  speedContainer: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  speedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  unitText: {
    fontSize: 24,
    color: '#777',
    marginLeft: 8,
  },
});

export default SpeedDisplay;
