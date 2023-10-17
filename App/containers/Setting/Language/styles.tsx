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
  listItemContainer: {
    marginTop: 68,
    rowGap: 4,
    width: '100%',
  },
  itemSelectorContainer: {},
});
