import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  textInput: {
    color: EColor.color_FAFAFA,
    fontSize: rh(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    paddingVertical: rh(8),
  },
  underline: {
    borderBottomWidth: rw(0.5),
    borderColor: EColor.color_666666,
  },
  titleInfor: {
    color: EColor.color_FAFAFA,
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
  },
  boxInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rh(8),
  },
  boxTitle: {
    width: rw(109),
    marginRight: rw(8),
  },
});
