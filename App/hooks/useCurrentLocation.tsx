import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { IRealtimeLocation } from 'App/types';
import useRequestLocationPermission from './useRequestLocationPermission';

const useCurrentLocation = (): IRealtimeLocation => {
  const { hasLocationPermission } = useRequestLocationPermission();
  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>({
    latitude: 37.78825,
    longitude: -122.4324,
    altitude: 0,
    heading: 0,
    speed: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    let watchID: number;
    if (hasLocationPermission) {
      watchID =
        !!Geolocation &&
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
          {
            enableHighAccuracy: true, // to use GPS location, if false it will be use WIFI based location
          },
        );
    }
    return () => {
      !!Geolocation && watchID && Geolocation.clearWatch(watchID);
    };
  }, [hasLocationPermission]);

  return currentLocation;
};

export default useCurrentLocation;
