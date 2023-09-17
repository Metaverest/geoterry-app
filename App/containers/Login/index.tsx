import CustomButton from 'App/components/Button';
import CustomInputPassword from 'App/components/CustomInput/CustomInputPassword';
import CustomInputPhoneNumber from 'App/components/CustomInput/CustomInputPhoneNumber';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EarthIcon } from 'App/components/image';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ENavigationScreen } from 'App/enums/navigation';
import useClearError from 'App/hooks/useClearError';
import useGetErrorText from 'App/hooks/useGetErrorText';
import useGetPrefixPhone from 'App/hooks/useGetPrefixPhone';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { isValidPhoneNumber } from 'App/utils/string';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';
import { CommonActions } from '@react-navigation/native';

interface IFormValues {
  phone: string;
  password: string;
}

const initialValues: IFormValues = {
  phone: '',
  password: '',
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    phone: Yup.string()
      .required(t('Số điện thoại không được để trống'))
      .test('is-valid-phone', t('Số điện thoại không hợp lệ'), value => isValidPhoneNumber(value)),
    password: Yup.string().required(t('Mật khẩu không được để trống')),
  });
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const errorText = useGetErrorText();
  const onSubmit = useCallback(
    async (values: IFormValues) => {
      if (isEmpty(values?.phone) || isEmpty(values?.password)) {
        return;
      }
      dispatch(
        sagaUserAction.loginAsync(
          {
            identifier: values?.phone as string,
            password: values?.password as string,
            namespace: ENamespace.GEOTERRY_HUNTERS,
            identifierType: EIdentifierType.PHONE_NUMBER,
          },
          navigation,
        ),
      );
    },
    [dispatch, navigation],
  );

  const goToRegister = useCallback(() => {
    navigation.navigate(ENavigationScreen.REGISTER_SCREEN);
  }, [navigation]);

  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.phone) || isEmpty(values.password);
  }, []);
  const { t } = useTranslation();
  const clearError = useClearError();
  const defaultPhonePrefix = useGetPrefixPhone();
  const goToForgotPassword = useCallback(() => {
    navigation.dispatch(CommonActions.navigate({ name: ENavigationScreen.FORGOT_PASSWORD_NAVIGATOR }));
  }, [navigation]);
  return (
    <CustomSafeArea style={styles.container}>
      <Header />
      <Image style={styles.image} source={EarthIcon} />
      <CustomText style={styles.createAccountTitle}>{t('Xin chào')}</CustomText>
      <CustomText style={styles.createAccountSubTitle}>
        {t('Chào mừng bạn đã quay trở lại, Terriana đã nhớ bạn rất nhiều.')}
      </CustomText>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ handleSubmit, values, submitCount, setFieldValue, errors }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.phoneInputContainer}>
                <CustomInputPhoneNumber
                  error={shouldDisplayError ? errors.phone : ''}
                  onChangeText={text => setFieldValue('phone', text, true)}
                  defaultPrefix={defaultPhonePrefix}
                  placeholder={t('Số điện thoại')}
                />
              </View>
              <View style={styles.passwordInputContainer}>
                <CustomInputPassword
                  error={shouldDisplayError ? errors.password || errorText : ''}
                  onChangeText={text => setFieldValue('password', text, true)}
                  placeholder={t('Mật khẩu')}
                />
              </View>
              <TouchableOpacity onPress={goToForgotPassword} style={styles.forgotPasswordContainer}>
                <CustomText style={styles.forgotPasswordText}>{t('Quên mật khẩu?')}</CustomText>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    clearError();
                    handleSubmit();
                  }}
                  disabled={getShouldDisableButton(values)}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  buttonType={EButtonType.SOLID}
                  title={t('Đăng nhập')}
                />
              </View>
            </>
          );
        }}
      </Formik>
      <View style={styles.footerContainer}>
        <CustomText style={styles.hasAccountText}>{t('Bạn chưa có tài khoản?')}</CustomText>
        <CustomText style={styles.loginText} onPress={goToRegister}>
          {t('Đăng ký.')}
        </CustomText>
      </View>
    </CustomSafeArea>
  );
};

export default LoginScreen;
