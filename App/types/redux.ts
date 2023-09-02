import { ELanguageCode } from 'App/enums';
import { IUser } from './user';
import { EIdentifierType, ENamespace } from 'App/enums';
import { IError } from './error';

export interface IReduxAction<T, P = undefined> {
  type: T;
  payload?: P;
}
export interface IReduxActionWithCallback<T, P = undefined> {
  type: T;
  payload?: {
    data?: P;
    onFailCallback?: () => void;
    onSuccessCallback?: () => void;
  };
}
export interface IReduxRootState {
  user: IUser;
  app: IAppState;
}

export interface IAppState {
  language?: ELanguageCode;
  registerData?: Partial<ICreateAccountDto>;
  isLoading?: boolean;
  error?: Partial<IError>[];
}

export interface IRootState {
  user: IUser;
  app: IAppState;
}
export interface ICreateAccountDto {
  code: string;
  password: string;
  namespace: ENamespace;
  identifier: string;
  identifierType: EIdentifierType;
}

export interface IAccountLoginDto {
  password: string;
  identifier: string;
  identifierType: EIdentifierType;
  namespace: ENamespace;
}
export interface ISendAccountVerifyCode {
  namespace: ENamespace;
  identifierType: EIdentifierType;
  identifier: string;
  isRecoverPassword: boolean;
}
