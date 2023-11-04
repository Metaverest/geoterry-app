import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView from 'react-native-maps';
import { styles } from './styles';

import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import TreasureMarker from '../Map/TreasureMarker';
import { ITerryResponseDto } from 'App/types/terry';

const HuntingMapScreen = () => {
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.HUNTING_MAP_SCREEN>>();
  const [terry, setTerry] = useState<ITerryResponseDto | null>(null);

  useEffect(() => {
    setTerry(params.terry);
  }, [params]);
  console.log(terry);
  return (
    <CustomSafeArea style={styles.container}>
      <MapView style={styles.mapContainer} showsUserLocation={true} followsUserLocation={true}>
        {terry && <TreasureMarker key={terry.id} treasure={terry} />}
      </MapView>
    </CustomSafeArea>
  );
};
export default HuntingMapScreen;
