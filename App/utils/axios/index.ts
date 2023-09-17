/* eslint-disable @typescript-eslint/no-shadow */
import { EDataStorageKey } from 'App/enums';
import { EErrorCode, EStatusCode } from 'App/enums/error';

import {
  IAccountLoginDto,
  IAccountResponseDto,
  ICreateAccountDto,
  ICreateProfileReqDto,
  IProfileResDto,
  IRecoveryAccountDto,
  IRequestRefreshTokenResDto,
  ISendVerificationDto,
  IUploadProfileResDto,
  IVerifyAccountRecoverOTPDto,
  IVerifyAccountRecoverOTPResDto,
} from 'App/types/user';
import { getStoredProperty, setPropertyInDevice } from 'App/utils/storage/storage';
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
  return AXIOS.post('/auth/otp/register', data).then(result => result.data);
};

export const requestLogin = async (data: IAccountLoginDto) => {
  return AXIOS.post<IAccountResponseDto>('/auth/login', data).then(result => result.data);
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
  axios.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${latestAccessToken}`;
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
    return Promise.reject(error);
  },
);

export const requestVerifyAccountRecoveryOTP = async (dto: IVerifyAccountRecoverOTPDto) => {
  return AXIOS.put<IVerifyAccountRecoverOTPResDto>('/auth/otp/verify', dto).then(result => result.data);
};

export const requestAccountRecover = async (data: IRecoveryAccountDto) => {
  return AXIOS.put<IAccountResponseDto>('/auth/otp/recover', data).then(result => result.data);
};
export default AXIOS;
