import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';
import { EMessagePayloadType, IConversationResDto, IMessageFirebase, IMessageResDto } from 'App/types/chat';
import { RTDB } from 'App/utils/rtdb';
import { forEach, isEmpty, map } from 'lodash';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const NewMessagesListener = () => {
  const conversations = useSelector(reduxSelector.getConversations);
  const selectedConversationId = useSelector(reduxSelector.getSelectedConversationId);
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const profileId = useMemo(() => user?.id, [user?.id]);
  const { t } = useTranslation();
  const messages = useSelector(reduxSelector.getMessages);
  const conversationIds = useMemo(() => {
    return map(conversations, conv => conv.id);
  }, [conversations]);

  const isNewConversation = useCallback(
    (message: IMessageFirebase) => !conversationIds.includes(message.conversationId) && !isEmpty(message.sender),
    [conversationIds],
  );

  const isNewMessage = useCallback(
    (message: IMessageFirebase) => {
      const conversationId = message.conversationId;
      const messageId = message.id;
      return isEmpty(messages?.[conversationId]?.[messageId]);
    },
    [messages],
  );

  const mergeNewMessageToConversation = useCallback(
    (message: IMessageFirebase) => {
      dispatch(
        reduxAppAction.mergeMessages({
          [message.conversationId]: {
            [message.id]: {
              id: message.id,
              conversationId: message.conversationId,
              recipientId: message.recipientId,
              senderId: message.senderId,
              sentAt: message.sentAt,
              payload: {
                type: message.payload.type,
                text: message.payload.text,
                mediaUrl: message.payload.mediaUrl,
              },
            } as IMessageResDto,
          },
        }),
      );
    },
    [dispatch],
  );

  const mergeNewConversationToConversations = useCallback(
    (message: IMessageFirebase) => {
      dispatch(
        reduxAppAction.mergeConversations({
          [message.conversationId]: {
            id: message.conversationId,
            lastMsg: {
              snippet: message.payload.type === EMessagePayloadType.TEXT ? message.payload.text : t('Sent an image'),
              sentByProfileId: message.senderId,
              sentAt: message.sentAt,
            },
            createdAt: message.sentAt,
            participants: [
              {
                profileId: message?.senderId,
                displayName: message?.sender.displayName,
                logoUrl: message?.sender?.logoUrl,
              },
              {
                profileId: message.recipientId,
                displayName: user.displayName,
                logoUrl: user.logoUrl,
              },
            ],
          } as IConversationResDto,
        }),
      );
    },
    [dispatch, user.displayName, user.logoUrl, t],
  );

  const mergeConversationToConversations = useCallback(
    (message: IMessageFirebase) => {
      const existedConversation = conversations?.[message?.conversationId];
      dispatch(
        reduxAppAction.mergeConversations({
          [message.conversationId]: {
            ...existedConversation,
            lastMsg: {
              snippet: message.payload.type === EMessagePayloadType.TEXT ? message.payload.text : t('Sent an image'),
              sentByProfileId: message.senderId,
              sentAt: message.sentAt,
            },
          } as IConversationResDto,
        }),
      );
    },
    [dispatch, t, conversations],
  );

  const onValueChange = useCallback(
    (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      const messagesData = snapshot.val();
      forEach(messagesData, (message: IMessageFirebase) => {
        if (isNewConversation(message)) {
          mergeNewConversationToConversations(message);
          mergeNewMessageToConversation(message);
        } else if (isNewMessage(message) && message.conversationId === selectedConversationId) {
          mergeConversationToConversations(message);
          mergeNewMessageToConversation(message);
        }
      });
    },
    [
      isNewConversation,
      isNewMessage,
      mergeNewConversationToConversations,
      mergeNewMessageToConversation,
      selectedConversationId,
      mergeConversationToConversations,
    ],
  );
  useEffect(() => {
    let ref: any;
    if (profileId) {
      ref = RTDB.ref(`/users/${profileId}/messages`);
      ref.on('value', onValueChange);
    }
    return () => {
      ref?.off('value', onValueChange);
    };
  }, [onValueChange, profileId]);
  return null;
};
export default memo(NewMessagesListener);
