import { useEffect } from 'react';
import usePlatform from './usePlatform';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const useRequestLocationPermission = () => {
  const { isAndroid, isIOS } = usePlatform();
  useEffect(() => {
    (async () => {
      if (isAndroid) {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          console.log('Permission granted');
        }

        if (result === RESULTS.DENIED) {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (requestResult === RESULTS.GRANTED) {
            console.log('Permission granted');
          }
        }
      }
      if (isIOS) {
        const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          console.log('Permission granted');
        }
        if (result === RESULTS.DENIED) {
          const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (requestResult === RESULTS.GRANTED) {
            console.log('Permission granted');
          }
        }
      }
    })();
  }, [isAndroid, isIOS]);
};
export default useRequestLocationPermission;
