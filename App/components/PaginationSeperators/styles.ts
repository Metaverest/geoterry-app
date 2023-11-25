import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  dot: {
    width: rw(8),
    height: rw(8),
    borderColor: EColor.color_F2F2F2,
    borderWidth: rw(1),
    borderRadius: rh(8),
    marginLeft: rw(8),
  },
  containerDots: { flexDirection: 'row', justifyContent: 'center', marginLeft: rw(-8) },
});
