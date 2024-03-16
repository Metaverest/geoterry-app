import { Path, Svg } from 'react-native-svg';
import React from 'react';

const HeartIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.8201 5.57912L11.9994 6.40163L11.1761 5.57838C9.07712 3.47931 5.67385 3.47931 3.57479 5.57838C1.47572 7.67744 1.47572 11.0807 3.57479 13.1798L11.4701 21.0751C11.763 21.368 12.2379 21.368 12.5308 21.0751L20.4322 13.1783C22.5266 11.0723 22.5302 7.67857 20.4308 5.57912C18.3279 3.47623 14.923 3.47623 12.8201 5.57912Z"
        fill={focus ? '#171717' : 'white'}
      />
    </Svg>
  );
};

export default HeartIcon;
