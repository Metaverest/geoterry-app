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
  inputYourTerryInfofmationTitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    marginTop: rh(68),
    alignSelf: 'flex-start',
  },
  terryInputContainer: {
    width: '100%',
    marginTop: rh(16),
  },
  buttonContainer: {
    width: '100%',
    marginTop: rh(32),
    position: 'absolute',
    bottom: rh(29),
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
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    maxHeight: rh(600),
    zIndex: 1,
  },
  photoItemContainer: {},
  image: {
    height: rh(48),
    width: rh(48),
    borderRadius: rw(4),
  },
  dismissCircleIconButton: {
    position: 'absolute',
    top: rh(0),
    right: rw(0),
  },
});
