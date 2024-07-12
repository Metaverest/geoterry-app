import { CommonActions, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomInput from 'App/components/CustomInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import MultipleImagesOnLine from 'App/components/MultipleImagesOnLine';
import { EButtonType, EMediaType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { responsiveByHeight as rh } from 'App/helpers/common';
import useClearError from 'App/hooks/useClearError';
import ImageAddIcon from 'App/media/ImageAddIcon';
import { IUploadProfileResDto } from 'App/types/user';
import { requestUploadProfileImage } from 'App/utils/axios';
import { Formik, FormikErrors } from 'formik';
import { get, head, isEmpty, range, some } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';
import Header from 'App/components/Header';
import DumbbellIcon from 'App/media/DumbbellIcon';
import SlideSizeIcon from 'App/media/SlideSizeIcon';
import { convertDateFormatHistory } from 'App/utils/convert';
import ActiveStartIcon from 'App/media/ActiveStartIcon';
import StartIcon from 'App/media/StartIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';

interface IFormValues {
  reviewText: string;
  photoUrls?: string[];
  rate?: number;
}

const initialValues: IFormValues = {
  reviewText: '',
  photoUrls: [],
  rate: 0,
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Tên kho báu không được để trống')),
  });
};

const EditDetailHistory = () => {
  const dispatch = useDispatch();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.EDIT_DETAIL_HISTORY>>();
  initialValues.photoUrls = params.photoUrls;
  initialValues.reviewText = params.reviewText;
  initialValues.rate = params.rate;

  const { t } = useTranslation();
  const navigation = useNavigation();
  const onSubmit = useCallback(
    (values: IFormValues) => {
      dispatch(
        sagaUserAction.updateTerryCheckinAsync(
          {
            photoUrls: values.photoUrls,
            reviewText: values.reviewText,
            rate: values.rate,
          },
          params.id,
          navigation,
        ),
      );

      navigation.dispatch(
        CommonActions.navigate(EMainGameScreen.DETAIL_HISTORY, {
          ...params,
          photoUrls: values.photoUrls,
          reviewText: values.reviewText,
          rate: values.rate,
        }),
      );
    },
    [dispatch, navigation, params],
  );

  const getShouldDisableButton = useCallback((formValues: IFormValues) => {
    return some(Object.keys(formValues), key => {
      if (key === 'photoUrls' || key === 'rate') {
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
    <CustomSafeArea shouldUseKeyboardAwareScrollView style={styles.container}>
      <Header />
      <CustomText style={styles.title}>{t(params.terry.name)}</CustomText>
      <View style={[styles.row, styles.mv4]}>
        <CustomText style={styles.location}>
          {params.isFound ? t('Đã tìm thấy') : t('Không tìm thấy')} {'  |  '}
          {convertDateFormatHistory(params.checkinAt)}
        </CustomText>
        <DumbbellIcon style={styles.icon} />
        <CustomText style={[styles.location, styles.ml4]}>{params.terry.metadata.difficulty}</CustomText>
        <SlideSizeIcon style={styles.icon} />
        <CustomText style={[styles.location, styles.ml4]}>{params.terry.metadata.size}</CustomText>
      </View>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.mainContainer}>
                <View style={styles.startsContainer}>
                  {range(1, 6).map(value => {
                    return (
                      <TouchableOpacity onPress={() => setFieldValue('rate', value, true)} key={value}>
                        {value <= (values.rate || 0) ? <ActiveStartIcon /> : <StartIcon />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
                    buttonColor={EColor.color_1f1f1f}
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
                  title={t('Cập nhật')}
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

export default EditDetailHistory;
