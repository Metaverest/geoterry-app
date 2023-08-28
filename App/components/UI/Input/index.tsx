import { ColorPalette } from 'App/styles';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { EKeyboardType } from 'App/Enums';

interface IInputProps {
  label?: string;
  labelStyle?: Object;
  style?: Object;
  required?: boolean;
  multiline?: boolean;
  value?: string;
  maxLength?: number;
  handleChange?: any;
  keyboardType?: EKeyboardType;
  placeholder?: string;
  isPasswordHide?: boolean;
  inputStyle?: Object;
  errorMessage?: string;
}

const TerryInput = (props: IInputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={[styles.container, props.style]}>
      {props.label && (
        <Text style={[styles.label, props.labelStyle]}>
          {props.label}
          {props.required && <Text style={styles.requiredDot}> *</Text>}
        </Text>
      )}
      <View
        style={[
          styles.textInputContainer,
          props.inputStyle,
          focused && styles.textInputFocused,
          !!props.errorMessage && styles.textInputError,
        ]}>
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.textInput]}
          multiline={props.multiline}
          maxLength={props.maxLength}
          value={props.value}
          onChangeText={props.handleChange}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          secureTextEntry={props.isPasswordHide}
        />
      </View>
      {props.errorMessage && (
        <View>
          <Text style={styles.errorMessage}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: ColorPalette.purple80,
    fontSize: 26,
    fontWeight: '700',
    height: rh(26),
  },
  requiredDot: {
    color: ColorPalette.red80,
  },
  textInput: {
    textAlignVertical: 'top',
    color: ColorPalette.gray80,
    marginHorizontal: rw(16),
    fontSize: 24,
  },
  textInputContainer: {
    width: '100%',
    height: rh(48),
    borderStyle: 'solid',
    borderColor: ColorPalette.purple80,
    borderWidth: 2,
    borderRadius: 14,
    marginTop: rh(14),
    justifyContent: 'center',
  },
  textInputFocused: {
    borderColor: ColorPalette.purple60,
  },
  textInputError: {
    borderColor: ColorPalette.red80,
  },
  errorMessage: {
    color: ColorPalette.red80,
    fontSize: 20,
    marginTop: rh(5),
    height: rh(20),
    fontStyle: 'italic',
  },
});

export default TerryInput;
