import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EColor.color_1f1f1f,
    borderRadius: rh(12),
    height: rh(50),
  },
  prefixInput: {
    flexGrow: 1,
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: rw(16),
    paddingRight: rw(4),
  },
  divider: {
    width: 1,
    height: '30%',
    backgroundColor: EColor.color_999999,
  },
  phoneInput: {
    flexGrow: 30,
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
    fontFamily: 'Montserrat-Regular',
    paddingRight: rw(16),
    paddingLeft: rw(8),
  },
  helperText: {
    fontSize: rh(10),
    fontWeight: '400',
    lineHeight: rh(16),
    color: EColor.color_F2F2F2,
    marginLeft: rw(16),
    marginTop: rh(2),
  },
  errorText: {
    fontSize: rh(10),
    fontWeight: '400',
    lineHeight: rh(16),
    color: EColor.color_FF0B0B,
    marginLeft: rw(16),
    marginTop: rh(2),
  },
});
