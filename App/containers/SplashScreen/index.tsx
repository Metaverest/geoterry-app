import { CommonActions, useNavigation } from '@react-navigation/native';
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
import { EarthIcon, OnboardingBackgroundImage } from 'App/components/image';
import CustomText from 'App/components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import { EColor } from 'App/enums/color';
import messaging from '@react-native-firebase/messaging';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await getStoredProperty(EDataStorageKey.ACCESS_TOKEN);
      const fcmToken = await messaging().getToken();
      if (!isEmpty(token)) {
        dispatch(sagaUserAction.getProfileAndGoToMainAppAsync(navigation, { fcmToken: fcmToken }));
      } else {
        navigation.dispatch(CommonActions.navigate(ENavigationScreen.LOGIN_SCREEN));
      }
    })();
  }, [navigation, dispatch]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={OnboardingBackgroundImage}>
      <View style={styles.content}>
        <CustomText style={styles.title}>Terriana</CustomText>
        <LinearGradient colors={[EColor.color_547AFF, EColor.color_4551DE]} style={styles.containerImage}>
          <Image source={EarthIcon} style={styles.logo} resizeMode="contain" />
        </LinearGradient>
      </View>
      <CustomText style={styles.textFooter}>Powered by Metaverest</CustomText>
    </CustomSafeArea>
  );
};
export default SplashScreen;
