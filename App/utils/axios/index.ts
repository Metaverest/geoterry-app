/* eslint-disable @typescript-eslint/no-shadow */
import { EDataStorageKey } from 'App/enums';
import { EErrorCode, EStatusCode } from 'App/enums/error';
import { IAccountLoginDto, ICreateAccountDto, ISendAccountVerifyCode } from 'App/types/redux';
import {
  IAccountResponseDto,
  ICreateProfileReqDto,
  IProfileResDto,
  IRequestRefreshTokenResDto,
  IUploadProfileResDto,
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

export const requestGetOTP = async (data: ISendAccountVerifyCode) => {
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
  console.log('latestAccessToken', latestAccessToken);
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
    console.log(error?.response?.data?.errorCode);
    console.log(error?.response?.data?.statusCode);
    if (
      error?.response?.data?.errorCode === EErrorCode.UNKNOWN_ERROR &&
      error?.response?.data?.statusCode === EStatusCode.FORBIDEN
    ) {
      console.log('************************');
      const originalRequest = error.config;
      const currentToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
      const currentRefreshToken = await getStoredProperty<string>(EDataStorageKey.REFRESH_TOKEN);
      const requestRefreshTokenResponse = await requestRefreshToken(
        currentToken as string,
        currentRefreshToken as string,
      );
      console.log('requestRefreshTokenResponse', requestRefreshTokenResponse);
      const { refreshToken, token } = requestRefreshTokenResponse;
      await setPropertyInDevice(EDataStorageKey.ACCESS_TOKEN, token);
      await setPropertyInDevice(EDataStorageKey.REFRESH_TOKEN, refreshToken);
      await setAuthorizationRequestHeader(AXIOS);
      return AXIOS(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default AXIOS;
