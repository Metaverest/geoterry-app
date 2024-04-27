import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import Header from 'App/components/Header';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { AppBackgroundImage } from 'App/components/image';
import Flash from 'App/media/Flash';
import { LinearGradient } from 'react-native-linear-gradient';
import { EColor } from 'App/enums/color';
import { EMainGameScreen } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import { ESagaUserAction } from 'App/enums/redux';
import useCamera from 'App/hooks/useCamera';
import { Camera, useCodeScanner } from 'react-native-vision-camera';
import { APP_DOMAIN_URL } from 'App/constants/common';

const ScanProfileQRScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [flashOn, setFlashOn] = useState(false);

  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const { cameraDevice } = useCamera({ cameraPosition: 'back' });

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

      if (type === 'qr' && value?.includes(`https://www.${APP_DOMAIN_URL}/redirect/profile/`)) {
        navigation.dispatch(
          CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN, {
            profileID: value.replace(`https://www.${APP_DOMAIN_URL}/redirect/profile/`, ''),
          }),
        );
      }
    },
  });
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Quét mã QR')} />
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

export default ScanProfileQRScreen;
