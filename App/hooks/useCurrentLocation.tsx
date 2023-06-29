import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export interface IRealtimeLocation {
  latitude: number;
  longitude: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
}

const useCurrentLocation = (): IRealtimeLocation => {
  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed,
        });
      },
      undefined,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return currentLocation;
};

export default useCurrentLocation;
