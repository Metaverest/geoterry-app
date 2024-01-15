import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Platform } from 'react-native';
import {
  DEFAULT_REFERENCE_SCREEN_HEIGHT,
  DEFAULT_REFERENCE_SCREEN_WIDTH,
  LOCAL_MESSAGE_PREFIX,
} from 'App/constants/common';

export const responsiveByWidth = (value: number, referenceScreenWidth: number = DEFAULT_REFERENCE_SCREEN_WIDTH) => {
  return widthPercentageToDP((value / referenceScreenWidth) * 100);
};

export const responsiveByHeight = (value: number, referenceScreenHeight: number = DEFAULT_REFERENCE_SCREEN_HEIGHT) => {
  return heightPercentageToDP((value / referenceScreenHeight) * 100);
};

export const isIOSDevice = () => {
  return Platform.OS === 'ios';
};

export const isAndroidDevice = () => {
  return Platform.OS === 'android';
};

export const generateLocalMessageId = () => {
  return `${LOCAL_MESSAGE_PREFIX}${uuidv4()}`;
};
