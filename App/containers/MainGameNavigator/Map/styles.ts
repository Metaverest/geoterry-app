import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  listButtonFooterContainer: {
    position: 'absolute',
    bottom: rw(16),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 12,
    borderRadius: rh(8),
    marginHorizontal: rw(8),
  },
  buttonRHNContainer: {
    padding: 8,
    borderRadius: rh(8),
    marginVertical: rh(8),
  },
  listButtonRHNContainer: {
    position: 'absolute',
    top: rh(36),
    right: rw(16),
  },
});
