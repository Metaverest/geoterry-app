import { View, FlatList, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from 'App/components/Header';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { requestPublicGetCheckinsOfTerry } from 'App/utils/axios';
import { IResponseGetCheckinsOfTerry } from 'App/types/terry';
import { convertDateRelativeToNow } from 'App/utils/convert';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { StackNavigationProp } from '@react-navigation/stack';
import Rating from 'App/components/Rating';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';

const Review = () => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.REVIEW_SCREEN>>();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();

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
              {item.rate ? t('Đã tìm thấy') : t('Chưa tìm thấy')}
              {' - '}
              {t(convertDateRelativeToNow(item.createdAt, user.languageCode))}
            </CustomText>
            {item.rate && <Rating rate={item.rate} style={styles.rating} />}
            <CustomText style={styles.desc}>{item.reviewText}</CustomText>
            <MultipleImagesOnLine images={item.photoUrls} numColumns={5} containerItemImageStyle={styles.mr8} />
          </View>
        </View>
      );
    },
    [t, user.languageCode],
  );
  useEffect(() => {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    requestPublicGetCheckinsOfTerry({ includeProfileData: true }, params.terryId)
      .then(res => {
        setListReview(res);
        navigation.dispatch(StackActions.pop());
      })
      .catch(err => {
        console.log(err.message);
        navigation.dispatch(StackActions.pop());
      });
  }, [navigation, params.terryId]);
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
