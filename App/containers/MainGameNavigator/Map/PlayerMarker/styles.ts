import { isIOSDevice } from 'App/helpers/common';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  image: {
    width: rw(25),
    height: rw(25),
    borderRadius: rh(10),
  },
  markerContainer: {
    padding: rh(12),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isIOSDevice() ? rw(55) : 0,
  },
  imageContainer: {
    width: rw(30),
    height: rw(30),
    borderRadius: rh(10),
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
