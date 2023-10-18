import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: rh(4),
    paddingHorizontal: rw(16),
    borderRadius: rh(8),
    backgroundColor: EColor.color_333333,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: rh(16),
    fontWeight: '500',
    color: EColor.color_FAFAFA,
    lineHeight: rh(24),
    textAlign: 'center',
    paddingVertical: rh(14),
  },
});
