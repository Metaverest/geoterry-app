import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  main: {
    width: wp('100'),
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 999,
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
