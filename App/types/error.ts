import { EErrorCode } from 'App/enums/error';

export interface IError {
  error?: string;
  errorCode?: EErrorCode;
  message?: string[] | string;
  statusCode?: number;
}
