import React from 'react';
import { EColor } from 'App/enums/color';
import SendIcon from 'App/media/SendIcon';
import { IMessage, Send, SendProps } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';

const CustomSend = (props: SendProps<IMessage>) => {
  return (
    <LinearGradient
      style={styles.btnSend}
      colors={[EColor.color_C072FD, EColor.color_51D5FF]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Send {...props} containerStyle={styles.btnSend}>
        <SendIcon />
      </Send>
    </LinearGradient>
  );
};

export default CustomSend;
