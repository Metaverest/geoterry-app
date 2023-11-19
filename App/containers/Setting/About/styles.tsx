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
  aboutContent: {
    color: EColor.color_FAFAFA,
    fontWeight: '400',
    lineHeight: rh(18),
    fontSize: rh(12),
    textAlign: 'justify',
  },
  aboutContainer: {
    marginTop: rh(68),
  },
});
