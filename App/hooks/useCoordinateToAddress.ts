import { useEffect, useMemo, useState } from 'react';
import MapView, { Address, LatLng } from 'react-native-maps';

const useCoordinateToAddress = (mapRef: React.RefObject<MapView>, location: LatLng, forceOverrideValue?: boolean) => {
  const [address, setAddress] = useState<Address | null>();
  const targetLocation = useMemo(
    () => ({
      latitude: location.latitude,
      longitude: location.longitude,
    }),
    [location.latitude, location.longitude],
  );

  useEffect(() => {
    (async () => {
      if (location.latitude && location.longitude && mapRef.current) {
        try {
          console.log(location);
          const resAddress = await mapRef.current.addressForCoordinate({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          setAddress(resAddress);
        } catch (error) {
          if (forceOverrideValue) {
            setAddress(null);
          }
          console.log(error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLocation]);

  return address;
};

export default useCoordinateToAddress;
