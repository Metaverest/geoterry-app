import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import { AppBackgroundImage, CreateProfileSuccessfullyAnimation } from 'App/components/image';
import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

const CreateProfileSuccessScreen = () => {
  const { t } = useTranslation();
  const animationRef = useRef(null);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <LottieView
        style={styles.image}
        ref={animationRef}
        source={CreateProfileSuccessfullyAnimation} // Replace with the path to your animation file
        autoPlay={true} // Set to true if you want the animation to play when the component mounts
        loop={false} // Set to true if you want the animation to loop
      />
      <CustomText style={styles.title}>{t('Tạo hồ sơ thành công!')}</CustomText>
      <CustomText style={styles.subTitle}>{t('Chào mừng bạn đã gia nhập cộng đồng của Terriana.')}</CustomText>
    </CustomSafeArea>
  );
};

export default CreateProfileSuccessScreen;
