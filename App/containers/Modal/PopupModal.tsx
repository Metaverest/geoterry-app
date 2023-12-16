/* eslint-disable react/react-in-jsx-scope */
import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageSourcePropType, View } from 'react-native';
import { styles } from './styles';

export interface IPopupModalProps {
  image: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  closeModalBeforeActiom?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}
const PopupModal = ({ route }: { route: { params: IPopupModalProps } }) => {
  const { t } = useTranslation();
  const { image, cancelButtonTitle, confirmButtonTitle, onCancel, onConfirm, subtitle, title, closeModalBeforeActiom } =
    route.params;
  const containOnlyOneButton = useMemo(() => {
    return !cancelButtonTitle || !confirmButtonTitle;
  }, [cancelButtonTitle, confirmButtonTitle]);
  const navigation = useNavigation();
  return (
    <CustomSafeArea style={styles.container} shouldUseFullScreenView isModal>
      <View style={styles.popupContainer}>
        <Image style={styles.popupImage} resizeMode="contain" source={image} />
        <CustomText style={styles.popupTitle}>{title}</CustomText>
        <CustomText style={styles.popupSubtitle}>{subtitle}</CustomText>
        <View style={styles.footerContainer}>
          {containOnlyOneButton ? (
            <View style={styles.buttonContainerSingle}>
              <CustomButton
                onPress={() => {
                  onConfirm && onConfirm();
                  navigation.dispatch(CommonActions.goBack());
                }}
                linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                buttonType={EButtonType.SOLID}
                title={confirmButtonTitle || t('Ok')}
              />
            </View>
          ) : (
            <View style={styles.groupButtonContainer}>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    if (closeModalBeforeActiom) {
                      navigation.dispatch(CommonActions.goBack());
                      onCancel && onCancel();
                    } else {
                      onCancel && onCancel();
                      navigation.dispatch(CommonActions.goBack());
                    }
                  }}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  title={confirmButtonTitle}
                  customStyleText={styles.customOutlineButtonText}
                  customStyleContainer={styles.customOutlineButtonContainer}
                  buttonType={EButtonType.OUTLINE}
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    if (closeModalBeforeActiom) {
                      navigation.dispatch(CommonActions.goBack());
                      onConfirm && onConfirm();
                    } else {
                      onConfirm && onConfirm();
                      navigation.dispatch(CommonActions.goBack());
                    }
                  }}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  buttonType={EButtonType.SOLID}
                  title={cancelButtonTitle}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </CustomSafeArea>
  );
};
export default PopupModal;
