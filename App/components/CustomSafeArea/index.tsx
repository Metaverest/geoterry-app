/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';
import { ImageBackground, StatusBar, View } from 'react-native';
import { KeyboardAwareProps, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface IProps {
  backgroundImageSource?: any;
  isModal?: boolean;
  style?: any;
  children?: any;
  shouldUseFullScreenView?: boolean;
  statusBarColor?: EColor;
  shouldHideStatusBar?: boolean;
  shouldUseKeyboardAwareScrollView?: boolean;
  keyboardAwareScrollProps?: KeyboardAwareProps;
}

export const CustomSafeArea = (props: IProps) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      scrollEnabled={true}
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableAutomaticScroll
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      {...props.keyboardAwareScrollProps}>
      <View
        style={{
          flex: 1,
          backgroundColor: props.isModal ? 'transparent' : EColor.color_171717,
        }}>
        <StatusBar
          backgroundColor={props.statusBarColor || EColor.transparent}
          hidden={props.shouldHideStatusBar}
          translucent
        />
        {props.backgroundImageSource ? (
          <ImageBackground
            style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
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
            style={[
              !props.shouldUseFullScreenView && { marginTop: insets.top, marginBottom: insets.bottom },
              {
                flex: 1,
                ...props.style,
              },
            ]}>
            {props.children}
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default CustomSafeArea;
