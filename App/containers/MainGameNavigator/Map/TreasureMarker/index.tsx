import { TerryHeartIcon, TerrySavedIcon } from 'App/components/image';
import { EColor } from 'App/enums/color';
import ActiveTreasureIcon from 'App/media/ActiveTreasureIcon';
import DisableTreasureIcon from 'App/media/DisableTreasureIcon';
import MapMarkerPolygonIcon from 'App/media/MapMarkerPolygonIcon';
import { ITerryResponseDto } from 'App/types/terry';
import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LatLng, Marker } from 'react-native-maps';
import { styles } from './styles';

const TreasureMarker = ({
  treasure,
  isSelect,
  selectTerry,
  deselectTerry,
}: {
  treasure: ITerryResponseDto;
  isSelect?: boolean;
  deselectTerry: () => void;
  selectTerry: (terryId: string, coordinate: LatLng) => void;
}) => {
  const handleSelectTerry = useCallback(() => {
    selectTerry(treasure.id, treasure.location);
  }, [selectTerry, treasure.id, treasure.location]);
  if (!treasure.isAvailable) {
    return null;
  }

  if (isSelect) {
    return (
      <Marker style={styles.markerContainer} coordinate={treasure.location} onPress={deselectTerry}>
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
    <Marker
      anchor={{ x: 0.5, y: 0 }}
      style={styles.container}
      coordinate={treasure.location}
      onPress={handleSelectTerry}>
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
