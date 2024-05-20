import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh } from 'App/helpers/common';

export const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontSize: rh(30),
    color: EColor.white,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
