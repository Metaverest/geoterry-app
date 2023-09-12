import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import AvatarIcon from 'App/media/AvatarIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { head } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { styles } from './styles';

const ChooseAvatarScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePressSkip = useCallback(async () => {
    dispatch(sagaUserAction.createProfileAsync(navigation));
  }, [dispatch, navigation]);
  const RightButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handlePressSkip}>
        <CustomText numberOfLines={1} style={styles.skipText}>
          {t('Bỏ qua')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [t, handlePressSkip]);
  const openCamera = useCallback(async () => {
    const response: ImagePickerResponse = await launchCamera({});
    if (response.assets) {
      dispatch(sagaUserAction.uploadAvatarProfileAsync(head(response.assets), navigation));
    }
  }, [dispatch, navigation]);

  const openLibrary = useCallback(async () => {
    const response: ImagePickerResponse = await launchImageLibrary({});
    if (response.assets) {
      dispatch(sagaUserAction.uploadAvatarProfileAsync(head(response.assets), navigation));
    }
  }, [dispatch, navigation]);
  return (
    <CustomSafeArea style={styles.container}>
      <Header rightButton={<RightButton />} />
      <CustomText style={styles.uploadAvatarTitle}>{t('Tải lên ảnh đại diện')}</CustomText>
      <View style={styles.avatarIconContainer}>
        <AvatarIcon />
      </View>
      <View style={styles.groupButtonContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={openCamera}
            customStyleText={styles.customOutlineButtonText}
            customStyleContainer={styles.customOutlineButtonContainer}
            buttonType={EButtonType.OUTLINE}
            title={t('Camera')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={openLibrary}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            buttonType={EButtonType.SOLID}
            title={t('Thư viện')}
          />
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default ChooseAvatarScreen;
