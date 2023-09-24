import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    width: 44,
    height: 44,
    borderRadius: 11,
  },
  markerContainer: {
    padding: 12,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 11,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygonContainer: {
    position: 'absolute',
    bottom: -10,
    elevation: -1,
  },
});
