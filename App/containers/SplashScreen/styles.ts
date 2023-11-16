import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rh(187),
    marginBottom: rh(17),
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: rh(18),
    fontWeight: '700',
    lineHeight: rh(26),
  },
  logo: {
    width: rw(76),
    height: rw(76),
    borderRadius: rh(12),
  },
  containerImage: {
    width: rw(76),
    height: rw(76),
    borderRadius: rh(12),
    marginTop: rh(16),
    justifyContent: 'center',
  },
  textFooter: {
    fontSize: rh(10),
    lineHeight: rh(16),
    color: EColor.color_CCCCCC,
  },
});
