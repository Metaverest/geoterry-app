import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import usePlatform from './usePlatform';

const useRequestNotificationPermission = () => {
  const { isAndroid, isIOS } = usePlatform();
  useEffect(() => {
    (async () => {
      if (isAndroid) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }
      if (isIOS) {
        await messaging().requestPermission();
      }
    })();
  }, [isAndroid, isIOS]);
};
export default useRequestNotificationPermission;
