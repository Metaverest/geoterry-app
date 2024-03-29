import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { reduxSelector } from 'App/redux/selectors';
import { convertDateRelativeToNowMsg } from 'App/utils/convert';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { IConversationResDto } from 'App/types/chat';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { shortenString } from 'App/helpers/text';
import { CHATS_PAGINATION_PAGE_SIZE, MAX_CONVERSATION_SNIPPET_LENGTH } from 'App/constants/common';
import { ESagaAppAction } from 'App/enums/redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CustomImage from 'App/components/CustomImage';
import ConversationUserAvatarDefault from 'App/media/ConversationUserAvatarDefault';
import useBoolean from 'App/hooks/useBoolean';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import { requestHunterFilterConversations } from 'App/utils/axios';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { isEmpty, reduce } from 'lodash';

const NUMBER_OF_SKELETONS = 5;

const Chat = () => {
  const user = useSelector(reduxSelector.getUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const [callOnScrollEnd, triggerCallOnScrollEnd, preventCallOnScrollEnd] = useBoolean(false);
  const [refresh, setRefresh] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  useEffect(() => {
    dispatch(
      sagaUserAction.hunterFilterConversationsAsync(
        { includeProfileData: true, page: pageNumber, pageSize: CHATS_PAGINATION_PAGE_SIZE },
        navigation,
      ),
    );
    // This hook only be executed when mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(() => {
    preventCallOnScrollEnd();
    setRefresh(true);
    setPageNumber(1);
    dispatch(
      sagaUserAction.hunterFilterConversationsAsync(
        { includeProfileData: true, page: 1, pageSize: CHATS_PAGINATION_PAGE_SIZE },
        navigation,
      ),
    );
  }, [dispatch, navigation, preventCallOnScrollEnd]);

  const onEndReached = useCallback(async () => {
    if (callOnScrollEnd) {
      try {
        setLoadMore(true);
        const response = await requestHunterFilterConversations(user.id, {
          page: pageNumber + 1,
          pageSize: CHATS_PAGINATION_PAGE_SIZE,
          includeProfileData: true,
        });
        if (!isEmpty(response)) {
          const conversations: Record<string, IConversationResDto> = reduce(
            response,
            (result, conversation) => {
              return { ...result, [conversation.id]: conversation };
            },
            {},
          );
          dispatch(reduxAppAction.mergeConversations(conversations));
          setPageNumber(pageNumber + 1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadMore(false);
        preventCallOnScrollEnd();
      }
    }
  }, [callOnScrollEnd, dispatch, pageNumber, preventCallOnScrollEnd, user.id]);

  const conversations = useSelector(reduxSelector.getConversations);
  const conversationsToDisplay = useMemo(() => {
    if (!conversations) {
      return [];
    }
    return Object.values(conversations);
  }, [conversations]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    if (firstLoad && !isEmpty(conversationsToDisplay)) {
      setFirstLoad(false);
    }
    // set refresh to false when chats are updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationsToDisplay]);

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
            <View style={styles.avatarDefault}>
              <ConversationUserAvatarDefault height={rh(48)} width={rh(48)} />
            </View>
          )}
          <View style={styles.content}>
            <CustomText style={styles.name}>{shortenString(userFriend?.displayName || '', 25)}</CustomText>
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
      {loadingStates?.[ESagaAppAction.HUNTER_FILTER_CONVERSATIONS] && firstLoad ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refresh} size={rw(50)} colors={[EColor.white]} />
          }
          keyExtractor={(_, index) => index.toString()}
          data={conversationsToDisplay}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <CustomText style={styles.emptyConversation}>{t('Không có tin nhắn!')}</CustomText>
            </View>
          )}
          renderItem={renderItem}
          style={styles.containList}
          scrollEnabled
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          onEndReached={triggerCallOnScrollEnd}
          ListFooterComponent={
            loadMore ? <ActivityIndicator size={rw(50)} color={EColor.white} animating={loadMore} /> : null
          }
          onMomentumScrollBegin={onEndReached}
        />
      )}
    </CustomSafeArea>
  );
};

export default Chat;
