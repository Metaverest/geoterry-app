/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { EColor } from 'App/enums/color';
import { EMainGameScreen } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterScreen from './FilterScreen';
import MapScreen from './Map';
import MapTypeScreen from './MapTypeScreen';
import { sagaUserAction } from 'App/redux/actions/userAction';
import SettingNavigator from '../Setting';

const Stack = createStackNavigator();

const MainGameNavigator = () => {
  const dispatch = useDispatch();
  const publicFilterCategories = useSelector(reduxSelector.getAppPublicCategories);
  useEffect(() => {
    if (isEmpty(publicFilterCategories)) {
      dispatch(sagaUserAction.getPublicFilterCategoriesAsync([]));
    }
  }, [dispatch, publicFilterCategories]);
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
      <Stack.Screen
        name={EMainGameScreen.SETTING_NAVIGATOR}
        component={SettingNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainGameNavigator;
