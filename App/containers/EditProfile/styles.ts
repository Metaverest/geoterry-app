import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    marginTop: 76,
    alignItems: 'center',
  },
  avatarUser: {
    width: 72,
    height: 72,
    borderRadius: 11,
    marginBottom: 8,
  },
  textUploadAvatar: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: EColor.color_FAFAFA,
  },
  contentInfor: {
    marginTop: 16,
    width: '100%',
    marginBottom: 24,
  },
  countCharacters: {
    color: EColor.color_666666,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  errorAlert: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    color: EColor.color_FF0B0B,
  },
});
