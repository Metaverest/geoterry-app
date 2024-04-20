import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import CustomText from 'App/components/CustomText';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { shortenString } from 'App/helpers/text';
import DifficultyIcon from 'App/media/DifficultyIcon';
import LocationIcon from 'App/media/LocationIcon';
import NextIcon from 'App/media/NextIcon';
import SizingIcon from 'App/media/SizingIcon';
import { ITerryResponseDto, Location } from 'App/types/terry';
import { meterToKilometer } from 'App/utils/convert';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { requestHunterGetTerryById } from 'App/utils/axios';
import { reduxSelector } from 'App/redux/selectors';

const TerryPreviewBoard = ({ terry, userLocation }: { terry: ITerryResponseDto; userLocation?: Location }) => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const navigation = useNavigation();
  const openTerryDetail = useCallback(async () => {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const resTerry = await requestHunterGetTerryById(
      {
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        includeProfileData: true,
        includeCategoryData: true,
        includeUserPath: true,
        includeConversationId: true,
        terryId: terry.id,
      },
      user.id,
    );
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(
      CommonActions.navigate({
        name: EMainGameScreen.TERRY_DETAIL_SCREEN,
        params: { terry: resTerry, userLocation },
      }),
    );
  }, [navigation, terry.id, user.id, userLocation]);
  return (
    <TouchableOpacity style={styles.container} onPress={openTerryDetail}>
      <View style={styles.subContainer}>
        <CustomText style={styles.terryName}>{shortenString(terry.name, 30)}</CustomText>
        <View style={styles.terryDetailContainer}>
          <LocationIcon />
          <CustomText style={styles.terryDetailText}>{`${meterToKilometer(terry.distance || 0)} ${t('km')} ${
            terry.address?.subAdministrativeArea || terry.address?.administrativeArea || terry.address?.country || ''
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
