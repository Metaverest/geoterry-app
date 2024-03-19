import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {},
  textInputContainer: {
    backgroundColor: EColor.color_333333,
    borderRadius: rh(12),
    borderWidth: 0,
  },
  textInputContainerOpen: {
    borderWidth: rw(1),
    borderColor: EColor.color_CCCCCC,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 0,
  },
  itemContainer: {
    backgroundColor: EColor.color_333333,
    paddingVertical: rh(16),
    paddingHorizontal: rw(16),
    borderBottomWidth: rh(1),
    borderBottomColor: EColor.color_666666,
    flexDirection: 'row',
    columnGap: rw(16),
  },
  itemText: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_CCCCCC,
  },
  bodyComponentContainer: {},
  bodyComponentText: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_666666,
    backgroundColor: 'transparent',
    paddingHorizontal: rh(6),
  },
  dropDownContainer: {
    borderRadius: 0,
    borderBottomRightRadius: rw(16),
    marginTop: rh(0),
    padding: rw(4),
    backgroundColor: EColor.color_333333,
    borderBottomLeftRadius: rw(16),
    borderWidth: rw(1),
    borderTopWidth: 0,
    borderColor: EColor.color_CCCCCC,
  },
  title: {
    fontSize: rh(12),
    fontWeight: '500',
    color: EColor.color_666666,
    lineHeight: rh(18),
    marginBottom: rh(4),
  },
});
