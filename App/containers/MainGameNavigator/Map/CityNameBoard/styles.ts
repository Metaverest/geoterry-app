import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  cityNameContainer: {
    position: 'absolute',
    left: rw(36),
    top: rh(28),
    width: '70%',
  },
  cityName: {
    fontSize: rh(28),
    color: EColor.black,
    fontWeight: '700',
    width: '100%',
    textDecorationLine: 'underline',
  },
});
