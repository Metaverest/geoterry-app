import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';
import RadioButtonChecked from 'App/media/RadioButtonChecked';
import RadioButtonUncheck from 'App/media/RadioButtonUncheck';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { STATUS_ROLE_REQUESTING } from 'App/enums';

export interface IItemSelectorSettingProps {
  disabled?: boolean;
  title: string;
  isSelected: boolean;
  onPress: () => void;
  status?: STATUS_ROLE_REQUESTING;
}
const ItemSelectorSetting = ({ onPress, title, isSelected, status, disabled }: IItemSelectorSettingProps) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={styles.container}>
        <View>
          <CustomText style={styles.title}>{title}</CustomText>
          {status === STATUS_ROLE_REQUESTING.PENDING && (
            <CustomText style={styles.status}>{t('Đang chờ xét duyệt')}</CustomText>
          )}
        </View>

        {isSelected ? <RadioButtonChecked /> : <RadioButtonUncheck />}
      </View>
    </TouchableOpacity>
  );
};

export default ItemSelectorSetting;
