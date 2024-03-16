import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { responsiveByHeight as rh } from 'App/helpers/common';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';
import { reduxSelector } from 'App/redux/selectors';
import { convertDateRelativeToNowMsg } from 'App/utils/convert';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { IConversationResDto } from 'App/types/chat';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { shortenString } from 'App/helpers/text';
import { MAX_CONVERSATION_SNIPPET_LENGTH } from 'App/constants/common';
import { ESagaAppAction } from 'App/enums/redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CustomImage from 'App/components/CustomImage';

const NUMBER_OF_SKELETONS = 5;

const Chat = () => {
  const user = useSelector(reduxSelector.getUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loadingStates = useSelector(reduxSelector.getLoadingStates);

  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  useEffect(() => {
    dispatch(sagaUserAction.hunterFilterConversationsAsync({ includeProfileData: true }, navigation));
  }, [dispatch, navigation]);
  const conversations = useSelector(reduxSelector.getConversations);
  console.log(conversations);
  const conversationsToDisplay = useMemo(() => {
    if (!conversations) {
      return [];
    }
    return Object.values(conversations);
  }, [conversations]);

  const renderItem = useCallback(
    ({ item }: { item: IConversationResDto }) => {
      const userFriend = item?.participants?.find(e => e.profileId !== user.id);
      const me = item?.participants?.find(e => e.profileId === user.id);
      return (
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => {
            navigation.dispatch(
              CommonActions.navigate(EMainGameScreen.CHAT_VIEW_SCREEN, {
                conversationId: item.id,
              }),
            );
          }}>
          {userFriend?.logoUrl ? (
            <CustomImage imageUrl={userFriend.logoUrl} style={styles.avatar} resizeMode="cover" />
          ) : (
            <View style={styles.avatar}>
              <MapMarkerUserDefault width={rh(48)} height={rh(48)} />
            </View>
          )}
          <View style={styles.content}>
            <CustomText style={styles.name}>{userFriend?.displayName}</CustomText>
            <View style={styles.containerLastMsg}>
              {me?.unreadMsgCnt ? (
                <LinearGradient
                  colors={[EColor.color_C072FD, EColor.color_51D5FF]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.dotUnRead}
                />
              ) : undefined}
              <CustomText
                style={[
                  styles.msg,
                  {
                    color: me?.unreadMsgCnt ? EColor.color_FAFAFA : EColor.color_999999,
                  },
                  me?.unreadMsgCnt && styles.fontW500,
                ]}>
                {item.lastMsg.sentByProfileId === user.id ? `${t('Bạn')}: ` : `${userFriend?.displayName}: `}
              </CustomText>
              <CustomText
                style={[
                  styles.msg,
                  {
                    color: me?.unreadMsgCnt ? EColor.color_FAFAFA : EColor.color_999999,
                  },
                  me?.unreadMsgCnt && styles.fontW500,
                ]}>
                {shortenString(item.lastMsg.snippet, MAX_CONVERSATION_SNIPPET_LENGTH)}
              </CustomText>
              <View style={styles.dot} />
              <CustomText style={styles.msg}>
                {t(convertDateRelativeToNowMsg(item.lastMsg.sentAt, user.languageCode))}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, t, user.id, user.languageCode],
  );

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
      <Header title={t('Trò chuyện')} />
      {loadingStates?.[ESagaAppAction.HUNTER_FILTER_CONVERSATIONS] ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={conversationsToDisplay}
          renderItem={renderItem}
          style={styles.containList}
        />
      )}
    </CustomSafeArea>
  );
};

export default Chat;
