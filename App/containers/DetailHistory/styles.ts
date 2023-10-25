import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  title: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(76),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: rh(4),
  },
  ml4: {
    marginLeft: rw(4),
  },
  icon: {
    marginLeft: rw(16),
  },
  location: {
    color: EColor.color_CCCCCC,
    fontSize: rh(10),
    lineHeight: rh(16),
  },
  desc: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
  },
  containerDesc: {
    height: rh(191),
    width: '100%',
    backgroundColor: EColor.color_333333,
    marginTop: rh(24),
    marginHorizontal: rw(16),
    paddingHorizontal: rw(16),
    paddingVertical: rh(16),
    borderRadius: rh(12),
  },
  image: {
    width: rw(36),
    height: rh(36),
    borderRadius: rh(4),
    marginRight: rw(8),
  },
  containerImage: {
    width: '100%',
    marginTop: rh(16),
  },
  btn: {
    marginTop: rh(32),
  },
});
