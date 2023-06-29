import React from 'react';
import {LatLng, Marker} from 'react-native-maps';
import TerryCallout from './TerryCallout';

export interface TerryMarkerProps {
  identifier: number | string;
  description?: string;
  title?: string;
  coordinate: LatLng;
  customCallout?: boolean;
  imageUrls?: string[];
}

const TerryMarker = (props: TerryMarkerProps) => {
  if (!props.customCallout) {
    return (
      <Marker
        key={props.identifier}
        coordinate={props.coordinate}
        title={props.title}
        description={props.description}
      />
    );
  }

  return (
    <Marker key={props.identifier} coordinate={props.coordinate}>
      <TerryCallout
        title={props.title}
        description={props.description}
        imageUrls={props.imageUrls}
      />
    </Marker>
  );
};

export default TerryMarker;
