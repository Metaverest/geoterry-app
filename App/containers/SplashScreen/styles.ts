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
  logo: {
    width: rw(150),
    height: rw(150),
  },
  textFooter: {
    fontSize: rh(10),
    lineHeight: rh(16),
    color: EColor.color_CCCCCC,
  },
});
