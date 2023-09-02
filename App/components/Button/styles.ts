import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 39,
  },
  buttonText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '600',
    color: EColor.color_FAFAFA,
    lineHeight: 24,
    textAlign: 'center',
  },
  loginButton: {},
});
