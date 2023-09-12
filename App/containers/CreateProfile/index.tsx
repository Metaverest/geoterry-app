/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { ENavigationScreen } from 'App/enums/navigation';
import ChooseAvatarScreen from './ChooseAvatarScreen';
import EnterDisplayNameScreen from './EnterDisplayNameScreen';
import PermissionLocationScreen from './PermissionLocationScreen';
import CreateProfileSuccessScreen from './CreateProfileSuccessfully';

const Stack = createStackNavigator();

const CreateProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ENavigationScreen.ENTER_DISPLAY_NAME_SCREEN}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ENavigationScreen.ENTER_DISPLAY_NAME_SCREEN}
        component={EnterDisplayNameScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ENavigationScreen.CHOOSE_AVATAR_SCREEN}
        component={ChooseAvatarScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ENavigationScreen.CREATE_PROFILE_SUCCESS_SCREEN}
        component={CreateProfileSuccessScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ENavigationScreen.PERMISSION_LOCATION_SCREEN}
        component={PermissionLocationScreen}
      />
    </Stack.Navigator>
  );
};

export default CreateProfileNavigator;
