import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    marginTop: rh(16),
    width: '100%',
    paddingHorizontal: rw(16),
  },
  itemImageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontSize: rh(14),
    fontWeight: '600',
    lineHeight: rh(20),
    color: EColor.color_FAFAFA,
    marginLeft: rw(16),
  },
  itemImage: {
    width: rw(68),
    height: rh(68),
    backgroundColor: EColor.color_0a0909,
  },
  separator: {
    backgroundColor: EColor.color_FAFAFA,
    height: rh(0.5),
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(16),
    paddingTop: rh(32),
    paddingBottom: rh(16),
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
  customOutlineButtonContainer: { borderColor: EColor.color_FAFAFA, borderStyle: 'solid', borderWidth: rw(1) },
  headerTitle: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(16),
    textAlign: 'center',
  },
  headerLineSwipeContainer: {
    alignSelf: 'center',
  },
});
