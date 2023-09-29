import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView from 'react-native-maps';
import { styles } from './styles';

import { StackActions, useNavigation } from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ENavigationScreen } from 'App/enums/navigation';
import useCurrentLocation from 'App/hooks/useCurrentLocation';
import FilterMapIcon from 'App/media/FilterMapIcon';
import HistoryIcon from 'App/media/HistoryIcon';
import SettingIcon from 'App/media/SettingIcon';
import TargetIcon from 'App/media/TargetIcon';
import TypeMapIcon from 'App/media/TypeMapIcon';
import UserProfileIcon from 'App/media/UserProfileIcon';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { MOCK_TERRY } from 'App/types/terry';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import TreasureMarker from './TreasureMarker';
import UserMarker from './UserMarker';

const MapScreen = () => {
  const currentLocation = useCurrentLocation();
  const [region, setRegion] = useState(currentLocation);
  useEffect(() => {
    if (!isEmpty(currentLocation)) {
      setRegion(currentLocation);
    }
  }, [currentLocation]);
  const navigation = useNavigation();
  useEffect(() => {}, []);
  const handlePressTypeMap = useCallback(() => {
    navigation.dispatch(StackActions.push(ENavigationScreen.MAP_TYPE_SCREEN));
  }, [navigation]);
  const mapType = useSelector(reduxSelector.getAppMapType);
  return (
    <CustomSafeArea style={styles.container}>
      <MapView
        mapType={mapType}
        style={styles.mapContainer}
        onRegionChangeComplete={e => setRegion(e as IRealtimeLocation)}
        region={region}>
        <UserMarker userPosition={currentLocation} />
        {MOCK_TERRY.map(treasure => (
          <TreasureMarker key={treasure.id} treasure={treasure} />
        ))}
      </MapView>

      <View style={styles.listButtonFooterContainer}>
        <CustomButtonIcon
          onPress={handlePressTypeMap}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<TypeMapIcon />}
        />
        <CustomButtonIcon
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<FilterMapIcon />}
        />
        <CustomButtonIcon
          onPress={() => setRegion(currentLocation)}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<TargetIcon />}
        />
      </View>
      <View style={styles.listButtonRHNContainer}>
        <CustomButtonIcon
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<UserProfileIcon />}
        />
        <CustomButtonIcon
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<SettingIcon />}
        />
        <CustomButtonIcon
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<HistoryIcon />}
        />
      </View>
    </CustomSafeArea>
  );
};
export default MapScreen;
