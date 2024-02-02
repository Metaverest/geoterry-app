import { isIOSDevice } from 'App/helpers/common';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  image: {
    width: rw(25),
    height: rw(25),
    borderRadius: rh(8),
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
    borderRadius: rh(8.5),
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
  unknownText: {
    color: EColor.black,
    fontSize: rh(16),
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
