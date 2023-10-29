import { View, FlatList, Image, ListRenderItemInfo } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from 'App/components/Header';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { requestPublicGetCheckinsOfTerry } from 'App/utils/axios';
import { IResponseGetCheckinsOfTerry } from 'App/types/terry';
import { convertDateToNow } from 'App/utils/convert';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { ELanguageCode } from 'App/enums';

const Review = () => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.REVIEW_SCREEN>>();

  const [listReview, setListReview] = useState<IResponseGetCheckinsOfTerry[]>([]);
  const ListEmptyComponent = useCallback(() => {
    return <CustomText style={styles.textEmpty}>{t('Chưa có đánh giá nào!')}</CustomText>;
  }, [t]);
  const renderItem = useCallback(
    ({ item }: { item: IResponseGetCheckinsOfTerry }) => {
      return (
        <View style={styles.containerItem}>
          <Image source={{ uri: item.profile.logoUrl }} style={styles.avatar} resizeMode="cover" />
          <View style={styles.flex}>
            <CustomText style={styles.name}>{item.profile.displayName}</CustomText>
            <CustomText style={styles.time}>
              {t(convertDateToNow(item.createdAt, user.languageCode === ELanguageCode.VN))}
            </CustomText>
            <CustomText style={styles.desc}>{item.reviewText}</CustomText>
            <FlatList
              numColumns={5}
              data={item.photoUrls}
              renderItem={(elment: ListRenderItemInfo<string>) => {
                return <Image source={{ uri: elment.item }} style={styles.image} resizeMode="cover" />;
              }}
            />
          </View>
        </View>
      );
    },
    [t, user.languageCode],
  );
  useEffect(() => {
    requestPublicGetCheckinsOfTerry({ includeProfileData: true }, params.terryId)
      .then(res => setListReview(res))
      .catch(err => console.log(err.message));
  }, [params.terryId]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Đánh giá')} />
      <FlatList
        data={listReview}
        renderItem={renderItem}
        style={styles.containList}
        ListEmptyComponent={ListEmptyComponent}
      />
    </CustomSafeArea>
  );
};

export default Review;
