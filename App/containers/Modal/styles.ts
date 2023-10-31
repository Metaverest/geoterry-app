import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000080',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rw(16),
  },
  popupContainer: {
    width: '100%',
    backgroundColor: EColor.color_666666,
    borderRadius: rw(8),
    paddingVertical: rh(32),
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  popupImage: {
    height: rh(94),
  },
  popupTitle: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(25),
    textAlign: 'center',
  },
  popupSubtitle: {
    fontSize: rh(14),
    fontWeight: '400',
    lineHeight: rh(20),
    color: EColor.white,
    textAlign: 'center',
  },
  footerContainer: {
    width: '100%',
    marginTop: rh(24),
  },
  buttonContainer: {
    width: '100%',
  },
});
