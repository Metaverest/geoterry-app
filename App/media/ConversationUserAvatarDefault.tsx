import { Defs, Path, Rect, G, Svg, ClipPath, SvgProps } from 'react-native-svg';
import React from 'react';
const ConversationUserAvatarDefault = (props: SvgProps) => {
  return (
    <Svg width={props.width || '36'} height={props.height || '36'} viewBox="0 0 36 36" fill="none">
      <G clip-path="url(#clip0_2632_9140)">
        <Rect width="36" height="36" rx="18" fill="#C5C5C5" />
        <Path
          d="M0 16C0 8.458 -2.38419e-07 4.686 2.344 2.344C4.686 -2.38419e-07 8.458 0 16 0H20C27.542 0 31.314 -2.38419e-07 33.656 2.344C36 4.686 36 8.458 36 16V20C36 27.542 36 31.314 33.656 33.656C31.314 36 27.542 36 20 36H16C8.458 36 4.686 36 2.344 33.656C-2.38419e-07 31.314 0 27.542 0 20V16Z"
          fill="#C5C5C5"
        />
        <Path
          d="M18 22C22.4183 22 26 18.4183 26 14C26 9.58172 22.4183 6 18 6C13.5817 6 10 9.58172 10 14C10 18.4183 13.5817 22 18 22Z"
          fill="white"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.8918 34.506C31.9079 34.6087 31.889 34.7137 31.8382 34.8044C31.7875 34.895 31.7077 34.966 31.6118 35.006C29.2098 36 25.6718 36 19.9998 36H15.9998C10.3298 36 6.78982 36 4.38782 35.004C4.29228 34.9641 4.21282 34.8934 4.16209 34.8032C4.11135 34.713 4.09225 34.6083 4.10782 34.506C4.96582 28.584 10.8578 24 17.9998 24C25.1418 24 31.0338 28.584 31.8918 34.506Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2632_9140">
          <Rect width="36" height="36" rx="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default ConversationUserAvatarDefault;
