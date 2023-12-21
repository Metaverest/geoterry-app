import { DEFAULT_LOCATION } from 'App/constants/common';
import { isAndroidDevice } from 'App/helpers/common';
import { useCallback, useState } from 'react';
import { Details, Region } from 'react-native-maps';

const useCurrentRegion = () => {
  const [region, setRegion] = useState<Region>(DEFAULT_LOCATION);
  const onRegionChangeComplete = useCallback((newRegion: Region, details: Details) => {
    if (isAndroidDevice() && !details.isGesture) {
      return;
    }
    setRegion(newRegion);
  }, []);
  return { region, setRegion, onRegionChangeComplete };
};
export default useCurrentRegion;
