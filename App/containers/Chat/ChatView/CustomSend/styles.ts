import { StyleSheet } from 'react-native';
import { responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  btnSend: {
    width: rw(34),
    height: rw(34),
    borderRadius: rw(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
