import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';
import RadioButtonChecked from 'App/media/RadioButtonChecked';
import RadioButtonUncheck from 'App/media/RadioButtonUncheck';
import { styles } from './styles';

export interface IItemSelectorSettingProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const ItemSelectorSetting = ({ onPress, title, isSelected }: IItemSelectorSettingProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <CustomText style={styles.title}>{title}</CustomText>
        {isSelected ? <RadioButtonChecked /> : <RadioButtonUncheck />}
      </View>
    </TouchableOpacity>
  );
};

export default ItemSelectorSetting;
