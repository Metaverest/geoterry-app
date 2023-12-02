import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomInput from 'App/components/CustomInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';
import { AppBackgroundImage, CannotFindTerryImage, CheckInTerryCongratImage } from 'App/components/image';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameScreen } from 'App/enums/navigation';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';

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
  const { isCannotFindTerry } = useMemo(() => route.params || {}, [route.params]);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const onSubmit = useCallback(
    (values: IFormValues) => {
      dispatch(reduxAppAction.setCheckinTerryData({ reviewText: values.reviewText, photoUrls: values.photoUrls }));
      navigation.dispatch(CommonActions.navigate(EMainGameScreen.CHECKIN_TERRY_VOTE_SCREEN));
    },
    [navigation, dispatch],
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
      const response: ImagePickerResponse = await launchImageLibrary({});
      if (response.assets) {
        try {
          const res: IUploadProfileResDto = await requestUploadProfileImage(head(response.assets));
          setFieldValue('photoUrls', [...(currentValue || []), res.photoUrl], true);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [],
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
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header />
      <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraHeight={rh(151)}>
        <Image
          style={styles.headerImage}
          source={isCannotFindTerry ? CannotFindTerryImage : CheckInTerryCongratImage}
        />
        <CustomText style={styles.checkInTitle}>
          {isCannotFindTerry ? t('Ồ, bạn không tìm thấy kho báu sao?') : t('Chúc mừng\nBạn đã tìm thấy kho báu!')}
        </CustomText>
        <CustomText style={styles.checkInSubtitle}>
          {isCannotFindTerry
            ? t('Terriana rất tiếc về trải nghiệm này, hãy để lại lời nhắn cho Builder để sớm khắc phục.')
            : t('Chia sẻ cảm nhận với Terriana cùng với cộng đồng của chúng tôi!')}
        </CustomText>
        <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
          {({ values, setFieldValue, errors, submitCount }) => {
            const shouldDisplayError = submitCount > 0;
            return (
              <>
                <View style={styles.inputContainer}>
                  <View style={styles.terryInputContainer}>
                    <CustomInput
                      minHeightInput={rh(151)}
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
                        images={values.photoUrls as string[]}
                        numColumns={4}
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
      </KeyboardAwareScrollView>
    </CustomSafeArea>
  );
};

export default CheckinTerryScreen;
