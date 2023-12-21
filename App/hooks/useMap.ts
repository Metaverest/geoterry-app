import { useCallback } from 'react';
import MapView, { Region } from 'react-native-maps';

const useMap = (mapRef: React.RefObject<MapView>) => {
  const centerToRegion = useCallback(
    (region: Region) => {
      mapRef?.current?.animateToRegion(region);
    },
    [mapRef],
  );
  return { centerToRegion };
};
export default useMap;
