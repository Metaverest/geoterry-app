import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import { PopUpModalParams, navigateToPopUpModal } from 'App/utils/navigation';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { View } from 'react-native';
import React, { useCallback } from 'react';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { EIdentifierType } from 'App/enums';
import { EPopUpModalType } from 'App/enums/navigation';
import { useDispatch } from 'react-redux';
import { styles } from './styles';
import usePlatform from 'App/hooks/usePlatform';
import { useTranslation } from 'react-i18next';
import CustomText from '../CustomText';

GoogleSignin.configure();

const LoginWithSocialApp = ({ navigation }: { navigation: any }) => {
  const { isIOS } = usePlatform();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const signInWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        dispatch(
          sagaUserAction.loginAsync(
            {
              code: userInfo.idToken,
              identifierType: EIdentifierType.GOOGLE,
            },
            navigation,
          ),
        );
      } else {
        navigateToPopUpModal(navigation, PopUpModalParams[EPopUpModalType.CANNOT_LOGIN]);
      }
    } catch (error) {
      console.error('Error when login with Google account', error);
      navigateToPopUpModal(navigation, PopUpModalParams[EPopUpModalType.CANNOT_LOGIN]);
    }
  }, [dispatch, navigation]);

  const signInWithApple = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      if (appleAuthRequestResponse.identityToken) {
        dispatch(
          sagaUserAction.loginAsync(
            {
              code: appleAuthRequestResponse.identityToken,
              identifierType: EIdentifierType.APPLE,
              displayName: appleAuthRequestResponse.fullName
                ? `${appleAuthRequestResponse.fullName?.familyName} ${appleAuthRequestResponse.fullName?.givenName}`
                : undefined,
              nonce: appleAuthRequestResponse.nonce,
            },
            navigation,
          ),
        );
      } else {
        navigateToPopUpModal(navigation, PopUpModalParams[EPopUpModalType.CANNOT_LOGIN]);
      }
    } catch (error) {
      console.error('Error when login with Apple Id account', error);
      navigateToPopUpModal(navigation, PopUpModalParams[EPopUpModalType.CANNOT_LOGIN]);
    }
  }, [dispatch, navigation]);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.textContainer}>
        <View style={styles.seperator} />
        <CustomText style={styles.text}>{t('Hoặc tiếp tục với')}</CustomText>
        <View style={styles.seperator} />
      </View>

      <View style={styles.oneTapLoginContainer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          style={styles.googleLogin}
        />
        {isIOS && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            onPress={signInWithApple}
          />
        )}
      </View>
    </View>
  );
};

export default LoginWithSocialApp;
