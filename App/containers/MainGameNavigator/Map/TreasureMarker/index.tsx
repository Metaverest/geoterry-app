import ActiveTreasureIcon from 'App/media/ActiveTreasureIcon';
import DisableTreasureIcon from 'App/media/DisableTreasureIcon';
import { ITerryResponseDto } from 'App/types/terry';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Marker } from 'react-native-maps';

const TreasureMarker = ({ treasure }: { treasure: ITerryResponseDto }) => {
  return (
    <Marker coordinate={treasure.location}>
      <View style={styles.container}>{treasure.isAvailable ? <ActiveTreasureIcon /> : <DisableTreasureIcon />}</View>
    </Marker>
  );
};

export default TreasureMarker;
