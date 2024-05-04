import { createStackNavigator } from '@react-navigation/stack';
import { ENavigationScreen, ESettingNavigator } from 'App/enums/navigation';
import React from 'react';
import MenuScreen from './Menu';
import RoleScreen from './Role';
import LanguageScreen from './Language';
import PolicyScreen from './Policy';
import AboutScreen from './About';
import LoadingModal from '../Modal/LoadingModal';
import ChangePasswordScreen from './ChangePassword';
const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ESettingNavigator.MENU_SCREEN}>
      <Stack.Screen options={{ headerShown: false }} name={ESettingNavigator.MENU_SCREEN} component={MenuScreen} />
      <Stack.Screen options={{ headerShown: false }} name={ESettingNavigator.RULE_SCREEN} component={RoleScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ESettingNavigator.LANGUAGE_SCREEN}
        component={LanguageScreen}
      />
      <Stack.Screen options={{ headerShown: false }} name={ESettingNavigator.POLICY_SCREEN} component={PolicyScreen} />
      <Stack.Screen options={{ headerShown: false }} name={ESettingNavigator.ABOUT_SCREEN} component={AboutScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ESettingNavigator.PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={ENavigationScreen.LOADING_MODAL}
        component={LoadingModal}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
