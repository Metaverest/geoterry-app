import { View, Image } from 'react-native';
import React from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { styles } from './styles';
import { AppBackgroundImage, AvatarUser } from 'App/components/image';
import Header from 'App/components/Header';
import { useTranslation } from 'react-i18next';
import CustomText from 'App/components/CustomText';
import RewardPointsIcon from 'App/media/RewardPointsIcon';
import CustomInputInformation from 'App/components/CustomInput/CustomInputInformation';
import CustomButton from 'App/components/Button';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import CustomButtonIcon from 'App/components/ButtonIcon';
import LogOutIcon from 'App/media/LogOutIcon';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen } from 'App/enums/navigation';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Trang cá nhân')} />
      <View style={styles.content}>
        <Image source={AvatarUser} style={styles.avatarUser} resizeMode="contain" />
        <CustomText style={styles.nameUser}>Nguyễn Hải</CustomText>
        <CustomText style={styles.biography}>{t('Bio')}</CustomText>
        <View style={styles.contentRewardPoints}>
          <RewardPointsIcon width={20} height={20} />
          <CustomText style={styles.textRewardPoints}>{t('Reward Points')}:</CustomText>
          <CustomText style={styles.points}>1098</CustomText>
        </View>
        <CustomText style={styles.title}>{t('Thông tin liên hệ')}</CustomText>

        <CustomInputInformation
          title="Số điện thoại"
          placeholder={'Thêm số điện thoại'}
          value="0123456789"
          editable={false}
          underline
        />
        <CustomInputInformation title="Email" placeholder={'Thêm email'} editable={false} />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={t('Chỉnh sửa')}
              onPress={() => {
                navigation.dispatch(CommonActions.navigate(EMainGameScreen.EDIT_PROFILE_SCREEN));
              }}
              buttonType={EButtonType.SOLID}
              customStyleText={styles.customOutlineButtonText}
              customStyleContainer={styles.customOutlineButtonContainer}
              linearGradient={[EColor.transparent]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={() => {
                navigation.dispatch(CommonActions.navigate(EMainGameScreen.QR_SCREEN));
              }}
              title={t('QR')}
              buttonType={EButtonType.SOLID}
              linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            />
          </View>
        </View>
      </View>
      <View style={styles.flexEnd}>
        <CustomButtonIcon
          renderIcon={<LogOutIcon style={styles.iconLogOut} />}
          onPress={() => {}}
          buttonType={EButtonType.OUTLINE}
          title={t('Đăng xuất')}
          customStyleContainer={styles.buttonLogOut}
        />
      </View>
    </CustomSafeArea>
  );
};

export default ProfileScreen;
