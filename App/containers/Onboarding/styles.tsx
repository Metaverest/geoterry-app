import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  main: {
    width: wp('100'),
    paddingHorizontal: rw(16),
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginTop: rh(12),
    paddingHorizontal: rw(16),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 999,
  },
  onBoardingTitle: {
    fontWeight: '700',
    fontSize: rh(28),
    color: EColor.white,
    textAlign: 'center',
    width: '100%',
    marginTop: rh(67.58),
  },
  image: {
    backgroundColor: 'transparent',
  },
  onBoardingSubTitle: {
    fontWeight: '400',
    fontSize: rh(14),
    color: EColor.color_CCCCCC,
    textAlign: 'center',
    width: '100%',
    marginTop: rh(9),
  },
  createAccountButton: {
    width: '100%',
    marginTop: rh(36),
  },
  loginButton: {
    marginTop: rh(16),
    width: '100%',
  },
  loginButtonCustomContainerStyle: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 },
});
