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
  title: {
    color: EColor.color_FAFAFA,
    fontSize: rh(24),
    fontWeight: '700',
    lineHeight: rh(32),
    marginTop: rh(7),
  },
  subTitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    marginTop: rh(9),
  },
  image: {
    marginTop: rh(42),
    height: rh(285),
    width: '100%',
  },
});
