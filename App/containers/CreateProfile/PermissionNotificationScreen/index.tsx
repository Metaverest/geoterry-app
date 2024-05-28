import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomButton from 'App/components/Button';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { PermissionNotificationImage } from 'App/components/image';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import useRequestNotificationPermission from 'App/hooks/useRequestNotificationPermission';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const PermissionNotificationScreen = () => {
  const { t } = useTranslation();
  useRequestNotificationPermission();
  const navigation = useNavigation();
  const handlePressSkip = useCallback(() => {
    navigation.dispatch(CommonActions.navigate(ENavigationScreen.MAIN_GAME_NAVIGATOR));
  }, [navigation]);
  const RightButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handlePressSkip}>
        <CustomText numberOfLines={1} style={styles.skipText}>
          {t('Xong')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [t, handlePressSkip]);
  const handePressGoToSetting = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ENavigationScreen.MAIN_GAME_NAVIGATOR,
            state: {
              index: 1,
              routes: [{ name: EMainGameScreen.MAP_SCREEN }, { name: EMainGameScreen.SETTING_NAVIGATOR }],
            },
          },
        ],
      }),
    );
  }, [navigation]);

  return (
    <CustomSafeArea style={styles.container}>
      <Header shouldHideBackButton rightButton={<RightButton />} />
      <CustomText style={styles.title}>{t('Cho phép bật thông báo')}</CustomText>
      <CustomText style={styles.subTitle}>{t('Cho phép Checkly gửi thông báo ứng dụng về máy của bạn!')}</CustomText>
      <Image style={styles.image} source={PermissionNotificationImage} />
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

export default PermissionNotificationScreen;
