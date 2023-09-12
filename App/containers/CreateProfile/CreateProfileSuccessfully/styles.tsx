import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.color_171717,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 7,
  },
  subTitle: {
    color: EColor.color_F2F2F2,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 9,
  },
  image: {
    marginTop: 42,
    height: 285,
    width: '100%',
  },
});
