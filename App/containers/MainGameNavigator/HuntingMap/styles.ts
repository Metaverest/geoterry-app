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
  arButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: rw(5),
    width: '100%',
    paddingHorizontal: rw(16),
    bottom: rh(8),
    rowGap: rh(4),
    marginBottom: rh(80),
  },
  footerButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: rw(5),
    width: '100%',
    paddingHorizontal: rw(16),
    bottom: rh(8),
    rowGap: rh(4),
    marginBottom: rh(24),
  },
  buttonContainer: {
    flex: 1,
  },
  rightButtonContainer: {
    flexDirection: 'row',
    columnGap: rw(16),
  },
});
