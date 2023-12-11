/* eslint-disable max-lines */
import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomButtonIcon from 'App/components/ButtonIcon';
import CustomInput from 'App/components/CustomInput';
import CustomDropdownInput, { ICustomDropdownOption } from 'App/components/CustomInput/CustomDropdownInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { DEFAULT_LOCATION } from 'App/constants/common';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh } from 'App/helpers/common';
import useClearError from 'App/hooks/useClearError';
import AddressSelectionMarkerIcon from 'App/media/AddressSelectionMarkerIcon';
import DismissCircleIcon from 'App/media/DismissCircleIcon';
import ImageAddIcon from 'App/media/ImageAddIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { ITerryLocationDto, ITerryMetadataDto } from 'App/types/terry';
import { IUploadProfileResDto } from 'App/types/user';
import { requestUploadProfileImage } from 'App/utils/axios';
import { convertAddressObjectToString } from 'App/utils/convert';
import { Formik, FormikErrors } from 'formik';
import { head, isEmpty, isEqual } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';

interface IFormValues {
  name: string;
  hint: string;
  category: ICustomDropdownOption[];
  terrain?: ICustomDropdownOption;
  size?: ICustomDropdownOption;
  difficulty?: ICustomDropdownOption;
  photoUrls?: string[];
  address?: string;
  description?: string;
}

const initialValues: IFormValues = {
  name: '',
  hint: '',
  category: [],
  terrain: undefined,
  size: undefined,
  difficulty: undefined,
  photoUrls: [],
  address: '',
  description: '',
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    name: Yup.string().required(t('Tên kho báu không được để trống')),
  });
};

const CreateNewTerryScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [address, setAddress] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<IRealtimeLocation>(DEFAULT_LOCATION);
  const [terryLocation, setTerryLocation] = useState<ITerryLocationDto>(DEFAULT_LOCATION);
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
        sagaUserAction.builderCreateTerryAsync(
          {
            name: values.name,
            description: values.description,
            hint: values.hint,
            categoryIds: values.category.map(c => String(c.value)),
            photoUrls: values.photoUrls,
            isAvailable: true,
            location: { latitude: terryLocation.latitude, longitude: terryLocation.longitude },
            metadata: metadata,
            address: address,
          },
          navigation,
          { t: t },
        ),
      );
    },
    [navigation, dispatch, t, address, terryLocation],
  );
  const getShouldDisableButton = useCallback((formValues: IFormValues) => {
    return isEmpty(formValues.name);
  }, []);

  const clearError = useClearError();

  const categories = useSelector(reduxSelector.getAppPublicCategories);

  const categoryOptions = useMemo(() => {
    return categories?.map(c => ({ label: c.name, value: c.id }));
  }, [categories]);

  const terrianOptions: ICustomDropdownOption[] = useMemo(() => {
    return [
      { label: t('1: Dễ'), value: 1 },
      { label: t('2: Dễ vừa'), value: 2 },
      { label: t('3: Trung bình'), value: 3 },
      { label: t('4: Khó'), value: 4 },
      { label: t('5: Khó và phức tạp'), value: 5 },
    ];
  }, [t]);

  const sizeOptions: ICustomDropdownOption[] = useMemo(() => {
    return [
      { label: t('1: Nhỏ'), value: 1 },
      { label: t('2: Nhỏ vừa'), value: 2 },
      { label: t('3: Trung bình'), value: 3 },
      { label: t('4: Lớn'), value: 4 },
      { label: t('5: Rất lớn'), value: 5 },
    ];
  }, [t]);

  const difficultyOptions: ICustomDropdownOption[] = useMemo(() => {
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

  const onUserLocationChange = useCallback(
    (location: IRealtimeLocation) => {
      // Skip if current location is not default
      if (!currentLocation.isDefault) {
        return;
      }
      if (
        !isEqual(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        )
      ) {
        setCurrentLocation(location);
      }
    },
    [currentLocation],
  );
  useEffect(() => {
    if (!currentLocation.isDefault) {
      setTerryLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    (async () => {
      try {
        if (mapRef.current === null) {
          return;
        }
        const resAddress = await mapRef.current.addressForCoordinate({
          latitude: terryLocation.latitude,
          longitude: terryLocation.longitude,
        });
        if (resAddress.name) {
          setAddress(convertAddressObjectToString(resAddress));
        }
      } catch (error) {}
    })();
  }, [terryLocation]);

  const onDragMarkerEnd = useCallback((coordinate: LatLng) => {
    setTerryLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  }, []);

  return (
    <CustomSafeArea
      shouldDisableKeyboardAwareScroll
      style={styles.container}
      backgroundImageSource={AppBackgroundImage}>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <Header title={t('Tạo kho báu')} />
              <CustomText style={styles.inputYourTerryInfofmationTitle}>
                {t('Điền các thông tin về kho báu của bạn')}
              </CustomText>
              <View style={styles.inputContainer}>
                <ScrollView nestedScrollEnabled contentContainerStyle={{ rowGap: rh(20) }}>
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
                  <View style={styles.terryInputContainer}>
                    <CustomInput
                      editable={false}
                      title={t('Địa chỉ')}
                      error={shouldDisplayError ? errors.hint : ''}
                      placeholder={t('Nhập địa chỉ kho báu')}
                      value={address}
                    />
                  </View>
                  <View style={styles.mapContainer}>
                    <MapView
                      ref={mapRef}
                      region={{
                        ...DEFAULT_LOCATION,
                        latitude: terryLocation?.latitude || 0,
                        longitude: terryLocation?.longitude || 0,
                      }}
                      showsUserLocation={true}
                      onUserLocationChange={event => onUserLocationChange(event.nativeEvent.coordinate)}
                      style={styles.map}
                      initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}>
                      <Marker
                        draggable={true}
                        onDragEnd={event => onDragMarkerEnd(event.nativeEvent.coordinate)}
                        coordinate={{ latitude: terryLocation.latitude, longitude: terryLocation.longitude }}>
                        <AddressSelectionMarkerIcon />
                      </Marker>
                    </MapView>
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
              </View>
            </>
          );
        }}
      </Formik>
    </CustomSafeArea>
  );
};

export default CreateNewTerryScreen;
