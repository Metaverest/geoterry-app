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
  onConfirm?: () => void;
  onCancel?: () => void;
}
const PopupModal = ({ route }: { route: { params: IPopupModalProps } }) => {
  const { t } = useTranslation();
  const { image, cancelButtonTitle, confirmButtonTitle, onConfirm, subtitle, title } = route.params;
  const containOnlyOneButton = useMemo(() => {
    return !cancelButtonTitle || !confirmButtonTitle;
  }, [cancelButtonTitle, confirmButtonTitle]);
  const navigation = useNavigation();
  return (
    <CustomSafeArea style={styles.container} isModal>
      <View style={styles.popupContainer}>
        <Image style={styles.popupImage} source={image} />
        <CustomText style={styles.popupTitle}>{title}</CustomText>
        <CustomText style={styles.popupSubtitle}>{subtitle}</CustomText>
        <View style={styles.footerContainer}>
          {containOnlyOneButton ? (
            <View style={styles.buttonContainer}>
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
            <></>
          )}
        </View>
      </View>
    </CustomSafeArea>
  );
};
export default PopupModal;
