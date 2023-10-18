import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    marginTop: 68,
  },
  avatarUser: {
    width: 72,
    height: 72,
    borderRadius: 11,
    marginBottom: 16,
  },
  nameUser: {
    color: EColor.color_FAFAFA,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  biography: {
    color: EColor.color_999999,
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 4,
    lineHeight: 18,
  },
  contentRewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRewardPoints: {
    color: EColor.color_999999,
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 4,
    lineHeight: 18,
  },
  points: {
    color: EColor.color_FAFAFA,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  title: {
    color: EColor.color_FAFAFA,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: 32,
  },
  customOutlineButtonText: {
    color: EColor.color_FAFAFA,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  buttonContainer: {
    width: '48%',
  },
  buttonLogOut: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginBottom: 8,
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconLogOut: {
    marginRight: 16,
  },
});
