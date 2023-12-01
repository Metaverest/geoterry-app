import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { IError } from './error';
import { ICreateAccountDto, IUser } from './user';
import { ITerryCategoryResDto } from './category';
import { IResponseTerryCheckins, ITerryCheckinInputDto, ITerryFilterInputDto, ITerryResponseDto } from './terry';
import { IRealtimeLocation } from '.';

export interface IReduxAction<T, P = undefined> {
  type: T;
  payload?: P;
}

export interface ISagaAsyncActionOptions {
  isRecoverPassword?: boolean;
  profileId?: string;
  onSuccess?: () => void;
  onError?: () => void;
  t?: (key: string) => string;
  fcmToken?: string;
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
  publicCategories?: ITerryCategoryResDto[];
  publicTerries?: ITerryResponseDto[];
  publicTerryFilter?: ITerryFilterInputDto;
  publicTerry?: ITerryResponseDto;
  terryCheckins?: IResponseTerryCheckins[];
  terryCheckinInput?: Partial<ITerryCheckinInputDto>;
  coordinatesPath?: { [key: string]: IRealtimeLocation[] };
  // This is used to display the public profile of other users when user scan the QR code
  otherUserProfileToDisplay?: IUser;
}

export interface IRootState {
  user: IUser;
  app: IAppState;
}
