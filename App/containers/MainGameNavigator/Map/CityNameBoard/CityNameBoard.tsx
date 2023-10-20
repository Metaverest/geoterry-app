import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { IRealtimeLocation } from 'App/types';
import MapView from 'react-native-maps';
import useCoordinateToAddress from 'App/hooks/useCoordinateToAddress';

interface CityNameProps {
  region: IRealtimeLocation;
  mapRef: React.RefObject<MapView>;
}

const CityNameBoard = ({ region, mapRef }: CityNameProps) => {
  const address = useCoordinateToAddress(
    mapRef,
    {
      latitude: region.latitude,
      longitude: region.longitude,
    },
    true,
  );

  return (
    <View style={styles.cityNameContainer}>
      <CustomText style={styles.cityName}>
        {address?.locality || address?.subAdministrativeArea || address?.name || ''}
      </CustomText>
    </View>
  );
};

export default CityNameBoard;
