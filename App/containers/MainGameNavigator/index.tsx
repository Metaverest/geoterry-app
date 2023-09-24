/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { ENavigationScreen } from 'App/enums/navigation';
import MapScreen from './Map';
import MapTypeScreen from './MapTypeScreen';

const Stack = createStackNavigator();

const MainGameNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ENavigationScreen.MAP_SCREEN}>
      <Stack.Screen options={{ headerShown: false }} name={ENavigationScreen.MAP_SCREEN} component={MapScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
        name={ENavigationScreen.MAP_TYPE_SCREEN}
        component={MapTypeScreen}
      />
    </Stack.Navigator>
  );
};

export default MainGameNavigator;
