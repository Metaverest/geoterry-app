import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import ItemSelectorSetting, { IItemSelectorSettingProps } from 'App/components/ItemSelectorSetting';
import { AppBackgroundImage } from 'App/components/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ELanguageCode } from 'App/enums';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { i18nChangeLanguage } from 'App/utils/i18n/localize';

const LanguageScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userLanguageCode = useSelector(reduxSelector.getUserLanguageCode);
  const [languageCode, setLanguageCode] = useState<ELanguageCode | undefined>(userLanguageCode);
  useEffect(() => {
    if (userLanguageCode && !languageCode) {
      setLanguageCode(userLanguageCode);
    }
  }, [userLanguageCode, languageCode]);
  const navigation = useNavigation();
  const handleSave = useCallback(async () => {
    dispatch(
      sagaUserAction.updateProfileAsync({ languageCode: languageCode }, navigation, {
        onSuccess: () => navigation.dispatch(CommonActions.goBack()),
      }),
    );
    i18nChangeLanguage(languageCode || ELanguageCode.EN);
  }, [dispatch, languageCode, navigation]);
  const RightButton = useCallback(() => {
    const isSelectedNewLang = languageCode !== userLanguageCode;
    return (
      <TouchableOpacity disabled={!isSelectedNewLang} onPress={handleSave}>
        <CustomText numberOfLines={1} style={[styles.saveText, isSelectedNewLang && styles.saveTextHighlight]}>
          {t('Lưu')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [languageCode, userLanguageCode, handleSave, t]);

  const options: IItemSelectorSettingProps[] = useMemo(() => {
    return [
      {
        title: t('English'),
        isSelected: ELanguageCode.EN === languageCode,
        onPress: () => {
          setLanguageCode(ELanguageCode.EN);
        },
      },
      {
        title: t('Tiếng Việt'),
        isSelected: ELanguageCode.VN === languageCode,
        onPress: () => {
          setLanguageCode(ELanguageCode.VN);
        },
      },
    ] as IItemSelectorSettingProps[];
  }, [t, languageCode]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header rightButton={<RightButton />} title={t('Ngôn ngữ')} />
      <View style={styles.listItemContainer}>
        {options?.map((item, index) => (
          <View style={styles.itemSelectorContainer} key={index}>
            <ItemSelectorSetting title={item.title} isSelected={item.isSelected} onPress={item.onPress} />
          </View>
        ))}
      </View>
    </CustomSafeArea>
  );
};

export default LanguageScreen;
