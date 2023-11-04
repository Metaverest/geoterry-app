import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: EColor.color_666666,
    borderTopLeftRadius: rw(32),
    borderTopRightRadius: rw(32),
    paddingHorizontal: rw(16),
  },
  image: {
    alignSelf: 'center',
    marginTop: rh(28),
  },
  title: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.white,
    marginTop: rh(16),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_D9D9D9,
    textAlign: 'center',
  },
  startsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: rw(8),
    marginTop: rh(32),
  },
  buttonContainer: {
    marginTop: rh(32),
    marginBottom: rh(64),
  },
});
