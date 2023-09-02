import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 4,
    backgroundColor: EColor.color_00000080,
    borderRadius: 2,
  },
  selectedLanguageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 28,
    right: 0,
    borderRadius: 2,
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: EColor.color_00000080,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 17,
    height: 16,
  },
  itemText: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: '500',
    color: EColor.color_FAFAFA,
    lineHeight: 10,
  },
  triangleContainer: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: EColor.color_00000080, // Change the color as desired
    position: 'absolute',
    top: -4,
    right: 6,
  },
  triangle: {},
});
