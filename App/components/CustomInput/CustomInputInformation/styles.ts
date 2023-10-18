import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textInput: {
    color: EColor.color_FAFAFA,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    paddingVertical: 8,
  },
  underline: {
    borderBottomWidth: 0.5,
    borderColor: EColor.color_666666,
  },
  titleInfor: {
    color: EColor.color_FAFAFA,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  boxInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  boxTitle: {
    width: 109,
    marginRight: 8,
  },
});
