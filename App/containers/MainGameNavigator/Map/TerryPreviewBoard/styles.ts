import { StyleSheet } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: rh(84),
    width: '90%',
    height: rh(64),
    backgroundColor: EColor.color_171717,
    padding: rw(12),
    borderRadius: rh(4),
    flexDirection: 'row',
  },
  subContainer: {
    width: '93%',
  },
  terryName: {
    color: EColor.white,
    fontSize: rh(16),
    fontWeight: '600',
  },
  terryDetailContainer: {
    marginTop: rh(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  terryDetailText: {
    marginLeft: rw(4),
    marginRight: rw(16),
    color: EColor.color_F2F2F2,
    fontSize: rh(10),
    fontWeight: '400',
  },
  nextIcon: {
    justifyContent: 'center',
  },
});
