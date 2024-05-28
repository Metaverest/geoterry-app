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
  listItemContainer: {
    marginTop: rh(105),
    flex: 1,
    width: '100%',
  },
  menuItemMainAndActionButtonContainer: {
    flex: 1,
    borderBottomWidth: rw(1),
    borderBottomColor: EColor.color_999999,
    paddingVertical: rh(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: rw(24),
    alignItems: 'center',
    minHeight: rh(72),
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
    rowGap: rh(4),
  },
  menuItemTitle: {
    color: EColor.color_FAFAFA,
    fontSize: rh(15),
    fontWeight: '600',
    lineHeight: rh(24),
  },
  menuItemSubtitle: {
    color: EColor.color_999999,
    fontSize: rh(10),
    fontWeight: '400',
    lineHeight: rh(16),
  },
  menuItemIcon: {},
  menuItemActionButton: {},
  switchButtonContainer: {
    backgroundColor: 'red',
    borderRadius: rw(16),
    borderWidth: 1,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  swithButtonContainerEnable: {
    borderColor: EColor.color_FAFAFA,
    backgroundColor: EColor.color_0BFF6C,
  },
  switchButtonContainerDisable: {
    borderColor: EColor.color_999999,
    backgroundColor: EColor.color_141313,
  },
});
