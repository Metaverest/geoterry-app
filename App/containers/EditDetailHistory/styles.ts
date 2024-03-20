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
  mainContainer: { flex: 1 },
  congratImage: {
    marginTop: rh(18),
  },
  checkInTitle: {
    color: EColor.color_FAFAFA,
    fontSize: rh(24),
    fontWeight: '700',
    lineHeight: rh(32),
    marginTop: rh(0),
    alignSelf: 'flex-start',
  },
  headerImage: {
    alignSelf: 'center',
  },
  checkInSubtitle: {
    color: EColor.color_F2F2F2,
    fontSize: rh(12),
    fontWeight: '400',
    lineHeight: rh(18),
    marginTop: rh(8),
    alignSelf: 'flex-start',
  },

  terryInputContainer: {
    marginTop: rh(16),
  },
  buttonContainer: {
    width: '100%',
    marginVertical: rh(26),
  },
  addImagebuttonContainer: {
    paddingHorizontal: rh(14),
    paddingVertical: rh(14),
    borderRadius: rh(8),
  },
  terryAddImageContainer: {
    marginTop: rh(16),
    flexDirection: 'row',
    columnGap: rw(4),
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    zIndex: 1,
    flex: 1,
    paddingBottom: rh(100),
  },
  image: {
    width: rw(48),
    height: rw(48),
    borderRadius: rw(4),
  },
  dismissCircleIconButton: {
    position: 'absolute',
    top: rw(2),
    right: rw(2),
  },
  containerImageStyle: {
    columnGap: rw(8),
  },
  containerItemImageStyle: {
    marginHorizontal: rw(4),
    borderRadius: rw(5),
    backgroundColor: EColor.color_00000080,
  },

  title: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(40),
  },
  mv4: {
    marginVertical: rh(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ml4: {
    marginLeft: rw(4),
  },
  mr10: {
    marginRight: rw(10),
  },
  icon: {
    marginLeft: rw(16),
  },
  location: {
    color: EColor.color_CCCCCC,
    fontSize: rh(10),
    lineHeight: rh(16),
  },
  startsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: rw(8),
    marginTop: rh(32),
  },
});
