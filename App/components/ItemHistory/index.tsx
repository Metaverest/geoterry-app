import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomText from '../CustomText';
import { useTranslation } from 'react-i18next';
import LocationIcon from 'App/media/LocationIcon';
import DumbbellIcon from 'App/media/DumbbellIcon';
import SlideSizeIcon from 'App/media/SlideSizeIcon';
import BackIcon from 'App/media/BackIcon';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen } from 'App/enums/navigation';
import { IResponseTerryCheckins } from 'App/types/terry';
import { convertDateFormatHistory } from 'App/utils/convert';

const ItemHistory = (props: IResponseTerryCheckins) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.dispatch(CommonActions.navigate(EMainGameScreen.DETAIL_HISTORY, props));
      }}>
      <View>
        <CustomText style={styles.timeHistory}>{convertDateFormatHistory(props.checkinAt)}</CustomText>
        <CustomText style={styles.title}>{t(props.terry.name)}</CustomText>
        <View style={styles.row}>
          <LocationIcon />
          <CustomText style={[styles.timeHistory, styles.ml4]}>5.6km, Ben Tre</CustomText>
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
