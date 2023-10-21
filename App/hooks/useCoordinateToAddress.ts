import { useEffect, useState } from 'react';
import MapView, { Address } from 'react-native-maps';

interface LatLng {
  latitude: number;
  longitude: number;
}

const useCoordinateToAddress = (mapRef: React.RefObject<MapView>, location: LatLng, forceFetch?: boolean) => {
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    (async () => {
      if (location.latitude && location.longitude && mapRef.current) {
        try {
          const resAddress = await mapRef.current.addressForCoordinate({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          setAddress(resAddress);
        } catch (error) {
          if (!forceFetch) {
            setAddress(null);
          }
          console.log(error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, location]);

  return address;
};

export default useCoordinateToAddress;
