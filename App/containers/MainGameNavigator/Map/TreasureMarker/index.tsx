import ActiveTreasureIcon from 'App/media/ActiveTreasureIcon';
import DisableTreasureIcon from 'App/media/DisableTreasureIcon';
import { ITerryResponseDto } from 'App/types/terry';
import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';
import { Marker } from 'react-native-maps';
import { TerryHeartIcon, TerrySavedIcon } from 'App/components/image';
import LinearGradient from 'react-native-linear-gradient';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { EColor } from 'App/enums/color';
import { IRealtimeLocation } from 'App/types';

const TreasureMarker = ({
  treasure,
  isSelect,
  setSelectedTerry,
  centerToRegion,
}: {
  treasure: ITerryResponseDto;
  isSelect?: boolean;
  setSelectedTerry: React.Dispatch<React.SetStateAction<string | null>>;
  centerToRegion: (targetLocation: IRealtimeLocation) => void;
}) => {
  if (!treasure.isAvailable) {
    return null;
  }

  const handleSelectTerry = () => {
    centerToRegion({
      latitude: treasure.location.latitude,
      longitude: treasure.location.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
    setSelectedTerry(treasure.id);
  };

  if (isSelect) {
    return (
      <Marker style={styles.markerContainer} coordinate={treasure.location} onPress={() => setSelectedTerry(null)}>
        <View style={styles.markerContainer}>
          <LinearGradient
            style={styles.imageContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[EColor.color_51D5FF, EColor.color_C072FD]}>
            <View style={styles.terryIconContainer}>
              {treasure.checkedIn ? <DisableTreasureIcon /> : <ActiveTreasureIcon />}
              {!treasure.checkedIn ? (
                <View style={styles.selectedSubIconContainer}>
                  {treasure?.saved && <Image style={styles.subIcon} source={TerrySavedIcon} />}
                  {treasure?.favourite && !treasure?.saved && <Image style={styles.subIcon} source={TerryHeartIcon} />}
                </View>
              ) : null}
            </View>
          </LinearGradient>
          <View style={styles.polygonContainer}>
            <MapMarkerPolygonIcon />
          </View>
        </View>
      </Marker>
    );
  }

  return (
    <Marker style={styles.container} coordinate={treasure.location} onPress={handleSelectTerry}>
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
  );
};

export default TreasureMarker;
