import Slider from '@react-native-community/slider';
import CustomText from 'App/components/CustomText';
import { EColor } from 'App/enums/color';
import ChevronDown from 'App/media/ChevronDown';
import ChevronUp from 'App/media/ChevronUp';
import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';

export interface IFilterItemProps {
  title?: string;
  id?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  shouldShowDivider?: boolean;
}

const FilterItem = ({ value, title, min, max, shouldShowDivider = true }: IFilterItemProps) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const toggleShowOption = useCallback(() => {
    setIsShowOption(currentState => !currentState);
  }, []);
  return (
    <View>
      <Pressable
        onPress={toggleShowOption}
        style={[styles.openedContainer, !isShowOption && shouldShowDivider && styles.borderBottom]}>
        <>
          <CustomText style={styles.title}>{title}</CustomText>
          {isShowOption ? <ChevronUp /> : <ChevronDown />}
        </>
      </Pressable>
      {isShowOption && (
        <View style={[styles.optionContainer, shouldShowDivider && styles.borderBottom]}>
          <View style={styles.valueContainer}>
            <CustomText style={styles.value}>{value}</CustomText>
            <CustomText style={styles.value}>{max}</CustomText>
          </View>
          <Slider
            thumbTintColor={EColor.color_FAFAFA}
            style={styles.slider}
            minimumValue={min}
            maximumValue={max}
            minimumTrackTintColor={EColor.color_FAFAFA}
            maximumTrackTintColor={EColor.color_FAFAFA}
          />
        </View>
      )}
    </View>
  );
};

export default FilterItem;
