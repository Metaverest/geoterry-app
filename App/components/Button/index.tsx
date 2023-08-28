import { IButtonProps } from 'App/types/button';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';

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
          <TouchableOpacity onPress={props.onPress}>
            <Text style={buttonTitleStyle}>{props.title}</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    case EButtonType.OUTLINE:
      return (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.buttonContainer, props.customStyleContainer, { backgroundColor: 'transparent' }]}>
          <Text style={[styles.buttonText, props.customStyleText]}>{props.title}</Text>
        </TouchableOpacity>
      );
  }
};

export default CustomButton;
