import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(16),
  },
  content: {
    marginTop: rh(76),
    alignItems: 'center',
  },
  avatarUser: {
    width: rw(72),
    height: rw(72),
    borderRadius: rh(11),
    backgroundColor: EColor.color_141313,
  },
  textUploadAvatar: {
    marginTop: rh(8),
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
  },
  contentInfor: {
    marginTop: rh(16),
    width: '100%',
  },
  countCharacters: {
    color: EColor.color_666666,
    fontSize: rh(10),
    fontWeight: '500',
    lineHeight: rh(16),
    alignSelf: 'flex-end',
    marginTop: rh(2),
  },
  errorAlert: {
    fontSize: rh(10),
    fontWeight: '500',
    lineHeight: rh(16),
    color: EColor.color_FF0B0B,
  },
  btn: {
    marginTop: rh(24),
  },
});
