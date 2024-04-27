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
import { ENavigationScreen, ENavigatorParams } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import AXIOS, { setLanguageRequestHeader } from 'App/utils/axios';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NetworkLoggerButton from './NetworkLoggerButton';
import { Linking } from 'react-native';
import { getStoredProperty } from 'App/utils/storage/storage';
import { ROUTES } from './linkingConfig';
import { CommonActions, createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import PopupModal from 'App/containers/Modal/PopupModal';
import messaging from '@react-native-firebase/messaging';
import { onReceiveNotification } from 'App/utils/notification';
import { sagaUserAction } from 'App/redux/actions/userAction';

export const navigationRef = createNavigationContainerRef();

const Stack = createStackNavigator<ENavigatorParams>();
const Navigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
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
      const isDeepLink = initURL && initURL.includes(ROUTES.AUTH_ROUTES.PROFILE_SCREEN.prefix);
      if (!initURL || accessToken || isDeepLink) {
        if (!user.id && isDeepLink) {
          dispatch(sagaUserAction.getProfileAsync(navigation, {}));
        }
        return;
      }
      navigationRef.dispatch(CommonActions.navigate(ENavigationScreen.ONBOARDING_SCREEN));
    })();
  }, [dispatch, navigation, user]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(onReceiveNotification);
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
        <Stack.Screen
          name={ENavigationScreen.POPUP_SCREEN}
          component={PopupModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
        <Stack.Screen name={ENavigationScreen.NETWORK_LOGGER_SCREEN} component={NetworkLogger} />
      </Stack.Navigator>
      <NetworkLoggerButton />
    </>
  );
};

export default Navigation;
