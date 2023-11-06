import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import Header from 'App/components/Header';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import LocationIcon from 'App/media/LocationIcon';
import DumbbellIcon from 'App/media/DumbbellIcon';
import SlideSizeIcon from 'App/media/SlideSizeIcon';
import CustomButton from 'App/components/Button';
import { EColor } from 'App/enums/color';
import { EButtonType } from 'App/enums';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { convertDateFormatHistory } from 'App/utils/convert';
import Rating from 'App/components/Rating';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';

export default function DetailHistory() {
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.DETAIL_HISTORY>>();

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Lịch sử')} />
      <CustomText style={styles.title}>{t(params.terry.name)}</CustomText>
      <Rating style={styles.mt4} rate={params.rate} />
      <View style={[styles.row, styles.mv4]}>
        <LocationIcon />
        <CustomText style={[styles.location, styles.ml4]}>5.6km, Ben Tre</CustomText>
        <DumbbellIcon style={styles.icon} />
        <CustomText style={[styles.location, styles.ml4]}>{params.terry.metadata.difficulty}</CustomText>
        <SlideSizeIcon style={styles.icon} />
        <CustomText style={[styles.location, styles.ml4]}>{params.terry.metadata.size}</CustomText>
      </View>
      <CustomText style={styles.location}>{convertDateFormatHistory(params.checkinAt)}</CustomText>
      <View style={styles.containerDesc}>
        <CustomText style={styles.desc}>{t(params.reviewText)}</CustomText>
      </View>

      <MultipleImagesOnLine
        images={params.photoUrls}
        containerImageStyle={styles.containerImage}
        numColumns={6}
        containerItemImageStyle={styles.mr10}
        showIconMaximize
      />
      <CustomButton
        onPress={() => {}}
        linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
        buttonType={EButtonType.SOLID}
        title={t('Xem trên bản đồ')}
        customStyleContainer={styles.btn}
      />
    </CustomSafeArea>
  );
}
