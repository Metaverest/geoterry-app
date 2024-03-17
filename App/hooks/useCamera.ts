import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking } from 'react-native';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

interface IUseCameraProps {
  cameraPosition: 'front' | 'back' | 'external';
}

const useCamera = (props: IUseCameraProps) => {
  const { t } = useTranslation();
  const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const cameraDevice = useCameraDevice(props.cameraPosition);
  const handleCameraPermission = useCallback(async () => {
    if (!cameraHasPermission) {
      const granted = await requestCameraPermission();

      // TODO: Implement permission popup instead of alert
      if (!granted) {
        Alert.alert(
          t('Ứng dụng không có quyền truy cập vào Camera'),
          t('Vui lòng cấp quyền truy cập Camera trong cài đặt ứng dụng'),
          [
            {
              text: t('Mở'),
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
    }
  }, [cameraHasPermission, requestCameraPermission, t]);

  useEffect(() => {
    handleCameraPermission();
  }, [handleCameraPermission]);

  return { cameraDevice, cameraHasPermission };
};
export default useCamera;
