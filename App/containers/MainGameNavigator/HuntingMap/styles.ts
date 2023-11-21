import { StyleSheet } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  footerButtonContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: rw(16),
    bottom: rh(8),
    rowGap: rh(4),
  },
  buttonContainer: {
    width: '100%',
  },
});
