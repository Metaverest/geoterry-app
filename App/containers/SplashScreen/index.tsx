import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { EDataStorageKey } from 'App/enums';
import { ENavigationScreen } from 'App/enums/navigation';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { getStoredProperty } from 'App/utils/storage/storage';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './styles';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await getStoredProperty(EDataStorageKey.ACCESS_TOKEN);
      if (!isEmpty(token)) {
        dispatch(sagaUserAction.getProfileAndGoToMainAppAsync(navigation));
      } else {
        navigation.dispatch(CommonActions.navigate(ENavigationScreen.LOGIN_SCREEN));
      }
    })();
  }, [navigation, dispatch]);
  return (
    <CustomSafeArea style={styles.container} isModal>
      <View>
        <ActivityIndicator />
      </View>
    </CustomSafeArea>
  );
};
export default SplashScreen;
