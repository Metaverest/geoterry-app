import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.color_171717,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    marginTop: -171,
  },
  createAccountTitle: {
    color: EColor.color_FAFAFA,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: 20,
    textAlign: 'center',
  },
  createAccountSubTitle: {
    color: EColor.color_F2F2F2,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 9,
  },
  phoneInputContainer: {
    width: '100%',
    marginTop: 28,
  },
  passwordInputContainer: {
    width: '100%',
    marginTop: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 28,
  },
  footerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hasAccountText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: EColor.color_CCCCCC,
  },
  loginText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    color: EColor.color_FAFAFA,
    marginLeft: 2,
  },
});
