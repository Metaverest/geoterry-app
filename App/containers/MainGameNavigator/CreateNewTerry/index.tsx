import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomInput from 'App/components/CustomInput';
import CustomDropdownInput from 'App/components/CustomInput/CustomDropdownInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import useClearError from 'App/hooks/useClearError';
import DismissCircleIcon from 'App/media/DismissCircleIcon';
import ImageAddIcon from 'App/media/ImageAddIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IUploadProfileResDto } from 'App/types/user';
import { requestUploadProfileImage } from 'App/utils/axios';
import { Formik, FormikErrors } from 'formik';
import { get, head, isEmpty, isNumber, some } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';

interface IFormValues {
  name: string;
  hint: string;
  category: string;
  terrain: number;
  size: number;
  difficulty: number;
  photoUrls?: string[];
}

const initialValues: IFormValues = {
  name: '',
  hint: '',
  category: '',
  terrain: 0,
  size: 0,
  difficulty: 0,
  photoUrls: [],
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Tên kho báu không được để trống')),
  });
};

const CreateNewTerryScreen = ({ route }: { route: any }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { latitude, longitude } = useMemo(() => {
    return route.params;
  }, [route.params]);
  const onSubmit = useCallback(
    async (values: IFormValues) => {
      dispatch(
        sagaUserAction.builderCreateTerryAsync(
          {
            name: values.name,
            hint: values.hint,
            categoryIds: [values.category],
            photoUrls: values.photoUrls,
            isAvailable: true,
            location: { latitude: latitude, longitude: longitude },
            metadata: {
              difficulty: values.difficulty,
              terrain: values.terrain,
              size: values.size,
            },
          },
          navigation,
          { t: t },
        ),
      );
    },
    [navigation, dispatch, latitude, longitude, t],
  );
  const getShouldDisableButton = useCallback((formValues: IFormValues) => {
    return some(Object.keys(formValues), key => {
      return isNumber(get(formValues, key, null)) ? get(formValues, key, 0) === 0 : isEmpty(get(formValues, key, null));
    });
  }, []);

  const clearError = useClearError();

  const categories = useSelector(reduxSelector.getAppPublicCategories);

  const categoryOptions = useMemo(() => {
    return categories?.map(c => ({ label: c.name, value: c.id }));
  }, [categories]);

  const terrianOptions = useMemo(() => {
    return [
      { label: t('1: Dễ'), value: 1 },
      { label: t('2: Dễ vừa'), value: 2 },
      { label: t('3: Trung bình'), value: 3 },
      { label: t('4: Khó'), value: 4 },
      { label: t('5: Khó và phức tạp'), value: 5 },
    ];
  }, [t]);

  const sizeOptions = useMemo(() => {
    return [
      { label: t('1: Nhỏ'), value: 1 },
      { label: t('2: Nhỏ vừa'), value: 2 },
      { label: t('3: Trung bình'), value: 3 },
      { label: t('4: Lớn'), value: 4 },
      { label: t('5: Rất lớn'), value: 5 },
    ];
  }, [t]);

  const difficultyOptions = useMemo(() => {
    return [
      { label: t('1: Dễ'), value: 1 },
      { label: t('2: Dễ vừa'), value: 2 },
      { label: t('3: Trung bình'), value: 3 },
      { label: t('4: Khó'), value: 4 },
      { label: t('5: Khó và phức tạp'), value: 5 },
    ];
  }, [t]);

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
      <Header title={t('Tạo kho báu')} />
      <CustomText style={styles.inputYourTerryInfofmationTitle}>
        {t('Điền các thông tin về kho báu của bạn')}
      </CustomText>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.terryInputContainer}>
                  <CustomInput
                    error={shouldDisplayError ? errors.name : ''}
                    onChangeText={text => setFieldValue('name', text, true)}
                    placeholder={t('Tên kho báu')}
                    value={values.name}
                  />
                </View>
                <View style={styles.terryInputContainer}>
                  <CustomInput
                    error={shouldDisplayError ? errors.hint : ''}
                    onChangeText={text => setFieldValue('hint', text, true)}
                    placeholder={t('Gợi ý về kho báu')}
                    numberOfLines={10}
                    multiline
                    value={values.hint}
                  />
                </View>

                <View style={styles.terryInputContainer}>
                  <CustomDropdownInput
                    options={categoryOptions as any}
                    onSelectOption={o => setFieldValue('category', o, true)}
                    selectedOption={values.category}
                    placeholder={t('Danh mục')}
                  />
                </View>
                <View style={styles.terryInputContainer}>
                  <CustomDropdownInput
                    options={terrianOptions}
                    onSelectOption={o => setFieldValue('terrain', o, true)}
                    selectedOption={values.terrain}
                    placeholder={t('Địa hình')}
                  />
                </View>
                <View style={styles.terryInputContainer}>
                  <CustomDropdownInput
                    options={sizeOptions}
                    onSelectOption={o => setFieldValue('size', o, true)}
                    selectedOption={values.size}
                    placeholder={t('Kích thước')}
                  />
                </View>
                <View style={styles.terryInputContainer}>
                  <CustomDropdownInput
                    options={difficultyOptions}
                    onSelectOption={o => setFieldValue('difficulty', o, true)}
                    selectedOption={values.difficulty}
                    placeholder={t('Độ khó')}
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
                  {values.photoUrls?.map((url, index) => {
                    return (
                      <View key={index} style={styles.photoItemContainer}>
                        <Image resizeMode="contain" source={{ uri: url }} style={styles.image} />
                        <TouchableOpacity
                          style={styles.dismissCircleIconButton}
                          onPress={() => removeImage(setFieldValue, values.photoUrls, url)}>
                          <DismissCircleIcon />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    clearError();
                    handleSubmit();
                  }}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  buttonType={EButtonType.SOLID}
                  title={t('Xác nhận')}
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

export default CreateNewTerryScreen;
