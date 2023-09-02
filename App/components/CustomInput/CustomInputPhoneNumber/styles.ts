import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EColor.color_333333,
    borderRadius: 12,
    height: 50,
  },
  prefixInput: {
    flexGrow: 1,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: EColor.color_FAFAFA,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 16,
    paddingRight: 4,
  },
  divider: {
    width: 1,
    height: '30%',
    backgroundColor: EColor.color_999999,
  },
  phoneInput: {
    flexGrow: 30,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: EColor.color_FAFAFA,
    fontFamily: 'Montserrat-Regular',
    paddingRight: 16,
    paddingLeft: 8,
  },
  helperText: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    color: EColor.color_F2F2F2,
    marginLeft: 16,
    marginTop: 2,
  },
  errorText: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    color: EColor.color_FF0B0B,
    marginLeft: 16,
    marginTop: 2,
  },
});
