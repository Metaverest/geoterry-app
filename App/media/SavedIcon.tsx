import { Path, Svg } from 'react-native-svg';
import React from 'react';

const SavedIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.19094 21.8547C5.6948 22.2117 5.00293 21.8571 5.00293 21.2459V6.25C5.00293 4.45507 6.458 3 8.25293 3H15.7513C17.5462 3 19.0013 4.45507 19.0013 6.25V21.2459C19.0013 21.8571 18.3094 22.2117 17.8133 21.8547L12.0021 17.6738L6.19094 21.8547Z"
        fill={focus ? '#171717' : 'white'}
      />
    </Svg>
  );
};

export default SavedIcon;
