import { TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import Header from 'App/components/Header';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import CustomInputInformation from 'App/components/CustomInput/CustomInputInformation';
import CustomButton from 'App/components/Button';
import { EButtonType, EMediaType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { validateEmail } from 'App/helpers/validate';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { head, isEmpty, isString } from 'lodash';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { isValidPhoneNumber } from 'App/utils/string';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useClearError from 'App/hooks/useClearError';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import CustomImage from 'App/components/CustomImage';
import { EImageSize } from 'App/utils/images';

interface IFormValues {
  name: string;
  bio?: string;
  email?: string;
  phone?: string;
}

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    phone: Yup.string().test('is-valid-phone', t('Số điện thoại không hợp lệ. Ví dụ +84*********'), value => {
      if (isString(value)) {
        return isValidPhoneNumber(value!);
      }
      return true;
    }),
    email: Yup.string().test('is-valid-email', t('Định dạng email không đúng'), value => {
      if (isString(value)) {
        return validateEmail(value!);
      }
      return true;
    }),
  });
};
const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const clearError = useClearError();

  const initialValues: IFormValues = {
    name: user.displayName,
    bio: user.bio,
    email: user.email,
    phone: user.phoneNumber,
  };
  const openLibrary = useCallback(async () => {
    const response: ImagePickerResponse = await launchImageLibrary({ mediaType: EMediaType.PHOTO });
    if (response.assets) {
      dispatch(sagaUserAction.uploadAvatarProfileAsync(head(response.assets), navigation));
    }
  }, [dispatch, navigation]);
  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.name);
  }, []);
  const onSubmit = useCallback(
    async (values: IFormValues) => {
      if (isEmpty(values.name)) {
        return;
      }
      dispatch(
        sagaUserAction.updateProfileAsync(
          {
            displayName: values?.name as string,
            bio: values?.bio as string,
            phoneNumber: values.phone as string,
            email: values.email as string,
            logoUrl: user.logoUrl,
          },
          navigation,
          {
            onSuccess: () => navigation.dispatch(CommonActions.goBack()),
          },
        ),
      );
    },
    [dispatch, navigation, user.logoUrl],
  );

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Chỉnh sửa thông tin')} />
      <View style={styles.content}>
        {user.logoUrl ? (
          <CustomImage
            imageUrl={user.logoUrl}
            style={styles.avatarUser}
            resizeMode="cover"
            imageSize={EImageSize.SIZE_500}
          />
        ) : (
          <MapMarkerUserDefault width={rw(72)} height={rh(72)} />
        )}
        <TouchableOpacity onPress={openLibrary}>
          <CustomText style={styles.textUploadAvatar}>{t('Tải lên ảnh đại diện')}</CustomText>
        </TouchableOpacity>
        <View style={styles.contentInfor}>
          <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
            {({ handleSubmit, values, setFieldValue, errors }) => {
              return (
                <>
                  <CustomInputInformation
                    title={t('Tên')}
                    placeholder={t('Thêm tên')}
                    value={values.name}
                    underline
                    onChangeText={text => setFieldValue('name', text, true)}
                  />
                  <CustomInputInformation
                    title={t('Bio')}
                    placeholder={t('Thêm Bio')}
                    value={values.bio}
                    underline
                    onChangeText={text => setFieldValue('bio', text, true)}
                    maxLength={40}
                  />
                  <CustomText style={styles.countCharacters}>{(values.bio && values.bio.length) || 0}/40</CustomText>
                  <CustomInputInformation
                    title={t('Số điện thoại')}
                    placeholder={t('Thêm số điện thoại')}
                    value={values.phone}
                    onChangeText={text => setFieldValue('phone', text, true)}
                    underline
                  />
                  {values.phone && errors.phone && <CustomText style={styles.errorAlert}>{errors.phone}</CustomText>}
                  <CustomInputInformation
                    title={t('Email')}
                    placeholder={t('Thêm email')}
                    value={values.email}
                    onChangeText={text => setFieldValue('email', text, true)}
                  />
                  {values.email && errors.email && <CustomText style={styles.errorAlert}>{errors.email}</CustomText>}

                  <CustomButton
                    customStyleContainer={styles.btn}
                    disabled={getShouldDisableButton(values)}
                    onPress={() => {
                      clearError();
                      handleSubmit();
                    }}
                    title={t('Lưu thay đổi')}
                    buttonType={EButtonType.SOLID}
                    linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default EditProfileScreen;
