import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  modal: {
    marginHorizontal: rw(24),
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: rh(20),
    lineHeight: rh(30),
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    color: EColor.color_CCCCCC,
    fontSize: rh(14),
    lineHeight: rh(20),
    textAlign: 'center',
    marginTop: rh(4),
    marginBottom: rh(24),
  },
  container: {
    backgroundColor: EColor.color_0a0909,
    borderRadius: rh(8),
    paddingHorizontal: rw(16),
    paddingVertical: rh(32),
  },
  btnSubmit: {
    marginTop: rh(24),
  },
});
