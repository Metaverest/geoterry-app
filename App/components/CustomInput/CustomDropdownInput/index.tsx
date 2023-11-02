import CustomText from 'App/components/CustomText';
import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import ArrowDownIcon from 'App/media/ArrowDownIcon';
import ArrowUpIcon from 'App/media/ArrowUpIcon';
import { IInputProps } from 'App/types/input';
import { head, isEmpty, isNumber, last } from 'lodash';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles';

interface Props extends IInputProps {
  zIndex: number;
  zIndexInverse: number;
  title?: string;
  options: any[];
  onSelectOption: (o: any) => void;
  selectedOption: any;
}

const CustomDropdownInput = (props: Props) => {
  const [open, setOpen] = useState(false);
  const isFirstOption = useCallback(
    (item: any) => {
      return item.value === head(props.options || [])?.value;
    },
    [props.options],
  );

  const isLastOption = useCallback(
    (item: any) => {
      return item.value === last(props.options || [])?.value;
    },
    [props.options],
  );
  const getLabelBasedOnValue = useCallback(
    (value: any) => {
      return head(props.options.filter(o => o.value === value))?.label;
    },
    [props.options],
  );
  return (
    <DropDownPicker
      zIndex={props.zIndex}
      zIndexInverse={props.zIndexInverse}
      disableBorderRadius={false}
      dropDownContainerStyle={styles.dropDownContainer}
      style={[styles.textInputContainer, open && { borderWidth: rw(1), borderColor: EColor.color_CCCCCC }]}
      renderListItem={item => (
        <TouchableOpacity
          onPress={() => {
            props.onSelectOption(item.value);
            setOpen(false);
          }}
          style={[
            styles.itemContainer,
            isFirstOption(item) && { borderTopLeftRadius: rh(16), borderTopRightRadius: rh(16) },
            isLastOption(item) && { borderBottomWidth: rh(0) },
          ]}>
          <CustomText style={styles.itemText}>{item.label}</CustomText>
        </TouchableOpacity>
      )}
      renderBodyComponent={_item => (
        <View style={styles.bodyComponentContainer}>
          <CustomText
            style={[
              styles.bodyComponentText,
              (!isEmpty(props.selectedOption) || (isNumber(props.selectedOption) && props.selectedOption > 0)) && {
                color: EColor.color_CCCCCC,
              },
            ]}>
            {getLabelBasedOnValue(props.selectedOption) || props.placeholder}
          </CustomText>
        </View>
      )}
      open={open}
      value={props.selectedOption}
      items={props.options}
      setOpen={setOpen}
      ArrowDownIconComponent={() => <ArrowDownIcon />}
      ArrowUpIconComponent={() => <ArrowUpIcon />}
    />
  );
};

export default CustomDropdownInput;
