import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import Header from 'App/components/Header';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { AppBackgroundImage } from 'App/components/image';
import Flash from 'App/media/Flash';
import { LinearGradient } from 'react-native-linear-gradient';
import { EColor } from 'App/enums/color';
import { EMainGameScreen } from 'App/enums/navigation';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { ESagaUserAction } from 'App/enums/redux';
import useCamera from 'App/hooks/useCamera';
import { Camera, useCodeScanner } from 'react-native-vision-camera';

const VerifyOfficialTerryScreen = ({ route }: { route: any }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [flashOn, setFlashOn] = useState(false);
  const { terryId } = useMemo(() => route.params || {}, [route.params]);
  const verifyCodes = useSelector(reduxSelector.getTerryVerifyCodes);

  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const { cameraDevice } = useCamera({ cameraPosition: 'back' });
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

  const renderFlashButton = useCallback(() => {
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

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const value = codes[0]?.value;
      const type = codes[0]?.type;

      if (type === 'qr' && !loadingStates?.[ESagaUserAction.VERIFY_OFFICIAL_TERRY] && value) {
        dispatch(sagaUserAction.verifyOfficialTerryAsync(terryId, value, navigation));
      }
    },
  });
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Xác minh kho báu')} />
      {cameraDevice && (
        <View style={styles.textContainer}>
          <Text style={styles.notFoundText}>{t('Scan mã QR xuất hiện kho báu để xác nhận')}</Text>
        </View>
      )}
      {cameraDevice ? (
        <View style={styles.cameraContainer}>
          <Camera
            codeScanner={codeScanner}
            style={styles.camera}
            device={cameraDevice}
            isActive={true}
            torch={flashOn ? 'on' : 'off'}
          />
          <View style={styles.cameraFocus} />
          {renderFlashButton()}
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <Text style={styles.notFoundText}>{t('Không tìm thấy Camera')}</Text>
        </View>
      )}
      {loadingStates?.[ESagaUserAction.VERIFY_OFFICIAL_TERRY] && (
        <ActivityIndicator style={styles.loading} size="large" />
      )}
    </CustomSafeArea>
  );
};

export default VerifyOfficialTerryScreen;
