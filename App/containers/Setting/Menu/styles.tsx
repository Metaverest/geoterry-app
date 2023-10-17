import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  listItemContainer: {
    marginTop: 68,
    flex: 1,
    width: '100%',
  },
  menuItemMainAndActionButtonContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: EColor.color_999999,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    alignItems: 'center',
    minHeight: 72,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  menuItemMain: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    rowGap: 4,
  },
  menuItemTitle: {
    color: EColor.color_FAFAFA,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  menuItemSubtitle: {
    color: EColor.color_999999,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
  },
  menuItemIcon: {},
  menuItemActionButton: {},
  switchButtonContainer: {
    backgroundColor: 'red',
    borderRadius: 16,
    borderWidth: 1,
  },
  swithButtonContainerEnable: {
    borderColor: EColor.color_FAFAFA,
    backgroundColor: EColor.color_0BFF6C,
  },
  switchButtonContainerDisable: {
    borderColor: EColor.color_999999,
    backgroundColor: EColor.color_333333,
  },
});
