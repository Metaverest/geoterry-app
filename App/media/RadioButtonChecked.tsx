import { Defs, LinearGradient, Path, Rect, Stop, Svg } from 'react-native-svg';
import React from 'react';
import { EColor } from 'App/enums/color';

const RadioButtonChecked = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect x="7" y="8" width="12" height="9" fill="white" />
      <Path
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z"
        fill="url(#paint0_linear_542_6857)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_542_6857"
          x1="12.0001"
          y1="22.0018"
          x2="2.36231"
          y2="9.33063"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={EColor.color_C072FD} />
          <Stop offset="1" stopColor={EColor.color_51D5FF} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default RadioButtonChecked;
