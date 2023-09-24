import { StyleSheet } from 'react-native';

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
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonRHNContainer: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },

  listButtonRHNContainer: {
    position: 'absolute',
    top: 36,
    right: 16,
  },
});
