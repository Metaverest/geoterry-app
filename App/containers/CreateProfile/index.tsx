/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { ECreateProfileScreen } from 'App/enums/navigation';
import ChooseAvatarScreen from './ChooseAvatarScreen';
import CreateProfileSuccessScreen from './CreateProfileSuccessfully';
import EnterDisplayNameScreen from './EnterDisplayNameScreen';
import PermissionLocationScreen from './PermissionLocationScreen';

const Stack = createStackNavigator();

const CreateProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ECreateProfileScreen.ENTER_DISPLAY_NAME_SCREEN}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ECreateProfileScreen.ENTER_DISPLAY_NAME_SCREEN}
        component={EnterDisplayNameScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ECreateProfileScreen.CHOOSE_AVATAR_SCREEN}
        component={ChooseAvatarScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ECreateProfileScreen.CREATE_PROFILE_SUCCESS_SCREEN}
        component={CreateProfileSuccessScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ECreateProfileScreen.PERMISSION_LOCATION_SCREEN}
        component={PermissionLocationScreen}
      />
    </Stack.Navigator>
  );
};

export default CreateProfileNavigator;
