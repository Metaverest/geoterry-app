import CustomSafeArea from 'App/components/CustomSafeArea';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { styles } from './styles';

import { CommonActions, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import Header from 'App/components/Header';
import {
  DEFAULT_LOCATION,
  INTERVAL_TIME_CALL_UPDATE_PATH,
  THRESHOLD_DISTANCE_TO_UPDATE_PATH,
} from 'App/constants/common';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { ITerryResponseDto } from 'App/types/terry';
import { calculateDistance } from 'App/utils/convert';
import { first, isEmpty, isEqual, last } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TreasureMarker from '../Map/TreasureMarker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CompassIcon from 'App/media/CompassIcon';
import MapTypeIcon from 'App/media/MapTypeIcon';
const HuntingMapScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.HUNTING_MAP_SCREEN>>();
  const [terry, setTerry] = useState<ITerryResponseDto | null>(null);
  const allCoordinatesPath = useSelector(reduxSelector.getAppCoordinatesPath);
  const coordinatesPathOfTerry = useMemo(() => {
    if (isEmpty(terry?.id) || isEmpty(allCoordinatesPath)) {
      return [];
    }
    return allCoordinatesPath[terry?.id as string] || [];
  }, [allCoordinatesPath, terry?.id]);

  const RightButton = useCallback(() => {
    return (
      <View style={styles.rightButtonContainer}>
        <TouchableOpacity onPress={() => {}}>
          <CompassIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MapTypeIcon />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>(DEFAULT_LOCATION);
  const onUserLocationChange = useCallback(
    (location: IRealtimeLocation) => {
      if (
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
          name: EMainGameScreen.CHECKIN_TERRY_SCREEN,
          params: { isCannotFindTerry: isCannotFindTerry },
        }),
      );
    },
    [dispatch, navigation, currentLocation, terry?.id, updatePathToServer],
  );
  return (
    <CustomSafeArea style={styles.container} shouldHideStatusBar shouldUseFullScreenView>
      <Header
        headerContainerStyle={{ backgroundColor: EColor.black }}
        title={t('Chỉ đường')}
        rightButton={<RightButton />}
      />
      <MapView
        onUserLocationChange={event => onUserLocationChange(event.nativeEvent.coordinate)}
        region={{
          ...DEFAULT_LOCATION,
          latitude: terry?.location.latitude || 0,
          longitude: terry?.location.longitude || 0,
        }}
        showsCompass={false}
        style={styles.mapContainer}
        showsUserLocation={true}>
        {terry && <TreasureMarker key={terry.id} treasure={terry} />}
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
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
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
