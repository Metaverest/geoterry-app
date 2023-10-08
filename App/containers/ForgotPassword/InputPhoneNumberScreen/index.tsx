import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomInputPhoneNumber from 'App/components/CustomInput/CustomInputPhoneNumber';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
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
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { styles } from './styles';
import { AppBackgroundImage } from 'App/components/image';

interface IFormValues {
  phone: string;
}

const initialValues: IFormValues = {
  phone: '',
};

const getValidateSchema = (t: (e: string) => string) => {
  return Yup.object().shape({
    phone: Yup.string()
      .required(t('Số điện thoại không được để trống'))
      .test('is-valid-phone', t('Số điện thoại không hợp lệ'), value => isValidPhoneNumber(value)),
  });
};

const InputPhoneNumberScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onSubmit = useCallback(
    async (values: IFormValues) => {
      const submitData: Partial<ICreateAccountDto> = {
        identifier: values.phone,
        namespace: ENamespace.GEOTERRY_HUNTERS,
        identifierType: EIdentifierType.PHONE_NUMBER,
      };

      dispatch(sagaUserAction.getOTPAsync(submitData as ICreateAccountDto, navigation, { isRecoverPassword: true }));
    },
    [navigation, dispatch],
  );
  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.phone);
  }, []);

  const { t } = useTranslation();
  const clearError = useClearError();

  const errorText = useGetErrorText();

  const defaultPhonePrefix = useGetPrefixPhone();
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Quên mật khẩu')} />
      <CustomText style={styles.inputPhoneNumberSubTitle}>{t('Vui lòng nhập số điện thoại của bạn.')}</CustomText>
      <Formik initialValues={initialValues} validationSchema={getValidateSchema(t)} onSubmit={onSubmit}>
        {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.phoneInputContainer}>
                <CustomInputPhoneNumber
                  defaultPrefix={defaultPhonePrefix}
                  error={shouldDisplayError ? errors.phone || errorText : ''}
                  onChangeText={text => setFieldValue('phone', text, true)}
                  placeholder={t('Số điện thoại')}
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
                  title={t('Gửi OTP')}
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

export default InputPhoneNumberScreen;
