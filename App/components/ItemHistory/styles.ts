import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: rw(12),
    paddingVertical: rh(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: rh(105),
    marginVertical: rh(12),
  },
  timeHistory: {
    color: EColor.color_CCCCCC,
    fontSize: rh(10),
    fontWeight: '400',
    lineHeight: rh(16),
  },
  title: {
    marginVertical: rh(2),
    fontSize: rh(16),
    fontWeight: '600',
    lineHeight: rh(24),
    color: EColor.color_FAFAFA,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ml4: {
    marginLeft: rw(4),
  },
  icon: {
    marginLeft: rw(16),
  },
  chevronRight: {
    transform: [{ rotate: '180deg' }],
  },
});
