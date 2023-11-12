import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: rh(28),
    fontWeight: '700',
    lineHeight: rh(36),
    marginTop: rh(76),

    alignSelf: 'flex-start',
  },
  subTitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(16),
    fontWeight: '400',
    lineHeight: rh(24),
    marginTop: rh(16),
    alignSelf: 'flex-start',
  },
  footerText: {
    marginTop: rh(33.5),
    fontSize: rh(14),
    fontWeight: '400',
    lineHeight: rh(20),
    color: EColor.color_F2F2F2,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: rh(36),
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: rh(24),
  },
  image: {
    marginTop: rh(34),
  },
  skipText: {
    color: EColor.white,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
