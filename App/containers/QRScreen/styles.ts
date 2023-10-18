import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 14,
  },
  imgQR: {
    width: 178,
    height: 178,
  },
  boxImageQR: {
    padding: 25,
    backgroundColor: EColor.color_FAFAFA,
    borderRadius: 17,
    marginTop: 91,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: EColor.color_FAFAFA,
    marginTop: 32,
  },
  nameUser: {
    color: EColor.color_FAFAFA,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 4,
  },
  button: {
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    width: 168,
  },
  iconBtn: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 32,
    justifyContent: 'space-between',
  },
});
