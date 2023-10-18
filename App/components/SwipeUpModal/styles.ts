import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

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
  main: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: rw(16),
    paddingTop: rh(16),
    paddingBottom: rh(32),
  },
  headerLine: {
    width: rw(48),
    height: rh(1),
    marginVertical: rh(8),
    backgroundColor: EColor.color_FAFAFA,
  },
  headerTitle: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(16),
    textAlign: 'center',
  },
});
