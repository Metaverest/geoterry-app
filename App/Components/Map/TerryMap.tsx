import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Details, Region } from 'react-native-maps';
import { EMapStyle, EMapType } from '../../Enums/map';
import TerryMarker, { TerryMarkerProps } from './TerryMarker';
import TerryCurPoint from './TerryCurPoint';
import useCurrentLocation from 'App/hooks/useCurrentLocation';
import { DEFAULT_USER_MARK_POINT_ANIMATION_DURATION } from 'App/constants/common';
import { isValidLocation } from 'App/helpers/map';
import SpeedDisplay from './SpeedDisplay';

interface TerryMapProps {
  initialRegion: Region;
  mapViewStyle?: any;
  terryMapStyle?: any;
  onRegionChange?: (r: Region, d: Details) => void;
  onRegionChangeComplete?: (r: Region, d: Details) => void;
  onPress?: () => void;
  onMarkerPress?: () => void;
  mapType?: EMapType;
  mapStyle?: EMapStyle; // only works on iOS
  showsUserLocation?: boolean; // only `showsUserLocation` or `showCustomedUserLocation` can be true at one time
  showCustomedUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  showsCompass?: boolean;
  markers?: Omit<TerryMarkerProps, 'identifier'>[];
  customCallout?: boolean;
  focusOnUserLocation?: boolean;
  showSpeed?: boolean;
}

const TerryMap = (props: TerryMapProps) => {
  const mapViewRef = useRef<MapView>(null);
  const [centered, setCentered] = useState(false);
  const currentLocation = useCurrentLocation();
  const setMapCenter = () => {
    if (!mapViewRef.current) {
      return;
    }

    mapViewRef.current.animateToRegion(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: props.initialRegion.latitudeDelta,
        longitudeDelta: props.initialRegion.longitudeDelta,
      },
      DEFAULT_USER_MARK_POINT_ANIMATION_DURATION,
    );
    setCentered(true);
  };
  useEffect(() => {
    if (isValidLocation(currentLocation)) {
      if (props.focusOnUserLocation || !centered) {
        setMapCenter();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  return (
    <View style={props.terryMapStyle}>
      <MapView
        ref={mapViewRef}
        style={props.mapViewStyle ? props.mapViewStyle : styles.mapView}
        initialRegion={props.initialRegion}
        onRegionChange={props.onRegionChange}
        mapType={props.mapType}
        userInterfaceStyle={props.mapStyle}
        showsUserLocation={props.showsUserLocation}
        showsMyLocationButton={props.showsMyLocationButton}
        showsCompass={props.showsCompass}
        onRegionChangeComplete={props.onRegionChangeComplete}
        onPress={props.onPress}
        onMarkerPress={props.onMarkerPress}>
        {props.showCustomedUserLocation && <TerryCurPoint />}
        {props.markers &&
          props.markers.map(marker => {
            const indentifier = `${marker.coordinate.longitude}-${marker.coordinate.latitude}`;
            return (
              <TerryMarker
                key={indentifier}
                identifier={indentifier}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                customCallout={props.customCallout}
              />
            );
          })}
      </MapView>
      {props.showSpeed && <SpeedDisplay speed={currentLocation.speed || 0} />}
    </View>
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: '100%',
  },
});

export default TerryMap;
