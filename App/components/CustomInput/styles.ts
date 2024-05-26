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
    backgroundColor: EColor.color_141313,
    borderRadius: rh(12),
  },
  input: {
    width: '80%',
    height: rh(50),
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    padding: rh(16),
    color: EColor.color_FAFAFA,
    fontFamily: 'Montserrat-Regular',
  },
  iconContainer: {
    width: '20%',
    paddingRight: rw(16),
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  title: {
    fontSize: rh(12),
    fontWeight: '500',
    color: EColor.color_666666,
    lineHeight: rh(18),
    marginBottom: rh(4),
  },
});
