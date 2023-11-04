import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const GoldStarIcon = (props: SvgProps) => (
  <Svg {...props} width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path
      d="M5.3939 1.55205C5.6415 1.05036 6.3569 1.05036 6.6045 1.55205L7.7835 3.94091L10.4198 4.32398C10.9734 4.40443 11.1945 5.08483 10.7938 5.47533L8.8862 7.33478L9.33655 9.96043C9.4311 10.5118 8.85235 10.9323 8.35715 10.672L5.9992 9.43233L3.64126 10.672C3.14607 10.9323 2.5673 10.5118 2.66187 9.96043L3.1122 7.33478L1.20458 5.47533C0.803955 5.08483 1.02503 4.40443 1.57868 4.32398L4.21494 3.94091L5.3939 1.55205Z"
      fill="#F7D007"
    />
  </Svg>
);
export default GoldStarIcon;
