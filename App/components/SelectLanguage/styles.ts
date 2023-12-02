import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: rh(4),
    backgroundColor: EColor.color_00000080,
    borderRadius: rh(2),
  },
  selectedLanguageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: rh(33),
    right: 0,
    borderRadius: rh(2),
    gap: rh(4),
    paddingVertical: rh(4),
    paddingHorizontal: rw(4),
    backgroundColor: EColor.color_00000080,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: rw(17),
    height: rh(16),
    marginVertical: rh(2),
  },
  itemText: {
    fontSize: rh(8),
    marginLeft: rw(4),
    fontWeight: '500',
    color: EColor.color_FAFAFA,
    lineHeight: rh(10),
    textTransform: 'uppercase',
  },
  triangleContainer: {
    width: 0,
    height: 0,
    borderLeftWidth: rw(5),
    borderRightWidth: rw(5),
    borderBottomWidth: rh(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: EColor.color_00000080, // Change the color as desired
    position: 'absolute',
    top: -rh(4),
    right: rw(6),
  },
  triangle: {},
});
