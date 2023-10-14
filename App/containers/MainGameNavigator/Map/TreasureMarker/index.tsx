import ActiveTreasureIcon from 'App/media/ActiveTreasureIcon';
import DisableTreasureIcon from 'App/media/DisableTreasureIcon';
import { ITerryResponseDto } from 'App/types/terry';
import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';
import { Marker } from 'react-native-maps';
import { TerryHeartIcon, TerrySavedIcon } from 'App/components/image';

const TreasureMarker = ({ treasure }: { treasure: ITerryResponseDto }) => {
  return treasure.isAvailable ? (
    <Marker style={styles.container} coordinate={treasure.location}>
      <View style={styles.container}>
        {treasure.checkedIn ? <DisableTreasureIcon /> : <ActiveTreasureIcon />}
        {!treasure.checkedIn ? (
          <View style={styles.subIconContainer}>
            {treasure?.saved && <Image style={styles.subIcon} source={TerrySavedIcon} />}
            {treasure?.favourite && !treasure?.saved && <Image style={styles.subIcon} source={TerryHeartIcon} />}
          </View>
        ) : null}
      </View>
    </Marker>
  ) : null;
};

export default TreasureMarker;
