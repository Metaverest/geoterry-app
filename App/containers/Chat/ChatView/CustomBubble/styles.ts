import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  containerBubble: {
    paddingVertical: rh(8),
    paddingHorizontal: rw(8),
    borderRadius: rh(12),
  },
  textMsg: {
    color: EColor.color_FAFAFA,
    fontSize: rh(12),
    lineHeight: rh(18),
  },
});
