import { View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { EarthBottomIcon } from 'App/components/image';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QRScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);

  const [uriQR, setUriQR] = useState('');

  const generateQRCode = () => {
    RNQRGenerator.generate({
      value: user.id,
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
  const handleShareQR = async () => {
    Share.open({ url: 'https://github.com/gevgasparyan/rn-qr-generator' })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const handleCopyToClipboard = () => {
    Clipboard.setString(user.id);
  };

  useEffect(() => {
    generateQRCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomSafeArea style={styles.container}>
      <Image style={[styles.image, { marginTop: -(top + 10) }]} source={EarthBottomIcon} />
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
            onPress={handleShareQR}
            buttonType={EButtonType.OUTLINE}
            title={t('Chia sẻ')}
            customStyleContainer={styles.button}
            buttonColor={EColor.color_333333}
          />
          <CustomButtonIcon
            renderIcon={<LinkIcon style={styles.iconBtn} />}
            onPress={handleCopyToClipboard}
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
