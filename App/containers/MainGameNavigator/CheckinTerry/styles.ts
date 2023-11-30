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
  congratImage: {
    marginTop: rh(18),
  },
  checkInTitle: {
    color: EColor.color_FAFAFA,
    fontSize: rh(24),
    fontWeight: '700',
    lineHeight: rh(32),
    marginTop: rh(0),
    alignSelf: 'flex-start',
  },
  headerImage: {
    alignSelf: 'center',
  },
  checkInSubtitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    marginTop: rh(8),
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
  terryInputContainer: {
    width: '100%',
    marginTop: rh(16),
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: rh(26),
    zIndex: 999999,
    elevation: 999999,
  },
  addImagebuttonContainer: {
    paddingHorizontal: rh(12),
    paddingVertical: rh(12),
    borderRadius: rh(8),
  },
  terryAddImageContainer: {
    marginTop: rh(16),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    rowGap: rw(8),
    columnGap: rw(8),
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    maxHeight: rh(600),
    zIndex: 1,
    flex: 1,
    paddingBottom: rh(100),
  },
  photoItemContainer: {},
  image: {
    width: rw(48),
    height: rw(48),
    borderRadius: rw(4),
  },
  dismissCircleIconButton: {
    position: 'absolute',
    top: rw(2),
    right: rw(2),
  },
});
