import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomInput from 'App/components/CustomInput';
import CustomDropdownInput, { ICustomDropdownOption } from 'App/components/CustomInput/CustomDropdownInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EButtonType, EMediaType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh } from 'App/helpers/common';
import useClearError from 'App/hooks/useClearError';
import DismissCircleIcon from 'App/media/DismissCircleIcon';
import ImageAddIcon from 'App/media/ImageAddIcon';
import { reduxSelector } from 'App/redux/selectors';
import { ITerryMetadataDto } from 'App/types/terry';
import { IUploadProfileResDto } from 'App/types/user';
import { requestUploadProfileImage } from 'App/utils/axios';
import { Formik, FormikErrors } from 'formik';
import { head, isEmpty } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';
import { EMainGameNavigatorParams, EMainGameScreen, ENavigationScreen, EPopUpModalType } from 'App/enums/navigation';
import CustomImage from 'App/components/CustomImage';
import { ScrollView } from 'react-native-gesture-handler';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { navigateToPopUpModal, PopUpModalParams } from 'App/utils/navigation';

interface IFormValues {
  name: string;
  hint: string;
  category: ICustomDropdownOption[];
  terrain?: ICustomDropdownOption;
  size?: ICustomDropdownOption;
  difficulty?: ICustomDropdownOption;
  photoUrls?: string[];
  description?: string;
}

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Tên kho báu không được để trống')),
    size: Yup.object().required(t('Kích thước kho báu không được để trống')),
    difficulty: Yup.object().required(t('Độ khó kho báu không được để trống')),
    terrain: Yup.object().required(t('Địa hình kho báu không được để trống')),
  });
};

const UpdateTerryScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const categories = useSelector(reduxSelector.getAppPublicCategories);

  const categoryOptions = useMemo(() => {
    return categories?.map(c => ({ label: c.name, value: c.id }));
  }, [categories]);

  const terrianOptions: ICustomDropdownOption[] = useMemo(() => {
    return [
      { label: `1: ${t('Dễ')}`, value: 1 },
      { label: `2: ${t('Dễ vừa')}`, value: 2 },
      { label: `3: ${t('Trung bình')}`, value: 3 },
      { label: `4: ${t('Khó')}`, value: 4 },
      { label: `5: ${t('Khó và phức tạp')}`, value: 5 },
    ];
  }, [t]);

  const sizeOptions: ICustomDropdownOption[] = useMemo(() => {
    return [
      { label: `1: ${t('Nhỏ')}`, value: 1 },
      { label: `2: ${t('Nhỏ vừa')}`, value: 2 },
      { label: `3: ${t('Trung bình')}`, value: 3 },
      { label: `4: ${t('Lớn')}`, value: 4 },
      { label: `5: ${t('Rất lớn')}`, value: 5 },
    ];
  }, [t]);

  const difficultyOptions: ICustomDropdownOption[] = useMemo(() => {
    return [
      { label: `1: ${t('Dễ')}`, value: 1 },
      { label: `2: ${t('Dễ vừa')}`, value: 2 },
      { label: `3: ${t('Trung bình')}`, value: 3 },
      { label: `4: ${t('Khó')}`, value: 4 },
      { label: `5: ${t('Khó và phức tạp')}`, value: 5 },
    ];
  }, [t]);

  const {
    params: { terry },
  } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.UPDATE_TERRY_SCREEN>>();
  const initialValues: IFormValues = {
    name: terry.name || '',
    hint: terry.hint || '',
    category:
      terry?.categoryIds?.map(id => categoryOptions?.find(e => e.value === id)!)?.filter(e => !isEmpty(e)) || [],
    terrain: terrianOptions.find(e => e.value === terry.metadata.terrain),
    size: sizeOptions.find(e => e.value === terry.metadata.size),
    difficulty: difficultyOptions.find(e => e.value === terry.metadata.difficulty),
    photoUrls: terry.photoUrls || [],
    description: terry.description || '',
  };
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isTerrainDropdownOpen, setIsTerrainDropdownOpen] = useState<boolean>(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);
  const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState<boolean>(false);
  const closeAllDropdowns = useCallback(() => {
    setIsCategoryDropdownOpen(false);
    setIsTerrainDropdownOpen(false);
    setIsSizeDropdownOpen(false);
    setIsDifficultyDropdownOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (values: IFormValues) => {
      const metadata: ITerryMetadataDto = {} as ITerryMetadataDto;
      if (values?.difficulty) {
        metadata.difficulty = Number(values?.difficulty?.value);
      }
      if (values?.terrain) {
        metadata.terrain = Number(values?.terrain?.value);
      }
      if (values?.size) {
        metadata.size = Number(values?.size?.value);
      }
      dispatch(
        sagaUserAction.builderUpdateTerryAsync(
          {
            terryId: terry.id,
            name: values.name,
            description: values.description,
            hint: values.hint,
            categoryIds: values.category.map(c => String(c.value)),
            photoUrls: values.photoUrls,
            metadata,
          },
          navigation,
          { t },
        ),
      );
    },
    [dispatch, navigation, t, terry.id],
  );

  const getShouldDisableButton = useCallback((formValues: IFormValues) => {
    return (
      isEmpty(formValues.name) ||
      isEmpty(formValues.terrain) ||
      isEmpty(formValues.difficulty) ||
      isEmpty(formValues.size)
    );
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

  const handleRemoveTerry = useCallback(
    (terryId: string) => {
      navigateToPopUpModal(navigation, {
        ...PopUpModalParams[EPopUpModalType.CONFIRM_DELETE_TERRY],
        closeModalBeforeActiom: true,
        onConfirm: () => {
          dispatch(sagaUserAction.builderDeleteTerryAsync(terryId, navigation, { t }));
        },
      });
    },
    [dispatch, navigation, t],
  );

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <Header title={t('Cập nhật kho báu')} />
              <CustomText style={styles.inputYourTerryInfofmationTitle}>
                {t('Bạn không thể thay đổi được vị trí của kho báu!')}
              </CustomText>
              <View style={styles.inputContainer}>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ rowGap: rh(20) }}>
                  <View style={styles.terryInputContainer}>
                    <CustomInput
                      title={t('Tên kho báu')}
                      error={shouldDisplayError ? errors.name : ''}
                      onChangeText={text => setFieldValue('name', text, true)}
                      placeholder={t('Nhập tên kho báu')}
                      value={values.name}
                    />
                  </View>
                  <View style={styles.terryInputContainer}>
                    <CustomInput
                      title={t('Mô tả kho báu')}
                      error={shouldDisplayError ? errors.hint : ''}
                      onChangeText={text => setFieldValue('description', text, true)}
                      placeholder={t('Nhập mô tả')}
                      numberOfLines={10}
                      multiline
                      value={values.description}
                    />
                  </View>
                  <View style={styles.terryInputContainer}>
                    <CustomInput
                      title={t('Gợi ý')}
                      error={shouldDisplayError ? errors.hint : ''}
                      onChangeText={text => setFieldValue('hint', text, true)}
                      placeholder={t('Nhập gợi ý')}
                      numberOfLines={10}
                      multiline
                      value={values.hint}
                    />
                  </View>

                  <CustomDropdownInput
                    id="category"
                    title={t('Danh mục')}
                    zIndex={40}
                    zIndexInverse={10}
                    options={categoryOptions as any}
                    setFieldValue={setFieldValue}
                    selectedOption={values.category}
                    placeholder={t('Chọn danh mục')}
                    canSelectMultiple
                    open={isCategoryDropdownOpen}
                    setOpen={value => {
                      closeAllDropdowns();
                      setIsCategoryDropdownOpen(value);
                    }}
                  />

                  <CustomDropdownInput
                    id="terrain"
                    title={t('Địa hình')}
                    zIndex={30}
                    zIndexInverse={20}
                    options={terrianOptions}
                    selectedOption={values.terrain ? [values.terrain] : []}
                    placeholder={t('Chọn địa hình')}
                    setFieldValue={setFieldValue}
                    open={isTerrainDropdownOpen}
                    setOpen={value => {
                      closeAllDropdowns();
                      setIsTerrainDropdownOpen(value);
                    }}
                  />

                  <CustomDropdownInput
                    id="size"
                    title={t('Kích thước')}
                    zIndex={20}
                    zIndexInverse={30}
                    options={sizeOptions}
                    selectedOption={values.size ? [values.size] : []}
                    placeholder={t('Chọn kích thước')}
                    setFieldValue={setFieldValue}
                    open={isSizeDropdownOpen}
                    setOpen={value => {
                      closeAllDropdowns();
                      setIsSizeDropdownOpen(value);
                    }}
                  />

                  <CustomDropdownInput
                    id="difficulty"
                    title={t('Độ khó')}
                    zIndex={10}
                    zIndexInverse={40}
                    options={difficultyOptions}
                    selectedOption={values.difficulty ? [values.difficulty] : []}
                    placeholder={t('Chọn độ khó')}
                    setFieldValue={setFieldValue}
                    open={isDifficultyDropdownOpen}
                    setOpen={value => {
                      closeAllDropdowns();
                      setIsDifficultyDropdownOpen(value);
                    }}
                  />
                  <View style={styles.terryAddImageContainer}>
                    <CustomButtonIcon
                      onPress={() => handleAddImage(setFieldValue, values.photoUrls)}
                      buttonColor={EColor.color_333333}
                      customStyleContainer={styles.addImagebuttonContainer}
                      buttonType={EButtonType.SOLID}
                      renderIcon={<ImageAddIcon />}
                    />
                    <ScrollView horizontal>
                      {values.photoUrls?.map((url, index) => {
                        return (
                          <View key={index} style={styles.photoItemContainer}>
                            <CustomImage imageUrl={url} resizeMode="cover" style={styles.image} />
                            <TouchableOpacity
                              style={styles.dismissCircleIconButton}
                              onPress={() => removeImage(setFieldValue, values.photoUrls, url)}>
                              <DismissCircleIcon />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </ScrollView>
              </View>
              <View style={[styles.buttonContainer]}>
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

                <CustomButton
                  customStyleContainer={{ marginTop: rh(16) }}
                  onPress={() => {
                    clearError();
                    handleRemoveTerry(terry.id);
                  }}
                  linearGradient={[EColor.color_FF0B0B, EColor.color_FF5454]}
                  buttonType={EButtonType.SOLID}
                  title={t('Xoá kho báu')}
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

export default UpdateTerryScreen;
