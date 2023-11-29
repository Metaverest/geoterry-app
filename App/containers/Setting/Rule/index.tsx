import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import ItemSelectorSetting, { IItemSelectorSettingProps } from 'App/components/ItemSelectorSetting';
import { AppBackgroundImage } from 'App/components/image';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { requestSwitchRole } from 'App/utils/axios';
import { ROLE_USER } from 'App/enums';

const RuleScreen = () => {
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);

  const handleSave = useCallback(async () => {}, []);
  const RightButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handleSave}>
        <CustomText numberOfLines={1} style={styles.saveText}>
          {t('Lưu')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [t, handleSave]);

  const options: IItemSelectorSettingProps[] = useMemo(() => {
    return [
      {
        title: t('Hunter'),
        isSelected: user.role === ROLE_USER.hunter,
        onPress: () => requestSwitchRole(ROLE_USER.hunter, ''),
      },
      {
        title: t('Builder'),
        isSelected: user.role === ROLE_USER.builder,
        onPress: () => requestSwitchRole(ROLE_USER.builder, ''),
      },
    ] as IItemSelectorSettingProps[];
  }, [t, user.role]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Vai trò')} rightButton={<RightButton />} />
      <CustomText style={styles.chooseRuleTitle}>{t('Lựa chọn vai trò người chơi')}</CustomText>
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

export default RuleScreen;
