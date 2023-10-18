import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  image: {
    position: 'absolute',
    bottom: 0,
  },
  createProfileTitle: {
    color: EColor.color_FAFAFA,
    fontSize: rh(28),
    fontWeight: '700',
    lineHeight: rh(36),
    marginTop: rh(116),
    textAlign: 'center',
  },
  createProfileSubTitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    textAlign: 'center',
    marginTop: rh(9),
  },
  displayNameContainer: {
    width: '100%',
    marginTop: rh(36),
  },
  passwordInputContainer: {
    width: '100%',
    marginTop: rh(16),
  },
  buttonContainer: {
    width: '100%',
    marginTop: rh(36),
  },
  footerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: rh(36),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
