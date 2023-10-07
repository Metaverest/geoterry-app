import CustomSwipeUpModal from 'App/components/SwipeUpModal';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FilterItem from './FilterItem';
import FilterItemWithCheckbox, { IOption } from './FilterItemWithCheckbox';
import { styles } from './styles';
import CustomButton from 'App/components/Button';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
const options: IOption[] = [
  { id: '1', title: '1', value: '1' },
  { id: '2', title: '2', value: '2' },
];

const FilterScreen = () => {
  const { t } = useTranslation();
  const applyFilter = useCallback(() => {}, []);
  const resetFilter = useCallback(() => {}, []);
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  return (
    <CustomSwipeUpModal title={t('Bộ lọc')}>
      <View style={styles.container}>
        <ScrollView>
          <FilterItem id="distance" value={2} title="Mặc định" max={5} min={0} />
          <FilterItem id="distance" value={2} title="Mặc định" max={5} min={0} />
          <FilterItem id="distance" value={2} title="Mặc định" max={5} min={0} />
          <FilterItem id="distance" value={2} title="Mặc định" max={5} min={0} />
          <FilterItemWithCheckbox
            title="Category"
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            shouldShowDivider={false}
          />
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={resetFilter}
            customStyleText={styles.customOutlineButtonText}
            customStyleContainer={styles.customOutlineButtonContainer}
            title={t('Xoá bộ lọc')}
            buttonType={EButtonType.OUTLINE}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={applyFilter}
            title={t('Áp dụng')}
            buttonType={EButtonType.SOLID}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
          />
        </View>
      </View>
    </CustomSwipeUpModal>
  );
};

export default FilterScreen;
