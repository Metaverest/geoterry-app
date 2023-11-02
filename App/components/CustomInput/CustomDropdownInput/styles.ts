import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: EColor.color_333333,
    borderRadius: rh(12),
    borderWidth: 0,
    marginTop: rh(16),
  },
  itemContainer: {
    backgroundColor: EColor.color_333333,
    paddingVertical: rh(16),
    paddingHorizontal: rw(16),
    borderBottomWidth: rh(1),
    borderBottomColor: EColor.color_666666,
  },
  itemText: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_CCCCCC,
  },
  bodyComponentContainer: {
    backgroundColor: EColor.color_333333,
  },
  bodyComponentText: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_666666,
    backgroundColor: 'transparent',
  },
  dropDownContainer: {
    borderRadius: rh(16),
    marginTop: rh(20),
    backgroundColor: EColor.color_333333,
  },
});
