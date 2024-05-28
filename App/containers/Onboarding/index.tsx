import CustomButton from 'App/components/Button';
import { EarthIcon } from 'App/components/image';
import { EButtonType, ELanguageCode } from 'App/enums';
import { EColor } from 'App/enums/color';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';

import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import SelectLanguage from 'App/components/SelectLanguage';
import { ENavigationScreen } from 'App/enums/navigation';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { i18nChangeLanguage } from 'App/utils/i18n/localize';

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
      i18nChangeLanguage(language);
    },
    [dispatch],
  );
  const { t } = useTranslation();
  return (
    <CustomSafeArea style={styles.container}>
      <View style={styles.header}>
        <SelectLanguage language={currentLanguageCode as ELanguageCode} setLanguage={setLanguage} />
      </View>
      <View style={styles.main}>
        <Image style={styles.image} source={EarthIcon} />
        <CustomText style={styles.onBoardingTitle}>Checkly</CustomText>
        <CustomText style={styles.onBoardingSubTitle}>
          {t('Ready to Explore? Hunt for Treasures in the \n Real World.')}
        </CustomText>
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
            customStyleContainer={styles.loginButtonCustomContainerStyle}
            title={t('Đăng nhập')}
            onPress={handlePressLogin}
          />
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default OnboardingScreen;
