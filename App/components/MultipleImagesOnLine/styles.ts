import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  iconArrowMaximize: {
    position: 'absolute',
    right: rw(4),
    bottom: rh(4),
  },
  image: {
    width: rw(48),
    height: rw(48),
    borderRadius: rw(5),
  },
  lastImage: {
    position: 'absolute',
    backgroundColor: EColor.color_00000070,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rw(5),
  },
  textLastImage: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.white,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  dismissCircleIconButton: {
    position: 'absolute',
    top: rw(2),
    right: rw(6),
  },
});
