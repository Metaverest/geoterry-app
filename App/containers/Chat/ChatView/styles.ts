import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containList: {
    marginTop: rh(80),
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: rh(60),
    marginVertical: rh(20),
    marginHorizontal: rh(16),
  },
  inputToolBarContainer: {
    paddingHorizontal: rw(16),
    justifyContent: 'flex-start',
    borderTopWidth: 0,
    paddingBottom: rh(24),
    backgroundColor: 'transparent',
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
    marginRight: rw(5),
  },
  day: {
    fontWeight: '400',
    fontSize: rh(10),
    marginTop: rh(14),
    marginBottom: rh(6),
    lineHeight: rh(16),
  },
});
