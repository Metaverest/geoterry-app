import Geolocation from '@react-native-community/geolocation';
import { IRealtimeLocation } from 'App/hooks/useCurrentLocation';
import { Dimensions } from 'react-native';

export const getLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
    );
  });
};

export const isValidLocation = (location: IRealtimeLocation) => {
  return location.latitude !== 0 && location.longitude !== 0;
};

export const getDynamicLatLongDelta = () => {
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.003;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  return {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
};
