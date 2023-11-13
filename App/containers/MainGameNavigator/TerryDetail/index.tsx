import CustomButton from 'App/components/Button';
import CustomSwipeUpModal from 'App/components/SwipeUpModal';
import { EButtonType, FindTerryCheckinBy } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ITerryResponseDto } from 'App/types/terry';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { convertDateFormat, meterToKilometer } from 'App/utils/convert';
import DotIcon from 'App/media/DotIcon';
import { head } from 'lodash';
import { StackActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import Rating from 'App/components/Rating';
import { requestHunterGetTerryCheckin } from 'App/utils/axios';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
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
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const terry: ITerryResponseDto = useMemo(() => {
    return route?.params?.terry;
  }, [route]);

  const handleViewHistory = () => {
    requestHunterGetTerryCheckin({
      profileId: user.id,
      id: terry.id,
      findBy: FindTerryCheckinBy.TERRY_ID,
      includeTerryData: true,
    }).then(res => {
      navigation.dispatch(StackActions.replace(EMainGameScreen.DETAIL_HISTORY, res));
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
  const RenderTerryItem = useCallback(({ terryItemToRender }: { terryItemToRender: ITerryItem }) => {
    return (
      <View style={styles.terryItemContainer}>
        <View style={styles.terryItemTitleAndSubtitleContainer}>
          <CustomText style={styles.terryItemTitleText}>{terryItemToRender.title}</CustomText>
          <CustomText style={styles.terryItemSubtitleText}>{terryItemToRender.subTitle}</CustomText>
        </View>
        <CustomText style={styles.terryItemValueText}>{terryItemToRender.value}</CustomText>
      </View>
    );
  }, []);
  return (
    <CustomSwipeUpModal>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CustomText style={styles.terryNameText}>{terry?.name}</CustomText>
          <View style={styles.terryDistanceAndCategoryContainer}>
            <CustomText style={styles.terryDistanceAndCategoryText}>{`${meterToKilometer(terry.distance || 0)} ${t(
              'km',
            )}`}</CustomText>
            <DotIcon />
            <CustomText style={styles.terryDistanceAndCategoryText}>{head(terry.categories)?.name}</CustomText>
          </View>
          <CustomText style={styles.desc}>“{terry.description}”</CustomText>
        </View>
        <View style={styles.terrySubHeaderContainer}>
          <View style={styles.terryCreateByAndCreateAtContainer}>
            <CustomText style={styles.terryCreateByText}>
              {t('Được tạo bởi')}:{' '}
              <CustomText style={styles.terryCreateByDisplayNameText}>{terry?.profile?.displayName}</CustomText>
            </CustomText>
            <CustomText style={styles.terryCreateAtText}>{convertDateFormat(terry.createdAt)}</CustomText>
            <View style={styles.containerRating}>
              <Rating rate={terry.rating.rate} />
              <CustomText style={styles.quantityRate}> ({terry.rating.total})</CustomText>
            </View>
          </View>
          <View style={styles.suggestionAndRateContainer}>
            <TouchableOpacity style={styles.suggestionAndRateButton}>
              <CustomText style={styles.suggestionAndRateText}>{t('Gợi ý')}</CustomText>
            </TouchableOpacity>
            <View style={styles.suggestionAndRateDivider} />
            <TouchableOpacity
              style={styles.suggestionAndRateButton}
              onPress={() => {
                navigation.dispatch(StackActions.replace(EMainGameScreen.REVIEW_SCREEN, { terryId: terry.id }));
              }}>
              <CustomText style={styles.suggestionAndRateText}>{t('Xem đánh giá')}</CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.terryMainContainer}>
          <ScrollView>
            {terryItem?.map(o => (
              <RenderTerryItem key={o.title} terryItemToRender={o} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.terryFooterContainer}>
          {terry?.checkedIn ? (
            <>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {}}
                  title={t('Chỉ đường')}
                  buttonType={EButtonType.SOLID}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={handleViewHistory}
                  title={t('Xem lịch sử')}
                  buttonType={EButtonType.OUTLINE}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {}}
                  title={t('Đã tìm thấy')}
                  buttonType={EButtonType.SOLID}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {}}
                  title={t('Chỉ đường')}
                  buttonType={EButtonType.OUTLINE}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </CustomSwipeUpModal>
  );
};

export default TerryDetailScreen;
