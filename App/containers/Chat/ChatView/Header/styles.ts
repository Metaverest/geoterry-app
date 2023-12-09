import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: rh(52),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    paddingHorizontal: rw(16),
    elevation: 9999,
  },
  backButtonContainer: {
    zIndex: 10,
    elevation: 10,
  },
  avatar: {
    width: rw(36),
    height: rw(36),
    borderRadius: rw(36),
    marginHorizontal: rw(16),
    overflow: 'hidden',
  },
  name: {
    fontSize: rh(16),
    fontWeight: '600',
    lineHeight: rh(24),
    color: EColor.color_FAFAFA,
  },
});
