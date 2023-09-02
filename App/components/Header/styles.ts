import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    paddingHorizontal: 16,
    elevation: 9999,
  },
  backButtonContainer: {
    width: wp('10'),
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: EColor.white,

    textAlign: 'center',
  },
  rightButtonContainer: {
    width: wp('10'),
  },
});
