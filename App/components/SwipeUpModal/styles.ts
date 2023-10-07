import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,

    margin: 0,
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  mainContainer: {
    position: 'absolute',
    backgroundColor: EColor.color_171717,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  main: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerLine: {
    width: 48,
    height: 1,
    marginVertical: 8,
    backgroundColor: EColor.color_FAFAFA,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: EColor.color_FAFAFA,
    marginTop: 16,
    textAlign: 'center',
  },
});
