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
  },
  input: {
    width: '80%',
    height: 50,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    padding: 16,
    color: EColor.color_CCCCCC,
  },
  iconContainer: {
    width: '20%',

    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
