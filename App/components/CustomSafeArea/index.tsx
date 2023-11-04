/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';
import { ImageBackground } from 'react-native';
import { View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface IProps {
  backgroundImageSource?: any;
  isModal?: boolean;
  style?: any;
  children?: any;
}
export const CustomSafeArea = (props: IProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: wp('100'),
        height: hp('100'),
        backgroundColor: props.isModal ? 'transparent' : EColor.color_171717,
      }}>
      {props.backgroundImageSource ? (
        <ImageBackground
          style={{ marginTop: insets.top, marginBottom: insets.bottom, flex: 1 }}
          source={props.backgroundImageSource}>
          <View
            style={{
              flex: 1,
              ...props.style,
            }}>
            {props.children}
          </View>
        </ImageBackground>
      ) : (
        <View
          style={{
            marginTop: insets.top,
            marginBottom: insets.bottom,
            flex: 1,
            ...props.style,
          }}>
          {props.children}
        </View>
      )}
    </View>
  );
};
export default CustomSafeArea;
