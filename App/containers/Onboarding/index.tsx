import CustomButton from 'App/components/Button';
import { EarthIcon } from 'App/components/image';
import { EButtonType, ELanguageCode } from 'App/enums';
import { EColor } from 'App/enums/color';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';

import SelectLanguage from 'App/components/SelectLanguage';
import { ENavigationScreen } from 'App/enums/navigation';
import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';

const OnboardingScreen = ({ navigation }) => {
  const currentLanguageCode = useSelector(reduxSelector.getAppLanguage);

  const dispatch = useDispatch();

  const handlePressCreateAccount = useCallback(() => {
    navigation.navigate(ENavigationScreen.REGISTER_SCREEN);
  }, [navigation]);

  const handlePressLogin = useCallback(() => {
    navigation.navigate(ENavigationScreen.LOGIN_SCREEN);
  }, [navigation]);

  const setLanguage = useCallback(
    (language: ELanguageCode) => {
      dispatch(reduxAppAction.setLanguage(language));
    },
    [dispatch],
  );
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.selectLanguageContainer}>
            <SelectLanguage language={currentLanguageCode as ELanguageCode} setLanguage={setLanguage} />
          </View>
        </View>
        <View style={styles.main}>
          <Image style={styles.image} source={EarthIcon} />
          <Text style={styles.onBoardingTitle}>Terriana</Text>
          <Text style={styles.onBoardingSubTitle}>{'Ready to Explore? Hunt for Treasures in the \n Real World.'}</Text>
          <View style={styles.createAccountButton}>
            <CustomButton
              buttonType={EButtonType.SOLID}
              title="Tạo tài khoản"
              linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
              onPress={handlePressCreateAccount}
            />
          </View>

          <View style={styles.loginButton}>
            <CustomButton
              buttonType={EButtonType.OUTLINE}
              customStyleContainer={{ borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 }}
              title="Đăng nhập"
              onPress={handlePressLogin}
            />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default OnboardingScreen;
