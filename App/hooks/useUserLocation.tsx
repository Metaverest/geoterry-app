import { isEmpty, isEqual, isUndefined } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { LatLng, UserLocationChangeEvent } from 'react-native-maps';
import useIsSaveBatterryMode from './useIsSaveBatterryMode';
import useRequestLocationPermission from './useRequestLocationPermission';
import Geolocation from '@react-native-community/geolocation';
import { Location } from 'App/types/terry';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<Location>();
  const { hasLocationPermission } = useRequestLocationPermission();
  const isSaveBatterryMode = useIsSaveBatterryMode();
  const updateUserLocation = useCallback(
    (location: Location) => {
      // Stop the function if the save battery mode is undefined
      if (isUndefined(isSaveBatterryMode)) {
        return;
      }

      if (isEmpty(location)) {
        return;
      }
      if (isEmpty(userLocation)) {
        setUserLocation(location);
        return;
      }
      const newUserLatLng: LatLng = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      const currentUserLatLng: LatLng = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
      if (!isEqual(newUserLatLng, currentUserLatLng)) {
        setUserLocation(location);
      }
    },
    [isSaveBatterryMode, userLocation],
  );

  // This function is used in save battery mode
  const onUserLocationChange = useCallback(
    (event: UserLocationChangeEvent) => {
      updateUserLocation(event.nativeEvent.coordinate as Location);
    },
    [updateUserLocation],
  );

  useEffect(() => {
    let watchID: number;
    if (hasLocationPermission) {
      watchID =
        !!Geolocation &&
        Geolocation?.watchPosition(
          position =>
            updateUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              altitudeAccuracy: position.coords.altitudeAccuracy as number,
              accuracy: position.coords.accuracy as number,
              altitude: position.coords.altitude as number,
              speed: position.coords.speed as number,
              timestamp: position.timestamp as number,
            }),
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
  }, [hasLocationPermission, updateUserLocation]);

  return { userLocation, onUserLocationChange };
};

export default useUserLocation;
