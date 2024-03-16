import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import Header from 'App/components/Header';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { TouchableOpacity } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { AppBackgroundImage } from 'App/components/image';
import Flash from 'App/media/Flash';
import { LinearGradient } from 'react-native-linear-gradient';
import { EColor } from 'App/enums/color';
import { EMainGameScreen } from 'App/enums/navigation';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';

const VerifyOfficialTerryScreen = ({ route }: { route: any }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [flashOn, setFlashOn] = useState(false);
  const { terryId } = useMemo(() => route.params || {}, [route.params]);
  const verifyCodes = useSelector(reduxSelector.getTerryVerifyCodes);

  const onSuccess = useCallback(
    (e: BarCodeReadEvent) => {
      dispatch(sagaUserAction.verifyOfficialTerryAsync(terryId, e.data, navigation));
      navigation.dispatch(
        CommonActions.navigate({
          name: EMainGameScreen.CHECKIN_TERRY_SCREEN,
          params: { isCannotFindTerry: false, terryId },
        }),
      );
    },
    [dispatch, navigation, terryId],
  );

  useEffect(() => {
    if (verifyCodes && verifyCodes[terryId]) {
      navigation.dispatch(
        CommonActions.navigate({
          name: EMainGameScreen.CHECKIN_TERRY_SCREEN,
          params: { isCannotFindTerry: false, terryId, code: verifyCodes[terryId] },
        }),
      );
    }
  }, [navigation, terryId, verifyCodes]);

  const renderBottomContent = useCallback(() => {
    return (
      <LinearGradient
        colors={flashOn ? [EColor.color_C072FD, EColor.color_51D5FF] : [EColor.black, EColor.black]}
        style={styles.flashContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <TouchableOpacity onPress={() => setFlashOn(prev => !prev)}>
          <Flash />
        </TouchableOpacity>
      </LinearGradient>
    );
  }, [flashOn]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Xác minh kho báu')} />
      <QRCodeScanner
        cameraType="back"
        vibrate={true}
        showMarker={true}
        containerStyle={styles.qrCodeContainer}
        cameraContainerStyle={styles.qrCodeCameraContainer}
        cameraStyle={styles.qrCodeCameraContainer}
        bottomContent={renderBottomContent()}
        onRead={onSuccess}
        flashMode={flashOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
      />
    </CustomSafeArea>
  );
};

export default VerifyOfficialTerryScreen;
