import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  openedContainer: {
    backgroundColor: 'transparent',
    paddingVertical: rh(16),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: EColor.color_666666,
  },
  closedContainer: {
    backgroundColor: 'transparent',
    paddingVertical: rh(16),
    width: '100%',
  },
  title: {
    fontSize: rh(14),
    fontWeight: '600',
    lineHeight: rh(20),
    color: EColor.color_FAFAFA,
  },
  optionContainer: {
    paddingBottom: rh(16),
  },
  slider: {
    width: '100%',
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: rh(2),
  },
  value: {
    fontSize: rh(14),
    fontWeight: '500',
    lineHeight: rh(20),
    color: EColor.color_FAFAFA,
  },
  sliderContainer: {
    height: rh(12),
  },
  track: {
    backgroundColor: EColor.color_999999,
    height: rh(3),
    borderRadius: rh(12),
  },
  marker: {
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: rh(12),
    width: rw(12),
    height: rh(12),
  },
  selectedStyle: {
    backgroundColor: EColor.color_FAFAFA,
  },
  multiSliderContainer: {
    width: '100%',
    height: rh(12),
    paddingHorizontal: rw(10),
  },
});
