import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(16),
  },
  header: {
    flexDirection: 'row',
    paddingVertical: rh(14),
  },
  imgQR: {
    width: rw(178),
    height: rh(178),
  },
  boxImageQR: {
    paddingHorizontal: rw(25),
    paddingVertical: rh(25),
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: rh(17),
    marginTop: rh(91),
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: rh(16),
    fontWeight: '600',
    lineHeight: rh(24),
    color: EColor.color_FAFAFA,
    marginTop: rh(32),
  },
  nameUser: {
    color: EColor.color_FAFAFA,
    fontSize: rh(24),
    fontWeight: '700',
    lineHeight: rh(32),
    marginTop: rh(4),
  },
  button: {
    borderRadius: rh(8),
    paddingHorizontal: rw(8),
    paddingVertical: rh(8),
    alignItems: 'center',
    width: rw(168),
  },
  iconBtn: {
    marginBottom: rh(10),
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: rh(32),
    justifyContent: 'space-between',
  },
  image: {
    position: 'absolute',
    right: 0,
    transform: [{ rotate: '-90deg' }],
  },
});
