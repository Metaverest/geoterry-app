import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { isAndroidDevice } from 'App/helpers/common';
import {
  CommonActions,
  RouteProp,
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import { DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY } from 'App/constants/common';
import { EButtonType, EDataStorageKey, ENamespace, EUserRole } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import useCurrentLocation from 'App/hooks/useCurrentLocation';
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
import { getStoredProperty } from 'App/utils/storage/storage';
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
import AddNewTerryIcon from 'App/media/AddNewTerryIcon';
import CustomText from 'App/components/CustomText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useRequestNotificationPermission from 'App/hooks/useRequestNotificationPermission';
import { DEFAULT_LOCATION } from 'App/constants/common';
import MessageIcon from 'App/media/MessageIcon';

const MapScreen = () => {
  let numberOfFilters = useRef(0);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.MAP_SCREEN>>();
  const publicTerryFilter = useSelector(reduxSelector.getAppPublicTerryFilter);
  const user = useSelector(reduxSelector.getUser);

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

  // The current user`s location
  const currentLocation = useCurrentLocation();
  const [isBuilderNamespace, setIsBuilderNamespace] = useState(false);
  useEffect(() => {
    (async () => {
      const sessionNamespace = await getStoredProperty(EDataStorageKey.NAMESPACE);
      if (
        (sessionNamespace === ENamespace.GEOTERRY_BUILDERS && !isBuilderNamespace) ||
        user.role === EUserRole.builder
      ) {
        setIsBuilderNamespace(true);
      }
    })();
  }, [isBuilderNamespace, user.role]);
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

  // The current region of the map view
  const [region, setRegion] = useState(currentLocation);
  const [regionToGetTerry, setRegionToGetTerry] = useState(currentLocation);
  const changeRegion = useCallback(
    (updatedRegion: IRealtimeLocation, fetchTerries?: boolean) => {
      setRegion(updatedRegion);
      if (
        (!isEmpty(regionToGetTerry) &&
          !isEmpty(updatedRegion) &&
          calculateDistance(regionToGetTerry, updatedRegion) > DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY) ||
        fetchTerries
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

  // TODO: Need to somehow to be able to remove this effect since it costs a lot of resource
  // If the current location is not empty and the region is empty or default location, set the region to the current location
  useEffect(() => {
    if (
      !isEmpty(currentLocation) &&
      (isEmpty(region) ||
        (region.latitude === DEFAULT_LOCATION.latitude && region.longitude === DEFAULT_LOCATION.longitude))
    ) {
      changeRegion(currentLocation, true);
    }
  }, [currentLocation, region, changeRegion]);

  useEffect(() => {
    if (params?.locationTerry) {
      changeRegion(params.locationTerry, true);
      setSelectedTerryId(params.terryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.locationTerry, params?.terryId]);

  const handlePressTypeMap = useCallback(() => {
    navigation.dispatch(StackActions.push(EMainGameScreen.MAP_TYPE_SCREEN));
  }, [navigation]);

  const handleCreateNewTerry = useCallback(() => {
    navigation.dispatch(
      StackActions.push(EMainGameScreen.CREATE_NEW_TERRY_SCREEN, {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude,
      }),
    );
  }, [navigation, currentLocation]);

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

  const updateTerryUserCustomData = (payload: { markAsFavourited?: boolean; markAsSaved?: boolean }) => {
    if (selectedTerryId) {
      dispatch(
        sagaUserAction.getPublicTerryByIdAsync(
          {
            terryId: selectedTerryId,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            markAsSaved: payload.markAsSaved,
            markAsFavourited: payload.markAsFavourited,
          },
          navigation,
        ),
      );
    }
  };
  const insets = useSafeAreaInsets();
  useRequestNotificationPermission();
  return (
    <CustomSafeArea style={styles.container} shouldUseFullScreenView>
      <MapView
        mapType={mapType}
        ref={mapRef}
        style={styles.mapContainer}
        showsUserLocation={isSaveBatterryMode}
        showsCompass={false}
        onRegionChangeComplete={(data, gesture) => {
          // To avoid onRegionChangeComplete() callback is called infinitely
          if (isAndroidDevice() && !gesture.isGesture) {
            return;
          }
          changeRegion(data as IRealtimeLocation);
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
