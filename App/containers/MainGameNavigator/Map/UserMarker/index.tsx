import { EColor } from 'App/enums/color';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import React, { useEffect, useMemo } from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { useAnimatedRegion, AnimatedMarker } from 'App/hooks/useAnimatedRegion';
import { Easing } from 'react-native-reanimated';

const UserMarker = ({ userPosition }: { userPosition: IRealtimeLocation }) => {
  const user = useSelector(reduxSelector.getUser);
  const animatedRegion = useAnimatedRegion(userPosition);

  const userAvatar = useMemo(() => {
    return user.logoUrl;
  }, [user?.logoUrl]);

  useEffect(() => {
    animatedRegion.animate({
      latitude: userPosition.latitude,
      longitude: userPosition.longitude,
      duration: 1000,
      easing: Easing.linear,
    });
  }, [animatedRegion, userPosition]);

  return (
    <AnimatedMarker animatedProps={animatedRegion.props} coordinate={userPosition}>
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
        </LinearGradient>
        <View style={styles.polygonContainer}>
          <MapMarkerPolygonIcon />
        </View>
      </View>
    </AnimatedMarker>
  );
};
export default UserMarker;
