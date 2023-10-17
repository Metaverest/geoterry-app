import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  saveText: {
    color: EColor.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  chooseRuleTitle: {
    width: '100%',
    fontSize: 12,
    fontWeight: '400',
    color: EColor.color_F2F2F2,
    lineHeight: 18,
    marginTop: 68,
    textAlign: 'left',
  },
  listItemContainer: {
    marginTop: 16,
    rowGap: 4,
    width: '100%',
  },
  itemSelectorContainer: {},
});
