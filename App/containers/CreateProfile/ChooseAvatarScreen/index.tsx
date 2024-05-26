import { useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EButtonType, EMediaType } from 'App/enums';
import { EColor } from 'App/enums/color';
import AvatarIcon from 'App/media/AvatarIcon';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { head, isEmpty } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import CustomImage from 'App/components/CustomImage';
import { EImageSize } from 'App/utils/images';

const ChooseAvatarScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(reduxSelector.getUser);
  const userAvatar = useMemo(() => {
    return user.logoUrl;
  }, [user?.logoUrl]);
  const handlePressSkip = useCallback(async () => {
    dispatch(sagaUserAction.createProfileAsync(navigation));
  }, [dispatch, navigation]);
  const RightButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handlePressSkip}>
        <CustomText numberOfLines={1} style={styles.skipText}>
          {isEmpty(userAvatar) ? t('Bỏ qua') : t('Tiếp tục')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [t, handlePressSkip, userAvatar]);
  const openCamera = useCallback(async () => {
    const response: ImagePickerResponse = await launchCamera({ mediaType: EMediaType.PHOTO });
    if (response.assets) {
      dispatch(sagaUserAction.uploadAvatarProfileAsync(head(response.assets), navigation));
    }
  }, [dispatch, navigation]);

  const openLibrary = useCallback(async () => {
    const response: ImagePickerResponse = await launchImageLibrary({ mediaType: EMediaType.PHOTO });
    if (response.assets) {
      dispatch(sagaUserAction.uploadAvatarProfileAsync(head(response.assets), navigation));
    }
  }, [dispatch, navigation]);

  return (
    <CustomSafeArea style={styles.container}>
      <Header rightButton={<RightButton />} />
      <CustomText style={styles.uploadAvatarTitle}>{t('Tải lên ảnh đại diện')}</CustomText>
      <View style={styles.avatarIconContainer}>
        {userAvatar ? (
          <CustomImage imageUrl={userAvatar} resizeMode="cover" style={styles.image} imageSize={EImageSize.SIZE_250} />
        ) : (
          <AvatarIcon />
        )}
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
