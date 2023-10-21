import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(16),
  },
  content: {
    marginTop: rh(68),
  },
  avatarUser: {
    width: rw(72),
    height: rh(72),
    borderRadius: rh(11),
  },
  nameUser: {
    color: EColor.color_FAFAFA,
    fontSize: rh(16),
    fontWeight: '600',
    lineHeight: rh(24),
  },
  biography: {
    color: EColor.color_999999,
    fontSize: rh(12),
    fontWeight: '400',
    marginVertical: rh(4),
    lineHeight: rh(18),
  },
  contentRewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRewardPoints: {
    color: EColor.color_999999,
    fontSize: rh(12),
    fontWeight: '500',
    marginHorizontal: rw(4),
    lineHeight: rh(18),
  },
  points: {
    color: EColor.color_FAFAFA,
    fontSize: rh(12),
    fontWeight: '600',
    lineHeight: rh(18),
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: rh(18),
    fontWeight: '700',
    lineHeight: rh(26),
    marginTop: rh(32),
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: rh(24),
  },
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: rh(1) },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rh(24),
  },
  buttonContainer: {
    width: '48%',
  },
  buttonLogOut: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: rh(48),
    marginBottom: rh(8),
    backgroundColor: 'red',
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconLogOut: {
    marginRight: rw(16),
  },
  row: {
    flexDirection: 'row',
  },
  ml16: {
    marginLeft: rw(16),
  },
});
