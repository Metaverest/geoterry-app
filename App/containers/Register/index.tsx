import CustomButton from 'App/components/Button';
import CustomInputPassword from 'App/components/CustomInput/CustomInputPassword';
import CustomInput from 'App/components/CustomInput/index';
import Header from 'App/components/Header';
import { EarthIcon } from 'App/components/image';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ENavigationScreen } from 'App/enums/navigation';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';
import { requestGetOTP } from 'App/utils/axios';
import { isEmpty } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
interface IInputError {
  phone: string;
  password: string;
  confirmPassword: string;
}
const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState<Partial<IInputError>>({
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const onPhoneChange = useCallback(
    (text: string) => {
      dispatch(reduxAppAction.setRegisterData({ identifier: text }));
    },
    [dispatch],
  );
  const onPasswordChange = useCallback(
    (text: string) => {
      dispatch(reduxAppAction.setRegisterData({ password: text }));
    },
    [dispatch],
  );
  const registerData = useSelector(reduxSelector.getAppRegisterData);
  const shouldDisableButton = useMemo(() => {
    return isEmpty(registerData?.identifier) || isEmpty(registerData?.password) || isEmpty(confirmPassword);
  }, [registerData, confirmPassword]);
  const validate = useCallback(() => {
    const draftError: Partial<IInputError> = {};
    if (isEmpty(registerData?.identifier)) {
      draftError.phone = 'Số điện thoại không được để trống';
    }
    if (isEmpty(registerData?.password)) {
      draftError.password = 'Mật khẩu không được để trống';
    }
    if (isEmpty(confirmPassword)) {
      draftError.confirmPassword = 'Mật khẩu không được để trống';
    }
    if (registerData?.password !== confirmPassword) {
      draftError.confirmPassword = 'Mật khẩu không trùng khớp!';
    }
    if ((registerData?.password?.length || 0) < 8) {
      draftError.password = 'Mật khẩu quá ngắn!';
    }
    console.log(registerData);
    console.log(draftError);
    setError(draftError);
    return draftError;
  }, [registerData, confirmPassword]);
  const onPressLoginButton = useCallback(async () => {
    const result = validate();
    if (isEmpty(result)) {
      try {
        const response = await requestGetOTP({
          identifier: registerData?.identifier || '',
          namespace: ENamespace.GEOTERRY_HUNTERS,
          identifierType: EIdentifierType.PHONE_NUMBER,
          isRecoverPassword: false,
        });
        console.log('reponse: ', response);
      } catch (err) {
        console.log(err);
      }
      navigation.navigate(ENavigationScreen.OTP_SCREEN);
    }
  }, [navigation, registerData, validate]);

  const goToLogin = useCallback(() => {
    navigation.navigate(ENavigationScreen.LOGIN_SCREEN);
  }, [navigation]);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Image style={styles.image} source={EarthIcon} />
        <Text style={styles.createAccountTitle}>Tạo tài khoản</Text>
        <Text style={styles.createAccountSubTitle}>
          Gia nhập cộng đồng Terriana để khám phá và thu thập kho báu của riêng bạn!
        </Text>
        <View style={styles.phoneInputContainer}>
          <CustomInput error={error.phone} onChangeText={onPhoneChange} placeholder="Số điện thoại" />
        </View>
        <View style={styles.passwordInputContainer}>
          <CustomInputPassword
            error={error.password}
            onChangeText={onPasswordChange}
            placeholder="Mật khẩu"
            helperText="Mật khẩu ít nhất 8 ký tự"
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <CustomInputPassword
            error={error.confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Nhập lại mật khẩu"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={onPressLoginButton}
            disabled={shouldDisableButton}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            buttonType={EButtonType.SOLID}
            title="Login"
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.hasAccountText}>Bạn đã có tài khoản?</Text>
          <Text style={styles.loginText} onPress={goToLogin}>
            Đăng nhập.
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
