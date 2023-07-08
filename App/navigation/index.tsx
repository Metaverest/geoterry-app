import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationScreenEnum } from './types';
import HomeScreenScreen from 'App/Containers/Home';
import OnboardingScreenScreen from 'App/Containers/Onboarding';

export const navigationRef = React.createRef<any>();

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={NavigationScreenEnum.OnboardingScreen}>
        <Stack.Screen
          name={NavigationScreenEnum.HomeScreen}
          component={HomeScreenScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationScreenEnum.OnboardingScreen}
          component={OnboardingScreenScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
