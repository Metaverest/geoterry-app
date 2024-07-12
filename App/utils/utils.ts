import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const makeSoftVibration = () => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  ReactNativeHapticFeedback.trigger('impactLight', options);
};
