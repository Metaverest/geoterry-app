import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(20),
  },
  policyContent: {
    color: EColor.color_FAFAFA,
    fontWeight: '400',
    lineHeight: rh(18),
    fontSize: rh(12),
  },
  policyHeadline: {
    marginVertical: rh(15),
    color: EColor.color_FAFAFA,
    fontWeight: '600',
    lineHeight: rh(18),
    fontSize: rh(14),
  },
  policyContainer: {
    marginTop: rh(68),
  },
  mb50: {
    marginBottom: rh(50),
  },
});
