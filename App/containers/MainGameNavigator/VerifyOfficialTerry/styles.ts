import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.transparent,
    flex: 1,
    alignItems: 'center',
  },
  flashContainer: {
    width: rw(50),
    height: rw(50),
    backgroundColor: EColor.black,
    borderRadius: rh(12),
    padding: rw(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: rh(12),
  },
  loading: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    top: '48%',
    position: 'absolute',
  },
  camera: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: rw(12),
    width: '90%',
    marginTop: '40%',
    marginBottom: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraFocus: {
    width: rw(240),
    height: rw(240),
    borderWidth: rw(2),
    borderColor: EColor.color_00FF00,
    borderRadius: rw(6),
  },
  notFoundText: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(24),
    color: EColor.white,
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    marginTop: '30%',
    width: '90%',
    alignItems: 'center',
  },
});
