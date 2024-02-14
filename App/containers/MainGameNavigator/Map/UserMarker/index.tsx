import { EColor } from 'App/enums/color';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { useAnimatedRegion, AnimatedMarker } from 'App/hooks/useAnimatedRegion';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { DEFAULT_USER_MARK_POINT_ANIMATION_DURATION } from 'App/constants/common';
import { LatLng } from 'react-native-maps';
import { responsiveByWidth as rw } from 'App/helpers/common';
import { getResizedImageUrl, EImageSize } from 'App/utils/images';
import FallbackImage from 'App/components/CustomImage';

// configuration for user marker animation
const ANGLE = 4;
const TIME = 1000;
const EASING = Easing.elastic(0.2);

const UserMarker = ({ userLocation, centerMap }: { userLocation: LatLng; centerMap: () => void }) => {
  const user = useSelector(reduxSelector.getUser);
  const animatedRegion = useAnimatedRegion(userLocation);

  const userAvatar = useMemo(() => {
    return user.logoUrl;
  }, [user?.logoUrl]);

  useEffect(() => {
    animatedRegion.animate({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      duration: DEFAULT_USER_MARK_POINT_ANIMATION_DURATION,
      easing: Easing.linear,
    });
  }, [animatedRegion, userLocation]);

  // handle animation for user marker
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));
  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        // deviate left to start from -ANGLE
        withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
        // wobble between -ANGLE and ANGLE 7 times
        withRepeat(
          withTiming(ANGLE, {
            duration: TIME,
            easing: EASING,
          }),
          7,
          true,
        ),
        // go back to 0 at the end
        withTiming(0, { duration: TIME / 2, easing: EASING }),
      ),
      -1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedMarker
      key={user.id}
      style={animatedStyle}
      animatedProps={animatedRegion.props}
      coordinate={userLocation}
      onPress={centerMap}>
      <View style={styles.markerContainer}>
        <LinearGradient
          style={styles.imageContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[EColor.color_51D5FF, EColor.color_C072FD]}>
          {userAvatar ? (
            <FallbackImage
              imageUrl={getResizedImageUrl(userAvatar, EImageSize.SIZE_100)}
              fallbackUrl={userAvatar}
              style={styles.image}
            />
          ) : (
            <View style={styles.image}>
              <MapMarkerUserDefault width={rw(44)} height={rw(44)} />
            </View>
          )}
        </LinearGradient>
        <View style={styles.polygonContainer}>
          <MapMarkerPolygonIcon />
        </View>
      </View>
    </AnimatedMarker>
  );
};
export default UserMarker;
