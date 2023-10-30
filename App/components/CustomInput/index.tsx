/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh } from 'App/helpers/common';
import { IInputProps } from 'App/types/input';
import { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import CustomText from '../CustomText';
import { styles } from './styles';
const MIN_HEIGHT_MULTILINES_MODE = rh(83);
const CustomInput = (props: IInputProps) => {
  const [inputHeight, setInputHeight] = useState<number>(0);
  const Subtext = useCallback(() => {
    if (props.error) {
      return <CustomText style={styles.errorText}>{props.error}</CustomText>;
    }
    if (props.helperText) {
      return <CustomText style={styles.helperText}>{props.helperText}</CustomText>;
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
        <TextInput
          placeholderTextColor={EColor.color_666666}
          style={[
            styles.input,
            // eslint-disable-next-line react-native/no-inline-styles
            props.multiline && {
              height: MIN_HEIGHT_MULTILINES_MODE > inputHeight ? MIN_HEIGHT_MULTILINES_MODE : inputHeight,
              textAlignVertical: 'top',
            },
          ]}
          {...props}
          onContentSizeChange={event => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
        <ButtonIcon />
      </View>
      <Subtext />
    </View>
  );
};
export default CustomInput;
