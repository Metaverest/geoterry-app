import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cityNameContainer: {
    position: 'absolute',
    left: 36,
    top: 28,
    width: '70%',
  },
  cityName: {
    fontSize: 28,
    color: EColor.black,
    fontWeight: '700',
    width: '100%',
  },
});
