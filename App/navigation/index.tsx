import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationScreenEnum } from './types';
import HomeScreenScreen from 'App/Containers/Home';
import OnboardingScreen from 'App/Containers/Onboarding';

export const navigationRef = React.createRef<any>();

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={NavigationScreenEnum.HomeScreen}>
        <Stack.Screen
          name={NavigationScreenEnum.HomeScreen}
          component={HomeScreenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationScreenEnum.OnboardingScreen}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
