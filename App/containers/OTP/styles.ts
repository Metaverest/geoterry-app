import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: rw(16),
  },
  otpCell: {
    backgroundColor: EColor.color_333333,
    borderRadius: rh(12),
    padding: 16,
    color: EColor.color_FAFAFA,
    fontSize: rh(16),
    fontWeight: '500',
    lineHeight: rh(24),
    height: rh(64),
    width: rw(60),
  },
  otpContainer: {
    marginTop: rh(24),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpNotificationText: {
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    color: EColor.color_F2F2F2,
    marginTop: rh(68),
    alignSelf: 'flex-start',
  },
  otpResendButtonContainer: {
    width: '100%',
    marginTop: rh(16),
  },
  otpResendAfterButtonText: {
    width: '100%',
    marginTop: rh(16),
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_F2F2F2,
  },
  otpErrorText: {
    width: '100%',
    marginTop: rh(16),
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    color: EColor.color_FF0B0B,
  },
  otpResendButtonText: {
    width: '100%',
    fontSize: rh(12),
    fontWeight: '600',
    lineHeight: rh(18),
    color: EColor.color_F2F2F2,
  },
  buttonContainer: {
    marginTop: rh(32),
    width: '100%',
  },
});
