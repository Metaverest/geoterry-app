import { CommonActions, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import {
  DEFAULT_LATITUTE_DELTA,
  DEFAULT_LONGITUDE_DELTA,
  DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY,
} from 'App/constants/common';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import useCurrentRegion from 'App/hooks/useCurrentRegion';
import useIsBuilderNamespace from 'App/hooks/useIsBuilderNamespace';
import useMap from 'App/hooks/useMap';
import useRequestNotificationPermission from 'App/hooks/useRequestNotificationPermission';
import AddNewTerryIcon from 'App/media/AddNewTerryIcon';
import FilterMapIcon from 'App/media/FilterMapIcon';
import HeartIcon from 'App/media/HeartIcon';
import HistoryIcon from 'App/media/HistoryIcon';
import MessageIcon from 'App/media/MessageIcon';
import SavedIcon from 'App/media/SavedIcon';
import SettingIcon from 'App/media/SettingIcon';
import TargetIcon from 'App/media/TargetIcon';
import TypeMapIcon from 'App/media/TypeMapIcon';
import UserProfileIcon from 'App/media/UserProfileIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { ITerryFilterParams } from 'App/types/terry';
import { calculateDistance } from 'App/utils/convert';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { LatLng } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import CityNameBoard from './CityNameBoard/CityNameBoard';
import TerryPreviewBoard from './TerryPreviewBoard/TerryPreviewBoard';
import TreasureMarker from './TreasureMarker';
import { styles } from './styles';
import useUserLocation from 'App/hooks/useUserLocation';
import usePrevious from 'App/hooks/usePrevious';
import { navigationRef } from 'App/navigation';
import useIsSaveBatterryMode from 'App/hooks/useIsSaveBatterryMode';
import UserMarker from './UserMarker';

const MapScreen = () => {
  let numberOfFilters = useRef(0);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.MAP_SCREEN>>();
  const publicTerryFilter = useSelector(reduxSelector.getAppPublicTerryFilter);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(reduxSelector.getUser);
  const mapRef = useRef<MapView>(null);
  const regionToGetTerryRef = useRef<LatLng>();
  const { onUserLocationChange, userLocation } = useUserLocation();
  const prevUserLocation = usePrevious(userLocation);
  const { region, onRegionChangeComplete } = useCurrentRegion();
  const { centerToRegion } = useMap(mapRef);
  const mapType = useSelector(reduxSelector.getAppMapType);
  const publicTerries = useSelector(reduxSelector.getAppPublicTerries);
  const [selectedTerryId, setSelectedTerryId] = useState<string | null>(null);
  const selectedTerry = useSelector(reduxSelector.getAppPublicTerry);
  const isSaveBatterryMode = useIsSaveBatterryMode();
  const isBuilderNamespace = useIsBuilderNamespace();
  const insets = useSafeAreaInsets();
  useRequestNotificationPermission();

  const centerToCurrentUserLocation = useCallback(() => {
    if (isEmpty(userLocation)) {
      return;
    }
    centerToRegion({
      ...region,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  }, [centerToRegion, userLocation, region]);

  // Fetch the terry based on the current filter and region.
  // Also save the region that we get the terry from.
  const fetchTerries = useCallback(
    (coordinate: LatLng) => {
      regionToGetTerryRef.current = { latitude: coordinate.latitude, longitude: coordinate.longitude };
      dispatch(
        sagaUserAction.getPublicTerriesAsync({} as ITerryFilterParams, navigation, {
          location: { latitude: coordinate.latitude, longitude: coordinate.longitude },
        }),
      );
    },
    [dispatch, navigation],
  );

  const selectTerry = useCallback(
    (terryId: string, coordinate: LatLng) => {
      centerToRegion({ ...coordinate, latitudeDelta: DEFAULT_LATITUTE_DELTA, longitudeDelta: DEFAULT_LONGITUDE_DELTA });
      setSelectedTerryId(terryId);
      fetchTerries(coordinate);
    },
    [centerToRegion, fetchTerries],
  );

  const deselectTerry = useCallback(() => {
    setSelectedTerryId(null);
  }, []);

  const handlePressTypeMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.MAP_TYPE_SCREEN));
  }, [navigation]);

  const handleCreateNewTerry = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.CREATE_NEW_TERRY_SCREEN));
  }, [navigation]);

  const handlePressFilterMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.FILTER_SCREEN));
  }, [navigation]);

  const updateTerryUserCustomData = useCallback(
    (payload: { markAsFavourited?: boolean; markAsSaved?: boolean }) => {
      if (selectedTerryId && userLocation) {
        dispatch(
          sagaUserAction.getPublicTerryByIdAsync(
            {
              terryId: selectedTerryId,
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              markAsSaved: payload.markAsSaved,
              markAsFavourited: payload.markAsFavourited,
            },
            navigation,
          ),
        );
      }
    },
    [dispatch, navigation, selectedTerryId, userLocation],
  );

  useEffect(() => {
    numberOfFilters.current = 0;
    if (publicTerryFilter?.categoryIds?.length) {
      numberOfFilters.current = 1;
    }
    for (let key in publicTerryFilter) {
      if (key === 'size' || key === 'difficulty' || key === 'rate') {
        if (publicTerryFilter[key]?.min !== 1 || publicTerryFilter[key]?.max !== 5) {
          numberOfFilters.current++;
        }
      }
    }
  }, [publicTerryFilter]);

  // Once the screen did mount, we need to display the loading modal
  // and wait for the user location to be available.
  useEffect(() => {
    navigationRef.dispatch(CommonActions.navigate(ENavigationScreen.LOADING_MODAL));
  }, []);

  // Once the user location is available and is unavailable before, we need to fetch the terries
  // around the user location, center the map to the user location
  // and hide the loading modal.
  useEffect(() => {
    if (isEmpty(prevUserLocation) && !isEmpty(userLocation)) {
      navigation.dispatch(StackActions.pop());
      fetchTerries({ latitude: userLocation.latitude, longitude: userLocation.longitude });
      centerToCurrentUserLocation();
    }
  }, [centerToCurrentUserLocation, fetchTerries, prevUserLocation, userLocation, navigation]);

  // If the region is changed, we need to fetch the terry again.
  // But we only fetch the terry if the distance between the current region and the previous region that we got the terry from
  // is greater than a threshold.
  useEffect(() => {
    if (
      !isEmpty(regionToGetTerryRef.current) &&
      calculateDistance(regionToGetTerryRef.current, region) > DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY
    ) {
      fetchTerries({ latitude: region.latitude, longitude: region.longitude });
    }
  }, [fetchTerries, region]);

  // If the screen is focused, we need to check if the user is coming from the history screen
  // based on the params props. If true, call the selectTerry function.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (params?.locationTerry) {
        selectTerry(params.terryId, params.locationTerry);
      }
    });
    return unsubscribe;
  }, [navigation, params, selectTerry]);

  useEffect(() => {
    if (selectedTerryId && selectedTerryId !== selectedTerry?.id && userLocation) {
      dispatch(
        sagaUserAction.getPublicTerryByIdAsync(
          {
            terryId: selectedTerryId,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            includeProfileData: true,
            includeCategoryData: true,
            includeUserPath: true,
          },
          navigation,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerryId]);

  return (
    <CustomSafeArea style={styles.container} shouldUseFullScreenView>
      <MapView
        onUserLocationChange={onUserLocationChange}
        mapType={mapType}
        ref={mapRef}
        style={styles.mapContainer}
        showsUserLocation={isSaveBatterryMode}
        showsCompass={false}
        onRegionChangeComplete={onRegionChangeComplete}
        onLongPress={deselectTerry}
        region={region}>
        {isSaveBatterryMode || isEmpty(userLocation) ? null : (
          <UserMarker userLocation={userLocation} centerMap={centerToCurrentUserLocation} />
        )}
        {publicTerries?.map(treasure => (
          <TreasureMarker
            key={treasure.id}
            treasure={treasure}
            isSelect={treasure.id === selectedTerryId}
            selectTerry={selectTerry}
            deselectTerry={deselectTerry}
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
          {isBuilderNamespace && (
            <CustomButtonIcon
              onPress={handleCreateNewTerry}
              buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
              customStyleContainer={styles.buttonContainer}
              buttonType={EButtonType.SOLID}
              renderIcon={<AddNewTerryIcon />}
            />
          )}
          <View>
            <CustomButtonIcon
              onPress={handlePressFilterMap}
              buttonColor={numberOfFilters.current ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
              customStyleContainer={styles.buttonContainer}
              buttonType={EButtonType.SOLID}
              renderIcon={<FilterMapIcon color={numberOfFilters.current ? EColor.black : EColor.color_FAFAFA} />}
            />
            {numberOfFilters.current > 0 && (
              <View style={styles.containerNumberOfFilter}>
                <CustomText style={styles.textNumberOfFilter}>{numberOfFilters.current}</CustomText>
              </View>
            )}
          </View>
          <CustomButtonIcon
            onPress={centerToCurrentUserLocation}
            buttonColor={EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<TargetIcon />}
          />
        </View>
      ) : null}

      {region && <CityNameBoard region={region} mapRef={mapRef} />}

      {selectedTerry && selectedTerryId ? (
        <View style={styles.listButtonFooterContainer}>
          <CustomButtonIcon
            onPress={() =>
              updateTerryUserCustomData({ markAsFavourited: !selectedTerry.favourite, markAsSaved: false })
            }
            buttonColor={selectedTerry.favourite ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<HeartIcon focus={selectedTerry.favourite} />}
          />
          <CustomButtonIcon
            onPress={() => updateTerryUserCustomData({ markAsSaved: !selectedTerry.saved, markAsFavourited: false })}
            buttonColor={selectedTerry.saved ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<SavedIcon focus={selectedTerry.saved} />}
          />
        </View>
      ) : null}

      {selectedTerry && selectedTerryId ? <TerryPreviewBoard terry={selectedTerry} mapRef={mapRef} /> : null}

      <View style={[styles.listButtonRHNContainer, { top: styles.listButtonRHNContainer.top + insets.top }]}>
        <CustomButtonIcon
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN, { profileID: user.id }));
          }}
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
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.CHAT_SCREEN));
          }}
          buttonColor={[EColor.color_51D5FF, EColor.color_C072FD]}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<MessageIcon />}
        />
        <CustomButtonIcon
          onPress={() => {
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.HISTORY));
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
