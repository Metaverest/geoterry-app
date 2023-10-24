import { useEffect, useState, useRef } from 'react';
import MapView, { Address } from 'react-native-maps';

interface LatLng {
  latitude: number;
  longitude: number;
}

const useCoordinateToAddress = (mapRef: React.RefObject<MapView>, location: LatLng, forceOverrideValue?: boolean) => {
  const [address, setAddress] = useState<Address | null>();
  const prevLocationRef = useRef<LatLng | null>(null);

  useEffect(() => {
    if (
      location.latitude !== prevLocationRef.current?.latitude ||
      location.longitude !== prevLocationRef.current?.longitude
    ) {
      (async () => {
        if (location.latitude && location.longitude && mapRef.current) {
          try {
            const resAddress = await mapRef.current.addressForCoordinate({
              latitude: location.latitude,
              longitude: location.longitude,
            });
            setAddress(resAddress);
            prevLocationRef.current = location;
          } catch (error) {
            if (forceOverrideValue) {
              setAddress(null);
            }
            console.log(error);
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, mapRef]);

  return address;
};

export default useCoordinateToAddress;
