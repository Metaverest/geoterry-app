import { View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { BackgroundQRScreen } from 'App/components/image';
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

const QRScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [uriQR, setUriQR] = useState('');

  const generateQRCode = () => {
    RNQRGenerator.generate({
      value: 'https://github.com/gevgasparyan/rn-qr-generator',
      height: 100,
      width: 100,
      correctionLevel: 'H',
    })
      .then(response => {
        const { uri } = response;
        setUriQR(uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={BackgroundQRScreen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(CommonActions.goBack());
          }}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.boxImageQR}>
          <Image source={{ uri: uriQR }} style={styles.imgQR} resizeMode="contain" />
        </View>
        <CustomText style={styles.title}>{t('Terriana')}</CustomText>
        <CustomText style={styles.nameUser}>Nguyễn Hải</CustomText>
        <View style={styles.buttonsContainer}>
          <CustomButtonIcon
            renderIcon={<ShareIcon style={styles.iconBtn} />}
            onPress={() => {}}
            buttonType={EButtonType.OUTLINE}
            title={t('Chia sẻ')}
            customStyleContainer={styles.button}
            buttonColor={EColor.color_333333}
          />
          <CustomButtonIcon
            renderIcon={<LinkIcon style={styles.iconBtn} />}
            onPress={() => {}}
            buttonType={EButtonType.OUTLINE}
            title={t('Sao chép liên kết')}
            customStyleContainer={styles.button}
            buttonColor={EColor.color_333333}
          />
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default QRScreen;
