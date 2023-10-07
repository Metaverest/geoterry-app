import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView from 'react-native-maps';
import { styles } from './styles';

import { StackActions, useNavigation } from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import { EButtonType, EDataStorageKey } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import useCurrentLocation, { defaultLocation } from 'App/hooks/useCurrentLocation';
import FilterMapIcon from 'App/media/FilterMapIcon';
import HistoryIcon from 'App/media/HistoryIcon';
import SettingIcon from 'App/media/SettingIcon';
import TargetIcon from 'App/media/TargetIcon';
import TypeMapIcon from 'App/media/TypeMapIcon';
import UserProfileIcon from 'App/media/UserProfileIcon';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { MOCK_TERRY } from 'App/types/terry';
import { removePropertyInDevice } from 'App/utils/storage/storage';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import TreasureMarker from './TreasureMarker';
import UserMarker from './UserMarker';

const MapScreen = () => {
  // The current user`s location
  const currentLocation = useCurrentLocation();
  const mapRef = useRef<MapView>(null);

  //The current region of the map view
  const [region, setRegion] = useState(currentLocation);

  useEffect(() => {
    // If the current location is not empty and the region is empty or default location, set the region to the current location
    if (!isEmpty(currentLocation) && (isEmpty(region) || region === defaultLocation)) {
      setRegion(currentLocation);
    }
  }, [currentLocation, region]);
  const navigation = useNavigation();
  const handlePressTypeMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.MAP_TYPE_SCREEN));
  }, [navigation]);

  const handlePressFilterMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.FILTER_SCREEN));
  }, [navigation]);
  const onCenter = () => {
    mapRef?.current?.animateToRegion(currentLocation);
  };
  const mapType = useSelector(reduxSelector.getAppMapType);
  return (
    <CustomSafeArea style={styles.container}>
      <MapView
        mapType={mapType}
        ref={mapRef}
        style={styles.mapContainer}
        onRegionChangeComplete={e => {
          console.log('set region');
          setRegion(e as IRealtimeLocation);
        }}
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
          onPress={handlePressFilterMap}
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<FilterMapIcon />}
        />
        <CustomButtonIcon
          onPress={onCenter}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<TargetIcon />}
        />
      </View>
      <View style={styles.listButtonRHNContainer}>
        <CustomButtonIcon
          onPress={() => {}}
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<UserProfileIcon />}
        />
        <CustomButtonIcon
          onPress={() => {}}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<SettingIcon />}
        />
        <CustomButtonIcon
          onPress={async () => {
            await removePropertyInDevice(EDataStorageKey.ACCESS_TOKEN);
            await removePropertyInDevice(EDataStorageKey.REFRESH_TOKEN);
            navigation.dispatch(StackActions.replace(ENavigationScreen.LOGIN_SCREEN));
          }}
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
