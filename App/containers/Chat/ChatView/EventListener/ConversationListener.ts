import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';
import { EMessagePayloadType, IConversationResDto, IMessageFirebase } from 'App/types/chat';
import { RTDB } from 'App/utils/rtdb';
import dayjs from 'dayjs';
import { forEach, isEmpty, map } from 'lodash';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// This listener is used to listen to new messages from firebase
// and will update the conversations in redux store
const ConversationListener = () => {
  const conversations = useSelector(reduxSelector.getConversations);
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const conversationStat = useSelector(reduxSelector.getConversationStat);
  const profileId = useMemo(() => user?.id, [user?.id]);
  const { t } = useTranslation();
  const conversationIds = useMemo(() => {
    return map(conversations, conv => conv.id);
  }, [conversations]);

  const isNewConversation = useCallback(
    (message: IMessageFirebase) => !conversationIds.includes(message.conversationId) && !isEmpty(message.sender),
    [conversationIds],
  );

  const shouldUpdateConversation = useCallback(
    (message: IMessageFirebase) => {
      const conversationId = message.conversationId;
      return dayjs(message.sentAt).isAfter(dayjs(conversations?.[conversationId]?.lastMsg?.sentAt));
    },
    [conversations],
  );

  const mergeConversationToConversations = useCallback(
    (message: IMessageFirebase) => {
      const existedConversation = conversations?.[message?.conversationId];
      // If the conversation is not existed in redux store
      if (isEmpty(existedConversation)) {
        dispatch(
          reduxAppAction.mergeConversations({
            [message.conversationId]: {
              id: message.conversationId,
              lastMsg: {
                snippet: message.payload.type === EMessagePayloadType.TEXT ? message.payload.text : t('Sent an image'),
                sentByProfileId: message.senderId,
                sentAt: message.sentAt,
              },
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
        return;
      }
      // If the conversation is existed in redux store
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
    [conversations, dispatch, t, user.displayName, user.logoUrl],
  );

  const updateConversationStat = useCallback(() => {
    dispatch(
      reduxAppAction.setConversationStat({
        totalConversationCnt: 0,
        ...conversationStat,
        unreadConversationCnt: (conversationStat?.unreadConversationCnt || 0) + 1,
      }),
    );
  }, [conversationStat, dispatch]);

  const onValueChange = useCallback(
    (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      const messagesData = snapshot.val();
      forEach(messagesData, (message: IMessageFirebase) => {
        // If the message`s conversation is not existed in redux store
        if (isNewConversation(message)) {
          mergeConversationToConversations(message);
          updateConversationStat();
        } else {
          if (shouldUpdateConversation(message)) {
            mergeConversationToConversations(message);
          }
        }
      });
    },
    [isNewConversation, mergeConversationToConversations, shouldUpdateConversation, updateConversationStat],
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
export default memo(ConversationListener);
