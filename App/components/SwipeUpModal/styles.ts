import { EColor } from 'App/enums/color';
import { responsiveByWidth as rw } from 'App/helpers/common';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,

    margin: 0,
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    borderTopLeftRadius: rw(32),
    borderTopRightRadius: rw(32),
  },
  mainContainer: {
    position: 'absolute',
    backgroundColor: EColor.color_171717,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: rw(32),
    borderTopRightRadius: rw(32),
  },
});
