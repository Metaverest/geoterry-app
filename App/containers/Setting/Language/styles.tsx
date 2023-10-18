import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },

  saveText: {
    color: EColor.white,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  listItemContainer: {
    marginTop: rh(68),
    rowGap: rh(4),
    width: '100%',
  },
  itemSelectorContainer: {},
});
