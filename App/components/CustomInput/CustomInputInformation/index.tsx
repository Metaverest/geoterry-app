import { View, TextInput } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { EColor } from 'App/enums/color';
import CustomText from 'App/components/CustomText';
import { useTranslation } from 'react-i18next';
import { IInputProps } from 'App/types/input';

interface Props extends IInputProps {
  title: string;
  underline?: boolean;
}
const CustomInputInformation = (props: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.boxInfor}>
      <View style={styles.boxTitle}>
        <CustomText style={styles.titleInfor}>{t(props.title)}</CustomText>
      </View>
      <TextInput
        placeholder={t(props.placeholder || '')}
        style={[styles.textInput, props.underline && styles.underline]}
        placeholderTextColor={EColor.color_666666}
        {...props}
      />
    </View>
  );
};

export default CustomInputInformation;
