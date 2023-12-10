/* eslint-disable react/react-in-jsx-scope */
import { EColor } from 'App/enums/color';

import { IInputProps } from 'App/types/input';
import { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import CustomText from '../CustomText';
import { styles } from './styles';
import { responsiveByHeight as rh } from 'App/helpers/common';

const DEFAULT_MIN_HEIGHT_MULTILINES_MODE = rh(83);
const CustomInput = (props: IInputProps = { editable: true }) => {
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
    return null;
  }, [props.icon]);

  return (
    <View style={styles.container}>
      {props.title && <CustomText style={styles.title}>{props.title}</CustomText>}
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor={EColor.color_666666}
          style={[
            styles.input,
            // eslint-disable-next-line react-native/no-inline-styles
            props.multiline && {
              height:
                props.minHeightInput || DEFAULT_MIN_HEIGHT_MULTILINES_MODE > inputHeight
                  ? props.minHeightInput || DEFAULT_MIN_HEIGHT_MULTILINES_MODE
                  : inputHeight,
              textAlignVertical: 'top',
            },
            // eslint-disable-next-line react-native/no-inline-styles
            !ButtonIcon() && { width: '100%' },
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
