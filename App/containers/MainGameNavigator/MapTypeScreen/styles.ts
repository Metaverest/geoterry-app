import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: 32,
    width: '100%',
  },
  itemContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemImageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: EColor.color_FAFAFA,
    marginLeft: 16,
  },

  itemImage: {
    width: 68,
    height: 68,
    backgroundColor: EColor.color_171717,
  },
  separator: {
    backgroundColor: EColor.color_FAFAFA,
    height: 0.5,
    width: '100%',
  },
});
