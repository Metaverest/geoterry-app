import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface MapCenterToggleProps {
  centerMap: () => void; // Function prop to center the map
}

const { width } = Dimensions.get('window');

const MapCenterToggle = ({ centerMap }: MapCenterToggleProps) => {
  const [alwaysCenter, setAlwaysCenter] = useState(false);

  const handleToggle = () => {
    setAlwaysCenter(prevState => !prevState);
    centerMap(); // Optionally, center the map once when the toggle is clicked.
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>{alwaysCenter ? 'Always Center' : 'Center Once'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: (width - 32) / 2,
    transform: [{ translateX: 50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MapCenterToggle;
