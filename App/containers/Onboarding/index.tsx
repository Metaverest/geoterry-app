import CustomButton from 'App/components/Button';
import { EarthIcon } from 'App/components/image';
import { EButtonType, ELanguageCode } from 'App/enums';
import { EColor } from 'App/enums/color';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';

import { CommonActions, useNavigation } from '@react-navigation/native';
import SelectLanguage from 'App/components/SelectLanguage';
import { ENavigationScreen } from 'App/enums/navigation';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingScreen = () => {
  const currentLanguageCode = useSelector(reduxSelector.getAppLanguage);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePressCreateAccount = useCallback(() => {
    navigation.dispatch(CommonActions.navigate({ name: ENavigationScreen.REGISTER_SCREEN }));
  }, [navigation]);

  const handlePressLogin = useCallback(() => {
    navigation.dispatch(CommonActions.navigate({ name: ENavigationScreen.LOGIN_SCREEN }));
  }, [navigation]);

  const setLanguage = useCallback(
    (language: ELanguageCode) => {
      dispatch(reduxAppAction.setLanguage(language));
    },
    [dispatch],
  );
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SelectLanguage language={currentLanguageCode as ELanguageCode} setLanguage={setLanguage} />
      </View>
      <View style={styles.main}>
        <Image style={styles.image} source={EarthIcon} />
        <Text style={styles.onBoardingTitle}>Terriana</Text>
        <Text style={styles.onBoardingSubTitle}>{t('Ready to Explore? Hunt for Treasures in the \n Real World.')}</Text>
        <View style={styles.createAccountButton}>
          <CustomButton
            buttonType={EButtonType.SOLID}
            title={t('Tạo tài khoản')}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            onPress={handlePressCreateAccount}
          />
        </View>

        <View style={styles.loginButton}>
          <CustomButton
            buttonType={EButtonType.OUTLINE}
            customStyleContainer={{ borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 }}
            title={t('Đăng nhập')}
            onPress={handlePressLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
