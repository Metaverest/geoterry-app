import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomText from 'App/components/CustomText';
import { EMainGameScreen } from 'App/enums/navigation';
import { shortenString } from 'App/helpers/text';
import useCoordinateToAddress from 'App/hooks/useCoordinateToAddress';
import DifficultyIcon from 'App/media/DifficultyIcon';
import LocationIcon from 'App/media/LocationIcon';
import NextIcon from 'App/media/NextIcon';
import SizingIcon from 'App/media/SizingIcon';
import { ITerryResponseDto } from 'App/types/terry';
import { meterToKilometer } from 'App/utils/convert';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from './styles';

const TerryPreviewBoard = ({ terry, mapRef }: { terry: ITerryResponseDto; mapRef: React.RefObject<MapView> }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const address = useCoordinateToAddress(
    mapRef,
    {
      latitude: terry.location.latitude,
      longitude: terry.location.longitude,
    },
    true,
  );
  const openTerryDetail = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate({
        name: EMainGameScreen.TERRY_DETAIL_SCREEN,
        params: { terry: terry },
      }),
    );
  }, [navigation, terry]);
  return (
    <TouchableOpacity style={styles.container} onPress={openTerryDetail}>
      <View style={styles.subContainer}>
        <CustomText style={styles.terryName}>{shortenString(terry.name, 30)}</CustomText>
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
    </TouchableOpacity>
  );
};

export default TerryPreviewBoard;
