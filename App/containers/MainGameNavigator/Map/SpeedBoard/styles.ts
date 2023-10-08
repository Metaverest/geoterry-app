import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    alignItems: 'center',
  },
  speedContainer: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: EColor.color_00000080,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    backgroundColor: EColor.white,
  },
  speedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: EColor.black,
  },
  unitText: {
    fontSize: 16,
    color: EColor.color_999999,
    marginLeft: 4,
  },
});
