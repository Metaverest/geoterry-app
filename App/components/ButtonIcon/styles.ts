import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingVertical: rh(12),
    paddingHorizontal: rw(16),
    borderRadius: rh(39),
  },
  buttonText: {
    fontSize: rh(14),
    fontWeight: '600',
    color: EColor.color_FAFAFA,
    lineHeight: rh(24),
    textAlign: 'center',
  },
  loginButton: {},
});
