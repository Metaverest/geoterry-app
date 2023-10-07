/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { EMainGameScreen } from 'App/enums/navigation';
import MapScreen from './Map';
import MapTypeScreen from './MapTypeScreen';
import FilterScreen from './FilterScreen';
import { EColor } from 'App/enums/color';

const Stack = createStackNavigator();

const MainGameNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={EMainGameScreen.MAP_SCREEN}>
      <Stack.Screen options={{ headerShown: false }} name={EMainGameScreen.MAP_SCREEN} component={MapScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          transitionSpec: {
            close: {
              animation: 'timing',
              config: {
                duration: 200,
              },
            },
            open: {
              animation: 'timing',
              config: {
                duration: 200,
              },
            },
          },
        }}
        name={EMainGameScreen.MAP_TYPE_SCREEN}
        component={MapTypeScreen}
      />
      <Stack.Screen
        name={EMainGameScreen.FILTER_SCREEN}
        component={FilterScreen}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          cardStyle: {
            backgroundColor: EColor.color_00000080,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainGameNavigator;
