import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.transparent,
    flex: 1,
    alignItems: 'center',
  },
  flashContainer: {
    width: rw(50),
    height: rw(50),
    backgroundColor: EColor.black,
    borderRadius: rh(12),
    padding: rw(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(18),
  },
  qrCodeContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  qrCodeCameraContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: EColor.color_00000080,
  },
});
