import { isIOSDevice } from 'App/helpers/common';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  image: {
    width: rw(44),
    height: rw(44),
    borderRadius: rh(11),
  },
  markerContainer: {
    padding: rh(12),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isIOSDevice() ? rw(60) : 0,
  },
  imageContainer: {
    width: rw(50),
    height: rw(50),
    paddingBottom: rw(0.5),
    borderRadius: rh(13),
    backgroundColor: EColor.color_51D5FF,
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygonContainer: {
    position: 'absolute',
    bottom: rh(5),
    elevation: -1,
    zIndex: -1,
  },
});
