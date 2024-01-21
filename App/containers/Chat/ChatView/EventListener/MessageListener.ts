import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';
import { IMessageFirebase, IMessageResDto } from 'App/types/chat';
import { RTDB } from 'App/utils/rtdb';
import { forEach, isEmpty } from 'lodash';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// This listener is used to listen to new messages from firebase
// and will update the messages[conversationId] in redux store
const MessageListener = ({ conversationId }: { conversationId: string }) => {
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const profileId = useMemo(() => user?.id, [user?.id]);
  const messages = useSelector(reduxSelector.getMessages);

  const isNewMessage = useCallback(
    (message: IMessageFirebase) => {
      if (conversationId !== message.conversationId) {
        return false;
      }
      const messageId = message.chatServiceId;
      return isEmpty(messages?.[conversationId]?.[messageId]);
    },
    [conversationId, messages],
  );

  const mergeNewMessageToConversation = useCallback(
    (message: IMessageFirebase) => {
      console.log('******************* merge new message: ', message.payload.text);
      dispatch(
        reduxAppAction.mergeMessages({
          [conversationId]: {
            [message.chatServiceId]: {
              id: message.chatServiceId,
              conversationId: conversationId,
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
    [conversationId, dispatch],
  );

  const onValueChange = useCallback(
    (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      const messagesData = snapshot.val();
      forEach(messagesData, (message: IMessageFirebase) => {
        if (isNewMessage(message)) {
          mergeNewMessageToConversation(message);
        }
      });
    },
    [isNewMessage, mergeNewMessageToConversation],
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
export default memo(MessageListener);
