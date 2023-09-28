import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { IError } from './error';
import { ICreateAccountDto, IUser } from './user';

export interface IReduxAction<T, P = undefined> {
  type: T;
  payload?: P;
}

export interface ISagaAsyncActionOptions {
  isRecoverPassword?: boolean;
}
export interface IReduxActionWithNavigation<T, P = undefined> {
  type: T;
  payload?: {
    data?: P;
    navigation: any;
    options?: ISagaAsyncActionOptions;
  };
}
export interface IReduxRootState {
  user: IUser;
  app: IAppState;
}

export interface IAppState {
  language?: ELanguageCode;
  registerData?: Partial<ICreateAccountDto>;
  // Indicate that whether the app is loading or not
  isLoading?: boolean;
  error?: Partial<IError>[];
  // In case of recover password, verifyAccountRecoveryOTP will return a code that used to change password.
  recoveryCode?: string;
  mapType?: EMapType;
}

export interface IRootState {
  user: IUser;
  app: IAppState;
}
