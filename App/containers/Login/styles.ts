import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.color_171717,
    paddingHorizontal: rw(16),
  },
  mainContainer: {
    flex: 1,
  },
  image: {
    marginTop: -rh(171),
    left: rw(100),
  },
  createAccountTitle: {
    color: EColor.color_FAFAFA,
    fontSize: rh(28),
    fontWeight: '700',
    lineHeight: rh(36),
    marginTop: rh(20),
    textAlign: 'center',
  },
  createAccountSubTitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    textAlign: 'center',
    marginTop: rh(9),
  },
  phoneInputContainer: {
    width: '100%',
    marginTop: rh(28),
  },
  passwordInputContainer: {
    width: '100%',
    marginTop: rh(16),
  },
  buttonContainer: {
    width: '100%',
    marginTop: rh(33),
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: rh(36),
  },
  hasAccountText: {
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    color: EColor.color_CCCCCC,
  },
  loginText: {
    fontSize: rh(12),
    fontWeight: '600',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
    marginLeft: rw(2),
  },
  forgotPasswordContainer: {
    marginTop: rh(16),
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: rh(10),
    fontWeight: '500',
    lineHeight: rh(16),
    color: EColor.color_F2F2F2,
    width: '100%',
    textAlign: 'right',
  },
  oneTapLoginContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogin: {
    borderRadius: rh(20),
  },
});
