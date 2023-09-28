/* eslint-disable react-native/no-inline-styles */
import { CommonActions, useNavigation } from '@react-navigation/native';
import HeaderLineSwipeModalIcon from 'App/media/HeaderLineSwipeModalIcon';
import { ISwipeUpModalProps } from 'App/types/modal';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomText from '../CustomText';
import { styles } from './styles';

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
          <View>{props.children}</View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default CustomSwipeUpModal;
