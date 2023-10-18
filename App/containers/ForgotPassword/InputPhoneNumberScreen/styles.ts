import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  image: {
    marginTop: -rh(171),
  },
  inputPhoneNumberSubTitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    marginTop: rh(68),
    alignSelf: 'flex-start',
  },
  phoneInputContainer: {
    width: '100%',
    marginTop: rh(16),
  },
  buttonContainer: {
    width: '100%',
    marginTop: rh(32),
  },
});
