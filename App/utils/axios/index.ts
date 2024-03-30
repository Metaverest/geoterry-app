/* eslint-disable @typescript-eslint/no-shadow */
import { CommonActions } from '@react-navigation/native';
import { EDataStorageKey, ELanguageCode, EPublicReadProfileBy, EUserRole, EUseRoleRequestStatus } from 'App/enums';
import { EErrorCode, EStatusCode } from 'App/enums/error';
import { ENavigationScreen } from 'App/enums/navigation';
import { navigationRef } from 'App/navigation';
import { IFilterTerryCategoryInputDto, ITerryCategoryResDto } from 'App/types/category';
import {
  IConversationResDto,
  IRequestHunterReadConversationMessagesQueryParams,
  IMessageResDto,
  IRequestHunterFilterConversationsQueryParams,
  ISendMessageInputDto,
  IFilterConversationStatRes,
} from 'App/types/chat';
import {
  IFilterTerryCheckins,
  IGetCheckinsOfTerryParams,
  IGetTerryByIdParams,
  IHunterGetTerryCheckinParams,
  IPlayerNearbyResDto,
  IResponseGetCheckinsOfTerry,
  IResponseTerryCheckins,
  ITerryCheckinInputDto,
  ITerryCheckinResDto,
  ITerryCheckinsParams,
  ITerryFilterInputDto,
  ITerryFilterParams,
  ITerryInputDto,
  ITerryLocationDto,
  ITerryResponseDto,
  ITerryUserPathResDto,
  IUpdateTerryCheckinInput,
} from 'App/types/terry';

import {
  IAccountLoginDto,
  IAccountLoginWithAppleDto,
  IAccountLoginWithGoogleDto,
  IAccountResponseDto,
  IAccountUpdateCredentialsDto,
  ICreateAccountDto,
  ICreateOrUpdateDeviceInputDto,
  ICreateProfileReqDto,
  IProfileResDto,
  IRecoveryAccountDto,
  IRequestRefreshTokenResDto,
  ISendVerificationDto,
  IUploadProfileResDto,
  IVerifyAccountRecoverOTPDto,
  IVerifyAccountRecoverOTPResDto,
} from 'App/types/user';
import { getStoredProperty, removePropertyInDevice, setPropertyInDevice } from 'App/utils/storage/storage';
import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';

const AXIOS = axios.create({
  baseURL: Config.BE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const requestCreateAccount = async (data: ICreateAccountDto) => {
  return AXIOS.post<IAccountResponseDto>('/auth/otp/register', data).then(result => result.data);
};

export const requestLogin = async (data: IAccountLoginDto) => {
  return AXIOS.post<IAccountResponseDto>('/auth/login', data).then(result => result.data);
};

export const requestLoginWithGoogle = async (data: IAccountLoginWithGoogleDto) => {
  return AXIOS.post<IAccountResponseDto>('/auth/login/google', data).then(result => result.data);
};

export const requestLoginWithApple = async (data: IAccountLoginWithAppleDto) => {
  return AXIOS.post<IAccountResponseDto>('/auth/login/apple', data).then(result => result.data);
};

export const requestGetOTP = async (data: ISendVerificationDto) => {
  return AXIOS.post('/auth/otp/send', data).then(result => result.data);
};

export const requestCreateProfile = async (data: ICreateProfileReqDto) => {
  return AXIOS.post<IProfileResDto>('/profile', data).then(result => result.data);
};

export const requestUserReadProfile = async () => {
  return AXIOS.get<IProfileResDto>('/profile').then(result => result.data);
};

export const setAuthorizationRequestHeader = async (axios: AxiosInstance) => {
  const latestAccessToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
  axios.interceptors.request.use(
    async config => {
      config.headers.Authorization = `Bearer ${latestAccessToken}`;
      return config;
    },
    undefined,
    { synchronous: true },
  );
};

export const setLanguageRequestHeader = async (axios: AxiosInstance, language: ELanguageCode) => {
  axios.interceptors.request.use(async config => {
    config.headers['language-code'] = language;
    return config;
  });
};

export const requestUploadProfileImage = async (data: any) => {
  const formData = new FormData();
  formData.append('file', {
    name: data?.fileName,
    type: data?.type,
    uri: Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
  });
  return AXIOS.post<IUploadProfileResDto>('/profile/photo', formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }).then(result => result.data);
};

export const requestRefreshToken = async (token: string, refreshToken: string) => {
  return AXIOS.put<IRequestRefreshTokenResDto>('/auth/refresh', { token, refreshToken }).then(result => result.data);
};

AXIOS.interceptors.request.use(async config => {
  const latestAccessToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
  config.headers!.Authorization = `Bearer ${latestAccessToken}`;

  return config;
});

AXIOS.interceptors.response.use(
  response => response,
  async error => {
    if (
      error?.response?.data?.errorCode === EErrorCode.UNKNOWN_ERROR &&
      error?.response?.data?.statusCode === EStatusCode.FORBIDEN
    ) {
      const originalRequest = error.config;
      const currentToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
      const currentRefreshToken = await getStoredProperty<string>(EDataStorageKey.REFRESH_TOKEN);
      const requestRefreshTokenResponse = await requestRefreshToken(
        currentToken as string,
        currentRefreshToken as string,
      );
      const { refreshToken, token } = requestRefreshTokenResponse;
      await setPropertyInDevice(EDataStorageKey.ACCESS_TOKEN, token);
      await setPropertyInDevice(EDataStorageKey.REFRESH_TOKEN, refreshToken);
      await setAuthorizationRequestHeader(AXIOS);
      return AXIOS(originalRequest);
    }
    // There is the case we cannot refresh token, we need to logout user.
    else if (
      error?.response?.data?.errorCode === EErrorCode.FAILED_TO_REFRESH_TOKEN &&
      error?.response?.data?.statusCode === EStatusCode.BAD_REQUEST
    ) {
      await removePropertyInDevice(EDataStorageKey.ACCESS_TOKEN);
      await removePropertyInDevice(EDataStorageKey.REFRESH_TOKEN);
      navigationRef.dispatch(
        CommonActions.navigate({
          name: ENavigationScreen.LOGIN_SCREEN,
        }),
      );
    }
    return Promise.reject(error);
  },
);

export const requestVerifyAccountRecoveryOTP = async (dto: IVerifyAccountRecoverOTPDto) => {
  return AXIOS.put<IVerifyAccountRecoverOTPResDto>('/auth/otp/verify', dto).then(result => result.data);
};

export const requestAccountRecover = async (data: IRecoveryAccountDto) => {
  return AXIOS.put<IAccountResponseDto>('/auth/otp/recover', data).then(result => result.data);
};

export const requestPublicFilterTerryCategories = async (data: IFilterTerryCategoryInputDto) => {
  return AXIOS.post<ITerryCategoryResDto[]>('/public/terry-category/filter', data).then(result => result.data);
};

export const requestPublicGetTerries = async (
  data: ITerryFilterInputDto,
  params: ITerryFilterParams,
  profileId: string,
) => {
  return AXIOS.post<ITerryResponseDto[]>(`/hunter/${profileId}/terry/filter`, data, {
    params,
  }).then(result => result.data);
};

export const requestUserUpdateProfile = async (data: ICreateProfileReqDto) => {
  return AXIOS.put<IProfileResDto>('/profile', data).then(result => result.data);
};

export const requestHunterGetTerryById = async (params: IGetTerryByIdParams, profileId: string) => {
  const { data } = await AXIOS.get<ITerryResponseDto>(`/hunter/${profileId}/terry/${params.terryId}`, {
    params: {
      latitude: params.latitude,
      longitude: params.longitude,
      includeCategoryData: params.includeCategoryData,
      includeUserPath: params.includeUserPath,
      includeProfileData: params.includeProfileData,
      markAsFavourited: params.markAsFavourited,
      includeConversationId: params.includeConversationId,
      markAsSaved: params.markAsSaved,
    },
  });
  return data;
};

export const requestUpdateCredentials = async (data: IAccountUpdateCredentialsDto) => {
  return AXIOS.put<IAccountResponseDto>('/auth/update-credentials', data).then(result => result.data);
};

export const requestHunterFilterTerryCheckins = async (
  data: IFilterTerryCheckins,
  params: ITerryCheckinsParams,
  profileId: string,
) => {
  return AXIOS.post<IResponseTerryCheckins[]>(`/hunter/${profileId}/terry-checkin/filter`, data, { params }).then(
    res => res.data,
  );
};

export const requestBuilderCreateTerry = async (data: ITerryInputDto, userID: string) => {
  return AXIOS.post<ITerryResponseDto>(`/builder/${userID}/terry`, data).then(result => result.data);
};

export const requestPublicGetCheckinsOfTerry = async (params: IGetCheckinsOfTerryParams, terryId: string) => {
  return AXIOS.get<IResponseGetCheckinsOfTerry[]>(`/public/terry-checkin/terry/${terryId}`, { params }).then(
    res => res.data,
  );
};

export const requestHunterCheckinTerry = async (data: ITerryCheckinInputDto, profileId: string) => {
  return AXIOS.post<ITerryCheckinResDto>(`/hunter/${profileId}/terry-checkin`, data).then(result => result.data);
};

export const requestUserCreateOrUpdateDevice = async (data: ICreateOrUpdateDeviceInputDto, profileId: string) => {
  return AXIOS.post(`/user/${profileId}/device`, data).then(result => result.data);
};

export const requestHunterGetTerryCheckin = async (params: IHunterGetTerryCheckinParams) => {
  return AXIOS.get<IResponseTerryCheckins>(`/hunter/${params.profileId}/terry-checkin/${params.id}`, {
    params,
  }).then(res => res.data);
};

export const requestHunterUpsertTerryUserPath = async (path: string, profileId: string, terryId: string) => {
  return AXIOS.put<ITerryUserPathResDto>(`/hunter/${profileId}/terry/${terryId}/terry-user-mapping`, { path }).then(
    result => result.data,
  );
};

export const requestSwitchRole = async (role: EUserRole, reason: string) =>
  AXIOS.put<{ status: EUseRoleRequestStatus }>('/auth/switch-role', { role, reason }).then(({ data }) => data);

export const requestPublicReadProfile = async (profileID: string, findBy: EPublicReadProfileBy) => {
  return AXIOS.get<IProfileResDto>(`/public/profile/${profileID}`, {
    params: {
      findBy: findBy,
    },
  }).then(result => result.data);
};

export const requestPublicReadOtherProfile = async (profileID: string) => {
  return AXIOS.get<IProfileResDto>(`/profile/other/${profileID}`).then(result => result.data);
};

export const requestGetNearbyPlayers = async (input?: ITerryLocationDto) => {
  return AXIOS.post<IPlayerNearbyResDto[]>('/profile/profile-nearby', {
    latitude: input?.latitude,
    longitude: input?.longitude,
  }).then(result => result.data);
};

export const requestUpdateUserCurrentLocation = async (input: ITerryLocationDto) => {
  return AXIOS.put('/profile/location', {
    latitude: input.latitude,
    longitude: input.longitude,
  });
};

export const requestHunterFilterConversations = async (
  profileId: string,
  query: IRequestHunterFilterConversationsQueryParams,
) => {
  return AXIOS.post<IConversationResDto[]>(`/hunter/${profileId}/conversations/filter`, {}, { params: query }).then(
    result => result.data,
  );
};

export const requestHunterFilterConversationStat = async (profileId: string) => {
  return AXIOS.post<IFilterConversationStatRes>(`/hunter/${profileId}/conversations/filter-stat`).then(
    result => result.data,
  );
};

export const requestHunterReadConversationMessages = async (
  conversationId: string,
  profileId: string,
  query: IRequestHunterReadConversationMessagesQueryParams,
) =>
  AXIOS.get<IMessageResDto[]>(`/hunter/${profileId}/conversation/${conversationId}/messages`, { params: query }).then(
    result => result.data,
  );

export const requestHunterSendMessage = async (profileId: string, data: ISendMessageInputDto) =>
  AXIOS.post<IMessageResDto>(`/hunter/${profileId}/messages/send-message`, data).then(result => result.data);

export const requestHunterVerifyTerry = async (code: string, profileId: string, terryId: string) =>
  AXIOS.post<IMessageResDto>(`/hunter/${profileId}/terry/${terryId}/verify`, { code }).then(result => result.data);

export const requestHunterDeleteCheckins = async (checkinIds: string[], profileId: string) =>
  AXIOS.delete(`/hunter/${profileId}/terry-checkin`, { data: { checkinIds } }).then(result => result.data);

export const requestHunterUpdateCheckin = async (
  payload: IUpdateTerryCheckinInput,
  profileId: string,
  terryId: string,
) => AXIOS.put(`/hunter/${profileId}/terry-checkin/${terryId}`, payload).then(result => result.data);

export default AXIOS;
