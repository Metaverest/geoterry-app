import { View, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { styles } from './styles';
import CloseIcon from 'App/media/CloseIcon';
import { CommonActions, useNavigation } from '@react-navigation/native';
import RNQRGenerator from 'rn-qr-generator';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import CustomButtonIcon from 'App/components/ButtonIcon';
import { EButtonType } from 'App/enums';
import ShareIcon from 'App/media/ShareIcon';
import { EColor } from 'App/enums/color';
import LinkIcon from 'App/media/LinkIcon';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import { reduxSelector } from 'App/redux/selectors';
import { useSelector } from 'react-redux';
import { APP_DOMAIN_URL } from 'App/constants/common';
import Header from 'App/components/Header';
import { responsiveByWidth as rw } from 'App/helpers/common';
import QRIcon from 'App/media/QRIcon';
import { EMainGameScreen } from 'App/enums/navigation';

const QRScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const user = useSelector(reduxSelector.getUser);

  const [uriQR, setUriQR] = useState('');
  const shareLink = useMemo(() => {
    return `https://www.${APP_DOMAIN_URL}/redirect/profile/${user.id}`;
  }, [user.id]);
  const generateQRCode = () => {
    RNQRGenerator.generate({
      value: shareLink,
      height: rw(400),
      width: rw(400),
      correctionLevel: 'H',
    })
      .then(response => {
        const { uri } = response;
        setUriQR(uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  };
  const handleShareQR = async () => {
    Share.open({ message: t('Kết bạn Checkly với tớ để cùng nhau đi săn kho báu nào!!! ') + shareLink })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const handleCopyToClipboard = () => {
    Clipboard.setString(shareLink);
  };

  useEffect(() => {
    generateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressScanQRCode = useCallback(() => {
    navigation.dispatch(CommonActions.navigate(EMainGameScreen.SCAN_PROFILE_QR_SCREEN));
  }, [navigation]);

  return (
    <CustomSafeArea style={styles.container}>
      <Header
        leftButton={<CloseIcon />}
        rightButton={
          <TouchableOpacity onPress={onPressScanQRCode}>
            <QRIcon />
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <View style={styles.boxImageQR}>
          {uriQR && <Image source={{ uri: uriQR }} style={styles.imgQR} resizeMode="contain" />}
        </View>
        <CustomText style={styles.title}>{t('Checkly')}</CustomText>
        <CustomText style={styles.nameUser}>{user.displayName}</CustomText>
        <View style={styles.buttonsContainer}>
          <CustomButtonIcon
            renderIcon={<ShareIcon style={styles.iconBtn} />}
            onPress={handleShareQR}
            buttonType={EButtonType.OUTLINE}
            title={t('Chia sẻ')}
            customStyleContainer={styles.button}
            buttonColor={EColor.color_1f1f1f}
          />
          <CustomButtonIcon
            renderIcon={<LinkIcon style={styles.iconBtn} />}
            onPress={handleCopyToClipboard}
            buttonType={EButtonType.OUTLINE}
            title={t('Sao chép liên kết')}
            customStyleContainer={styles.button}
            buttonColor={EColor.color_1f1f1f}
          />
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default QRScreen;
