import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView from 'react-native-maps';
import { styles } from './styles';

import { CommonActions, StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import { DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY } from 'App/constants/common';
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
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { ITerryFilterParams } from 'App/types/terry';
import { calculateDistance } from 'App/utils/convert';
import { getStoredProperty, removePropertyInDevice } from 'App/utils/storage/storage';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CityNameBoard from './CityNameBoard/CityNameBoard';
import TreasureMarker from './TreasureMarker';
import UserMarker from './UserMarker';
import TerryPreviewBoard from './TerryPreviewBoard/TerryPreviewBoard';
import HeartIcon from 'App/media/HeartIcon';
import SavedIcon from 'App/media/SavedIcon';

const MapScreen = () => {
  // The current user`s location
  const currentLocation = useCurrentLocation();
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSaveBatterryMode, setIsSaveBatterryMode] = useState(false);
  useFocusEffect(() => {
    (async () => {
      const isSaveBatterry = await getStoredProperty(EDataStorageKey.IS_SAVE_BATTERY_MODE);
      setIsSaveBatterryMode(isSaveBatterry as boolean);
    })();
  });

  //The current region of the map view
  const [region, setRegion] = useState(currentLocation);
  const [regionToGetTerry, setRegionToGetTerry] = useState(currentLocation);
  const changeRegion = useCallback(
    (updatedRegion: IRealtimeLocation) => {
      setRegion(updatedRegion);
      if (
        !isEmpty(regionToGetTerry) &&
        !isEmpty(updatedRegion) &&
        calculateDistance(regionToGetTerry, updatedRegion) > DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY
      ) {
        setRegionToGetTerry(updatedRegion);
        dispatch(
          sagaUserAction.getPublicTerriesAsync({} as ITerryFilterParams, navigation, {
            location: { latitude: updatedRegion.latitude, longitude: updatedRegion.longitude },
          }),
        );
      }
    },
    [dispatch, navigation, regionToGetTerry],
  );

  useEffect(() => {
    // If the current location is not empty and the region is empty or default location, set the region to the current location
    if (
      !isEmpty(currentLocation) &&
      (isEmpty(region) ||
        (region.latitude === defaultLocation.latitude && region.longitude === defaultLocation.longitude))
    ) {
      changeRegion(currentLocation);
    }
  }, [currentLocation, region, changeRegion]);
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
  const publicTerries = useSelector(reduxSelector.getAppPublicTerries);

  const [selectedTerryId, setSelectedTerryId] = useState<string | null>(null);
  const centerToRegion = (targetLocation: IRealtimeLocation) => {
    mapRef?.current?.animateToRegion(targetLocation);
  };
  const selectedTerry = useSelector(reduxSelector.getAppPublicTerry);

  useEffect(() => {
    if (selectedTerryId && selectedTerryId !== selectedTerry?.id) {
      dispatch(
        sagaUserAction.getPublicTerryByIdAsync(
          {
            terryId: selectedTerryId,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          navigation,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerryId]);

  return (
    <CustomSafeArea style={styles.container}>
      <MapView
        mapType={mapType}
        ref={mapRef}
        style={styles.mapContainer}
        showsUserLocation={isSaveBatterryMode}
        compassOffset={{ x: -10, y: 208 }}
        onRegionChangeComplete={e => {
          changeRegion(e as IRealtimeLocation);
        }}
        onLongPress={() => setSelectedTerryId(null)}
        region={region}>
        {isSaveBatterryMode ? null : <UserMarker userPosition={currentLocation} centerMap={onCenter} />}
        {publicTerries?.map(treasure => (
          <TreasureMarker
            key={treasure.id}
            treasure={treasure}
            isSelect={treasure.id === selectedTerryId}
            setSelectedTerry={setSelectedTerryId}
            centerToRegion={centerToRegion}
          />
        ))}
      </MapView>

      {!(selectedTerry && selectedTerryId) ? (
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
      ) : null}

      <CityNameBoard region={region} mapRef={mapRef} />

      {selectedTerry && selectedTerryId ? (
        <View style={styles.listButtonFooterContainer}>
          <CustomButtonIcon
            buttonColor={selectedTerry.favourite ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<HeartIcon focus={selectedTerry.favourite} />}
          />
          <CustomButtonIcon
            buttonColor={selectedTerry.saved ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<SavedIcon focus={selectedTerry.saved} />}
          />
        </View>
      ) : null}

      {selectedTerry && selectedTerryId ? <TerryPreviewBoard terry={selectedTerry} /> : null}

      <View style={styles.listButtonRHNContainer}>
        <CustomButtonIcon
          onPress={() => {}}
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<UserProfileIcon />}
        />
        <CustomButtonIcon
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.SETTING_NAVIGATOR));
          }}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<SettingIcon />}
        />
        <CustomButtonIcon
          onPress={async () => {
            await removePropertyInDevice(EDataStorageKey.ACCESS_TOKEN);
            await removePropertyInDevice(EDataStorageKey.REFRESH_TOKEN);
            navigation.dispatch(CommonActions.navigate(ENavigationScreen.LOGIN_SCREEN));
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
