import { RouteProp, useRoute } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { EMessagePayloadType, ISendMessageInputDto } from 'App/types/chat';
import { head, isEmpty, map, orderBy } from 'lodash';
import { default as React, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Avatar, Day, GiftedChat, IMessage, InputToolbar } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import CustomBubble from './CustomBubble';
import CustomSend from './CustomSend';
import { styles } from './styles';
import { reduxAppAction } from 'App/redux/actions/appAction';

const ChatView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);

  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.CHAT_VIEW_SCREEN>>();
  const conversationId = useMemo(() => params?.conversationId, [params]);
  const recipientId = useMemo(() => params.recipientId, [params]);
  const conversations = useSelector(reduxSelector.getConversations);
  const conversation = useMemo(() => conversations?.[conversationId], [conversations, conversationId]);
  const userFriend = useMemo(() => conversation?.participants.find(e => e.profileId !== user.id), [conversation, user]);
  const messages = useSelector(reduxSelector.getMessagesFromConversationId(conversationId));
  useEffect(() => {
    dispatch(reduxAppAction.setSelectedConversationId(conversationId));
    return () => {
      dispatch(reduxAppAction.setSelectedConversationId(undefined));
    };
  }, [dispatch, conversationId]);
  useEffect(() => {
    if (isEmpty(conversationId)) {
      return;
    }
    dispatch(
      sagaUserAction.hunterReadConversationAsync({
        conversationId,
        requestHunterReadConversationMessagesQueryParams: { markAllAsRead: true },
      }),
    );
  }, [dispatch, conversationId]);
  const messagesToDisplay = useMemo(() => {
    const formattedMessages = map(
      messages,
      message =>
        ({
          _id: message.id,
          text: message.payload.text,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.senderId,
          },
        } as IMessage),
    );
    const sortedMessages = orderBy(formattedMessages, ['createdAt'], ['asc']);
    return sortedMessages;
  }, [messages]);

  const onSend = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (messages: IMessage[]) => {
      const giftedChatMessage = head(messages);
      if (isEmpty(giftedChatMessage)) {
        return;
      }
      // The message is sent to the server in the format of ISendMessageInputDto
      const messageToSend = {
        payload: {
          type: EMessagePayloadType.TEXT,
          text: giftedChatMessage.text,
        },
        conversationId,
        recipientId: userFriend?.profileId || recipientId,
        createdAt: giftedChatMessage.createdAt.toString(),
      } as ISendMessageInputDto;
      dispatch(sagaUserAction.hunterSendMessageAsync(messageToSend));
    },
    [conversationId, dispatch, userFriend?.profileId, recipientId],
  );
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <GiftedChat
        inverted={false}
        messages={messagesToDisplay}
        onSend={onSend}
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
            <View style={[styles.avatar, { marginLeft: props.currentMessage?.user.avatar ? rw(0) : rw(7) }]}>
              <MapMarkerUserDefault width={rw(24)} height={rw(24)} />
            </View>
          )
        }
        renderDay={props => <Day {...props} textStyle={styles.day} />}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        renderTime={() => null}
        dateFormat={'hh:mm DD/MM/YYYY'}
        messagesContainerStyle={{ marginRight: rw(12), paddingTop: rh(68), paddingBottom: rh(24) }}
        renderInputToolbar={props => {
          const newProp = { placeholderTextColor: EColor.color_666666 };
          return <InputToolbar {...newProp} {...props} containerStyle={styles.inputToolBarContainer} />;
        }}
        textInputProps={styles.textInputProps}
        placeholder={t('Nhập tin nhắn')}
        renderBubble={props => <CustomBubble {...props} />}
      />
      <Header avatar={''} name={'Test'} isChatView />
    </CustomSafeArea>
  );
};

export default ChatView;
