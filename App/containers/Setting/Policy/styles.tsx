import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  policyContent: {
    color: EColor.color_FAFAFA,
    fontWeight: '400',
    lineHeight: 18,
    fontSize: 12,
  },
  policyContainer: {
    marginTop: 68,
  },
});
