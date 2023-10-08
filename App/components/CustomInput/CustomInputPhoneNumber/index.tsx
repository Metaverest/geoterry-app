/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';
import { IInputProps } from 'App/types/input';
import { useCallback, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import CustomText from '../../CustomText';
import { styles } from './styles';

const CustomInputPhoneNumber = (props: IInputProps) => {
  const Subtext = useCallback(() => {
    if (props.error) {
      return <CustomText style={styles.errorText}>{props.error}</CustomText>;
    }
    if (props.helperText) {
      return <CustomText style={styles.helperText}>{props.helperText}</CustomText>;
    }
    return <></>;
  }, [props.error, props.helperText]);
  const [prefix, setPrefix] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    if (props.defaultPrefix) {
      setPrefix(props.defaultPrefix);
    }
  }, [props.defaultPrefix]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor={EColor.color_CCCCCC}
          style={styles.prefixInput}
          {...props}
          placeholder=""
          keyboardType="number-pad"
          onChangeText={text => {
            setPrefix(text);
            props.onChangeText && props.onChangeText(`${text}${phone}`);
          }}
          value={prefix}
        />
        <View style={styles.divider} />
        <TextInput
          placeholderTextColor={EColor.color_CCCCCC}
          style={styles.phoneInput}
          {...props}
          value={phone}
          keyboardType="number-pad"
          onChangeText={text => {
            setPhone(text);
            props.onChangeText && props.onChangeText(`${prefix}${text}`);
          }}
        />
      </View>
      <Subtext />
    </View>
  );
};
export default CustomInputPhoneNumber;
