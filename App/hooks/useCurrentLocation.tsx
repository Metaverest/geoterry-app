import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { IRealtimeLocation } from 'App/types';
import useRequestLocationPermission from './useRequestLocationPermission';

const useCurrentLocation = (): IRealtimeLocation => {
  const { hasLocationPermission } = useRequestLocationPermission();
  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>({
    latitude: 37.78825, // Latitude of the marker
    longitude: -122.4324, // Longitude of the marker
    altitude: 0,
    heading: 0,
    speed: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation &&
        Geolocation?.watchPosition(
          position => {
            console.log(position);
            setCurrentLocation(currentPositionDraft => ({
              ...currentPositionDraft,
              altitude: position.coords.altitude,
              heading: position.coords.heading,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
            }));
          },
          error => {
            console.log(error);
          },
        );
    }
  }, [hasLocationPermission]);

  return currentLocation;
};

export default useCurrentLocation;
