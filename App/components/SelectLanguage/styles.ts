import { EColor } from 'App/enums/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  selectedLanguageContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: 400,
    padding: 4,
    height: 700,
  },
  itemContainer: {
    width: 200,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 8,
    fontWeight: '500',
    color: EColor.color_FAFAFA,
  },
});
