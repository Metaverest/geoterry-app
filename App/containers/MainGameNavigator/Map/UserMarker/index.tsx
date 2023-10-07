import { EColor } from 'App/enums/color';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import React, { useEffect, useMemo, useRef } from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Marker, MapMarker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { DEFAULT_USER_MARK_POINT_ANIMATION_DURATION } from 'App/constants/common';
import usePlatform from 'App/hooks/usePlatform';

const UserMarker = ({ userPosition }: { userPosition: IRealtimeLocation }) => {
  const user = useSelector(reduxSelector.getUser);
  const markerRef = useRef<MapMarker>(null);
  const { isAndroid } = usePlatform();

  const userAvatar = useMemo(() => {
    return user.logoUrl;
  }, [user?.logoUrl]);

  const markerAnimated = () => {
    if (!markerRef.current) {
      return;
    }
    if (isAndroid) {
      markerRef.current.animateMarkerToCoordinate(
        {
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
        },
        DEFAULT_USER_MARK_POINT_ANIMATION_DURATION,
      );
    } else {
      // TODO: handle animation for iOS (animateMarkerToCoordinate is not supported on iOS yet)
    }
  };

  useEffect(() => {
    markerAnimated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPosition]);

  return (
    <Marker
      ref={markerRef}
      coordinate={
        isAndroid
          ? {
              latitude: 0,
              longitude: 0,
            }
          : userPosition
      }>
      <View style={styles.markerContainer}>
        <LinearGradient
          style={styles.imageContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[EColor.color_51D5FF, EColor.color_C072FD]}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.image} />
          ) : (
            <View style={styles.image}>
              <MapMarkerUserDefault />
            </View>
          )}
          <View style={styles.polygonContainer}>
            <MapMarkerPolygonIcon />
          </View>
        </LinearGradient>
      </View>
    </Marker>
  );
};
export default UserMarker;
