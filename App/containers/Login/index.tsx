import CustomButton from 'App/components/Button';
import CustomInputPassword from 'App/components/CustomInput/CustomInputPassword';
import CustomInput from 'App/components/CustomInput/index';
import Header from 'App/components/Header';
import { EarthIcon } from 'App/components/image';
import { EButtonType, EIdentifierType, ENamespace } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ENavigationScreen } from 'App/enums/navigation';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { isEmpty } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
interface IInputError {
  phone: string;
  password: string;
  confirmPassword: string;
}
const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState<Partial<IInputError>>({
    phone: '',
    password: '',
    confirmPassword: '',
  });
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
    return isEmpty(registerData?.identifier) || isEmpty(registerData?.password);
  }, [registerData]);
  const validate = useCallback(() => {
    const draftError: Partial<IInputError> = {};
    if (isEmpty(registerData?.identifier)) {
      draftError.phone = 'Số điện thoại không được để trống';
    }
    if (isEmpty(registerData?.password)) {
      draftError.password = 'Mật khẩu không được để trống';
    }
    if ((registerData?.password?.length || 0) < 8) {
      draftError.password = 'Mật khẩu quá ngắn!';
    }
    console.log(registerData);
    console.log(draftError);
    setError(draftError);
    return draftError;
  }, [registerData]);
  const onPressLoginButton = useCallback(async () => {
    const result = validate();
    if (isEmpty(result)) {
      dispatch(
        sagaUserAction.loginAsync({
          identifier: registerData?.identifier as string,
          password: registerData?.password as string,
          namespace: ENamespace.GEOTERRY_HUNTERS,
          identifierType: EIdentifierType.PHONE_NUMBER,
        }),
      );
    }
  }, [validate, dispatch, registerData]);

  const goToRegister = useCallback(() => {
    navigation.navigate(ENavigationScreen.REGISTER_SCREEN);
  }, [navigation]);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Image style={styles.image} source={EarthIcon} />
        <Text style={styles.createAccountTitle}>Xin chào</Text>
        <Text style={styles.createAccountSubTitle}>Chào mừng bạn đã quay trở lại, Terriana đã nhớ bạn rất nhiều.</Text>
        <View style={styles.phoneInputContainer}>
          <CustomInput error={error.phone} onChangeText={onPhoneChange} placeholder="Số điện thoại" />
        </View>
        <View style={styles.passwordInputContainer}>
          <CustomInputPassword error={error.password} onChangeText={onPasswordChange} placeholder="Mật khẩu" />
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
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
          <Text style={styles.hasAccountText}>Bạn chưa có tài khoản?</Text>
          <Text style={styles.loginText} onPress={goToRegister}>
            Đăng ký.
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
