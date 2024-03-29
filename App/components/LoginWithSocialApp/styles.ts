import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  loginContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneTapLoginContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: rw(10),
  },
  googleLogin: {
    borderRadius: rh(20),
  },
  appleButton: {
    width: rh(36),
    height: rh(36),
  },
  text: {
    color: EColor.color_CCCCCC,
    marginBottom: rh(12),
  },
  seperator: {
    width: '30%',
    borderWidth: rh(1),
    height: 0,
    marginTop: rh(6),
    borderBottomColor: EColor.color_CCCCCC,
  },
  textContainer: {
    flexDirection: 'row',
    gap: rw(5),
  },
});
