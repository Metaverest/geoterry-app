import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: EColor.color_333333,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: EColor.color_FAFAFA,
    lineHeight: 24,
    textAlign: 'center',
    paddingVertical: 14,
  },
});
