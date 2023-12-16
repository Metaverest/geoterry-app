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
  const WrappedContent = props.shouldUseKeyboardAwareScrollView ? (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      scrollEnabled={true}
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableAutomaticScroll
      extraScrollHeight={0}
      // We need to set backgroundColor to the app`s background color
      // because when the keyboard is opened, the extra white space is appeared at the bottom of the screen - see android:windowSoftInputMode="adjustResize"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: EColor.color_171717 }}
      showsVerticalScrollIndicator={false}
      {...props.keyboardAwareScrollProps}>
      {props.children}
    </KeyboardAwareScrollView>
  ) : (
    props.children
  );
  return (
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
            {WrappedContent}
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
          {WrappedContent}
        </View>
      )}
    </View>
  );
};
export default CustomSafeArea;
