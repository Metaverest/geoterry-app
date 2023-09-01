import CustomButton from 'App/components/Button';
import CustomInputPassword from 'App/components/CustomInput/CustomInputPassword';
import CustomInput from 'App/components/CustomInput/index';
import Header from 'App/components/Header';
import { EarthIcon } from 'App/components/image';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ENavigationScreen } from 'App/enums/navigation';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IFormValues {
  phone: string;
  password: string;
}

const initialValues: IFormValues = {
  phone: '',
  password: '',
};
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (values: IFormValues) => {
      if (isEmpty(values?.phone) || isEmpty(values?.password)) {
        return;
      }
      dispatch(
        sagaUserAction.loginAsync({
          identifier: values?.phone as string,
          password: values?.password as string,
          namespace: ENamespace.GEOTERRY_HUNTERS,
          identifierType: EIdentifierType.PHONE_NUMBER,
        }),
      );
    },
    [dispatch],
  );

  const goToRegister = useCallback(() => {
    navigation.navigate(ENavigationScreen.REGISTER_SCREEN);
  }, [navigation]);

  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.phone) || isEmpty(values.password);
  }, []);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Image style={styles.image} source={EarthIcon} />
      <Text style={styles.createAccountTitle}>{t('Xin chào')}</Text>
      <Text style={styles.createAccountSubTitle}>
        {t('Chào mừng bạn đã quay trở lại, Terriana đã nhớ bạn rất nhiều.')}
      </Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, values, submitCount, setFieldValue, errors }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.phoneInputContainer}>
                <CustomInput
                  error={shouldDisplayError ? errors.phone : ''}
                  onChangeText={text => setFieldValue('phone', text, true)}
                  placeholder="Số điện thoại"
                />
              </View>
              <View style={styles.passwordInputContainer}>
                <CustomInputPassword
                  error={shouldDisplayError ? errors.password : ''}
                  onChangeText={text => setFieldValue('password', text, true)}
                  placeholder="Mật khẩu"
                />
              </View>
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={handleSubmit}
                  disabled={getShouldDisableButton(values)}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  buttonType={EButtonType.SOLID}
                  title="Login"
                />
              </View>
            </>
          );
        }}
      </Formik>
      <View style={styles.footerContainer}>
        <Text style={styles.hasAccountText}>Bạn chưa có tài khoản?</Text>
        <Text style={styles.loginText} onPress={goToRegister}>
          Đăng ký.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
