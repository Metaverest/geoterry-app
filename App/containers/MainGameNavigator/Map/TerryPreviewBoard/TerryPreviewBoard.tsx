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

const TerryPreviewBoard = ({ terry }: { terry: ITerryResponseDto }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CustomText style={styles.terryName}>{makeTextShortToDisplay(terry.name, 30)}</CustomText>
        <View style={styles.terryDetailContainer}>
          <LocationIcon />
          <CustomText style={styles.terryDetailText}>{`${meterToKilometer(terry.distance || 0)} ${t(
            'km',
          )}`}</CustomText>
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
