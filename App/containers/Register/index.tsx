import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomInputPassword from 'App/components/CustomInput/CustomInputPassword';
import CustomInputPhoneNumber from 'App/components/CustomInput/CustomInputPhoneNumber';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import { EarthIcon } from 'App/components/image';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ENavigationScreen } from 'App/enums/navigation';
import useClearError from 'App/hooks/useClearError';
import useGetErrorText from 'App/hooks/useGetErrorText';
import useGetPrefixPhone from 'App/hooks/useGetPrefixPhone';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { ICreateAccountDto } from 'App/types/user';
import { isValidPhoneNumber } from 'App/utils/string';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';

interface IFormValues {
  password: string;
  confirmPassword: string;
  phone: string;
}

const initialValues: IFormValues = {
  password: '',
  confirmPassword: '',
  phone: '',
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    phone: Yup.string()
      .required(t('Số điện thoại không được để trống'))
      .test('is-valid-phone', t('Số điện thoại không hợp lệ'), value => isValidPhoneNumber(value)),
    password: Yup.string().required(t('Mật khẩu không được để trống')).min(8, 'Mật khẩu quá ngắn!'),
    confirmPassword: Yup.string()
      .required(t('Nhập lại mật khẩu không được để trống'))
      .oneOf([Yup.ref('password')], t('Mật khẩu không khớp')),
  });
};

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onSubmit = useCallback(
    async (values: IFormValues) => {
      const submitData: Partial<ICreateAccountDto> = {
        identifier: values.phone,
        namespace: ENamespace.GEOTERRY_HUNTERS,
        identifierType: EIdentifierType.PHONE_NUMBER,
        password: values.password,
      };

      dispatch(sagaUserAction.getOTPAsync(submitData as ICreateAccountDto, navigation));
    },
    [navigation, dispatch],
  );
  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.phone) || isEmpty(values.password) || isEmpty(values.confirmPassword);
  }, []);

  const goToLogin = useCallback(() => {
    navigation.dispatch(CommonActions.navigate({ name: ENavigationScreen.LOGIN_SCREEN }));
  }, [navigation]);

  const { t } = useTranslation();
  const clearError = useClearError();

  const errorText = useGetErrorText();

  const defaultPhonePrefix = useGetPrefixPhone();

  return (
    <CustomSafeArea shouldUseKeyboardAwareScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={EarthIcon} />
        <CustomText style={styles.createAccountTitle}>{t('Tạo tài khoản')}</CustomText>
        <CustomText style={styles.createAccountSubTitle}>
          {t('Gia nhập cộng đồng Checkly để khám phá và thu thập kho báu của riêng bạn!')}
        </CustomText>
        <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
          {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
            const shouldDisplayError = submitCount > 0;
            return (
              <>
                <View style={styles.phoneInputContainer}>
                  <CustomInputPhoneNumber
                    defaultPrefix={defaultPhonePrefix}
                    error={shouldDisplayError ? errors.phone : ''}
                    onChangeText={text => setFieldValue('phone', text, true)}
                    placeholder={t('Số điện thoại')}
                  />
                </View>
                <View style={styles.passwordInputContainer}>
                  <CustomInputPassword
                    error={shouldDisplayError ? errors.password : ''}
                    onChangeText={text => setFieldValue('password', text, true)}
                    placeholder={t('Mật khẩu')}
                    helperText={t('Mật khẩu ít nhất 8 ký tự')}
                    value={values.password}
                  />
                </View>
                <View style={styles.passwordInputContainer}>
                  <CustomInputPassword
                    error={shouldDisplayError ? errors.confirmPassword || errorText : ''}
                    onChangeText={text => setFieldValue('confirmPassword', text, true)}
                    placeholder={t('Nhập lại mật khẩu')}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    onPress={() => {
                      clearError();
                      handleSubmit();
                    }}
                    linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                    buttonType={EButtonType.SOLID}
                    title={t('Tạo tài khoản')}
                    disabled={getShouldDisableButton(values)}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
      <View style={styles.footerContainer}>
        <CustomText style={styles.hasAccountText}>{t('Đã có tài khoản?')}</CustomText>
        <CustomText style={styles.loginText} onPress={goToLogin}>
          {t('Đăng nhập.')}
        </CustomText>
      </View>
    </CustomSafeArea>
  );
};

export default RegisterScreen;
