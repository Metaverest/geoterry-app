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
  text: {
    color: EColor.color_CCCCCC,
    marginBottom: rh(12),
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(14),
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
    marginTop: rh(16),
  },
  loginButtonContainer: {
    backgroundColor: 'white',
    padding: rw(8),
    borderRadius: rw(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
