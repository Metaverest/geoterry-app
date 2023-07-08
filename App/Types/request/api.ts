import { IncomingHttpHeaders } from 'http';
import { AxiosRequestConfig } from 'axios';
import { ErrorCode } from './errorCode';

interface ApiErrorData {
  message?: string;
  errorCode?: ErrorCode;
}

export interface ApiError {
  config?: AxiosRequestConfig;
  data?: ApiErrorData;
  headers?: IncomingHttpHeaders;
  status?: number;
  statusText?: string;
}

export interface ApiRequestState {
  apiRequest: boolean;
  apiSuccess: boolean;
  apiFail: boolean;
}
