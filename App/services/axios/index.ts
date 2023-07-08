import { EDataStorageKey } from 'App/utils/storage/keys';
import { getStoredProperty } from 'App/utils/storage/storage';
import axios from 'axios';
import Config from 'react-native-config';

const AXIOS = axios.create({
  baseURL: Config.BE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

AXIOS.interceptors.request.use(async config => {
  const latestAccessToken = await getStoredProperty<string>(EDataStorageKey.ACCESS_TOKEN);
  config.headers!.Authorization = `Bearer ${latestAccessToken}`;
  // TODO: implement refresh token logic here
  return config;
});

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
