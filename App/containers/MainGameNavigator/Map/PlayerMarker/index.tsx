import { EColor } from 'App/enums/color';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { useAnimatedRegion, AnimatedMarker } from 'App/hooks/useAnimatedRegion';
import { Easing } from 'react-native-reanimated';
import { DEFAULT_USER_MARK_POINT_ANIMATION_DURATION } from 'App/constants/common';
import { LatLng } from 'react-native-maps';
import { responsiveByWidth as rw } from 'App/helpers/common';

const PlayerMarker = ({ userLocation }: { userLocation: LatLng }) => {
  const animatedRegion = useAnimatedRegion(userLocation);

  useEffect(() => {
    animatedRegion.animate({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      duration: DEFAULT_USER_MARK_POINT_ANIMATION_DURATION,
      easing: Easing.linear,
    });
  }, [animatedRegion, userLocation]);

  return (
    <AnimatedMarker animatedProps={animatedRegion.props} coordinate={userLocation}>
      <View style={styles.markerContainer}>
        <LinearGradient
          style={styles.imageContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[EColor.color_51D5FF, EColor.color_C072FD]}>
          <View style={styles.image}>
            <MapMarkerUserDefault width={rw(25)} height={rw(25)} />
            <Text style={styles.unknownText}>?</Text>
          </View>
        </LinearGradient>
        <View style={styles.polygonContainer}>
          <MapMarkerPolygonIcon width={rw(10)} height={rw(10)} />
        </View>
      </View>
    </AnimatedMarker>
  );
};
export default PlayerMarker;
