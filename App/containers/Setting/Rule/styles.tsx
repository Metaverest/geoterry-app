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
  containerRoot: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  saveText: {
    color: EColor.color_666666,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  saveTextHighlight: {
    color: EColor.white,
  },
  chooseRuleTitle: {
    width: '100%',
    fontSize: rh(12),
    fontWeight: '400',
    color: EColor.color_F2F2F2,
    lineHeight: rh(18),
    marginTop: rh(68),
    textAlign: 'left',
  },
  listItemContainer: {
    marginTop: rh(16),
    rowGap: rh(4),
    width: '100%',
  },
  itemSelectorContainer: {},
});
