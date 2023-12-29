import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';
import React from 'react';
import { responsiveByWidth as rw } from 'App/helpers/common';

const AddressSelectionMarkerIcon = () => (
  <Svg width={rw(40)} height={rw(40)} viewBox="0 0 32 32" fill="none">
    <Path
      d="M27.4935 11.2673C26.0935 5.10732 20.7201 2.33398 16.0001 2.33398C16.0001 2.33398 16.0001 2.33398 15.9868 2.33398C11.2801 2.33398 5.89346 5.09398 4.49346 11.254C2.93346 18.134 7.14679 23.9606 10.9601 27.6273C12.3735 28.9873 14.1868 29.6673 16.0001 29.6673C17.8135 29.6673 19.6268 28.9873 21.0268 27.6273C24.8401 23.9606 29.0535 18.1473 27.4935 11.2673ZM16.0001 17.9473C13.6801 17.9473 11.8001 16.0673 11.8001 13.7473C11.8001 11.4273 13.6801 9.54732 16.0001 9.54732C18.3201 9.54732 20.2001 11.4273 20.2001 13.7473C20.2001 16.0673 18.3201 17.9473 16.0001 17.9473Z"
      fill="url(#paint0_linear_2361_2588)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2361_2588"
        x1="15.9936"
        y1="29.6698"
        x2="2.4397"
        y2="14.2405"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C072FD" />
        <Stop offset="1" stopColor="#51D5FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AddressSelectionMarkerIcon;
