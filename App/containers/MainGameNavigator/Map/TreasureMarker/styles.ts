import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    height: rh(26),
    width: rw(26),
  },
  subIconContainer: { position: 'absolute', bottom: -0, right: -0 },
  subIcon: {},
});
