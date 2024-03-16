import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomInput from 'App/components/CustomInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';
import { AppBackgroundImage, CannotFindTerryImage, CheckInTerryCongratImage } from 'App/components/image';
import { EButtonType, EMediaType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { responsiveByHeight as rh } from 'App/helpers/common';
import useClearError from 'App/hooks/useClearError';
import ImageAddIcon from 'App/media/ImageAddIcon';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { IUploadProfileResDto } from 'App/types/user';
import { requestUploadProfileImage } from 'App/utils/axios';
import { Formik, FormikErrors } from 'formik';
import { get, head, isEmpty, some } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';
import Header from 'App/components/Header';

interface IFormValues {
  reviewText: string;
  photoUrls?: string[];
}

const initialValues: IFormValues = {
  reviewText: '',
  photoUrls: [],
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Tên kho báu không được để trống')),
  });
};

const CheckinTerryScreen = ({ route }: { route: any }) => {
  const dispatch = useDispatch();
  const { isCannotFindTerry, code } = useMemo(() => route.params || {}, [route.params]);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const onSubmit = useCallback(
    (values: IFormValues) => {
      dispatch(
        reduxAppAction.setCheckinTerryData({
          reviewText: values.reviewText,
          photoUrls: values.photoUrls,
          isFound: !isCannotFindTerry,
          code,
        }),
      );
      navigation.dispatch(CommonActions.navigate(EMainGameScreen.CHECKIN_TERRY_VOTE_SCREEN));
    },
    [code, dispatch, isCannotFindTerry, navigation],
  );

  const getShouldDisableButton = useCallback((formValues: IFormValues) => {
    return some(Object.keys(formValues), key => {
      if (key === 'photoUrls') {
        return false;
      }
      return isEmpty(get(formValues, key, null));
    });
  }, []);

  const clearError = useClearError();

  const handleAddImage = useCallback(
    async (
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<IFormValues>>,
      currentValue?: string[],
    ) => {
      const response: ImagePickerResponse = await launchImageLibrary({ mediaType: EMediaType.PHOTO });
      if (response.assets) {
        try {
          navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
          const res: IUploadProfileResDto = await requestUploadProfileImage(head(response.assets));
          setFieldValue('photoUrls', [...(currentValue || []), res.photoUrl], true);
          navigation.dispatch(StackActions.pop());
        } catch (error) {
          console.log(error);
          navigation.dispatch(StackActions.pop());
        }
      }
    },
    [navigation],
  );

  const removeImage = useCallback(
    (
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<IFormValues>>,
      currentValue?: string[],
      removeImageUrl?: string,
    ) => {
      setFieldValue(
        'photoUrls',
        currentValue?.filter(url => url !== removeImageUrl),
        true,
      );
    },
    [],
  );

  return (
    <CustomSafeArea
      shouldUseKeyboardAwareScrollView
      style={styles.container}
      backgroundImageSource={AppBackgroundImage}>
      <Header />
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.mainContainer}>
                <Image
                  style={styles.headerImage}
                  source={isCannotFindTerry ? CannotFindTerryImage : CheckInTerryCongratImage}
                />
                <CustomText style={styles.checkInTitle}>
                  {isCannotFindTerry
                    ? t('Ồ, bạn không tìm thấy kho báu sao?')
                    : t('Chúc mừng\nBạn đã tìm thấy kho báu!')}
                </CustomText>
                <CustomText style={styles.checkInSubtitle}>
                  {isCannotFindTerry
                    ? t('Checkly rất tiếc về trải nghiệm này, hãy để lại lời nhắn cho Builder để sớm khắc phục.')
                    : t('Chia sẻ cảm nhận với cùng với cộng đồng Checkly!')}
                </CustomText>
                <View style={styles.terryInputContainer}>
                  <CustomInput
                    minHeightInput={rh(121)}
                    error={shouldDisplayError ? errors.reviewText : ''}
                    onChangeText={text => setFieldValue('reviewText', text, true)}
                    placeholder={t('Nhập...')}
                    numberOfLines={10}
                    multiline
                    value={values.reviewText}
                  />
                </View>
                <View style={styles.terryAddImageContainer}>
                  <CustomButtonIcon
                    onPress={() => handleAddImage(setFieldValue, values.photoUrls)}
                    buttonColor={EColor.color_333333}
                    customStyleContainer={styles.addImagebuttonContainer}
                    buttonType={EButtonType.SOLID}
                    renderIcon={<ImageAddIcon />}
                  />
                  {!isEmpty(values.photoUrls) && (
                    <MultipleImagesOnLine
                      images={values.photoUrls || []}
                      containerItemImageStyle={styles.containerItemImageStyle}
                      containerImageStyle={styles.containerImageStyle}
                      canRemoveImage
                      removeImage={url => {
                        removeImage(setFieldValue, values.photoUrls, url);
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    clearError();
                    onSubmit(values);
                  }}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  buttonType={EButtonType.SOLID}
                  title={t('Gửi')}
                  disabled={getShouldDisableButton(values)}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </CustomSafeArea>
  );
};

export default CheckinTerryScreen;
