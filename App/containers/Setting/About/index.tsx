import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { responsiveByHeight as rh } from 'App/helpers/common';
const screenHeight = Dimensions.get('window').height;
const AboutScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const contentHeight = useMemo(() => screenHeight - insets.top - rh(72), [insets.top]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Về Checkly')} />
      <View style={[styles.aboutContainer, { height: contentHeight }]}>
        <ScrollView style={styles.mb50} showsVerticalScrollIndicator={false}>
          <CustomText style={styles.aboutHeadline}>{t('Chào mừng đến với Checkly!')}</CustomText>
          <CustomText style={styles.aboutContent}>
            {t(
              'Bạn đã sẵn sàng tham gia vào một cuộc phiêu lưu đầy thú vị và kịch tính chưa? Hãy cùng khám phá thế giới đầy bí ẩn và hấp dẫn của Checkly - nơi mà bạn có thể trở thành một nhà kiểm tra tài năng hoặc một thám tử tài ba!',
            )}
          </CustomText>

          <CustomText style={styles.aboutHeadline}>{t('Mục tiêu')}</CustomText>
          <CustomText style={styles.aboutContent}>
            {t(
              'Checkly không chỉ là một trò chơi - nó là một trải nghiệm đầy thách thức và kích thích, nơi bạn có thể thử thách bản thân và kết nối với bạn bè. Mục tiêu của chúng tôi là tạo ra một sản phẩm game độc đáo và thú vị, mang lại trải nghiệm thực tế và gắn kết cộng đồng.',
            )}
          </CustomText>

          <CustomText style={styles.aboutHeadline}>{t('Câu chuyện')}</CustomText>
          <CustomText style={styles.aboutContent}>
            {t(
              'Trong Checkly, bạn có thể chọn trở thành một nhà kiểm tra, nơi bạn sẽ tạo ra các thử thách độc đáo và giấu chúng ở những vị trí kỳ bí trên bản đồ thực tế. Hoặc bạn cũng có thể trở thành một thám tử tài ba, theo dấu những manh mối và gợi ý để tìm ra các thử thách được giấu đi bởi người chơi khác.',
            )}
          </CustomText>

          <CustomText style={styles.aboutHeadline}>{t('Cách chơi')}</CustomText>
          <CustomText style={styles.aboutContent}>
            {t(
              'Giao diện chính của game là bản đồ thực tế, nơi bạn có thể nhìn thấy các vị trí của các thử thách được đặt ra bởi những nhà kiểm tra khác. Bạn có thể chọn mục tiêu của mình và di chuyển thực sự tới địa điểm thử thách trên bản đồ, sử dụng công nghệ định vị để tương tác trong thế giới Checkly.\n\nDựa trên các gợi ý và manh mối mà người kiểm tra cung cấp, bạn sẽ phải tìm kiếm và hoàn thành thử thách trong một khoảng thời gian nhất định. Khi bạn hoàn thành một thử thách, bạn sẽ nhận được điểm thưởng xứng đáng.\n\nVới Checkly, sự sáng tạo và sự mạo hiểm không có giới hạn. Hãy chuẩn bị cho một cuộc phiêu lưu đầy thách thức và hấp dẫn cùng với Checkly!\n\nĐừng bỏ lỡ cơ hội trở thành một phần của cộng đồng Checkly - nơi mà bạn có thể thử thách bản thân và tạo ra những kỷ niệm đáng nhớ cùng bạn bè!',
            )}
          </CustomText>
        </ScrollView>
      </View>
    </CustomSafeArea>
  );
};

export default AboutScreen;
