import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { DEFAULT_REFERENCE_SCREEN_HEIGHT, DEFAULT_REFERENCE_SCREEN_WIDTH } from '../constants/common';

export const responsiveByWidth = (value: number, referenceScreenWidth: number = DEFAULT_REFERENCE_SCREEN_WIDTH) => {
  return widthPercentageToDP((value / referenceScreenWidth) * 100);
};

export const responsiveByHeight = (value: number, referenceScreenHeight: number = DEFAULT_REFERENCE_SCREEN_HEIGHT) => {
  return heightPercentageToDP((value / referenceScreenHeight) * 100);
};
