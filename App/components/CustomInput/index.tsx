/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';
import { IInputProps } from 'App/types/input';
import { useCallback } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';

const CustomInput = (props: IInputProps) => {
  const Subtext = useCallback(() => {
    if (props.error) {
      return <Text style={styles.errorText}>{props.error}</Text>;
    }
    if (props.helperText) {
      return <Text style={styles.helperText}>{props.helperText}</Text>;
    }
    return <></>;
  }, [props.error, props.helperText]);
  const ButtonIcon = useCallback(() => {
    if (props.icon) {
      return <View style={styles.iconContainer}>{props.icon}</View>;
    }
    return <></>;
  }, [props.icon]);
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput placeholderTextColor={EColor.color_CCCCCC} style={styles.input} {...props} />
        <ButtonIcon />
      </View>
      <Subtext />
    </View>
  );
};
export default CustomInput;
