import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: rh(16),
    width: '100%',
    paddingHorizontal: rw(16),
  },
  itemContainer: {
    paddingVertical: rh(12),
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
    fontSize: rh(14),
    fontWeight: '600',
    lineHeight: rh(20),
    color: EColor.color_FAFAFA,
    marginLeft: rw(16),
  },
  itemImage: {
    width: rw(68),
    height: rh(68),
    backgroundColor: EColor.color_171717,
  },
  separator: {
    backgroundColor: EColor.color_FAFAFA,
    height: 0.5,
    width: '100%',
  },
  headerLineSwipeContainer: {
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(16),
    textAlign: 'center',
  },
});
