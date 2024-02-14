import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from 'App/components/Header';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { requestPublicGetCheckinsOfTerry } from 'App/utils/axios';
import { IResponseGetCheckinsOfTerry } from 'App/types/terry';
import { convertDateRelativeToNow } from 'App/utils/convert';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { StackNavigationProp } from '@react-navigation/stack';
import Rating from 'App/components/Rating';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';
import { EColor } from 'App/enums/color';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { isNil } from 'lodash';
import CustomImage from 'App/components/CustomImage';

const NUMBER_OF_SKELETONS = 5;

const Review = () => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.REVIEW_SCREEN>>();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const [isLoading, setIsLoading] = useState(false);
  const [listReview, setListReview] = useState<IResponseGetCheckinsOfTerry[] | null>(null);

  const ListEmptyComponent = useCallback(() => {
    return <CustomText style={styles.textEmpty}>{t('Chưa có đánh giá nào!')}</CustomText>;
  }, [t]);

  const CardSkeleton = useCallback(() => {
    return (
      <SkeletonPlaceholder
        backgroundColor={EColor.color_00000050}
        highlightColor={EColor.color_00000080}
        borderRadius={4}>
        <View style={styles.loadingContainer} />
      </SkeletonPlaceholder>
    );
  }, []);

  const LoadingSkeleton = (
    <View style={styles.containList}>
      {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
        <CardSkeleton key={`loading_${index}`} />
      ))}
    </View>
  );

  const renderItem = useCallback(
    ({ item }: { item: IResponseGetCheckinsOfTerry }) => {
      return (
        <View style={styles.containerItem}>
          <CustomImage imageUrl={item.profile.logoUrl || ''} style={styles.avatar} resizeMode="cover" />
          <View style={styles.flex}>
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN, { profileID: item?.profile?.id! }),
                )
              }>
              <CustomText style={styles.name}>{item.profile.displayName}</CustomText>
            </TouchableOpacity>
            <CustomText style={styles.time}>
              {item.isFound ? t('Đã tìm thấy') : t('Chưa tìm thấy')}
              {' - '}
              {t(convertDateRelativeToNow(item.createdAt, user.languageCode))}
            </CustomText>
            {item.rate && <Rating rate={item.rate} style={styles.rating} />}
            <CustomText style={styles.desc}>{item.reviewText}</CustomText>
            <MultipleImagesOnLine
              images={item.photoUrls || []}
              numColumns={5}
              containerItemImageStyle={styles.containerItemImageStyle}
            />
          </View>
        </View>
      );
    },
    [navigation, t, user.languageCode],
  );

  const getCheckinOfTerry = useCallback(() => {
    setIsLoading(true);
    requestPublicGetCheckinsOfTerry({ includeProfileData: true }, params.terryId)
      .then(res => {
        setListReview(res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, [params.terryId]);
  useEffect(() => {
    if (!isNil(listReview)) {
      return;
    }
    getCheckinOfTerry();
  }, [getCheckinOfTerry, listReview, navigation, params.terryId]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Đánh giá')} />
      {isLoading ? (
        LoadingSkeleton
      ) : (
        <FlatList
          data={listReview}
          renderItem={renderItem}
          style={styles.containList}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </CustomSafeArea>
  );
};

export default Review;
