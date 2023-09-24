/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React, { useCallback } from 'react';
import { styles } from './styles';
import { ISwipeUpModalProps } from 'App/types/modal';
import CustomText from '../CustomText';
import HeaderLineSwipeModalIcon from 'App/media/HeaderLineSwipeModalIcon';
import { PanGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';

const CustomSwipeUpModal = (props: ISwipeUpModalProps) => {
  const navigation = useNavigation();
  const closeModal = useCallback(() => {
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);
  return (
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback style={{ height: '100%', width: '100%' }} onPress={closeModal}>
        <View style={styles.mainContainer}>
          <HeaderLineSwipeModalIcon />
          <CustomText style={styles.headerTitle}>{props.title}</CustomText>
          <PanGestureHandler>
            <View>{props.children}</View>
          </PanGestureHandler>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default CustomSwipeUpModal;
