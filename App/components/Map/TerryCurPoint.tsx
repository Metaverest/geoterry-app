import useCurrentLocation from 'App/hooks/useCurrentLocation';
import { MOCK_AVATAR_URI } from '../../Mock/map';
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MapMarker, Marker } from 'react-native-maps';
import { isIOSDevice } from 'App/helpers/common';
import { DEFAULT_USER_MARK_POINT_ANIMATION_DURATION } from 'App/constants/common';

const TerryCurPoint = () => {
  const markerRef = useRef<MapMarker>(null);
  const currentLocation = useCurrentLocation();

  const markerAnimated = () => {
    if (!markerRef.current) {
      return;
    }
    if (!isIOSDevice()) {
      markerRef.current.animateMarkerToCoordinate(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
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
  }, [currentLocation]);

  return (
    <Marker
      ref={markerRef}
      key="userLocationMarker"
      coordinate={
        isIOSDevice()
          ? currentLocation
          : {
              latitude: 0,
              longitude: 0,
            }
      }>
      <View style={styles.markerContainer}>
        <View style={styles.markerContent}>
          <View style={styles.markerArrow} />
          <Image
            source={{
              uri: MOCK_AVATAR_URI,
            }}
            style={styles.avatar}
          />
          {currentLocation.speed != null && currentLocation.speed > 0 && (
            <View style={styles.speedIndicator}>
              <Text style={styles.speedText}>{Math.floor(currentLocation.speed).toString()}</Text>
            </View>
          )}
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerContent: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 12,
    borderRightWidth: 7,
    borderBottomWidth: 0,
    borderLeftWidth: 7,
    borderTopColor: 'green',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  speedIndicator: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 25,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default TerryCurPoint;
