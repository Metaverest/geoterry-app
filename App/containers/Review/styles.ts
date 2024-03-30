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
    width: rw(36),
    height: rw(36),
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: rh(36),
    marginRight: rw(14),
  },
  containerItem: {
    flexDirection: 'row',
    borderBottomWidth: rh(0.5),
    paddingVertical: rh(8),
    borderColor: EColor.color_666666,
    paddingRight: rw(2),
    paddingBottom: rh(12),
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: rh(105),
    marginVertical: rh(12),
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
    marginVertical: rh(8),
  },
  image: {
    width: rw(48),
    height: rw(48),
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: rh(4),
    marginRight: rw(8),
  },
  flex: {
    flex: 1,
  },
  rating: {
    marginTop: rh(8),
  },
  containerItemImageStyle: {
    marginRight: rw(8),
    borderRadius: rw(5),
  },
  avatarDefault: {
    borderRadius: rh(36),
    marginBottom: rh(65),
    marginRight: rw(14),
    overflow: 'hidden',
  },
});
