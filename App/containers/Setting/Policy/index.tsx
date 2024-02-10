import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { Dimensions, ScrollView, View } from 'react-native';
import { responsiveByHeight as rh } from 'App/helpers/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const screenHeight = Dimensions.get('window').height;
const PolicyScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const contentHeight = useMemo(() => screenHeight - insets.top - rh(72), [insets.top]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Chính sách bảo mật')} />
      <View style={[styles.policyContainer, { height: contentHeight }]}>
        <ScrollView style={styles.mb50} showsVerticalScrollIndicator={false}>
          <CustomText style={styles.policyContent}>
            {t(
              'Tại Checkly, chúng tôi coi trọng sự riêng tư và bảo mật thông tin cá nhân của bạn. Chính sách Bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn khi bạn sử dụng ứng dụng của chúng tôi.',
            )}
          </CustomText>

          <CustomText style={styles.policyHeadline}>{t('Thông Tin Thu Thập')}</CustomText>
          <CustomText style={styles.policyContent}>
            {t(
              'Chúng tôi có thể thu thập thông tin cá nhân như tên, địa chỉ email và dữ liệu vị trí khi bạn tạo tài khoản hoặc sử dụng các tính năng của ứng dụng.',
            )}
          </CustomText>

          <CustomText style={styles.policyContent}>
            {t(
              '\nBằng cách sử dụng ứng dụng Checkly, bạn đồng ý với việc thu thập và sử dụng thông tin của bạn như được mô tả trong Chính sách Bảo mật này. Nếu bạn có bất kỳ câu hỏi hoặc mối quan tâm nào về các thực hành bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi qua email contact@checkly.vn.',
            )}
          </CustomText>
        </ScrollView>
      </View>
    </CustomSafeArea>
  );
};

export default PolicyScreen;
