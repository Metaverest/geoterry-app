import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import CustomText from 'App/components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import { EColor } from 'App/enums/color';
import { convertDateRelativeToNowMsg } from 'App/utils/convert';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/helpers/common';
import MapMarkerUserDefault from 'App/media/MapMarkerUserDefault';

const Chat = () => {
  const user = useSelector(reduxSelector.getUser);
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const [listChat] = useState([
    {
      lastMsg: {
        snippet: '12',
        sentAt: '2023-12-04T08:19:18.351Z',
        sentByProfileId: '650484ce6b231c404d74fb8a',
      },
      participants: [
        {
          profileId: '650484ce6b231c404d74fb8a',
          unreadMsgCnt: 0,
          displayName: 'Testing hehehe',
          logoUrl:
            'https://dinh-bac-infra-ordii.s3.ap-southeast-1.amazonaws.com/geoterry/photo/geoterryUserId_65010820ce743ca3c51fd3ce_pictureId_e3386364-e7d7-46b2-9a16-e2a90dd89581.jpg',
        },
        {
          profileId: '654fbb412bb9e9b95e5579c7',
          unreadMsgCnt: 2,
          displayName: 'Trung',
        },
      ],
      msgCount: 2,
      createdAt: '2023-12-04T08:18:49.287Z',
      updatedAt: '2023-12-04T08:19:18.353Z',
      id: '656d8b6992407f3c6c76dd3f',
    },
    {
      lastMsg: {
        snippet: '12',
        sentAt: '2023-12-04T08:19:18.351Z',
        sentByProfileId: '650484ce6b231c404d74fb8a',
      },
      participants: [
        {
          profileId: '650484ce6b231c404d74fb8a',
          unreadMsgCnt: 1,
          displayName: 'Testing hehehe',
          logoUrl:
            'https://dinh-bac-infra-ordii.s3.ap-southeast-1.amazonaws.com/geoterry/photo/geoterryUserId_65010820ce743ca3c51fd3ce_pictureId_e3386364-e7d7-46b2-9a16-e2a90dd89581.jpg',
        },
        {
          profileId: '654fbb412bb9e9b95e5579c7',
          unreadMsgCnt: 2,
          displayName: 'Trung',
          logoUrl:
            'https://dinh-bac-infra-ordii.s3.ap-southeast-1.amazonaws.com/geoterry/photo/geoterryUserId_65010820ce743ca3c51fd3ce_pictureId_e3386364-e7d7-46b2-9a16-e2a90dd89581.jpg',
        },
      ],
      msgCount: 2,
      createdAt: '2023-12-04T08:18:49.287Z',
      updatedAt: '2023-12-04T08:19:18.353Z',
      id: '656d8b6992407f3c6c76dd3f',
    },
  ]);
  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const userFriend = item.participants.find(e => e.profileId !== user.id);
      const me = item.participants.find(e => e.profileId === user.id);
      return (
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => {
            navigation.dispatch(
              CommonActions.navigate(EMainGameScreen.CHAT_VIEW_SCREEN, {
                profileId: user.id,
                conversationId: item.id,
              }),
            );
          }}>
          {userFriend.logoUrl ? (
            <Image
              source={{
                uri: userFriend.logoUrl,
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatar}>
              <MapMarkerUserDefault width={rw(48)} height={rh(48)} />
            </View>
          )}
          <View style={styles.content}>
            <CustomText style={styles.name}>{userFriend.displayName}</CustomText>
            <View style={styles.containerLastMsg}>
              {me.unreadMsgCnt ? (
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
                    color: me.unreadMsgCnt ? EColor.color_FAFAFA : EColor.color_999999,
                  },
                  me.unreadMsgCnt && styles.fontW500,
                ]}>
                {item.lastMsg.sentByProfileId === user.id ? `${t('Bạn')}: ` : `${userFriend.displayName}: `}
              </CustomText>
              <CustomText
                style={[
                  styles.msg,
                  {
                    color: me.unreadMsgCnt ? EColor.color_FAFAFA : EColor.color_999999,
                  },
                  me.unreadMsgCnt && styles.fontW500,
                ]}>
                {item.lastMsg.snippet}
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
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Trò chuyện')} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={listChat}
        renderItem={renderItem}
        style={styles.containList}
      />
    </CustomSafeArea>
  );
};

export default Chat;
