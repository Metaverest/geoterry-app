/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';
import { View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomSafeArea = (props: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ width: wp('100'), height: hp('100'), backgroundColor: EColor.color_171717 }}>
      <View
        style={{
          marginTop: insets.top,
          marginBottom: insets.bottom,
          flex: 1,
          ...props.style,
        }}>
        {props.children}
      </View>
    </View>
  );
};
export default CustomSafeArea;
