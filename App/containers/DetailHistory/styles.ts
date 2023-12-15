import { StyleSheet, Dimensions } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EColor } from 'App/enums/color';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rw(16),
  },
  title: {
    fontSize: rh(20),
    fontWeight: '700',
    lineHeight: rh(30),
    color: EColor.color_FAFAFA,
    marginTop: rh(40),
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
  desc: {
    fontSize: rh(12),
    fontWeight: '500',
    lineHeight: rh(18),
    color: EColor.color_FAFAFA,
  },
  containerDesc: {
    height: rh(191),
    width: '100%',
    backgroundColor: EColor.color_333333,
    marginTop: rh(24),
    marginHorizontal: rw(16),
    paddingHorizontal: rw(16),
    paddingVertical: rh(16),
    borderRadius: rh(12),
  },
  containerImage: {
    width: '100%',
    marginTop: rh(16),
  },
  btn: {
    marginTop: rh(32),
  },
  mv4: {
    marginVertical: rh(4),
  },
  mt4: {
    marginTop: rh(4),
  },
  mapContainer: {
    marginTop: rh(52),
    width: Dimensions.get('window').width,
    height: rh(130),
    zIndex: -1,
  },
});
