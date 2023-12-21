import { createStackNavigator } from '@react-navigation/stack';
import CreateProfileNavigator from 'App/containers/CreateProfile';
import ForgotPasswordNavigator from 'App/containers/ForgotPassword';
import LoginScreen from 'App/containers/Login';
import MainGameNavigator from 'App/containers/MainGameNavigator';
import LoadingModal from 'App/containers/Modal/LoadingModal';
import NetworkLogger from 'App/containers/NetworkLogger';
import OTPScreen from 'App/containers/OTP';
import OnboardingScreen from 'App/containers/Onboarding';
import RegisterScreen from 'App/containers/Register';
import SplashScreen from 'App/containers/SplashScreen';
import { EDataStorageKey, ELanguageCode } from 'App/enums';
import { ENavigationScreen } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import AXIOS, { setLanguageRequestHeader } from 'App/utils/axios';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NetworkLoggerButton from './NetworkLoggerButton';
import { Linking } from 'react-native';
import { getStoredProperty } from 'App/utils/storage/storage';
import { ROUTES } from './linkingConfig';
import { PREFIX_LINK } from 'App/constants/common';
import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const Stack = createStackNavigator();
const Navigation = () => {
  const language = useSelector(reduxSelector.getUserLanguageCode);
  useEffect(() => {
    (async () => {
      await i18next.changeLanguage(language);
      await setLanguageRequestHeader(AXIOS, language || ELanguageCode.VN);
    })();
  }, [language]);

  useEffect(() => {
    (async () => {
      const initURL = await Linking.getInitialURL();
      const accessToken = await getStoredProperty(EDataStorageKey.ACCESS_TOKEN);
      if (!initURL || accessToken || Object.values(ROUTES.AUTH_ROUTES).includes(initURL.replace(PREFIX_LINK, ''))) {
        return;
      }
      navigationRef.dispatch(CommonActions.navigate(ENavigationScreen.ONBOARDING_SCREEN));
    })();
  }, []);

  return (
    <>
      <Stack.Navigator initialRouteName={ENavigationScreen.SPLASH_SCREEN}>
        <Stack.Screen
          name={ENavigationScreen.SPLASH_SCREEN}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ENavigationScreen.ONBOARDING_SCREEN}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ENavigationScreen.REGISTER_SCREEN}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={ENavigationScreen.LOGIN_SCREEN} component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name={ENavigationScreen.OTP_SCREEN} component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={ENavigationScreen.CREATE_PROFILE_NAVIGATOR}
          component={CreateProfileNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ENavigationScreen.FORGOT_PASSWORD_NAVIGATOR}
          component={ForgotPasswordNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ENavigationScreen.MAIN_GAME_NAVIGATOR}
          component={MainGameNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ENavigationScreen.LOADING_MODAL}
          component={LoadingModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
        <Stack.Screen name={ENavigationScreen.NETWORK_LOGGER_SCREEN} component={NetworkLogger} />
      </Stack.Navigator>
      <NetworkLoggerButton />
    </>
  );
};

export default Navigation;
