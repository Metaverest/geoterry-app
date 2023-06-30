import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Callout } from 'react-native-maps';
import isEmpty from 'lodash/isEmpty';
import { responsiveByHeight as rh, responsiveByWidth as rw } from '../../helpers/common';

interface TerryCalloutProps {
  description?: string;
  title?: string;
  imageUrls?: string[];
}

const TerryCallout = (props: TerryCalloutProps) => {
  return (
    <Callout>
      <View>
        <Text>{props.title}</Text>
        <Text>{props.description}</Text>
        {props.imageUrls && !isEmpty(props.imageUrls) && <Image source={{ uri: props.imageUrls[0] }} />}
        <TouchableOpacity style={styles.viewBtn}>
          <Text>View</Text>
        </TouchableOpacity>
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  viewBtn: {
    height: rh(48),
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rw(12),
    marginTop: rh(4),
  },
});

export default TerryCallout;
