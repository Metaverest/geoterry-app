import { useCallback, useEffect, useMemo, useState } from 'react';
import usePlatform from './usePlatform';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

const useRequestLocationPermission = () => {
  const { isAndroid, isIOS } = usePlatform();
  const [hasAndroidPermission, setHasAndroidPermission] = useState(false);
  const [hasIOSPermission, setHasIOSPermission] = useState(false);
  const { t } = useTranslation();

  const openSettings = useCallback(() => {
    Alert.alert(
      t('Ứng dụng không có quyền truy cập vị trí của bạn'),
      t('Vui lòng cấp quyền truy cập vị trí của bạn trong cài đặt ứng dụng'),
      [
        {
          text: t('Mở'),
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
    );
  }, [t]);

  useEffect(() => {
    (async () => {
      if (isAndroid) {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          setHasAndroidPermission(true);
        } else {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (requestResult === RESULTS.GRANTED) {
            setHasAndroidPermission(true);
          } else {
            openSettings();
          }
        }
      }
      if (isIOS) {
        const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          setHasIOSPermission(true);
        } else {
          const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (requestResult === RESULTS.GRANTED) {
            setHasIOSPermission(true);
          } else {
            openSettings();
          }
        }
      }
    })();
  }, [isAndroid, isIOS, openSettings, t]);

  const hasLocationPermission = useMemo(() => {
    return isAndroid ? hasAndroidPermission : hasIOSPermission;
  }, [hasAndroidPermission, hasIOSPermission, isAndroid]);
  return { hasLocationPermission };
};
export default useRequestLocationPermission;
