import { View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { styles } from './styles';
import { AppBackgroundImage } from 'App/components/image';
import Header from 'App/components/Header';
import { useTranslation } from 'react-i18next';
import CustomText from 'App/components/CustomText';
import RewardPointsIcon from 'App/media/RewardPointsIcon';
import CustomInputInformation from 'App/components/CustomInput/CustomInputInformation';
import CustomButton from 'App/components/Button';
import { EButtonType, EDataStorageKey } from 'App/enums';
import { EColor } from 'App/enums/color';
import CustomButtonIcon from 'App/components/ButtonIcon';
import LogOutIcon from 'App/media/LogOutIcon';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { convertDateFormatOnlyDate } from 'App/utils/convert';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { resetAndNavigateToScreen } from 'App/utils/navigation';
import { IUser } from 'App/types/user';
import { EImageSize } from 'App/utils/images';
import CustomImage from 'App/components/CustomImage';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { removePropertyInDevice } from 'App/utils/storage/storage';

const ProfileScreen = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profileID } = useMemo(() => route.params || {}, [route.params]);
  const profile = useSelector(reduxSelector.getAppOtherUserProfileToDisplay);
  const isCurrentUserProfile = useMemo(() => {
    return profileID === user.id;
  }, [profileID, user.id]);

  useEffect(() => {
    if (profileID && !isCurrentUserProfile) {
      dispatch(sagaUserAction.getOtherProfileAsync(profileID, navigation));
    }
  }, [profileID, dispatch, navigation, isCurrentUserProfile]);

  const [profileToDisplay, setProfileToDisplay] = useState<IUser | undefined>();
  useEffect(() => {
    if (isCurrentUserProfile) {
      setProfileToDisplay(user);
    } else {
      setProfileToDisplay(profile);
    }
  }, [user, profile, isCurrentUserProfile]);

  const handleLogOut = useCallback(async () => {
    await removePropertyInDevice(EDataStorageKey.ACCESS_TOKEN);
    await removePropertyInDevice(EDataStorageKey.REFRESH_TOKEN);
    await removePropertyInDevice(EDataStorageKey.PROFILE_ID);
    dispatch(reduxAppAction.resetAppStates());
    resetAndNavigateToScreen(navigation, ENavigationScreen.LOGIN_SCREEN);
  }, [navigation, dispatch]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Trang cá nhân')} />
      <View style={styles.content}>
        <View style={styles.row}>
          {profileToDisplay?.logoUrl ? (
            <CustomImage
              imageSize={EImageSize.SIZE_500}
              imageUrl={profileToDisplay.logoUrl}
              style={styles.avatarUser}
              resizeMode="cover"
            />
          ) : (
            <MapMarkerUserDefault width={rw(72)} height={rh(72)} />
          )}
          <View style={styles.ml16}>
            <CustomText style={styles.nameUser}>{profileToDisplay?.displayName}</CustomText>
            {profileToDisplay?.bio ? <CustomText style={styles.biography}>{profileToDisplay?.bio}</CustomText> : null}
            <View style={styles.contentRewardPoints}>
              <RewardPointsIcon />
              <CustomText style={styles.textRewardPoints}>{t('Điểm tích luỹ')}:</CustomText>
              <CustomText style={styles.points}>{profileToDisplay?.rewardPoints}</CustomText>
            </View>
          </View>
        </View>
        <View style={styles.profileSections}>
          <View style={styles.profileSection}>
            <CustomText style={styles.title}>{isCurrentUserProfile ? t('Thông tin chung') : t('Thông tin')}</CustomText>

            <CustomInputInformation
              title={t('Ngày tham gia')}
              value={convertDateFormatOnlyDate(profileToDisplay?.createdAt as string)}
              editable={false}
              underline
            />
            <CustomInputInformation
              title={t('Đã tìm được')}
              value={`${profileToDisplay?.totalCheckedinTerry || 0} ${t('kho báu')}`}
              editable={false}
            />
          </View>
          {isCurrentUserProfile && (
            <View style={styles.profileSection}>
              <CustomText style={styles.title}>{t('Thông tin liên hệ')}</CustomText>

              <CustomInputInformation
                title={t('Số điện thoại')}
                placeholder={t('Thêm số điện thoại')}
                value={profileToDisplay?.phoneNumber}
                editable={false}
                underline
              />
              <CustomInputInformation
                title={t('Email')}
                placeholder={t('Thêm email')}
                value={profileToDisplay?.email}
                editable={false}
              />
            </View>
          )}
        </View>
        {isCurrentUserProfile && (
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
                linearGradient={[EColor.transparent, EColor.transparent]}
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
        )}
        {!isCurrentUserProfile && (
          <View style={styles.buttonsContainer}>
            <CustomButton
              title={t('Nhắn tin')}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: EMainGameScreen.CHAT_VIEW_SCREEN,
                    params: { recipientId: profileID, conversationId: profile?.conversationId },
                  }),
                );
              }}
              buttonType={EButtonType.SOLID}
              linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            />
          </View>
        )}
      </View>
      {isCurrentUserProfile && (
        <View style={styles.flexEnd}>
          <CustomButtonIcon
            renderIcon={<LogOutIcon style={styles.iconLogOut} />}
            onPress={handleLogOut}
            buttonType={EButtonType.OUTLINE}
            title={t('Đăng xuất')}
            customStyleContainer={styles.buttonLogOut}
          />
        </View>
      )}
    </CustomSafeArea>
  );
};

export default ProfileScreen;
