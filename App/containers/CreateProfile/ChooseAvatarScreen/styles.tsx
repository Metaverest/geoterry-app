import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  uploadAvatarTitle: {
    color: EColor.color_FAFAFA,
    fontSize: rh(24),
    fontWeight: '600',
    lineHeight: rh(32),
    marginTop: rh(190),
    textAlign: 'center',
  },
  avatarIconContainer: {
    marginTop: rh(38),
  },

  skipText: {
    color: EColor.white,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  groupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rh(70),
    width: '100%',
    zIndex: 999,
    elevation: 999,
  },
  buttonContainer: {
    width: '48%',
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: rh(24),
  },
  image: {
    width: rw(148),
    height: rw(148),
    borderRadius: rw(74),
  },
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 },
});
