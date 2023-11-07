import React, { useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { IRealtimeLocation } from 'App/types';
import MapView from 'react-native-maps';
import useCoordinateToAddress from 'App/hooks/useCoordinateToAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CityNameProps {
  region: IRealtimeLocation;
  mapRef: React.RefObject<MapView>;
}

const CityNameBoard = ({ region, mapRef }: CityNameProps) => {
  const location = useMemo(
    () => ({
      latitude: region.latitude,
      longitude: region.longitude,
    }),
    [region.latitude, region.longitude],
  );
  const address = useCoordinateToAddress(mapRef, location);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.cityNameContainer, { top: styles.cityNameContainer.top + insets.top }]}>
      <CustomText style={styles.cityName}>
        {address?.locality || address?.subAdministrativeArea || address?.name || ''}
      </CustomText>
    </View>
  );
};

export default CityNameBoard;
