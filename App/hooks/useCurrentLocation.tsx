import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { IRealtimeLocation } from 'App/types';
import useRequestLocationPermission from './useRequestLocationPermission';
import { DEFAULT_LOCATION } from 'App/constants/common';

const useCurrentLocation = (): IRealtimeLocation => {
  const { hasLocationPermission } = useRequestLocationPermission();
  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>(DEFAULT_LOCATION);
  useEffect(() => {
    let watchID: number;
    if (hasLocationPermission) {
      watchID =
        !!Geolocation &&
        Geolocation?.watchPosition(
          position => {
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
