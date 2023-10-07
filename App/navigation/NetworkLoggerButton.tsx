import { useCallback, useRef } from 'react';
import { PanResponder, Text } from 'react-native';
import { Animated } from 'react-native';
import { ENavigationScreen } from 'App/enums/navigation';
import { Pressable } from 'react-native';
import { styles } from './styles';
import React from 'react';

const NetworkLoggerButton = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const openNetworkLoggerScreen = useCallback(() => {
    navigationRef.current?.navigate(ENavigationScreen.NETWORK_LOGGER_SCREEN);
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.floatingButtonContainer, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}>
      <Pressable onPress={openNetworkLoggerScreen}>
        <Text>🌐</Text>
      </Pressable>
    </Animated.View>
  );
};

export default NetworkLoggerButton;
