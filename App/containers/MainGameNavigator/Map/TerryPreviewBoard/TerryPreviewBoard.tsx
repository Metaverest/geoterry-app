import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import LocationIcon from 'App/media/LocationIcon';
import DifficultyIcon from 'App/media/DifficultyIcon';
import SizingIcon from 'App/media/SizingIcon';
import NextIcon from 'App/media/NextIcon';
import { ITerryResponseDto } from 'App/types/terry';
import { useTranslation } from 'react-i18next';
import { meterToKilometer } from 'App/utils/convert';
import { makeTextShortToDisplay } from 'App/helpers/text';
import MapView from 'react-native-maps';
import useCoordinateToAddress from 'App/hooks/useCoordinateToAddress';

const TerryPreviewBoard = ({ terry, mapRef }: { terry: ITerryResponseDto; mapRef: React.RefObject<MapView> }) => {
  const { t } = useTranslation();

  const address = useCoordinateToAddress(mapRef, {
    latitude: terry.location.latitude,
    longitude: terry.location.longitude,
  });

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CustomText style={styles.terryName}>{makeTextShortToDisplay(terry.name, 30)}</CustomText>
        <View style={styles.terryDetailContainer}>
          <LocationIcon />
          <CustomText style={styles.terryDetailText}>{`${meterToKilometer(terry.distance || 0)} ${t('km')} ${
            address?.locality || address?.subAdministrativeArea || address?.name || ''
          }`}</CustomText>
          <DifficultyIcon />
          <CustomText style={styles.terryDetailText}>{terry.metadata.difficulty}</CustomText>
          <SizingIcon />
          <CustomText style={styles.terryDetailText}>{terry.metadata.terrain}</CustomText>
        </View>
      </View>
      <View style={styles.nextIcon}>
        <NextIcon />
      </View>
    </View>
  );
};

export default TerryPreviewBoard;
