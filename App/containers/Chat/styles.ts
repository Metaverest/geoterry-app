import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(16),
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: rh(105),
    marginVertical: rh(12),
  },
  content: {
    flex: 1,
    borderBottomWidth: rh(0.5),
    borderColor: EColor.color_999999,
    paddingVertical: rh(14),
  },
  containList: {
    marginTop: rh(68),
    flex: 1,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: rh(48),
    width: rh(48),
    borderRadius: rh(48),
    marginRight: rw(16),
    overflow: 'hidden',
  },
  avatarDefault: {
    borderRadius: rh(48),
    marginRight: rw(16),
    overflow: 'hidden',
  },
  name: {
    fontSize: rh(16),
    fontWeight: '600',
    lineHeight: rh(24),
    color: EColor.color_FAFAFA,
    marginBottom: rh(4),
  },
  containerLastMsg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotUnRead: {
    width: rh(6),
    height: rh(6),
    borderRadius: rh(6),
    marginRight: rw(4),
  },
  msg: {
    fontSize: rh(10),
    lineHeight: rh(16),
    color: EColor.color_999999,
  },
  fontW500: {
    fontWeight: '500',
  },
  dot: {
    width: rh(2),
    height: rh(2),
    borderRadius: rh(2),
    backgroundColor: EColor.color_999999,
    marginHorizontal: rw(4),
  },
});
