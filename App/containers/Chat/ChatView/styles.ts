import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputToolBarContainer: {
    paddingHorizontal: rw(16),
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  textInputProps: {
    alignItems: 'center',
    minHeight: rh(34),
    backgroundColor: EColor.color_333333,
    borderRadius: rh(20),
    paddingHorizontal: rw(20),
    fontSize: rh(12),
    fontWeight: '500',
    color: EColor.color_FAFAFA,
    marginVertical: 0,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: rw(8),
    paddingBottom: rh(10),
    paddingTop: rh(10),
  },
  avatar: {
    width: rw(24),
    height: rw(24),
    borderRadius: rw(24),
    overflow: 'hidden',
  },
});
