import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { EMessagePayloadType, IMessageResDto, IParticipantResDto, ISendMessageInputDto } from 'App/types/chat';
import { head, isEmpty, map, orderBy, reduce } from 'lodash';
import { default as React, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { Avatar, Day, GiftedChat, IMessage, InputToolbar } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import CustomBubble from './CustomBubble';
import CustomSend from './CustomSend';
import { styles } from './styles';
import { reduxAppAction } from 'App/redux/actions/appAction';
import MessageListener from './EventListener/MessageListener';
import { EPublicReadProfileBy } from 'App/enums';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ESagaAppAction } from 'App/enums/redux';
import { getResizedImageUrl, EImageSize } from 'App/utils/images';
import ConversationUserAvatarDefault from 'App/media/ConversationUserAvatarDefault';
import useBoolean from 'App/hooks/useBoolean';
import { CHAT_MESSAGES_PAGINATION_PAGE_SIZE } from 'App/constants/common';
import { requestHunterReadConversationMessages } from 'App/utils/axios';

const NUMBER_OF_SKELETONS = 6;

const ChatView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<EMainGameNavigatorParams, EMainGameScreen.CHAT_VIEW_SCREEN>>();
  // Use conversationId in case the conversation already existed
  const conversationId = useMemo(() => params?.conversationId, [params]);
  // Use recipientId, profile in case the conversation did not exist yet
  const recipientId = useMemo(() => params.recipientId, [params]);
  const profile = useSelector(reduxSelector.getAppOtherUserProfileToDisplay);
  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const [loadEarlier, showLoadEarlier, hideLoadEarlier] = useBoolean(false);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    if (recipientId && !profile) {
      dispatch(sagaUserAction.getPublicProfileAsync(recipientId, EPublicReadProfileBy.ID));
    }
  }, [dispatch, recipientId, profile]);

  const conversations = useSelector(reduxSelector.getConversations);
  const conversation = useMemo(() => conversations?.[conversationId], [conversations, conversationId]);
  const userFriend = useMemo(() => {
    if (conversationId) {
      return conversation?.participants.find(e => e.profileId !== user.id);
    } else if (recipientId) {
      return {
        profileId: profile?.id,
        displayName: profile?.displayName,
        logoUrl: profile?.logoUrl,
      } as IParticipantResDto;
    }
  }, [
    conversation?.participants,
    conversationId,
    profile?.displayName,
    profile?.id,
    profile?.logoUrl,
    recipientId,
    user.id,
  ]);
  const messages = useSelector(reduxSelector.getMessagesFromConversationId(conversationId));

  useEffect(() => {
    return () => {
      dispatch(reduxAppAction.setSelectedConversationId(undefined));
    };
  }, [dispatch]);
  useEffect(() => {
    if (isEmpty(conversationId)) {
      return;
    }
    dispatch(
      sagaUserAction.hunterReadConversationAsync({
        conversationId,
        requestHunterReadConversationMessagesQueryParams: {
          markAllAsRead: true,
          page: pageIndex,
          pageSize: CHAT_MESSAGES_PAGINATION_PAGE_SIZE,
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, conversationId, recipientId]);
  const messagesToDisplay = useMemo(() => {
    const formattedMessages = map(
      messages,
      message =>
        ({
          _id: message.id,
          text: message.payload.text,
          createdAt: new Date(message.sentAt),
          user: {
            _id: message.senderId,
            avatar: userFriend?.logoUrl ? getResizedImageUrl(userFriend.logoUrl, EImageSize.SIZE_100) : undefined,
          },
        } as IMessage),
    );
    const sortedMessages = orderBy(formattedMessages, ['createdAt'], ['desc']);
    return sortedMessages;
  }, [messages, userFriend?.logoUrl]);

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
      dispatch(sagaUserAction.hunterSendMessageAsync(messageToSend, navigation));
    },
    [conversationId, dispatch, userFriend?.profileId, recipientId, navigation],
  );

  const onLoadEarlierMessage = useCallback(async () => {
    if (conversationId) {
      try {
        showLoadEarlier();
        const earlierMessages = await requestHunterReadConversationMessages(conversationId || '', user.id, {
          page: pageIndex + 1,
          pageSize: CHAT_MESSAGES_PAGINATION_PAGE_SIZE,
        });

        if (earlierMessages) {
          const formattedMessages: Record<string, IMessageResDto> = reduce(
            earlierMessages,
            (result, message) => {
              return {
                ...result,
                [message.id]: message,
              };
            },
            {},
          );
          dispatch(reduxAppAction.mergeMessages({ [conversationId!]: formattedMessages }));
        }
        setPageIndex(preIndex => preIndex + 1);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoadEarlier();
      }
    }
  }, [conversationId, dispatch, hideLoadEarlier, pageIndex, showLoadEarlier, user.id]);

  const CardSkeleton = useCallback(() => {
    return (
      <SkeletonPlaceholder
        backgroundColor={EColor.color_00000050}
        highlightColor={EColor.color_00000080}
        borderRadius={4}>
        <View style={styles.loadingContainer} />
      </SkeletonPlaceholder>
    );
  }, []);

  const LoadingSkeleton = useCallback(
    () => (
      <View style={styles.containList}>
        {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
          <CardSkeleton key={`loading_${index}`} />
        ))}
      </View>
    ),
    [CardSkeleton],
  );

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      {loadingStates?.[ESagaAppAction.HUNTER_READ_CONVERSATION] ? (
        <LoadingSkeleton />
      ) : (
        <GiftedChat
          inverted={true}
          messages={messagesToDisplay}
          onSend={onSend}
          user={{
            _id: user.id,
          }}
          renderSend={props => <CustomSend {...props} />}
          listViewProps={{ showsVerticalScrollIndicator: false }}
          alwaysShowSend
          renderAvatar={props =>
            props.currentMessage?.user.avatar ? (
              <Avatar {...props} position="right" imageStyle={{ right: styles.avatar }} />
            ) : (
              <View style={[styles.avatarDefault, { marginLeft: props.currentMessage?.user.avatar ? rw(0) : rw(7) }]}>
                <ConversationUserAvatarDefault width={rw(24)} height={rw(24)} />
              </View>
            )
          }
          renderDay={props => <Day {...props} textStyle={styles.day} />}
          showUserAvatar={false}
          showAvatarForEveryMessage={false}
          renderTime={() => null}
          dateFormat={'hh:mm - DD/MM/YYYY'}
          messagesContainerStyle={{ marginRight: rw(12), paddingTop: rh(68), paddingBottom: rh(24) }}
          renderInputToolbar={props => {
            const newProp = { placeholderTextColor: EColor.color_666666 };
            return <InputToolbar {...newProp} {...props} containerStyle={styles.inputToolBarContainer} />;
          }}
          textInputProps={styles.textInputProps}
          placeholder={t('Nhập tin nhắn')}
          renderBubble={props => <CustomBubble {...props} />}
          infiniteScroll
          loadEarlier
          isLoadingEarlier={loadEarlier}
          onLoadEarlier={onLoadEarlierMessage}
          renderLoadEarlier={() => <ActivityIndicator size={rw(50)} color={EColor.white} animating={loadEarlier} />}
        />
      )}
      <Header
        avatar={userFriend?.logoUrl}
        name={userFriend?.displayName}
        isChatView
        profileId={userFriend?.profileId || recipientId}
      />
      {conversationId && <MessageListener conversationId={conversationId} />}
    </CustomSafeArea>
  );
};

export default ChatView;
