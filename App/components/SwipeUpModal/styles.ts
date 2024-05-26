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
  mainContainer: {
    position: 'absolute',
    backgroundColor: EColor.color_0a0909,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: rw(32),
    borderTopRightRadius: rw(32),
  },
});
