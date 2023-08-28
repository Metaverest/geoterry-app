import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.color_171717,
    height: hp('100'),
    width: wp('100'),
    paddingHorizontal: 16,
  },
  otpCell: {
    backgroundColor: EColor.color_333333,
    borderRadius: 12,
    padding: 16,
    color: EColor.color_FAFAFA,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    height: 64,
    width: 60,
  },
  otpContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpNotificationText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: EColor.color_F2F2F2,
    marginTop: 68,
    alignSelf: 'flex-start',
  },
  otpResendButtonContainer: {
    width: '100%',
    marginTop: 16,
  },
  otpResendAfterButtonText: {
    width: '100%',
    marginTop: 16,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: EColor.color_F2F2F2,
  },
  otpErrorText: {
    width: '100%',
    marginTop: 16,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: EColor.color_FF0B0B,
  },
  otpResendButtonText: {
    width: '100%',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    color: EColor.color_F2F2F2,
  },
  buttonContainer: {
    marginTop: 32,
    width: '100%',
  },
});
