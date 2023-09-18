import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: 76,

    alignSelf: 'flex-start',
  },
  subTitle: {
    color: EColor.color_F2F2F2,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  footerText: {
    marginTop: 33.5,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: EColor.color_F2F2F2,
  },

  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  image: {
    marginTop: 34,
  },
});
