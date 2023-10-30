import { CommonActions, useNavigation } from '@react-navigation/native';
import { EColor } from 'App/enums/color';
import { ISwipeUpModalProps } from 'App/types/modal';
import React, { useCallback, useState } from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modal';
import { ModalSwipeUpBackgroundImage } from '../image';
import { styles } from './styles';

const CustomSwipeUpModal = (props: ISwipeUpModalProps) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(true);
  const closeModal = useCallback(() => {
    setModalVisible(false);
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);

  return (
    <Modal
      swipeThreshold={150}
      onSwipeComplete={closeModal}
      backdropColor={EColor.color_00000080}
      style={styles.modalContainer}
      swipeDirection={'down'}
      onBackdropPress={closeModal}
      isVisible={isModalVisible}>
      <View style={styles.mainContainer}>
        <Image source={ModalSwipeUpBackgroundImage} style={styles.imageBackground} />
        {props.children}
      </View>
    </Modal>
  );
};
export default CustomSwipeUpModal;
