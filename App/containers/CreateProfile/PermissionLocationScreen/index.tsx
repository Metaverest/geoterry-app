import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage, PermissionLocationIcon } from 'App/components/image';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import useRequestLocationPermission from 'App/hooks/useRequestLocationPermission';
import { reduxSelector } from 'App/redux/selectors';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, View } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ECreateProfileScreen } from 'App/enums/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PermissionLocationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  useRequestLocationPermission();
  const handlePressSkip = useCallback(() => {
    navigation.dispatch(CommonActions.navigate(ECreateProfileScreen.PERMISSION_NOTIFICATION_SCREEN));
  }, [navigation]);
  const RightButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handlePressSkip}>
        <CustomText numberOfLines={1} style={styles.skipText}>
          {t('Tiếp theo')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [t, handlePressSkip]);
  const handePressGoToSetting = () => {
    Linking.openSettings();
  };
  const user = useSelector(reduxSelector.getUser);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header shouldHideBackButton rightButton={<RightButton />} />
      <CustomText style={styles.title}>{`${user?.displayName},\n${t('bạn đang ở đâu?')}`}</CustomText>
      <CustomText style={styles.subTitle}>
        {t('Cho phép Terriana truy cập vào vị trí của bạn để mang tới trải nghiệm tốt hơn nhé!')}
      </CustomText>
      <Image style={styles.image} source={PermissionLocationIcon} />
      <CustomText style={styles.footerText}>
        {t('Đừng lo, chúng tôi sẽ không chia sẻ dữ liệu của bạn khi không được phép!')}
      </CustomText>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonType={EButtonType.SOLID}
          onPress={handePressGoToSetting}
          linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
          title={t('Đi đến cài đặt')}
        />
      </View>
    </CustomSafeArea>
  );
};

export default PermissionLocationScreen;
