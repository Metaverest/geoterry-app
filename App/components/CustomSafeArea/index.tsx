/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomSafeArea = (props: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        marginTop: insets.top,
        marginBottom: insets.bottom,
        flex: 1,
        ...props.style,
      }}>
      {props.children}
    </View>
  );
};
export default CustomSafeArea;
