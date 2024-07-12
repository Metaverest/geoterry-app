import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000080',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rw(16),
  },
  popupContainer: {
    width: '100%',
    backgroundColor: EColor.color_0a0909,
    borderRadius: rw(8),
    paddingVertical: rh(32),
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: rw(16),
    borderWidth: 1,
    borderColor: EColor.color_666666,
  },
  popupImage: {
    height: rh(94),
  },
  popupTitle: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(25),
    textAlign: 'center',
    marginBottom: rh(10),
  },
  popupSubtitle: {
    fontSize: rh(14),
    fontWeight: '400',
    lineHeight: rh(20),
    color: EColor.white,
    textAlign: 'center',
  },
  footerContainer: {
    width: '100%',
    marginTop: rh(24),
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
  },
  buttonContainerSingle: {
    width: '100%',
  },
  groupButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: rw(16),
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
  },
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: rw(1) },
});
