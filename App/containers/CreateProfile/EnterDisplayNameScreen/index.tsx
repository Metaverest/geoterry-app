import { AppBackgroundImage, EarthBottomIcon } from 'App/components/image';

import CustomButton from 'App/components/Button';
import CustomInput from 'App/components/CustomInput';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import useClearError from 'App/hooks/useClearError';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { useNavigation } from '@react-navigation/native';

interface IFormValues {
  displayName: string;
}
const initialValues: IFormValues = {
  displayName: '',
};

const EnterDisplayNameScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getShouldDisableButton = useCallback((values: IFormValues) => {
    return isEmpty(values.displayName);
  }, []);
  const navigation = useNavigation();
  const onSubmit = useCallback(
    (values: IFormValues) => {
      dispatch(sagaUserAction.handleSubmitDisplayNameAsync(values.displayName, navigation));
    },
    [dispatch, navigation],
  );
  const clearError = useClearError();
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header />
      <CustomText style={styles.createProfileTitle}>{t('Tạo hồ sơ của bạn')}</CustomText>
      <CustomText style={styles.createProfileSubTitle}>
        {t('Đừng lo, bạn vẫn có thể thay đổi các thông tin này sau đó. ')}
      </CustomText>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, values, setFieldValue, errors, submitCount }) => {
          const shouldDisplayError = submitCount > 0;
          return (
            <>
              <View style={styles.displayNameContainer}>
                <CustomInput
                  error={shouldDisplayError ? errors.displayName : ''}
                  onChangeText={text => setFieldValue('displayName', text, true)}
                  placeholder={t('Tên của bạn')}
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    clearError();
                    handleSubmit();
                  }}
                  linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
                  buttonType={EButtonType.SOLID}
                  title={t('Tiếp theo')}
                  disabled={getShouldDisableButton(values)}
                />
              </View>
            </>
          );
        }}
      </Formik>
      <Image style={styles.image} source={EarthBottomIcon} />
    </CustomSafeArea>
  );
};

export default EnterDisplayNameScreen;
