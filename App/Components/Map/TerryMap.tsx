import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Details, Region } from 'react-native-maps';
import { EMapStyle, EMapType } from '../../Enums/map';
import TerryMarker, { TerryMarkerProps } from './TerryMarker';
import TerryCurPoint from './TerryCurPoint';

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
}

const TerryMap = (props: TerryMapProps) => {
  return (
    <View style={props.terryMapStyle}>
      <MapView
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
