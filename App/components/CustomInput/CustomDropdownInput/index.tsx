import CustomText from 'App/components/CustomText';
import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh } from 'App/helpers/common';
import ArrowDownIcon from 'App/media/ArrowDownIcon';
import ArrowUpIcon from 'App/media/ArrowUpIcon';
import CheckedBoxIcon from 'App/media/CheckedBoxIcon';
import UncheckedBoxIcon from 'App/media/UncheckedBoxIcon';
import { IInputProps } from 'App/types/input';
import { head, isEmpty, last } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles';

export interface ICustomDropdownOption {
  label: string;
  value: string | number;
}
interface Props extends IInputProps {
  id: string;
  zIndex: number;
  zIndexInverse: number;
  title?: string;
  options: ICustomDropdownOption[];
  selectedOption: ICustomDropdownOption[];
  canSelectMultiple?: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any;
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

  const getIsSelectedOption = useCallback(
    (option: ICustomDropdownOption) => {
      return props.selectedOption?.some(o => o.value === option.value);
    },
    [props.selectedOption],
  );

  const displaySelectedLabel = useMemo(() => {
    const selectedOptions = props.selectedOption?.map(o => o.label);
    return selectedOptions?.join(', ');
  }, [props.selectedOption]);

  const onSelectOption = useCallback(
    (option: ICustomDropdownOption) => {
      if (props.canSelectMultiple) {
        if (getIsSelectedOption(option)) {
          props.setFieldValue(
            props.id,
            props.selectedOption.filter(o => o.value !== option.value),
            true,
          );
        } else {
          props.setFieldValue(props.id, [...props.selectedOption, option], true);
        }
      } else {
        props.setFieldValue(props.id, option, true);
      }
    },
    [getIsSelectedOption, props],
  );

  return (
    <View style={styles.container}>
      {props.title && <CustomText style={styles.title}>{props.title}</CustomText>}
      <DropDownPicker
        listMode="SCROLLVIEW"
        zIndex={props.zIndex}
        zIndexInverse={props.zIndexInverse}
        disableBorderRadius={false}
        dropDownContainerStyle={styles.dropDownContainer}
        style={[styles.textInputContainer, open && styles.textInputContainerOpen]}
        renderListItem={item => (
          <TouchableOpacity
            onPress={() => {
              onSelectOption({ label: item.label, value: item.value });
              !props.canSelectMultiple && setOpen(false);
            }}
            style={[
              styles.itemContainer,
              isFirstOption(item) && { borderTopLeftRadius: rh(16), borderTopRightRadius: rh(16) },
              isLastOption(item) && { borderBottomWidth: rh(0) },
            ]}>
            {props.canSelectMultiple ? getIsSelectedOption(item) ? <CheckedBoxIcon /> : <UncheckedBoxIcon /> : null}
            <CustomText style={styles.itemText}>{item.label}</CustomText>
          </TouchableOpacity>
        )}
        renderBodyComponent={_item => (
          <View style={styles.bodyComponentContainer}>
            <CustomText
              style={[
                styles.bodyComponentText,
                !isEmpty(props.selectedOption) && {
                  color: EColor.color_CCCCCC,
                },
              ]}>
              {displaySelectedLabel || props.placeholder}
            </CustomText>
          </View>
        )}
        open={open}
        items={props.options}
        setOpen={setOpen}
        ArrowDownIconComponent={() => <ArrowDownIcon />}
        ArrowUpIconComponent={() => <ArrowUpIcon />}
      />
    </View>
  );
};

export default CustomDropdownInput;
