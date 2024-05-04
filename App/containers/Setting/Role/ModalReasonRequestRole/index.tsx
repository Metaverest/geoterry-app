import { KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import CustomText from 'App/components/CustomText';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { EColor } from 'App/enums/color';
import CustomInput from 'App/components/CustomInput';
import { responsiveByHeight as rh } from 'App/helpers/common';
import { EButtonType } from 'App/enums';
import CustomButton from 'App/components/Button';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  reason: string;
  setReason: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

const ModalReasonRequestRole = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Modal
      style={styles.modal}
      isVisible={props.isVisible}
      backdropColor={EColor.color_00000050}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={() => {
        props.onClose();
        props.setReason('');
      }}>
      <KeyboardAvoidingView keyboardVerticalOffset={rh(150)} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <CustomText style={styles.title}>{t('Bạn muốn trở thành Builder?')}</CustomText>
          <CustomText style={styles.subTitle}>{t('Hãy nêu lý do để Admin xét duyệt.')}</CustomText>
          <CustomInput
            minHeightInput={rh(191)}
            onChangeText={props.setReason}
            placeholder={t('Nhập gì đó')}
            numberOfLines={10}
            multiline
            value={props.reason}
          />
          <CustomButton
            onPress={props.onSubmit}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            buttonType={EButtonType.SOLID}
            title={t('Gửi')}
            customStyleContainer={styles.btnSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalReasonRequestRole;
