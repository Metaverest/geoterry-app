/* eslint-disable react/react-in-jsx-scope */
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen } from 'App/enums/navigation';
import BackIcon from 'App/media/BackIcon';
import { useCallback, useLayoutEffect } from 'react';
import { StyleProp, View, ViewStyle, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveByWidth as rw } from 'App/helpers/common';

const Header = ({
  title,
  rightButton,
  shouldHideBackButton,
  headerContainerStyle,
}: {
  title?: string;
  rightButton?: any;
  shouldHideBackButton?: boolean;
  headerContainerStyle?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation();
  const handlePressBackButton = useCallback(() => {
    if (!navigation.canGoBack()) {
      navigation.dispatch(CommonActions.navigate(EMainGameScreen.MAP_SCREEN));
      return;
    }
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <View style={[styles.container, headerContainerStyle, insets.top > 0 && { top: insets.top }]}>
          <TouchableOpacity
            hitSlop={{ top: rw(10), bottom: rw(10), left: rw(10), right: rw(10) }}
            style={styles.backButtonContainer}
            onPress={handlePressBackButton}>
            {!shouldHideBackButton && <BackIcon />}
          </TouchableOpacity>
          <CustomText style={styles.title}>{title}</CustomText>
          <TouchableOpacity style={styles.rightButtonContainer} onPress={handlePressBackButton}>
            {rightButton && rightButton}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, rightButton, handlePressBackButton, shouldHideBackButton, headerContainerStyle, insets.top]);
  return null;
};
export default Header;
