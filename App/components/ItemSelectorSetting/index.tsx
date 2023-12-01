import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';
import RadioButtonChecked from 'App/media/RadioButtonChecked';
import RadioButtonUncheck from 'App/media/RadioButtonUncheck';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { EUseRoleRequestStatus } from 'App/enums';

export interface IItemSelectorSettingProps {
  disabled?: boolean;
  title: string;
  isSelected: boolean;
  onPress: () => void;
  status?: EUseRoleRequestStatus;
}
const ItemSelectorSetting = ({ onPress, title, isSelected, status, disabled }: IItemSelectorSettingProps) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={styles.container}>
        <View>
          <CustomText style={styles.title}>{title}</CustomText>
          {status === EUseRoleRequestStatus.PENDING && (
            <CustomText style={styles.status}>{t('Đang chờ xét duyệt')}</CustomText>
          )}
          {status === EUseRoleRequestStatus.REJECTED && (
            <CustomText style={styles.status}>{t('Bị từ chối')}</CustomText>
          )}
        </View>

        {isSelected ? <RadioButtonChecked /> : <RadioButtonUncheck />}
      </View>
    </TouchableOpacity>
  );
};

export default ItemSelectorSetting;
