import { StyleSheet } from 'react-native';
import { responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSeparator: {
    width: rw(2),
  },
  ml2: {
    marginLeft: rw(2),
  },
});
