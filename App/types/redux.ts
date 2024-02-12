import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { IError } from './error';
import { ICreateAccountDto, IUser } from './user';
import { ITerryCategoryResDto } from './category';
import {
  IPlayerNearbyResDto,
  IResponseTerryCheckins,
  ITerryCheckinInputDto,
  ITerryFilterInputDto,
  ITerryResponseDto,
} from './terry';
import { IRealtimeLocation } from '.';
import { ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import { IConversationResDto, IReduxUpdateConversation, IMessageResDto, IFilterConversationStatRes } from './chat';
import { LatLng } from 'react-native-maps';

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
  nearbyPlayers?: IPlayerNearbyResDto[];
  loadingStates?: {
    [key in ESagaUserAction | ESagaAppAction]?: boolean;
  };
  conversations?: Record<string, IConversationResDto>;
  messages: Record<string, Record<string, IMessageResDto>>;
  selectedConversationId?: string;
  conversationUpdateData?: IReduxUpdateConversation;
  conversationStat?: Partial<IFilterConversationStatRes>;
  nearbyPlayerLocation?: Record<string, LatLng>;
}

export interface IRootState {
  user: IUser;
  app: IAppState;
}
