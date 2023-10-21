import { StyleSheet } from 'react-native';
import { isIOSDevice, responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    height: rh(26),
    width: rw(26),
  },
  subIconContainer: { position: 'absolute', bottom: -0, right: -0 },
  subIcon: {},
  image: {
    width: rw(44),
    height: rh(44),
    borderRadius: rh(11),
  },
  markerContainer: {
    padding: rh(12),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isIOSDevice() ? rh(44) : 0,
  },
  imageContainer: {
    width: rw(40),
    height: rh(40),
    borderRadius: rh(11),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygonContainer: {
    position: 'absolute',
    bottom: rh(7),
    elevation: -1,
    zIndex: -1,
  },
  selectedSubIconContainer: { position: 'absolute', bottom: rh(3), right: rw(3) },
  terryIconContainer: {
    backgroundColor: EColor.white,
    paddingHorizontal: rw(6),
    paddingVertical: rh(6),
    borderRadius: rh(7),
  },
});
