import React, { useEffect, useState } from 'react';
import { ViroARScene, ViroARSceneNavigator, ViroText, ViroTrackingStateConstants } from '@viro-community/react-viro';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'; // Ensure you're using react-navigation
import { styles } from './styles';
import useUserLocation from 'App/hooks/useUserLocation';
import { convertGeoToAR } from 'App/helpers/cartesian';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';

const ArTerryScreen = () => {
  const { userLocation } = useUserLocation();
  const [vrInitialized, setVrInitialized] = useState(false);
  const [arCoordinates, setArCoordinates] = useState({ x: 0, y: 0 });
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.TERRY_AR_SCREEN>>();

  useEffect(() => {
    if (userLocation) {
      const arCoords = convertGeoToAR(userLocation || params.userLocation, userLocation || params.userLocation);
      setArCoordinates(arCoords);
    }
  }, [params.terry.location, params.userLocation, userLocation]);

  function onInitialized(state: ViroTrackingStateConstants) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setVrInitialized(true);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {vrInitialized && (
        <ViroText
          text="Terry Here!"
          position={[arCoordinates.x, arCoordinates.y, -1]}
          style={styles.helloWorldTextStyle}
        />
      )}

      <ViroText text="Go ahead" position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

      <ViroText text="Turn around" position={[0, 0, 3]} style={styles.helloWorldTextStyle} />

      <ViroText text="Turn left" position={[-3, 0, -1]} style={styles.helloWorldTextStyle} />

      <ViroText text="Turn right" position={[2, 0, -1]} style={styles.helloWorldTextStyle} />
    </ViroARScene>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
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
