import { Alert, Image, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from 'App/components/Header';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import { t } from 'i18next';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import CustomInputInformation from 'App/components/CustomInput/CustomInputInformation';
import CustomButton from 'App/components/Button';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { validateEmail } from 'App/helpers/validate';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';

const EditProfileScreen = () => {
  const user = useSelector(reduxSelector.getUser);

  const [name, setName] = useState(user.displayName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [email, setEmail] = useState(user.email || '');
  const [checkEmail, setCheckEmail] = useState(true);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Chỉnh sửa thông tin')} />
      <View style={styles.content}>
        {user.logoUrl ? (
          <Image source={{ uri: user.logoUrl }} style={styles.avatarUser} resizeMode="contain" />
        ) : (
          <MapMarkerUserDefault width={72} height={72} />
        )}
        <TouchableOpacity onPress={() => {}}>
          <CustomText style={styles.textUploadAvatar}>{t('Tải lên ảnh đại diện')}</CustomText>
        </TouchableOpacity>
        <View style={styles.contentInfor}>
          <CustomInputInformation title="Tên" placeholder="Thêm tên" value={name} underline onChangeText={setName} />
          <CustomInputInformation
            title="Bio"
            placeholder="Thêm Bio"
            value={bio}
            underline
            onChangeText={setBio}
            maxLength={40}
          />
          <CustomText style={styles.countCharacters}>{bio.length || 0}/40</CustomText>
          <CustomInputInformation
            title="Số điện thoại"
            placeholder={'Thêm số điện thoại'}
            value={user.phoneNumber}
            underline
          />
          <CustomInputInformation
            title="Email"
            placeholder={'Thêm email'}
            value={email}
            onChangeText={setEmail}
            onContentSizeChange={() => {
              setCheckEmail(() => validateEmail(email));
            }}
          />
          {email && !checkEmail && <CustomText style={styles.errorAlert}>{t('Định dạng email không đúng')}</CustomText>}
        </View>
        <CustomButton
          disabled={name.length === 0}
          onPress={() => {
            Alert.alert('chưa ghép api');
          }}
          title={t('Lưu thay đổi')}
          buttonType={EButtonType.SOLID}
          linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
        />
      </View>
    </CustomSafeArea>
  );
};

export default EditProfileScreen;
