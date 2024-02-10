import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: rw(20),
  },
  aboutContent: {
    color: EColor.color_FAFAFA,
    fontWeight: '400',
    lineHeight: rh(18),
    fontSize: rh(12),
  },
  aboutHeadline: {
    marginVertical: rh(15),
    color: EColor.color_FAFAFA,
    fontWeight: '600',
    lineHeight: rh(18),
    fontSize: rh(14),
  },
  aboutContainer: {
    marginTop: rh(68),
  },
  mb50: {
    marginBottom: rh(50),
  },
});
