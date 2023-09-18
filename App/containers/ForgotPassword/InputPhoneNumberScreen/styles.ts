import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    marginTop: -171,
  },
  inputPhoneNumberSubTitle: {
    color: EColor.color_F2F2F2,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 68,
    alignSelf: 'flex-start',
  },
  phoneInputContainer: {
    width: '100%',
    marginTop: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
  },
});
