import { Defs, LinearGradient, Path, Stop, Svg, SvgProps } from 'react-native-svg';
import React from 'react';
import { EColor } from 'App/enums/color';
const MapMarkerPolygonIcon = (props: SvgProps) => {
  return (
    <Svg width={props.width || '16'} height={props.height || '16'} viewBox="0 0 18 16" fill="none">
      <Path
        d="M10.7321 15C9.96225 16.3333 8.03775 16.3333 7.26795 15L0.339746 3C-0.430054 1.66667 0.532198 0 2.0718 0L15.9282 0C17.4678 0 18.4301 1.66667 17.6603 3L10.7321 15Z"
        fill="url(#paint0_linear_344_4119)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_344_4119"
          x1="8.99984"
          y1="-6.00214"
          x2="20.5652"
          y2="9.20325"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={EColor.color_C072FD} />
          <Stop offset="1" stopColor={EColor.color_51D5FF} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
export default MapMarkerPolygonIcon;
