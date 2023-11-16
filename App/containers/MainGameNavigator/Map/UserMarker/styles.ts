import { isIOSDevice } from 'App/helpers/common';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

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
    marginBottom: isIOSDevice() ? rh(55) : 0,
  },
  imageContainer: {
    width: rw(50),
    height: rw(50),
    borderRadius: rh(11),
    backgroundColor: 'red',
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
