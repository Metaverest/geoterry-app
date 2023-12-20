import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomText from '../CustomText';
import { useTranslation } from 'react-i18next';
import DumbbellIcon from 'App/media/DumbbellIcon';
import SlideSizeIcon from 'App/media/SlideSizeIcon';
import BackIcon from 'App/media/BackIcon';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { IResponseTerryCheckins } from 'App/types/terry';
import { convertDateFormatHistory } from 'App/utils/convert';
import Rating from '../Rating';
import { requestHunterGetTerryCheckin } from 'App/utils/axios';
import { FindTerryCheckinBy } from 'App/enums';

const ItemHistory = (props: IResponseTerryCheckins) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePressOnViewDetails = () => {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    requestHunterGetTerryCheckin({
      profileId: props.profileId,
      id: props.terryId,
      findBy: FindTerryCheckinBy.TERRY_ID,
      includeTerryData: true,
      includeUserPath: true,
    })
      .then(res => {
        navigation.dispatch(StackActions.pop());
        navigation.dispatch(CommonActions.navigate(EMainGameScreen.DETAIL_HISTORY, res));
      })
      .catch(err => {
        console.log(err, 'terryDetail');
        navigation.dispatch(StackActions.pop());
        navigation.dispatch(CommonActions.navigate(EMainGameScreen.DETAIL_HISTORY, props));
      });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePressOnViewDetails}>
      <View>
        <CustomText style={styles.timeHistory}>
          {props.isFound ? t('Đã tìm thấy') : t('Không tìm thấy')} {'  |  '}
          {convertDateFormatHistory(props.checkinAt)}
        </CustomText>
        <CustomText style={styles.title}>{t(props.terry.name)}</CustomText>
        <View style={styles.row}>
          <Rating rate={props.rate} />
          <DumbbellIcon style={styles.icon} />
          <CustomText style={[styles.timeHistory, styles.ml4]}>{props.terry.metadata.difficulty}</CustomText>
          <SlideSizeIcon style={styles.icon} />
          <CustomText style={[styles.timeHistory, styles.ml4]}>{props.terry.metadata.size}</CustomText>
        </View>
      </View>
      <BackIcon style={styles.chevronRight} />
    </TouchableOpacity>
  );
};

export default ItemHistory;
