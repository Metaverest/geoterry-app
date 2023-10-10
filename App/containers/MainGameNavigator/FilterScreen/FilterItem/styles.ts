import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  openedContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
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
    paddingVertical: 16,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: EColor.color_FAFAFA,
  },
  optionContainer: {
    paddingBottom: 16,
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
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: EColor.color_FAFAFA,
  },
  sliderContainer: {
    width: '100%',
    height: 12,
  },
  track: {
    backgroundColor: EColor.color_999999,
    height: 3,
  },
  marker: {
    backgroundColor: EColor.color_FAFAFA,
  },
  selectedStyle: {
    backgroundColor: EColor.color_FAFAFA,
  },
});
