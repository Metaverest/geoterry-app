import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import usePlatform from './usePlatform';

const useRequestNotificationPermission = () => {
  const { isAndroid, isIOS } = usePlatform();
  useEffect(() => {
    (async () => {
      if (isAndroid) {
        const requestResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      }
      if (isIOS) {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }
    })();
  }, [isAndroid, isIOS]);
};
export default useRequestNotificationPermission;
