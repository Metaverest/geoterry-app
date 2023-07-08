import useCurrentLocation from 'App/hooks/useCurrentLocation';
import { MOCK_AVATAR_URI } from '../../Mock/map';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';

const TerryCurPoint = () => {
  const currentLocation = useCurrentLocation();
  const [locationCoordinate, setLocationCoordinate] = useState(currentLocation);
  useEffect(() => {
    setLocationCoordinate(currentLocation);
    console.log(currentLocation);
  }, [currentLocation]);

  return (
    <Marker key={`${locationCoordinate.altitude}-${locationCoordinate.longitude}`} coordinate={locationCoordinate}>
      <View style={styles.markerContainer}>
        <View style={styles.markerContent}>
          <View style={styles.markerArrow} />
          <Image
            source={{
              uri: MOCK_AVATAR_URI,
            }}
            style={styles.avatar}
          />
          {locationCoordinate.speed != null && locationCoordinate.speed > 0 && (
            <View style={styles.speedIndicator}>
              <Text style={styles.speedText}>{Math.floor(locationCoordinate.speed).toString()}</Text>
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
