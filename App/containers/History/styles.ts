import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(16),
  },
  containHistory: {
    marginTop: rh(68),
    flex: 1,
  },
  separator: {
    backgroundColor: EColor.color_666666,
    height: rh(0.5),
    width: '100%',
  },
  textEmpty: {
    alignSelf: 'center',
    marginTop: rh(282),
    fontSize: rh(12),
    lineHeight: rh(18),
    color: EColor.color_F2F2F2,
  },
});
