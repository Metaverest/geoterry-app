import { View } from 'react-native';
import React from 'react';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import CustomText from 'App/components/CustomText';
import { EColor } from 'App/enums/color';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { responsiveByWidth as rw } from 'App/helpers/common';

const CustomBubble = (props: BubbleProps<IMessage>) => {
  return (
    <>
      {props.currentMessage?.user._id === props.user?._id ? (
        <LinearGradient
          style={[styles.containerBubble, { marginLeft: rw(84) }]}
          colors={[EColor.color_C072FD, EColor.color_51D5FF]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <CustomText selectable={true} style={styles.textMsg}>
            {props.currentMessage?.text}
          </CustomText>
        </LinearGradient>
      ) : (
        <View style={[styles.containerBubble, { backgroundColor: EColor.color_333333, marginRight: rw(100) }]}>
          <CustomText style={styles.textMsg} selectable={true}>
            {props.currentMessage?.text}
          </CustomText>
        </View>
      )}
    </>
  );
};

export default CustomBubble;
