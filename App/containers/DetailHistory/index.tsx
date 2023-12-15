import { View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { styles } from './styles';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import Header from 'App/components/Header';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import DumbbellIcon from 'App/media/DumbbellIcon';
import SlideSizeIcon from 'App/media/SlideSizeIcon';
import CustomButton from 'App/components/Button';
import { EColor } from 'App/enums/color';
import { EButtonType } from 'App/enums';
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { convertDateFormatHistory } from 'App/utils/convert';
import Rating from 'App/components/Rating';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';
import { StackNavigationProp } from '@react-navigation/stack';
import { DEFAULT_LOCATION } from 'App/constants/common';
import { isEmpty, first, isEqual } from 'lodash';
import MapView, { Marker, Polyline } from 'react-native-maps';
import TreasureMarker from '../MainGameNavigator/Map/TreasureMarker';
import { IRealtimeLocation } from 'App/types';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';

export default function DetailHistory() {
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.DETAIL_HISTORY>>();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();

  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>(DEFAULT_LOCATION);
  const allCoordinatesPath = useSelector(reduxSelector.getAppCoordinatesPath);

  const coordinatesPathOfTerry = useMemo(() => {
    if (isEmpty(params.terry?.id) || isEmpty(allCoordinatesPath)) {
      return [];
    }
    return allCoordinatesPath[params.terry?.id as string] || [];
  }, [allCoordinatesPath, params.terry?.id]);

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

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Lịch sử')} />
      <MapView
        onUserLocationChange={event => onUserLocationChange(event.nativeEvent.coordinate)}
        region={{
          ...DEFAULT_LOCATION,
          latitude: params.terry?.location.latitude || 0,
          longitude: params.terry?.location.longitude || 0,
        }}
        showsCompass={false}
        style={styles.mapContainer}
        showsUserLocation={true}>
        {params.terry && <TreasureMarker key={params.terry.id} treasure={params.terry} />}
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
            {
              latitude: params.terry?.location.latitude as number,
              longitude: params.terry?.location.longitude as number,
            },
          ]}
          strokeColor={EColor.color_127FFE} // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>
      <CustomText style={styles.title}>{t(params.terry.name)}</CustomText>
      <Rating style={styles.mt4} rate={params.rate} />
      <View style={[styles.row, styles.mv4]}>
        <CustomText style={styles.location}>
          {params.isFound ? t('Đã tìm thấy') : t('Không tìm thấy')} {'  |  '}
          {convertDateFormatHistory(params.checkinAt)}
        </CustomText>
        <DumbbellIcon style={styles.icon} />
        <CustomText style={[styles.location, styles.ml4]}>{params.terry.metadata.difficulty}</CustomText>
        <SlideSizeIcon style={styles.icon} />
        <CustomText style={[styles.location, styles.ml4]}>{params.terry.metadata.size}</CustomText>
      </View>
      <View style={styles.containerDesc}>
        <CustomText style={styles.desc}>{t(params.reviewText)}</CustomText>
      </View>

      <MultipleImagesOnLine
        images={params.photoUrls}
        containerImageStyle={styles.containerImage}
        numColumns={6}
        containerItemImageStyle={styles.mr10}
        showIconMaximize
      />
      <CustomButton
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate(EMainGameScreen.MAP_SCREEN, {
              terryId: params.terryId,
              locationTerry: {
                ...DEFAULT_LOCATION,
                latitude: params.terry.location.latitude,
                longitude: params.terry.location.longitude,
              },
            }),
          );
        }}
        linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
        buttonType={EButtonType.SOLID}
        title={t('Xem trên bản đồ')}
        customStyleContainer={styles.btn}
      />
    </CustomSafeArea>
  );
}
