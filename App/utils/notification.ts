import { isString } from 'lodash';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { ENotificationEvent } from 'App/types/notification';
import { navigationRef } from 'App/navigation';
import { CommonActions } from '@react-navigation/native';
import { EMainGameScreen } from 'App/enums/navigation';

export const onReceiveNotification = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  try {
    const navigationData = remoteMessage?.data;
    if (navigationData) {
      const navigationDataObject = isString(navigationData) ? JSON.parse(navigationData) : navigationData;
      if (navigationDataObject.type === ENotificationEvent.ON_NEW_CONVERSATION) {
        navigationRef.dispatch(
          CommonActions.navigate(EMainGameScreen.CHAT_VIEW_SCREEN, {
            conversationId: navigationDataObject.conversationId,
          }),
        );
      } else {
        navigationRef.dispatch(CommonActions.navigate(navigationDataObject));
      }
    }
  } catch (e) {
    console.log('Error when receive & process notificaiton', e);
  }
};
