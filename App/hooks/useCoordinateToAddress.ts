import { useEffect, useState } from 'react';
import MapView, { Address, LatLng } from 'react-native-maps';

const useCoordinateToAddress = (mapRef: React.RefObject<MapView>, location: LatLng, forceOverrideValue?: boolean) => {
  const [address, setAddress] = useState<Address | null>();

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
  }, [location]);

  return address;
};

export default useCoordinateToAddress;
