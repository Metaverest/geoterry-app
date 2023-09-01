import { CommonActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'App/containers/Login';
import LoadingModal from 'App/containers/Modal/LoadingModal';
import OTPScreen from 'App/containers/OTP';
import OnboardingScreen from 'App/containers/Onboarding';
import RegisterScreen from 'App/containers/Register';
import { ENavigationScreen } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import { last } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
export const navigationRef = React.createRef<any>();
const Stack = createStackNavigator();
const Navigation = () => {
  const navigation = useNavigation();
  const isLoading = useSelector(reduxSelector.getAppIsLoading);
  useEffect(() => {
    const currentScreen = last(navigation?.getState()?.routes || [])?.name;
    if (isLoading && currentScreen !== ENavigationScreen.LOADING_MODAL) {
      navigation.dispatch(CommonActions.navigate({ name: ENavigationScreen.LOADING_MODAL }));
    } else if (!isLoading && currentScreen === ENavigationScreen.LOADING_MODAL) {
      navigation.dispatch(CommonActions.goBack());
    }
  }, [navigation, isLoading]);
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
          name={ENavigationScreen.LOADING_MODAL}
          component={LoadingModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
