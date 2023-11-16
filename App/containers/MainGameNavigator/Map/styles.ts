import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

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
  containerNumberOfFilter: {
    position: 'absolute',
    right: 0,
    top: rh(-10),
    backgroundColor: EColor.color_171717,
    width: rw(24),
    height: rw(24),
    borderRadius: rw(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNumberOfFilter: {
    color: EColor.white,
    fontWeight: '600',
    lineHeight: rh(20),
    fontSize: rw(14),
  },
});
