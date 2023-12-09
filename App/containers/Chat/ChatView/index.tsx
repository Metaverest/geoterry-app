import { useRoute } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Avatar, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import CustomBubble from './CustomBubble';
import CustomSend from './CustomSend';
import { styles } from './styles';

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
    <CustomSafeArea
      shouldDisableKeyboardAwareScroll
      style={styles.container}
      backgroundImageSource={AppBackgroundImage}>
      <GiftedChat
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.id,
        }}
        renderSend={props => <CustomSend {...props} />}
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
        messagesContainerStyle={{ paddingTop: rh(68), paddingBottom: rh(24) }}
        renderInputToolbar={props => <InputToolbar {...props} containerStyle={styles.inputToolBarContainer} />}
        textInputProps={styles.textInputProps}
        placeholder={t('Nhập tin nhắn')}
        renderBubble={props => <CustomBubble {...props} />}
      />
      <Header isChatView />
    </CustomSafeArea>
  );
};

export default ChatView;
