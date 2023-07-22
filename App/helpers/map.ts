import Geolocation from '@react-native-community/geolocation';
import { IRealtimeLocation } from 'App/hooks/useCurrentLocation';

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
