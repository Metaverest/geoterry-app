import Geolocation from 'react-native-geolocation-service';
import { IRealtimeLocation } from 'App/types';

export const getCurrentLocation = () => {
  return new Promise<IRealtimeLocation | null>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLocation: IRealtimeLocation = {
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
        };
        resolve(currentLocation);
      },
      error => {
        console.log(error);
        reject(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};

export const createGoogleMapsUrl = (latitude: number, longitude: number) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};
