import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.color_171717,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  uploadAvatarTitle: {
    color: EColor.color_FAFAFA,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    marginTop: 190,
    textAlign: 'center',
  },
  avatarIconContainer: {
    marginTop: 38,
  },

  skipText: {
    color: EColor.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  groupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    width: '100%',
    zIndex: 999,
    elevation: 999,
  },
  buttonContainer: {
    width: '48%',
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  image: {
    width: 148,
    height: 148,
    borderRadius: 74,
  },
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 },
});
