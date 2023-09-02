import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import useClearError from 'App/hooks/useClearError';
import useGetErrorText from 'App/hooks/useGetErrorText';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { ICreateAccountDto } from 'App/types/redux';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OTPTextInput from 'react-native-otp-textinput';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';

const OTPScreen = () => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  const [otp, setOtp] = useState('');
  const registerData = useSelector(reduxSelector.getAppRegisterData);

  const submit = useCallback(() => {
    const submitData: Partial<ICreateAccountDto> = {
      ...registerData,
      code: otp,
      identifierType: EIdentifierType.PHONE_NUMBER,
      namespace: ENamespace.GEOTERRY_HUNTERS,
    };
    dispatch(sagaUserAction.createAccountAsync(submitData as ICreateAccountDto));
  }, [dispatch, otp, registerData]);
  const shouldDisableButton = useMemo(() => {
    return isEmpty(otp) || otp.length !== 4;
  }, [otp]);
  const { t } = useTranslation();
  const errorText = useGetErrorText();
  const clearError = useClearError();
  return (
    <CustomSafeArea style={styles.container}>
      <Header title="Xác thực OTP" />
      <CustomText style={styles.otpNotificationText}>{t('Mã OTP đã được gửi về số điện thoại của bạn')}</CustomText>
      <View style={styles.otpContainer}>
        <OTPTextInput
          handleTextChange={text => {
            clearError();
            setOtp(text);
          }}
          tintColor={EColor.color_FAFAFA}
          offTintColor={'transparent'}
          textInputStyle={styles.otpCell}
        />
      </View>
      {isEmpty(errorText) && seconds === 0 && (
        <TouchableOpacity style={styles.otpResendButtonContainer}>
          <CustomText style={styles.otpResendButtonText}>Gửi lại mã OTP</CustomText>
        </TouchableOpacity>
      )}
      {isEmpty(errorText) && seconds !== 0 && (
        <CustomText style={styles.otpResendAfterButtonText}>{`Gửi lại sau ${seconds}s`}</CustomText>
      )}
      {!isEmpty(errorText) && <CustomText style={styles.otpErrorText}>{errorText}</CustomText>}
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={submit}
          disabled={shouldDisableButton}
          linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
          buttonType={EButtonType.SOLID}
          title={t('Xác nhận')}
        />
      </View>
    </CustomSafeArea>
  );
};

export default OTPScreen;
