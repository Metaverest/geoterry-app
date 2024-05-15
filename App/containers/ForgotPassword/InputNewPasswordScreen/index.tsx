import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomInputPassword from 'App/components/CustomInput/CustomInputPassword';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import useClearError from 'App/hooks/useClearError';
import useGetErrorText from 'App/hooks/useGetErrorText';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';
import { AppBackgroundImage } from 'App/components/image';

interface IFormValues {
  password: string;
  confirmPassword: string;
}

const initialValues: IFormValues = {
  password: '',
  confirmPassword: '',
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    password: Yup.string().required(t('Mật khẩu không được để trống')).min(8, 'Mật khẩu quá ngắn'),
    confirmPassword: Yup.string()
      .required(t('Nhập lại mật khẩu không được để trống'))
      .oneOf([Yup.ref('password')], t('Mật khẩu không khớp')),
  });
};

const InputNewPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onSubmit = useCallback(
    async (values: IFormValues) => {
      dispatch(sagaUserAction.accountRecoverAsync(values.password, navigation));
    },
    [navigation, dispatch],
  );
  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.password) || isEmpty(values.confirmPassword);
  }, []);

  const { t } = useTranslation();
  const clearError = useClearError();

  const requestErrorText = useGetErrorText();

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Đặt lại mật khẩu')} />
      <CustomText style={styles.inputPhoneNumberSubTitle}>{t('Đặt lại mật khẩu mới của bạn')}</CustomText>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
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
                  error={shouldDisplayError ? errors.confirmPassword || requestErrorText : ''}
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

export default InputNewPasswordScreen;
