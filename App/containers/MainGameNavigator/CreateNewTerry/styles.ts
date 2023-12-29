import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
    paddingBottom: rh(48) + rh(32) + rh(30),
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
  },
  buttonContainer: {
    width: '100%',
    paddingTop: rh(32),
    paddingBottom: rh(30),
    position: 'absolute',
    zIndex: 999,
    elevation: 999,
    bottom: 0,
  },
  addImagebuttonContainer: {
    paddingHorizontal: rh(16),
    paddingVertical: rh(16),
    borderRadius: rh(8),
  },
  terryAddImageContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    rowGap: rw(8),
    columnGap: rw(8),
  },
  inputContainer: {
    zIndex: 1,
    rowGap: rh(20),
    marginTop: rh(16),
    flex: 1,
  },
  photoItemContainer: {
    borderWidth: 1,
    borderRadius: rw(5),
    borderColor: EColor.color_333333,
    backgroundColor: EColor.color_00000080,
    marginHorizontal: rw(4),
    width: rw(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  mapContainer: {
    backgroundColor: 'red',
    height: rh(344),
    borderRadius: rw(16),
    zIndex: 9,
    elevation: 9,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: rw(16),
  },
});
