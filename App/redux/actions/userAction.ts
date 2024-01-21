import { PayloadAction } from '@reduxjs/toolkit';
import { EPublicReadProfileBy, EUserRole } from 'App/enums';
import { EReduxUserAction, ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import {
  IRequestHunterFilterConversationsQueryParams,
  IRequestHunterReadConversationMessagesQueryParams,
  ISendMessageInputDto,
} from 'App/types/chat';
import { ISagaAsyncActionOptions } from 'App/types/redux';
import {
  IFilterTerryCheckins,
  IGetTerryByIdParams,
  ITerryCheckinsParams,
  ITerryFilterInputDto,
  ITerryFilterParams,
  ITerryInputDto,
  Location,
} from 'App/types/terry';

import {
  IAccountLoginDto,
  IAccountUpdateCredentialsDto,
  ICreateAccountDto,
  ICreateProfileReqDto,
  IUser,
} from 'App/types/user';

const reduxUserAction = {
  setUser: (user: Partial<IUser>): PayloadAction<Partial<IUser>> => {
    return {
      type: EReduxUserAction.SET_USER,
      payload: user,
    };
  },
};

const sagaUserAction = {
  createAccountAsync: (data: ICreateAccountDto, navigation: any) => {
    return {
      type: ESagaUserAction.CREATE_ACCOUNT,
      payload: { data, navigation },
    };
  },
  loginAsync: (data: IAccountLoginDto, navigation: any) => {
    return {
      type: ESagaUserAction.LOGIN_ACCOUNT,
      payload: { data, navigation },
    };
  },
  getOTPAsync: (data: ICreateAccountDto, navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaUserAction.GET_OTP,
      payload: { data, navigation, options },
    };
  },
  createProfileAsync: (navigation: any) => {
    return {
      type: ESagaUserAction.CREATE_PROFILE,
      payload: { navigation },
    };
  },
  handleSubmitDisplayNameAsync: (data: string, navigation: any) => {
    return {
      type: ESagaUserAction.HANDLE_SUBMIT_DISPLAY_NAME,
      payload: { data, navigation },
    };
  },
  uploadAvatarProfileAsync: (data: any, navigation: any) => {
    return {
      type: ESagaUserAction.UPLOAD_AVATAR_PROFILE,
      payload: { data, navigation },
    };
  },
  verifyRecoveyOTPAsync: (data: string, navigation: any) => {
    return {
      type: ESagaUserAction.VERIFY_RECOVER_OTP,
      payload: { data, navigation },
    };
  },
  accountRecoverAsync: (data: string, navigation: any) => {
    return {
      type: ESagaUserAction.ACCOUNT_RECOVER,
      payload: { data, navigation },
    };
  },
  getProfileAndGoToMainAppAsync: (navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaUserAction.GET_PROFILE_AND_GO_TO_MAIN_APP,
      payload: { navigation, options },
    };
  },
  getPublicFilterCategoriesAsync: (categoryIds: string[]) => {
    return {
      type: ESagaAppAction.GET_PUBLIC_FILTER_CATEGORIES,
      payload: { categoryIds },
    };
  },
  getPublicTerriesAsync: (filterParams: ITerryFilterParams, navigation: any, filterData?: ITerryFilterInputDto) => {
    return {
      type: ESagaAppAction.GET_PUBLIC_TERRIES,
      payload: { navigation: navigation, data: { filterParams, filterData } },
    };
  },
  updateProfileAsync: (data: Partial<ICreateProfileReqDto>, navigation?: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaUserAction.UPDATE_PROFILE,
      payload: { data, navigation, options },
    };
  },
  getPublicTerryByIdAsync: (data: IGetTerryByIdParams, navigation: any) => {
    return {
      type: ESagaAppAction.GET_PUBLIC_TERRY_BY_ID,
      payload: { navigation: navigation, data },
    };
  },
  updateCredentialsAsync: (data: IAccountUpdateCredentialsDto, navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaUserAction.UPDATE_CREDENTIALS,
      payload: { data, navigation, options },
    };
  },
  filterTerryCheckinsAsyns: (
    filterData: IFilterTerryCheckins,
    filterParams: ITerryCheckinsParams,
    navigation: any,
    options?: ISagaAsyncActionOptions,
  ) => {
    return {
      type: ESagaUserAction.GET_TERRY_CHECKINS,
      payload: { data: { filterData, filterParams }, navigation, options },
    };
  },

  builderCreateTerryAsync: (data: ITerryInputDto, navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaAppAction.BUILDER_CREATE_TERRY,
      payload: { data, navigation, options },
    };
  },
  hunterCheckinTerryAsync: (navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaAppAction.HUNTER_CHECKIN_TERRY,
      payload: { navigation, options },
    };
  },
  hunterUpdateTerryPathAsync: (terryId: string, navigation: any, options?: ISagaAsyncActionOptions) => {
    return {
      type: ESagaAppAction.HUNTER_UPDATE_TERRY_PATH,
      payload: { data: terryId, navigation, options },
    };
  },
  getPublicProfileAsync: (profileID: string, findBy: EPublicReadProfileBy, navigation?: any) => {
    return {
      type: ESagaAppAction.GET_PUBLIC_PROFILE,
      payload: { data: { profileID, findBy }, navigation },
    };
  },
  switchRoleUserAsync: (role: EUserRole, reason: string, navigation: any) => {
    return {
      type: ESagaUserAction.SWITCH_ROLE,
      payload: { data: { role, reason }, navigation },
    };
  },
  getUserNearbyPlayers: (location: Location, navigation: any) => {
    return {
      type: ESagaUserAction.GET_USER_NEARBY_PLAYERS,
      payload: { data: { location }, navigation },
    };
  },
  hunterFilterConversationsAsync: (data: IRequestHunterFilterConversationsQueryParams, navigation?: any) => {
    return {
      type: ESagaAppAction.HUNTER_FILTER_CONVERSATIONS,
      payload: { data, navigation },
    };
  },
  hunterReadConversationAsync: (
    data: {
      conversationId: string;
      requestHunterReadConversationMessagesQueryParams: IRequestHunterReadConversationMessagesQueryParams;
    },
    navigation?: any,
  ) => {
    return {
      type: ESagaAppAction.HUNTER_READ_CONVERSATION,
      payload: { data, navigation },
    };
  },
  hunterSendMessageAsync: (data: ISendMessageInputDto, navigation?: any) => {
    return {
      type: ESagaAppAction.HUNTER_SEND_MESSAGE,
      payload: { data, navigation },
    };
  },
};

export { reduxUserAction, sagaUserAction };
