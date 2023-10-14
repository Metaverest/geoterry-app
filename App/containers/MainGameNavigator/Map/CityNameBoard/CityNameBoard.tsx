import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { IRealtimeLocation } from 'App/types';
import MapView from 'react-native-maps';

interface CityNameProps {
  region: IRealtimeLocation;
  mapRef: React.RefObject<MapView>;
}

const CityNameBoard = ({ region, mapRef }: CityNameProps) => {
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (region.latitude && region.longitude && mapRef.current) {
        try {
          const address = await mapRef.current.addressForCoordinate({
            latitude: region.latitude,
            longitude: region.longitude,
          });
          setCityName(!address.locality ? address.subAdministrativeArea || address.name : address.locality);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [mapRef, region]);
  return (
    <View style={styles.cityNameContainer}>
      <CustomText style={styles.cityName}>{cityName}</CustomText>
    </View>
  );
};

export default CityNameBoard;
