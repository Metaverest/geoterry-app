import { EButtonType } from 'App/enums';
import { IButtonIconProps } from 'App/types/button';
import { isArray } from 'lodash';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import { styles } from './styles';

const CustomButtonIcon = (props: IButtonIconProps) => {
  const isLinearGradient = useMemo(() => {
    return isArray(props.buttonColor);
  }, [props.buttonColor]);
  switch (props.buttonType) {
    case EButtonType.SOLID:
      if (isLinearGradient) {
        return (
          <LinearGradient
            style={[props.customStyleContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={props.buttonColor as string[]}>
            <TouchableOpacity onPress={props.onPress}>{props.renderIcon}</TouchableOpacity>
          </LinearGradient>
        );
      }
      return (
        <TouchableOpacity
          style={[props.customStyleContainer, { backgroundColor: props.buttonColor }]}
          onPress={props.onPress}>
          {props.renderIcon}
        </TouchableOpacity>
      );
    case EButtonType.OUTLINE:
      return (
        <TouchableOpacity
          style={[props.customStyleContainer, { backgroundColor: props.buttonColor }]}
          onPress={props.onPress}>
          {props.renderIcon}
          {props.title && <CustomText style={styles.buttonText}>{props.title}</CustomText>}
        </TouchableOpacity>
      );
  }
};

export default CustomButtonIcon;
