import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: EColor.color_00000080,
  },
  mainContainer: {
    position: 'absolute',
    backgroundColor: EColor.color_171717,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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
