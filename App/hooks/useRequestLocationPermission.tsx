import { useEffect, useMemo, useState } from 'react';
import usePlatform from './usePlatform';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const useRequestLocationPermission = () => {
  const { isAndroid, isIOS } = usePlatform();
  const [hasAndroidPermission, setHasAndroidPermission] = useState(false);
  const [hasIOSPermission, setHasIOSPermission] = useState(false);
  useEffect(() => {
    (async () => {
      if (isAndroid) {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          setHasAndroidPermission(true);
          console.log('Permission granted');
        }

        if (result === RESULTS.DENIED) {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (requestResult === RESULTS.GRANTED) {
            setHasAndroidPermission(true);
            console.log('Permission granted');
          }
        }
      }
      if (isIOS) {
        const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          setHasIOSPermission(true);
          console.log('Permission granted');
        }
        if (result === RESULTS.DENIED) {
          const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (requestResult === RESULTS.GRANTED) {
            setHasIOSPermission(true);
            console.log('Permission granted');
          }
        }
      }
    })();
  }, [isAndroid, isIOS]);
  const hasLocationPermission = useMemo(() => {
    return isAndroid ? hasAndroidPermission : hasIOSPermission;
  }, [hasAndroidPermission, hasIOSPermission, isAndroid]);
  return { hasLocationPermission };
};
export default useRequestLocationPermission;
