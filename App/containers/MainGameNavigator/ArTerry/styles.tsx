import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  helloWorldTextStyle: {
    fontSize: rh(12),
    color: EColor.color_547AFF,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: rh(50),
    left: rw(20),
    padding: rw(10),
    backgroundColor: EColor.black,
    borderRadius: rw(5),
  },
  backButtonText: {
    color: EColor.white,
    fontSize: rh(18),
  },
});
