import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from 'App/components/Header';
import CustomSafeArea from 'App/components/CustomSafeArea';
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
import { isEmpty } from 'lodash';
import CustomImage from 'App/components/CustomImage';
import ConversationUserAvatarDefault from 'App/media/ConversationUserAvatarDefault';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import useBoolean from 'App/hooks/useBoolean';
import { REVIEWS_PAGINATION_PAGE_SIZE } from 'App/constants/common';

const NUMBER_OF_SKELETONS = 5;

const Review = () => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.REVIEW_SCREEN>>();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const [isLoading, setIsLoading] = useState(false);
  const [listReview, setListReview] = useState<IResponseGetCheckinsOfTerry[] | null>(null);
  const [callOnScrollEnd, triggerCallOnScrollEnd, preventCallOnScrollEnd] = useBoolean(false);
  const [refresh, setRefresh] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

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
          {item.profile.logoUrl ? (
            <CustomImage imageUrl={item.profile.logoUrl} style={styles.avatar} resizeMode="cover" />
          ) : (
            <View style={styles.avatarDefault}>
              <ConversationUserAvatarDefault height={rh(36)} width={rh(36)} />
            </View>
          )}
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

  const onEndReached = useCallback(async () => {
    if (callOnScrollEnd) {
      try {
        setLoadMore(true);
        const response = await requestPublicGetCheckinsOfTerry(
          {
            page: pageNumber + 1,
            pageSize: REVIEWS_PAGINATION_PAGE_SIZE,
            includeProfileData: true,
          },
          params.terryId,
        );
        if (!isEmpty(response)) {
          setListReview(prev => (prev ? [...prev, ...response] : response));
          setPageNumber(pageNumber + 1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadMore(false);
        preventCallOnScrollEnd();
      }
    }
  }, [callOnScrollEnd, pageNumber, params.terryId, preventCallOnScrollEnd]);

  const getCheckinOfTerry = useCallback(
    (isRefresh?: boolean) => {
      if (!isRefresh) {
        setIsLoading(true);
      }
      requestPublicGetCheckinsOfTerry(
        {
          page: 1,
          pageSize: REVIEWS_PAGINATION_PAGE_SIZE,
          includeProfileData: true,
        },
        params.terryId,
      )
        .then(res => {
          setListReview(res);
          if (isRefresh) {
            setRefresh(false);
          } else {
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err.message);
          if (isRefresh) {
            setRefresh(false);
          } else {
            setIsLoading(false);
          }
        });
    },
    [params.terryId],
  );

  const onRefresh = useCallback(async () => {
    preventCallOnScrollEnd();
    getCheckinOfTerry(true);
    setPageNumber(1);
  }, [getCheckinOfTerry, preventCallOnScrollEnd]);

  useEffect(() => {
    getCheckinOfTerry();
    // only fetch one time when component mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomSafeArea style={styles.container}>
      <Header title={t('Đánh giá')} />
      {isLoading ? (
        LoadingSkeleton
      ) : (
        <FlatList
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refresh} />}
          data={listReview}
          renderItem={renderItem}
          style={styles.containList}
          ListEmptyComponent={ListEmptyComponent}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadMore ? <ActivityIndicator size={rw(50)} color={EColor.white} animating={loadMore} /> : null
          }
          onMomentumScrollBegin={onEndReached}
          onEndReached={triggerCallOnScrollEnd}
        />
      )}
    </CustomSafeArea>
  );
};

export default Review;
