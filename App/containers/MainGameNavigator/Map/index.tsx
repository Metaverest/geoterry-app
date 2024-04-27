import { CommonActions, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import {
  DEFAULT_LATITUTE_DELTA,
  DEFAULT_LATITUTE_DELTA_THRESHOLD_TO_FETCH_TERRY,
  DEFAULT_LONGITUDE_DELTA,
  DEFAULT_LONGITUDE_DELTA_THRESHOLD_TO_FETCH_TERRY,
  DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY,
} from 'App/constants/common';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
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
import { ITerryFilterParams, ITerryResponseDto } from 'App/types/terry';
import { calculateDistance } from 'App/utils/convert';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Vibration, View } from 'react-native';
import MapView, { LatLng } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import CityNameBoard from './CityNameBoard/CityNameBoard';
import TerryPreviewBoard from './TerryPreviewBoard/TerryPreviewBoard';
import TreasureMarker from './TreasureMarker';
import { styles } from './styles';
import useUserLocation from 'App/hooks/useUserLocation';
import usePrevious from 'App/hooks/usePrevious';
import useIsSaveBatterryMode from 'App/hooks/useIsSaveBatterryMode';
import UserMarker from './UserMarker';
import PlayerMarker from './PlayerMarker';
import { ESagaAppAction } from 'App/enums/redux';
import useBreakTimeEffect from 'App/hooks/useDelayedEffect';
import useRequestLocationPermission from 'App/hooks/useRequestLocationPermission';
import messaging from '@react-native-firebase/messaging';
import { onReceiveNotification } from 'App/utils/notification';
import useRequestTurnOnGPSAndroid from 'App/hooks/useRequestTurnOnGPSAndroid';

const MapScreen = () => {
  useRequestLocationPermission();
  let numberOfFilters = useRef(0);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.MAP_SCREEN>>();
  const publicTerryFilter = useSelector(reduxSelector.getAppPublicTerryFilter);
  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const conversationStat = useSelector(reduxSelector.getConversationStat);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(reduxSelector.getUser);
  const playerLocationList = useSelector(reduxSelector.getNearbyPlayerLocation);
  const mapRef = useRef<MapView>(null);
  const regionToGetTerryRef = useRef<LatLng>();
  const { onUserLocationChange, userLocation } = useUserLocation();
  const prevUserLocation = usePrevious(userLocation);
  const { region, onRegionChangeComplete } = useCurrentRegion();
  const { centerToRegion } = useMap(mapRef);
  const mapType = useSelector(reduxSelector.getAppMapType);
  const publicTerries = useSelector(reduxSelector.getAppPublicTerries);
  const [selectedTerry, setSelectedTerry] = useState<ITerryResponseDto | undefined>(undefined);
  const isSaveBatterryMode = useIsSaveBatterryMode();
  const isBuilderNamespace = useIsBuilderNamespace();
  const insets = useSafeAreaInsets();
  const [loadedUserLocation, setLoadedUserLocation] = useState(false);
  const [updatedUserLocation, setUpdatedUserLocation] = useState(false);
  useRequestNotificationPermission();
  useRequestTurnOnGPSAndroid();

  const [canFetchTerries, setCanFetchTerries] = useState(true);
  useEffect(() => {
    if (
      region.latitudeDelta > DEFAULT_LATITUTE_DELTA_THRESHOLD_TO_FETCH_TERRY ||
      region.longitudeDelta > DEFAULT_LONGITUDE_DELTA_THRESHOLD_TO_FETCH_TERRY
    ) {
      setCanFetchTerries(false);
    } else if (!canFetchTerries) {
      setCanFetchTerries(true);
    }
  }, [canFetchTerries, region]);

  useEffect(() => {
    dispatch(sagaUserAction.hunterFilterConversationStatAsync(navigation));
  }, [dispatch, navigation]);

  const centerToCurrentUserLocation = useCallback(() => {
    Vibration.vibrate(5);
    if (isEmpty(userLocation)) {
      return;
    }
    centerToRegion({
      longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      latitudeDelta: DEFAULT_LATITUTE_DELTA,
      latitude: userLocation.latitude || region.latitude,
      longitude: userLocation.longitude || region.longitude,
    });
  }, [centerToRegion, userLocation, region]);

  // Handle notification
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage && !!remoteMessage?.messageId) {
          onReceiveNotification(remoteMessage);
        }
      });
  }, []);

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
      setSelectedTerry(() => {
        const appropriateTerry = publicTerries?.find(terry => terry.id === terryId);
        // calc distance from user location to terry location
        if (appropriateTerry) {
          return {
            ...appropriateTerry,
            distance: userLocation ? calculateDistance(appropriateTerry.location, userLocation) : undefined,
          };
        }
        return undefined;
      });
      fetchTerries(coordinate);
    },
    [centerToRegion, fetchTerries, publicTerries, userLocation],
  );

  const deselectTerry = useCallback(() => {
    setSelectedTerry(undefined);
  }, []);

  const handlePressTypeMap = useCallback(() => {
    Vibration.vibrate(5);
    navigation.dispatch(StackActions.push(EMainGameScreen.MAP_TYPE_SCREEN));
  }, [navigation]);

  const handleCreateNewTerry = useCallback(() => {
    Vibration.vibrate(5);
    navigation.dispatch(StackActions.push(EMainGameScreen.CREATE_NEW_TERRY_SCREEN));
  }, [navigation]);

  const handlePressFilterMap = useCallback(() => {
    Vibration.vibrate(5);
    navigation.dispatch(StackActions.push(EMainGameScreen.FILTER_SCREEN));
  }, [navigation]);

  const updateTerryUserCustomData = useCallback(
    (payload: { markAsFavourited?: boolean; markAsSaved?: boolean }) => {
      if (selectedTerry && userLocation) {
        dispatch(
          sagaUserAction.getPublicTerryByIdAsync(
            {
              terryId: selectedTerry.id,
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              markAsSaved: payload.markAsSaved,
              markAsFavourited: payload.markAsFavourited,
              includeConversationId: true,
              isBackgroundAction: true,
            },
            navigation,
          ),
        );
        setSelectedTerry(prevTerry => {
          if (prevTerry) {
            return {
              ...prevTerry,
              saved: payload.markAsSaved,
              favourite: payload.markAsFavourited,
            };
          }
          return undefined;
        });
      }
    },
    [dispatch, navigation, selectedTerry, userLocation],
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

  // Once the user location is available and is unavailable before, we need to fetch the terries
  // around the user location, center the map to the user location
  // and set loadedUserLocation = true, then remove the loading indicator
  useEffect(() => {
    if (isEmpty(prevUserLocation) && !isEmpty(userLocation)) {
      setLoadedUserLocation(true);
      fetchTerries({ latitude: userLocation.latitude, longitude: userLocation.longitude });
      centerToCurrentUserLocation();
    }
  }, [centerToCurrentUserLocation, fetchTerries, prevUserLocation, userLocation, navigation]);

  // If the region is changed, we need to fetch the terry again.
  // But we only fetch the terry if the distance between the current region and the previous region that we got the terry from
  // is greater than a threshold.
  // And the long/lat delta of the region is smaller than a threshold.
  useEffect(() => {
    if (
      !isEmpty(regionToGetTerryRef.current) &&
      calculateDistance(regionToGetTerryRef.current, region) > DISTANCE_THRESHOLD_TO_RE_GET_NEARBY_TERRY &&
      canFetchTerries
    ) {
      fetchTerries({ latitude: region.latitude, longitude: region.longitude });
    }
  }, [canFetchTerries, fetchTerries, region]);

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

  // update user current location in every 60 seconds
  useBreakTimeEffect(
    () => {
      if (userLocation) {
        dispatch(sagaUserAction.getUserNearbyPlayers(userLocation, navigation));
        setUpdatedUserLocation(true);
      }
    },
    [dispatch, navigation, userLocation],
    { skipFirstBreakTime: !updatedUserLocation, breakTime: 60 },
  );

  return (
    <CustomSafeArea style={styles.container} shouldUseFullScreenView>
      <MapView
        onUserLocationChange={onUserLocationChange}
        mapType={mapType}
        ref={mapRef}
        style={styles.mapContainer}
        showsUserLocation={isSaveBatterryMode}
        showsCompass={false}
        showsMyLocationButton={false}
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
            isSelect={treasure.id === selectedTerry?.id}
            selectTerry={selectTerry}
            deselectTerry={deselectTerry}
          />
        ))}
        {playerLocationList &&
          Object.keys(playerLocationList)?.map(profileId => (
            <PlayerMarker key={profileId} userLocation={playerLocationList[profileId]} />
          ))}
      </MapView>

      {!selectedTerry ? (
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

      {selectedTerry ? (
        <View style={styles.listButtonFooterContainer}>
          <CustomButtonIcon
            onPress={() => {
              Vibration.vibrate(5);
              updateTerryUserCustomData({ markAsFavourited: !selectedTerry.favourite, markAsSaved: false });
            }}
            buttonColor={selectedTerry.favourite ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<HeartIcon focus={selectedTerry.favourite} />}
          />
          <CustomButtonIcon
            onPress={() => {
              Vibration.vibrate(5);
              updateTerryUserCustomData({ markAsSaved: !selectedTerry.saved, markAsFavourited: false });
            }}
            buttonColor={selectedTerry.saved ? [EColor.color_C072FD, EColor.color_51D5FF] : EColor.color_171717}
            customStyleContainer={styles.buttonContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<SavedIcon focus={selectedTerry.saved} />}
          />
        </View>
      ) : null}

      {selectedTerry ? <TerryPreviewBoard terry={selectedTerry} userLocation={userLocation} /> : null}

      <View style={[styles.listButtonRHNContainer, { top: styles.listButtonRHNContainer.top + insets.top }]}>
        <CustomButtonIcon
          onPress={() => {
            Vibration.vibrate(5);
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN, { profileID: user.id }));
          }}
          buttonColor={[EColor.color_C072FD, EColor.color_51D5FF]}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<UserProfileIcon />}
        />
        <CustomButtonIcon
          onPress={() => {
            Vibration.vibrate(5);
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.SETTING_NAVIGATOR));
          }}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<SettingIcon />}
        />
        <View>
          <CustomButtonIcon
            onPress={() => {
              Vibration.vibrate(5);
              navigation.dispatch(CommonActions.navigate(EMainGameScreen.CHAT_SCREEN));
            }}
            buttonColor={[EColor.color_51D5FF, EColor.color_C072FD]}
            customStyleContainer={styles.buttonRHNContainer}
            buttonType={EButtonType.SOLID}
            renderIcon={<MessageIcon />}
          />
          {conversationStat?.unreadConversationCnt && conversationStat.unreadConversationCnt > 0 ? (
            <View style={styles.containerNumberOfConv}>
              <CustomText style={styles.textNumberOfConv}>{conversationStat.unreadConversationCnt}</CustomText>
            </View>
          ) : null}
        </View>
        <CustomButtonIcon
          onPress={() => {
            Vibration.vibrate(5);
            navigation.dispatch(CommonActions.navigate(EMainGameScreen.HISTORY));
          }}
          buttonColor={EColor.color_171717}
          customStyleContainer={styles.buttonRHNContainer}
          buttonType={EButtonType.SOLID}
          renderIcon={<HistoryIcon />}
        />

        {(loadingStates?.[ESagaAppAction.GET_PUBLIC_TERRIES] || !loadedUserLocation) && (
          <ActivityIndicator style={styles.buttonRHNContainer} />
        )}
      </View>
    </CustomSafeArea>
  );
};
export default MapScreen;
