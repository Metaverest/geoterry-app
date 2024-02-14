import CustomButton from 'App/components/Button';
import { EButtonType, FindTerryCheckinBy } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ITerryResponseDto, Location } from 'App/types/terry';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import {
  calculateDistance,
  convertAddressObjectToProvincialReadableAddress,
  meterToKilometer,
} from 'App/utils/convert';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EMainGameNavigatorParams, EMainGameScreen, ENavigationScreen, EPopUpModalType } from 'App/enums/navigation';
import Rating from 'App/components/Rating';
import { requestHunterGetTerryCheckin } from 'App/utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { SwiperFlatListWithGestureHandler } from 'react-native-swiper-flatlist/WithGestureHandler';
import { AppBackgroundImage, CheckInTerryCongratImage, CreateTerrySuccessImage } from 'App/components/image';
import WhiteLocationIcon from 'App/media/WhiteLocationIcon';
import PaginationSeperators from 'App/components/PaginationSeperators';
import Header from 'App/components/Header';
import { responsiveByHeight as rh } from 'App/helpers/common';
import { PopUpModalParams, navigateToPopUpModal } from 'App/utils/navigation';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { THRESHOLD_DISTANCE_TO_BE_ABLE_TO_CHECKIN_TERRY } from 'App/constants/common';
import { shortenString } from 'App/helpers/text';
import useUserLocation from 'App/hooks/useUserLocation';
import { getResizedImageUrl, EImageSize } from 'App/utils/images';
export interface ITerryDetailProps {
  terry: ITerryResponseDto;
}
interface ITerryItem {
  title: string;
  subTitle: string;
  value: string;
}
const TerryDetailScreen = ({ route }: { route: any }) => {
  const user = useSelector(reduxSelector.getUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const [indexImg, setIndexImg] = useState(0);
  const { userLocation } = useUserLocation();
  const terry: ITerryResponseDto = useMemo(() => {
    return route?.params?.terry;
  }, [route]);

  const initUserLocation: Location = useMemo(() => {
    return route?.params?.userLocation;
  }, [route]);

  const handleViewSuggestion = () => {
    navigateToPopUpModal(navigation, {
      title: t('Gợi ý'),
      subtitle: terry.hint || t('Không có gợi ý'),
      image: CreateTerrySuccessImage,
      confirmButtonTitle: t('Xong'),
    });
  };

  const handleViewHistory = () => {
    navigation.dispatch(StackActions.replace(ENavigationScreen.LOADING_MODAL));
    requestHunterGetTerryCheckin({
      profileId: user.id,
      id: terry.id,
      findBy: FindTerryCheckinBy.TERRY_ID,
      includeTerryData: true,
      includeUserPath: true,
    })
      .then(res => {
        navigation.dispatch(StackActions.pop());
        navigation.dispatch(CommonActions.navigate(EMainGameScreen.DETAIL_HISTORY, res));
      })
      .catch(err => {
        navigation.dispatch(StackActions.pop());
        console.log(err, 'terryDetail');
      });
  };

  const handleViewReviews = () => {
    navigateToPopUpModal(navigation, {
      ...PopUpModalParams[EPopUpModalType.TERRY_INFORMATION_CAN_BE_DISCLOSED],
      closeModalBeforeActiom: true,
      onCancel: () => navigation.dispatch(CommonActions.navigate(EMainGameScreen.REVIEW_SCREEN, { terryId: terry.id })),
    });
  };

  const terryItem: ITerryItem[] = useMemo(() => {
    return [
      {
        title: t('Địa hình'),
        subTitle: t('Độ phức tạp của địa hình'),
        value: `${t('Mức')} ${terry.metadata.terrain}`,
      },
      {
        title: t('Khoảng cách'),
        subTitle: t('Khoảng cách từ vị trí của bạn đến kho báu'),
        value: `${meterToKilometer(terry.distance || 0)} ${t('km')}`,
      },
      {
        title: t('Kích thước'),
        subTitle: t('Độ lớn của kho báu'),
        value: `${t('Mức')} ${terry.metadata.size}`,
      },
      {
        title: t('Độ khó'),
        subTitle: t('Khả năng tìm thấy trong vòng 10 - 15 phút'),
        value: `${t('Mức')} ${terry.metadata.difficulty}`,
      },
    ] as ITerryItem[];
  }, [t, terry]);
  const RenderTerryItem = useCallback(
    ({ terryItemToRender, index }: { terryItemToRender: ITerryItem; index: number }) => {
      return (
        <View
          style={[
            styles.terryItemContainer,
            {
              borderBottomWidth:
                index === terryItem.length - 1 ? undefined : styles.terryItemContainer.borderBottomWidth,
            },
          ]}>
          <View style={styles.terryItemTitleAndSubtitleContainer}>
            <CustomText style={styles.terryItemTitleText}>{terryItemToRender.title}</CustomText>
            <CustomText style={styles.terryItemSubtitleText}>{terryItemToRender.subTitle}</CustomText>
          </View>
          <CustomText style={styles.terryItemValueText}>{terryItemToRender.value}</CustomText>
        </View>
      );
    },
    [terryItem.length],
  );
  const image = (index: number) => ({ image: terry.photoUrls![index % terry.photoUrls!.length] });
  const items = terry.photoUrls?.length
    ? Array.from(Array(terry.photoUrls.length)).map((_, index) => image(index))
    : [];

  const [nearToTerry, setNearToTerry] = useState(
    (terry.distance || 0) <= THRESHOLD_DISTANCE_TO_BE_ABLE_TO_CHECKIN_TERRY,
  );
  useEffect(() => {
    if (userLocation) {
      const deltaDistance = calculateDistance(terry.location, userLocation);
      if (deltaDistance <= THRESHOLD_DISTANCE_TO_BE_ABLE_TO_CHECKIN_TERRY) {
        setNearToTerry(true);
      } else if (nearToTerry) {
        setNearToTerry(false);
      }
    }
  }, [nearToTerry, terry, userLocation]);

  return (
    <ImageBackground source={AppBackgroundImage}>
      <ScrollView style={styles.container}>
        {!terry.photoUrls || terry.photoUrls.length === 0 ? (
          <Image source={CheckInTerryCongratImage} style={styles.imageNullTerryCheckin} resizeMode="cover" />
        ) : (
          <View style={styles.imageSlider}>
            <SwiperFlatListWithGestureHandler
              autoplay
              autoplayLoop
              autoplayDelay={2}
              index={0}
              showPagination
              data={items}
              onChangeIndex={({ index }) => setIndexImg(index)}
              renderItem={({ item, index }) => {
                return (
                  <ImageBackground
                    style={styles.imageSlider}
                    source={{ uri: getResizedImageUrl(item.image, EImageSize.SIZE_500) }}
                    testID={`container_swiper_renderItem_screen_${index}`}
                    resizeMode="cover"
                  />
                );
              }}
              PaginationComponent={() => (
                <View style={styles.containerPaginationDots}>
                  <PaginationSeperators length={items.length} index={indexImg} />
                </View>
              )}
            />
          </View>
        )}
        <View
          style={[
            styles.headerContainer,
            {
              marginTop: terry.photoUrls?.length === 0 ? rh(13) : styles.headerContainer.marginTop,
            },
          ]}>
          <View style={styles.containerLocation}>
            <WhiteLocationIcon />
            <CustomText style={styles.terryDistanceAndCategoryText}>
              {shortenString(convertAddressObjectToProvincialReadableAddress(terry.address) || t('Không rõ'), 40)}
            </CustomText>
            <Rating rate={terry.rating.rate} />
            <CustomText style={styles.quantityRate}> ({terry.rating.total})</CustomText>
          </View>
          <CustomText style={styles.terryNameText}>{terry?.name}</CustomText>
          <View style={styles.creatorNameContainer}>
            <CustomText style={styles.terryCreateByText}>{t('Tạo bởi')}: </CustomText>
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN, { profileID: terry?.profile?.id! }),
                )
              }>
              <CustomText style={styles.terryCreateByDisplayNameText}>{terry?.profile?.displayName}</CustomText>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {terry.categories && (
              <View style={styles.containerTag}>
                {terry.categories.map((item, index) => (
                  <View style={styles.tag} key={index}>
                    <CustomText style={styles.textTag}>{t(item.name)}</CustomText>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
          <CustomText style={styles.desc}>“{terry.description}”</CustomText>
        </View>
        <View style={styles.terrySubHeaderContainer}>
          <View style={styles.suggestionAndRateContainer}>
            <TouchableOpacity style={styles.suggestionAndRateButton} onPress={handleViewSuggestion}>
              <CustomText style={styles.suggestionAndRateText}>{t('Gợi ý')}</CustomText>
            </TouchableOpacity>
            <View style={styles.suggestionAndRateDivider} />
            <TouchableOpacity style={styles.suggestionAndRateButton} onPressIn={handleViewReviews}>
              <CustomText style={styles.suggestionAndRateText}>{t('Xem đánh giá')}</CustomText>
            </TouchableOpacity>
          </View>
          <CustomText style={styles.textDetailInfor}>{t('Thông tin chi tiết')}</CustomText>
        </View>
        <View style={styles.terryMainContainer}>
          <ScrollView>
            {terryItem?.map((o, index) => (
              <RenderTerryItem index={index} key={o.title} terryItemToRender={o} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.terryFooterContainer}>
          {terry?.checkedIn ? (
            <>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={handleViewHistory}
                  title={t('Xem lịch sử')}
                  buttonType={EButtonType.SOLID}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    dispatch(
                      reduxAppAction.setCheckinTerryData({
                        terryId: terry?.id,
                        location: {
                          latitude: userLocation?.latitude || initUserLocation.latitude,
                          longitude: userLocation?.longitude || initUserLocation.longitude,
                        },
                      }),
                    );
                    navigation.dispatch(
                      CommonActions.navigate({
                        name: EMainGameScreen.CHECKIN_TERRY_SCREEN,
                        params: { isCannotFindTerry: false },
                      }),
                    );
                  }}
                  title={t('Đã tìm thấy')}
                  disabled={!nearToTerry}
                  buttonType={EButtonType.SOLID}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    navigation.dispatch(
                      StackActions.replace(EMainGameScreen.HUNTING_MAP_SCREEN, {
                        terry,
                        userLocation: userLocation || initUserLocation,
                      }),
                    );
                  }}
                  title={t('Chỉ đường')}
                  buttonType={EButtonType.OUTLINE}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <Header />
    </ImageBackground>
  );
};

export default TerryDetailScreen;
