/* eslint-disable @typescript-eslint/no-shadow */
import { EDataStorageKey } from 'App/enums';
import { IAccountLoginDto, ICreateAccountDto, ISendAccountVerifyCode } from 'App/types/redux';
import { getStoredProperty } from 'App/utils/storage/storage';
import axios, { AxiosInstance } from 'axios';
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
  return AXIOS.post('/auth/login', data).then(result => result.data);
};

export const requestGetOTP = async (data: ISendAccountVerifyCode) => {
  return AXIOS.post('/auth/otp/send', data).then(result => result.data);
};

export const setAuthorizationRequestHeader = (axios: AxiosInstance) => {
  axios.interceptors.request.use(async config => {
    const latestAccessToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
    config.headers.Authorization = `Bearer ${latestAccessToken}`;
    return config;
  });
};

AXIOS.interceptors.response.use(
  response => {
    return response;
  },
  async interceptorError => {
    if (interceptorError.response) {
      return Promise.reject(interceptorError.response);
    }
    return Promise.reject(interceptorError);
  },
);

export default AXIOS;
