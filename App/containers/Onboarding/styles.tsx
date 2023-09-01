import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.color_171717,
    height: hp('100'),
    width: wp('100'),
  },
  main: {
    width: wp('100'),
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  onBoardingTitle: {
    fontWeight: '700',
    fontSize: 28,
    color: EColor.white,
    textAlign: 'center',
    width: '100%',

    marginTop: 67.58,
  },
  image: {
    backgroundColor: 'transparent',
  },
  onBoardingSubTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: EColor.color_CCCCCC,
    textAlign: 'center',
    width: '100%',
    marginTop: 9,
  },
  createAccountButton: {
    width: '100%',
    marginTop: 36,
  },
  loginButton: {
    marginTop: 16,
    width: '100%',
  },
  loginButtonCustomContainerStyle: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 },
});
