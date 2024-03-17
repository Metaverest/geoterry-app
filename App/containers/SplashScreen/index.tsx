import { useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { EDataStorageKey } from 'App/enums';
import { ENavigationScreen } from 'App/enums/navigation';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { getStoredProperty } from 'App/utils/storage/storage';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './styles';
import { ChecklyLine, OnboardingBackgroundImage } from 'App/components/image';
import CustomText from 'App/components/CustomText';
import messaging from '@react-native-firebase/messaging';
import { resetAndNavigateToScreen } from 'App/utils/navigation';
import { useTranslation } from 'react-i18next';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const token = await getStoredProperty(EDataStorageKey.ACCESS_TOKEN);
      const fcmToken = await messaging().getToken();
      if (!isEmpty(token)) {
        dispatch(sagaUserAction.getProfileAndGoToMainAppAsync(navigation, { fcmToken: fcmToken }));
      } else {
        resetAndNavigateToScreen(navigation, ENavigationScreen.ONBOARDING_SCREEN);
      }
    })();
  }, [navigation, dispatch]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={OnboardingBackgroundImage}>
      <View style={styles.content}>
        <Image source={ChecklyLine} style={styles.logo} resizeMode="contain" />
      </View>
      <CustomText style={styles.textFooter}>{t('Metaverest')}</CustomText>
    </CustomSafeArea>
  );
};
export default SplashScreen;
