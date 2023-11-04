import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
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
import ImageView from 'react-native-image-viewing';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { convertDateFormatHistory } from 'App/utils/convert';
import GoldStarIcon from 'App/media/GoldStarIcon';
import StarIcon from 'App/media/StarIcon';
import ArrowMaximize from 'App/media/ArrowMaximize';

export default function DetailHistory() {
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.DETAIL_HISTORY>>();

  const [visible, setIsVisible] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  const images = params?.photoUrls.map(e => ({ uri: e }));

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <>
          {index < 5 ? (
            <TouchableOpacity
              style={params.photoUrls.length <= 5 ? styles.mr10 : null}
              onPress={() => {
                setIndexImage(index);
                setIsVisible(true);
              }}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
              <ArrowMaximize style={styles.iconArrowMaximize} />
            </TouchableOpacity>
          ) : index === 5 ? (
            <TouchableOpacity
              onPress={() => {
                setIndexImage(index);
                setIsVisible(true);
              }}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
              {params.photoUrls.length > 6 && (
                <View style={styles.lastImage}>
                  <CustomText style={styles.textLastImage}>+{params.photoUrls.length - 5}</CustomText>
                </View>
              )}
            </TouchableOpacity>
          ) : null}
        </>
      );
    },
    [params.photoUrls.length],
  );

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Lịch sử')} />
      <CustomText style={styles.title}>{t(params.terry.name)}</CustomText>
      <View style={[styles.row, styles.mt4]}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <View key={index.toString()}>{Math.round(params.rate) >= item ? <GoldStarIcon /> : <StarIcon />}</View>
          );
        })}
      </View>
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
      <View style={styles.containerImage}>
        <FlatList
          numColumns={6}
          data={params.photoUrls}
          renderItem={renderItem}
          scrollEnabled={false}
          columnWrapperStyle={params.photoUrls.length > 5 ? styles.columnWrapperStyle : null}
        />
      </View>
      <CustomButton
        onPress={() => {}}
        linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
        buttonType={EButtonType.SOLID}
        title={t('Xem trên bản đồ')}
        customStyleContainer={styles.btn}
      />
      <ImageView
        images={images}
        keyExtractor={(_, index) => index.toString()}
        imageIndex={indexImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </CustomSafeArea>
  );
}
