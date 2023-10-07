/* eslint-disable react-native/no-inline-styles */
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { IButtonProps } from 'App/types/button';
import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import { styles } from './styles';

const CustomButton = (props: IButtonProps) => {
  const solidButtonColorStyle = useMemo(() => {
    let color = props.linearGradient || [];
    if (props.disabled) {
      color = [EColor.color_666666, EColor.color_666666];
    }
    return color;
  }, [props.disabled, props.linearGradient]);
  const buttonTitleStyle = useMemo(() => {
    let style = [styles.buttonText, props.customStyleText];
    if (props.disabled) {
      style.push({ color: EColor.color_999999 });
    }
    return style;
  }, [props.disabled, props.customStyleText]);
  switch (props.buttonType) {
    case EButtonType.SOLID:
      return (
        <LinearGradient
          style={[styles.buttonContainer, props.customStyleContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={solidButtonColorStyle}>
          <Pressable onPress={props.onPress}>
            <CustomText style={buttonTitleStyle}>{props.title}</CustomText>
          </Pressable>
        </LinearGradient>
      );
    case EButtonType.OUTLINE:
      return (
        <Pressable
          onPress={props.onPress}
          style={[styles.buttonContainer, props.customStyleContainer, { backgroundColor: 'transparent' }]}>
          <CustomText style={[styles.buttonText, props.customStyleText]}>{props.title}</CustomText>
        </Pressable>
      );
  }
};

export default CustomButton;
