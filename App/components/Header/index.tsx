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
import { resetAndNavigateToScreen } from 'App/utils/navigation';
import CustomImage from '../CustomImage';
import ConversationUserAvatarDefault from 'App/media/ConversationUserAvatarDefault';
import { shortenString } from 'App/helpers/text';

const Header = ({
  title,
  rightButton,
  shouldHideBackButton,
  headerContainerStyle,
  // Use for ChatView
  isChatView,
  avatar,
  name,
  profileId,
}: {
  title?: string;
  rightButton?: any;
  shouldHideBackButton?: boolean;
  headerContainerStyle?: StyleProp<ViewStyle>;
  // Use for ChatView
  isChatView?: boolean;
  avatar?: string;
  name?: string;
  profileId?: string;
}) => {
  const navigation = useNavigation();
  const handlePressBackButton = useCallback(() => {
    if (!navigation.canGoBack()) {
      resetAndNavigateToScreen(navigation, EMainGameScreen.MAP_SCREEN);
      return;
    }
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () =>
        !isChatView ? (
          <View style={[styles.container, headerContainerStyle, insets.top > 0 && { top: insets.top }]}>
            <TouchableOpacity
              hitSlop={{ top: rw(10), bottom: rw(10), left: rw(10), right: rw(10) }}
              style={styles.backButtonContainer}
              onPress={handlePressBackButton}>
              {!shouldHideBackButton && <BackIcon />}
            </TouchableOpacity>
            <CustomText style={styles.title}>{title}</CustomText>
            <View style={styles.rightButtonContainer}>{rightButton && rightButton}</View>
          </View>
        ) : (
          <View style={[styles.chatViewContainer, insets.top > 0 && { top: insets.top }]}>
            <TouchableOpacity
              hitSlop={{ top: rw(10), bottom: rw(10), left: rw(10), right: rw(10) }}
              style={styles.backButtonContainer}
              onPress={handlePressBackButton}>
              {!shouldHideBackButton && <BackIcon />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flex}
              onPress={() => {
                profileId &&
                  navigation.dispatch(CommonActions.navigate(EMainGameScreen.PROFILE_SCREEN, { profileID: profileId }));
              }}>
              {avatar ? (
                <CustomImage imageUrl={avatar} style={styles.avatar} />
              ) : (
                <View style={styles.avatarDefault}>
                  <ConversationUserAvatarDefault width={rw(36)} height={rw(36)} />
                </View>
              )}
              <CustomText style={styles.name}>{shortenString(name || '', 25)}</CustomText>
            </TouchableOpacity>
          </View>
        ),
    });
  }, [
    navigation,
    title,
    rightButton,
    handlePressBackButton,
    shouldHideBackButton,
    headerContainerStyle,
    insets.top,
    isChatView,
    avatar,
    name,
    profileId,
  ]);
  return null;
};
export default Header;
