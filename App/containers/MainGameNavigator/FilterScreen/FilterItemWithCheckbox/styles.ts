import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  openedContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: EColor.color_666666,
  },
  closedContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: EColor.color_FAFAFA,
  },
  optionContainer: {
    paddingBottom: 16,
    gap: 16,
  },
  optionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  optionItemTitle: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: EColor.color_F2F2F2,
  },
});
