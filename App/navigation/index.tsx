import { createStackNavigator } from '@react-navigation/stack';
import CreateProfileNavigator from 'App/containers/CreateProfile';
import ForgotPasswordNavigator from 'App/containers/ForgotPassword';
import LoginScreen from 'App/containers/Login';
import LoadingModal from 'App/containers/Modal/LoadingModal';
import OTPScreen from 'App/containers/OTP';
import OnboardingScreen from 'App/containers/Onboarding';
import RegisterScreen from 'App/containers/Register';
import { ENavigationScreen } from 'App/enums/navigation';
import React from 'react';
export const navigationRef = React.createRef<any>();
const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={ENavigationScreen.ONBOARDING_SCREEN}>
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
          name={ENavigationScreen.LOADING_MODAL}
          component={LoadingModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
