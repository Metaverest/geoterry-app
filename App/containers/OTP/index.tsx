import CustomButton from 'App/components/Button';
import Header from 'App/components/Header';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { ICreateAccountDto } from 'App/types/redux';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OTPTextInput from 'react-native-otp-textinput';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';

const OTPScreen = ({ navigation }) => {
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
  const [error] = useState('');
  const registerData = useSelector(reduxSelector.getAppRegisterData);

  const submit = useCallback(() => {
    const submitData: Partial<ICreateAccountDto> = {
      ...registerData,
      code: otp,
      identifierType: EIdentifierType.PHONE_NUMBER,
      namespace: ENamespace.GEOTERRY_HUNTERS,
    };
    console.log(submitData);
    dispatch(sagaUserAction.createAccountAsync(submitData as ICreateAccountDto));
  }, [dispatch, otp, registerData]);
  const shouldDisableButton = useMemo(() => {
    return isEmpty(otp) || otp.length !== 4;
  }, [otp]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header title="Xác thực OTP" navigation={navigation} />
        <Text style={styles.otpNotificationText}>Mã OTP đã được gửi về số điện thoại của bạn</Text>
        <View style={styles.otpContainer}>
          <OTPTextInput
            handleTextChange={setOtp}
            tintColor={EColor.color_FAFAFA}
            offTintColor={'transparent'}
            textInputStyle={styles.otpCell}
          />
        </View>
        {isEmpty(error) && seconds === 0 && (
          <TouchableOpacity style={styles.otpResendButtonContainer}>
            <Text style={styles.otpResendButtonText}>Gửi lại mã OTP</Text>
          </TouchableOpacity>
        )}
        {isEmpty(error) && seconds !== 0 && (
          <Text style={styles.otpResendAfterButtonText}>{`Gửi lại sau ${seconds}s`}</Text>
        )}
        {!isEmpty(error) && <Text style={styles.otpErrorText}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={submit}
            disabled={shouldDisableButton}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            buttonType={EButtonType.SOLID}
            title="Xác nhận"
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default OTPScreen;
