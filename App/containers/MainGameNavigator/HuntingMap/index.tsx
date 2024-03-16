import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { styles } from './styles';

import { CommonActions, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import Header from 'App/components/Header';
import {
  DEFAULT_LOCATION,
  INTERVAL_TIME_CALL_UPDATE_PATH,
  THRESHOLD_DISTANCE_TO_BE_ABLE_TO_CHECKIN_TERRY,
  THRESHOLD_DISTANCE_TO_UPDATE_PATH,
} from 'App/constants/common';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { ITerryResponseDto, Location } from 'App/types/terry';
import { calculateDistance } from 'App/utils/convert';
import { first, isEmpty, isEqual, last } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TreasureMarker from '../Map/TreasureMarker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CompassIcon from 'App/media/CompassIcon';
import MapTypeIcon from 'App/media/MapTypeIcon';
import { createGoogleMapsUrl, getCurrentLocation } from 'App/utils/map';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HuntingMapScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.HUNTING_MAP_SCREEN>>();
  const mapViewRef = useRef<MapView | null>(null);
  const [terry, setTerry] = useState<ITerryResponseDto | null>(null);
  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>(DEFAULT_LOCATION);
  const insets = useSafeAreaInsets();

  const allCoordinatesPath = useSelector(reduxSelector.getAppCoordinatesPath);
  const coordinatesPathOfTerry = useMemo(() => {
    if (isEmpty(terry?.id) || isEmpty(allCoordinatesPath)) {
      return [];
    }
    return allCoordinatesPath[terry?.id as string] || [];
  }, [allCoordinatesPath, terry?.id]);

  const initUserLocation: Location = useMemo(() => {
    return params.userLocation;
  }, [params]);

  const openGoogleMaps = useCallback(() => {
    const url = createGoogleMapsUrl(terry?.location.latitude || 0, terry?.location.longitude || 0);

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Cannot open Google Maps URL');
      }
    });
  }, [terry?.location]);

  const centerMapToCurrentLocation = useCallback(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: !currentLocation.isDefault ? currentLocation.latitude : initUserLocation.latitude,
        longitude: !currentLocation.isDefault ? currentLocation.longitude : initUserLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [
    currentLocation.isDefault,
    currentLocation.latitude,
    currentLocation.longitude,
    initUserLocation.latitude,
    initUserLocation.longitude,
  ]);

  const RightButton = useCallback(() => {
    return (
      <View style={styles.rightButtonContainer}>
        <TouchableOpacity onPress={centerMapToCurrentLocation}>
          <CompassIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGoogleMaps}>
          <MapTypeIcon />
        </TouchableOpacity>
      </View>
    );
  }, [centerMapToCurrentLocation, openGoogleMaps]);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getCurrentLocation();
      location && setCurrentLocation(location);
    };
    fetchLocation();
  }, []);

  const onUserLocationChange = useCallback(
    (location?: IRealtimeLocation) => {
      if (
        location &&
        !isEqual(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        )
      ) {
        setCurrentLocation(location);
      }
    },
    [currentLocation],
  );
  const [initialUserLocation, setInitialUserLocation] = useState<IRealtimeLocation | null>(null);
  useEffect(() => {
    if (isEmpty(initialUserLocation) && !isEmpty(currentLocation) && !currentLocation.isDefault && !isEmpty(terry)) {
      setInitialUserLocation(currentLocation);
      if (isEmpty(coordinatesPathOfTerry)) {
        dispatch(reduxAppAction.setCoordinatesPath({ [terry?.id as string]: [currentLocation] }));
      }
    }
  }, [currentLocation, initialUserLocation, terry, dispatch, coordinatesPathOfTerry]);
  const { t } = useTranslation();
  useEffect(() => {
    setTerry(params.terry);
  }, [params]);

  useEffect(() => {
    if (
      isEmpty(initialUserLocation) ||
      isEmpty(currentLocation) ||
      currentLocation.isDefault ||
      isEmpty(coordinatesPathOfTerry)
    ) {
      return;
    }
    const deltaDistance = calculateDistance(last(coordinatesPathOfTerry) as IRealtimeLocation, currentLocation);
    if (deltaDistance > THRESHOLD_DISTANCE_TO_UPDATE_PATH) {
      dispatch(
        reduxAppAction.setCoordinatesPath({ [terry?.id as string]: [...coordinatesPathOfTerry, currentLocation] }),
      );
    }
  }, [currentLocation, coordinatesPathOfTerry, dispatch, initialUserLocation, terry?.id]);

  const updatePathToServer = useCallback(() => {
    dispatch(sagaUserAction.hunterUpdateTerryPathAsync(terry?.id as string, navigation));
  }, [dispatch, terry?.id, navigation]);

  const isFocusedOnScreen = useIsFocused();

  useEffect(() => {
    // Don't schedule the interval if the screen is not focused
    if (!isFocusedOnScreen) {
      return;
    }

    // Schedule the interval:
    const intervalId = setInterval(updatePathToServer, INTERVAL_TIME_CALL_UPDATE_PATH);

    // Clean up function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [updatePathToServer, isFocusedOnScreen]); // Empty dependency array means this effect runs once (on mount) and cleans up on unmount

  const navigateToTerryCheckinScreen = useCallback(
    (isCannotFindTerry: Boolean) => {
      updatePathToServer();
      dispatch(
        reduxAppAction.setCheckinTerryData({
          terryId: terry?.id,
          location: { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        }),
      );
      navigation.dispatch(
        CommonActions.navigate({
          name: !isCannotFindTerry
            ? EMainGameScreen.VERIFY_OFFICIAL_TERRY_SCREEN
            : EMainGameScreen.CHECKIN_TERRY_SCREEN,
          params: { isCannotFindTerry: false, terryId: terry?.id },
        }),
      );
    },
    [dispatch, navigation, currentLocation, terry?.id, updatePathToServer],
  );

  const [nearToTerry, setNearToTerry] = useState(false);
  useEffect(() => {
    if (terry) {
      const deltaDistance = calculateDistance(terry.location, currentLocation);
      if (deltaDistance <= THRESHOLD_DISTANCE_TO_BE_ABLE_TO_CHECKIN_TERRY) {
        setNearToTerry(true);
      } else if (nearToTerry) {
        setNearToTerry(false);
      }
    }
  }, [currentLocation, nearToTerry, terry]);

  return (
    <CustomSafeArea
      shouldUseFullScreenView
      backgroundColor={EColor.black}
      statusBarColor={EColor.black}
      style={styles.container}>
      <View style={{ height: insets.top, backgroundColor: EColor.black }} />
      <Header
        headerContainerStyle={{ backgroundColor: EColor.black }}
        title={t('Chỉ đường')}
        rightButton={<RightButton />}
      />
      <MapView
        ref={mapViewRef}
        onUserLocationChange={event => onUserLocationChange(event.nativeEvent.coordinate)}
        region={{
          ...DEFAULT_LOCATION,
          latitude: terry?.location.latitude || 0,
          longitude: terry?.location.longitude || 0,
        }}
        showsCompass={false}
        style={styles.mapContainer}
        showsUserLocation={true}>
        {terry && <TreasureMarker key={terry.id} treasure={terry} deselectTerry={() => {}} selectTerry={() => {}} />}
        {!isEmpty(coordinatesPathOfTerry) && (
          <Marker
            coordinate={{
              latitude: first(coordinatesPathOfTerry)?.latitude as number,
              longitude: first(coordinatesPathOfTerry)?.longitude as number,
            }}
          />
        )}
        <Polyline
          coordinates={coordinatesPathOfTerry}
          strokeColor={EColor.color_00FF00} // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
        <Polyline
          coordinates={[
            {
              latitude: !currentLocation.isDefault ? currentLocation.latitude : initUserLocation.latitude,
              longitude: !currentLocation.isDefault ? currentLocation.longitude : initUserLocation.longitude,
            },
            { latitude: terry?.location.latitude as number, longitude: terry?.location.longitude as number },
          ]}
          strokeColor={EColor.color_127FFE} // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.footerButtonContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => navigateToTerryCheckinScreen(false)}
            title={t('Đã tìm thấy')}
            disabled={!nearToTerry}
            buttonType={EButtonType.SOLID}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => navigateToTerryCheckinScreen(true)}
            title={t('Không tìm thấy')}
            buttonType={EButtonType.SOLID}
            linearGradient={[EColor.black, EColor.black]}
          />
        </View>
      </View>
    </CustomSafeArea>
  );
};
export default HuntingMapScreen;
