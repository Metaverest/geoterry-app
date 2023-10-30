import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(16),
  },
  containList: {
    marginTop: rh(52),
    flex: 1,
  },
  textEmpty: {
    alignSelf: 'center',
    marginTop: rh(282),
    fontSize: rh(12),
    lineHeight: rh(18),
    color: EColor.color_F2F2F2,
  },
  avatar: {
    width: rw(56),
    height: rh(56),
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: rh(56),
    marginRight: rw(14),
  },
  containerItem: {
    flexDirection: 'row',
    borderBottomWidth: rh(0.5),
    paddingVertical: rh(16),
    borderColor: EColor.color_666666,
  },
  name: {
    fontSize: rh(14),
    fontWeight: '500',
    lineHeight: rh(20),
    color: EColor.color_CCCCCC,
  },
  time: {
    color: EColor.color_999999,
    fontSize: rh(10),
    lineHeight: rh(16),
    marginTop: rh(2),
  },
  desc: {
    color: EColor.color_FAFAFA,
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    marginTop: rh(8),
  },
  image: {
    width: rw(48),
    height: rh(48),
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: rh(4),
    marginRight: rw(8),
    marginTop: rh(8),
  },
  flex: {
    flex: 1,
  },
});
