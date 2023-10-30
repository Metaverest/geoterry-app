import { View, FlatList, Image, ListRenderItemInfo, TouchableOpacity } from 'react-native';
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
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { StackNavigationProp } from '@react-navigation/stack';

const Review = () => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.REVIEW_SCREEN>>();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();

  const [listReview, setListReview] = useState<IResponseGetCheckinsOfTerry[]>([]);
  const [listImagesView, setListImagesView] = useState<ImageSource[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

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
              {t(convertDateRelativeToNow(item.createdAt, user.languageCode))}
            </CustomText>
            <CustomText style={styles.desc}>{item.reviewText}</CustomText>
            <FlatList
              numColumns={5}
              data={item.photoUrls}
              renderItem={(element: ListRenderItemInfo<string>) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIndexImage(element.index);
                      setListImagesView(item.photoUrls.map(e => ({ uri: e })));
                      setIsVisible(true);
                    }}>
                    <Image source={{ uri: element.item }} style={styles.image} resizeMode="cover" />
                  </TouchableOpacity>
                );
              }}
            />
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
      <ImageView
        images={listImagesView}
        keyExtractor={(_, index) => index.toString()}
        imageIndex={indexImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </CustomSafeArea>
  );
};

export default Review;
