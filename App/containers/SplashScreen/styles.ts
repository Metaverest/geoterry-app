import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    marginTop: rh(187),
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: rh(18),
    fontWeight: '700',
    lineHeight: rh(26),
  },
  logo: {
    width: rw(76),
    height: rh(76),
    borderRadius: rh(12),
  },
  containerImage: {
    width: rw(76),
    height: rh(76),
    borderRadius: rh(12),
    marginTop: rh(16),
  },
});
