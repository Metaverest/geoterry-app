import React, { useEffect, useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Ensure you're using react-navigation
import { styles } from './styles';
import useUserLocation from 'App/hooks/useUserLocation';
import { convertGeoToAR } from 'App/helpers/cartesian';

const ArTerryScreen = () => {
  const { userLocation } = useUserLocation();
  const [text, setText] = useState('');
  const [arCoordinates, setArCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (userLocation) {
      const arCoords = convertGeoToAR(userLocation, { latitude: 21.028511, longitude: 105.804817 });
      setArCoordinates(arCoords);
    }
  }, [userLocation]);

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log('onInitialized', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Go Ahead');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
      console.log('Loss of tracking', state, reason);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText text={text} scale={[0.1, 0.1, 0.1]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

      <ViroText
        text="Turn Left"
        position={[arCoordinates.x, arCoordinates.y, -1]}
        scale={[0.1, 0.1, 0.1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ArTerryScreen,
        }}
        style={styles.f1}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
