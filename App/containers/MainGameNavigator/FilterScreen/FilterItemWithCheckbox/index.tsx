import CustomText from 'App/components/CustomText';
import CheckboxChecked from 'App/media/CheckboxChecked';
import CheckboxUncheck from 'App/media/CheckboxUncheck';
import ChevronDown from 'App/media/ChevronDown';
import ChevronUp from 'App/media/ChevronUp';
import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
export interface IOption {
  id: string;
  title: string;
  value: any;
}
export interface IFilterItemWithCheckboxProps {
  title?: string;
  id?: string;
  options: IOption[];
  selectedOptions?: IOption[];
  setSelectedOptions?: (options: IOption[]) => void;
  shouldShowDivider?: boolean;
}
const FilterItemWithCheckbox = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  shouldShowDivider = true,
}: IFilterItemWithCheckboxProps) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const toggleShowOption = useCallback(() => {
    setIsShowOption(currentState => !currentState);
  }, []);

  const selectedOptionIds = useMemo(() => {
    return selectedOptions?.map(item => item.id);
  }, [selectedOptions]);
  const isSelectedOption = useCallback(
    (option: IOption) => {
      return selectedOptionIds?.includes(option.id);
    },
    [selectedOptionIds],
  );

  const toggleOption = useCallback(
    (option: IOption) => {
      if (isSelectedOption(option)) {
        setSelectedOptions && setSelectedOptions(selectedOptions?.filter(item => item.id !== option.id) as IOption[]);
      } else {
        setSelectedOptions && setSelectedOptions([...(selectedOptions || []), option]);
      }
    },
    [selectedOptions, setSelectedOptions, isSelectedOption],
  );

  return (
    <View>
      <TouchableOpacity
        onPress={toggleShowOption}
        style={[styles.openedContainer, !isShowOption && shouldShowDivider && styles.borderBottom]}>
        <>
          <CustomText style={styles.title}>{title}</CustomText>
          {isShowOption ? <ChevronUp /> : <ChevronDown />}
        </>
      </TouchableOpacity>
      {isShowOption && (
        <View style={[styles.optionContainer, shouldShowDivider && styles.borderBottom]}>
          {options?.map(option => {
            return (
              <TouchableOpacity key={option.id} onPress={() => toggleOption(option)}>
                <View style={styles.optionItemContainer}>
                  {isSelectedOption(option) ? <CheckboxChecked /> : <CheckboxUncheck />}
                  <CustomText style={styles.optionItemTitle}> {option.title || option.id}</CustomText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default FilterItemWithCheckbox;
