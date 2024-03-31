import { useEffect } from 'react';
import usePlatform from './usePlatform';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

const useRequestTurnOnGPSAndroid = () => {
  const { isAndroid } = usePlatform();
  useEffect(() => {
    (async () => {
      if (isAndroid) {
        try {
          await promptForEnableLocationIfNeeded();
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [isAndroid]);
};
export default useRequestTurnOnGPSAndroid;
