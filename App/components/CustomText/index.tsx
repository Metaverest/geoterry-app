/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Text } from 'react-native';

const CustomText = (props: any) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Montserrat-Regular' }]}>
      {props.children}
    </Text>
  );
};
export default CustomText;
