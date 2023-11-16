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

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await getStoredProperty(EDataStorageKey.ACCESS_TOKEN);
      if (!isEmpty(token)) {
        dispatch(sagaUserAction.getProfileAndGoToMainAppAsync(navigation));
      } else {
        navigation.dispatch(CommonActions.navigate(ENavigationScreen.LOGIN_SCREEN));
      }
    })();
  }, [navigation, dispatch]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={OnboardingBackgroundImage}>
      <View style={styles.content}>
        <CustomText style={styles.title}>Terriana</CustomText>
        <LinearGradient colors={['#547AFF', '#4551DE']} style={styles.containerImage}>
          <Image source={EarthIcon} style={styles.logo} resizeMode="contain" />
        </LinearGradient>
      </View>
    </CustomSafeArea>
  );
};
export default SplashScreen;
