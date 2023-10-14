import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomText from 'App/components/CustomText';
import ChevronDown from 'App/media/ChevronDown';
import ChevronUp from 'App/media/ChevronUp';
import { head, last } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export interface IFilterItemProps {
  title?: string;
  id: string;
  onValueChange: (id: string, low: number, high: number, min: number, max: number) => void;
  low: number;
  high: number;
  min: number;
  max: number;
  shouldShowDivider?: boolean;
}

const FilterItem = ({ title, min, max, shouldShowDivider = true, onValueChange, low, high, id }: IFilterItemProps) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const toggleShowOption = useCallback(() => {
    setIsShowOption(currentState => !currentState);
  }, []);

  const onValuesChangeFinish = useCallback(
    (values: number[]) => {
      onValueChange(id, head(values) as number, last(values) as number, min as number, max as number);
    },
    [onValueChange, id, min, max],
  );
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
            <CustomText style={styles.value}>{min}</CustomText>
            <CustomText style={styles.value}>{max}</CustomText>
          </View>
          <View style={styles.multiSliderContainer}>
            <MultiSlider
              sliderLength={widthPercentageToDP('100%') - 52}
              containerStyle={styles.sliderContainer}
              selectedStyle={styles.selectedStyle}
              markerStyle={styles.marker}
              pressedMarkerStyle={styles.marker}
              trackStyle={styles.track}
              values={[low, high]}
              min={min}
              max={max}
              onValuesChangeFinish={onValuesChangeFinish}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterItem;
