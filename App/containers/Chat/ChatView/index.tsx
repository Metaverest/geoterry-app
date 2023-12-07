import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import { styles } from './styles';
import { Avatar, BubbleProps, GiftedChat, IMessage, InputToolbar, Send, SendProps } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import { EColor } from 'App/enums/color';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import CustomText from 'App/components/CustomText';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import SendIcon from 'App/media/SendIcon';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import { useRoute } from '@react-navigation/native';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';

const dataMock = [
  {
    payload: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sequi, aliquid repudiandae nobis vero illo placeat eligendi, nemo temporibus mollitia similique quisquam inventore eveniet quia perferendis possimus ut architecto eum?',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:19:18.446Z',
    createdAt: '2023-12-04T08:19:18.450Z',
    updatedAt: '2023-12-04T08:19:18.450Z',
    id: '656d8b86e30ed00c826fe3b8',
  },
  {
    payload: {
      type: 'text',
      text: '1',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:18:49.365Z',
    createdAt: '2023-12-04T08:18:49.367Z',
    updatedAt: '2023-12-04T08:18:49.367Z',
    id: '656d8b6992407f3c6c76dd41',
  },
  {
    payload: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sequi, aliquid repudiandae nobis vero illo placeat eligendi, nemo temporibus mollitia similique quisquam inventore eveniet quia perferendis possimus ut architecto eum?',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:19:18.446Z',
    createdAt: '2023-12-04T19:19:18.450Z',
    updatedAt: '2023-12-04T19:19:18.450Z',
    id: '2',
  },
  {
    payload: {
      type: 'text',
      text: '1',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:18:49.365Z',
    createdAt: '2023-12-04T19:18:49.367Z',
    updatedAt: '2023-12-04T19:18:49.367Z',
    id: '3',
  },
  {
    payload: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sequi, aliquid repudiandae nobis vero illo placeat eligendi, nemo temporibus mollitia similique quisquam inventore eveniet quia perferendis possimus ut architecto eum?',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:19:18.446Z',
    createdAt: '2023-12-04T19:19:18.450Z',
    updatedAt: '2023-12-04T19:19:18.450Z',
    id: '4',
  },
  {
    payload: {
      type: 'text',
      text: '1',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:18:49.365Z',
    createdAt: '2023-12-04T19:18:49.367Z',
    updatedAt: '2023-12-04T19:18:49.367Z',
    id: '5',
  },
  {
    payload: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sequi, aliquid repudiandae nobis vero illo placeat eligendi, nemo temporibus mollitia similique quisquam inventore eveniet quia perferendis possimus ut architecto eum?',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:19:18.446Z',
    createdAt: '2023-12-04T19:19:18.450Z',
    updatedAt: '2023-12-04T19:19:18.450Z',
    id: '6',
  },
  {
    payload: {
      type: 'text',
      text: '1',
    },
    conversationId: '656d8b6992407f3c6c76dd3f',
    senderId: '650484ce6b231c404d74fb8a',
    recipientId: '654fbb412bb9e9b95e5579c7',
    sentAt: '2023-12-04T08:18:49.365Z',
    createdAt: '2023-12-04T19:18:49.367Z',
    updatedAt: '2023-12-04T19:18:49.367Z',
    id: '7',
  },
];

const ChatView = () => {
  const { params } = useRoute<any>();
  const { t } = useTranslation();
  const user = useSelector(reduxSelector.getUser);
  const [messagesList, setMessagesList] = useState<any>([]);

  const RenderBubble = useCallback((props: BubbleProps<IMessage>) => {
    return (
      <>
        {props.currentMessage?.user._id === props.user?._id ? (
          <LinearGradient
            style={[styles.containerBubble, { marginLeft: rw(84) }]}
            colors={[EColor.color_C072FD, EColor.color_51D5FF]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <CustomText style={styles.textMsg}>{props.currentMessage?.text}</CustomText>
          </LinearGradient>
        ) : (
          <View style={[styles.containerBubble, { backgroundColor: EColor.color_333333, marginRight: rw(100) }]}>
            <CustomText style={styles.textMsg}>{props.currentMessage?.text}</CustomText>
          </View>
        )}
      </>
    );
  }, []);
  const RenderSend = useCallback((props: SendProps<IMessage>) => {
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
  }, []);

  useEffect(() => {
    if (dataMock) {
      const formatMsg = dataMock.map(e => ({
        _id: e.id,
        text: e.payload.text,
        createdAt: e.createdAt,
        user: {
          _id: 1 || e.senderId,
          name: 'React Native',
          avatar: params.avatar,
        },
      }));
      setMessagesList(formatMsg);
    }
  }, [params.avatar]);
  const onSend = useCallback((messages: any = []) => {
    setMessagesList((previousMessages: any) => GiftedChat.append(previousMessages, messages));
  }, []);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <GiftedChat
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.id,
        }}
        renderSend={RenderSend}
        listViewProps={{ showsVerticalScrollIndicator: false }}
        alwaysShowSend
        scrollToBottom
        renderAvatar={props =>
          props.currentMessage?.user.avatar ? (
            <Avatar {...props} position="right" imageStyle={{ right: styles.avatar }} />
          ) : (
            <View style={styles.avatar}>
              <MapMarkerUserDefault width={rw(24)} height={rh(24)} />
            </View>
          )
        }
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        renderTime={() => null}
        dateFormat={'hh:mm DD/MM/YYYY'}
        messagesContainerStyle={{ marginRight: rw(12), paddingTop: rh(68) }}
        renderInputToolbar={props => <InputToolbar {...props} containerStyle={styles.inputToolBarContainer} />}
        textInputProps={styles.textInputProps}
        placeholder={t('Nhập tin nhắn')}
        renderBubble={RenderBubble}
      />
      <Header avatar={params.avatar} name={params.name} />
    </CustomSafeArea>
  );
};

export default ChatView;
