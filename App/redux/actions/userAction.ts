import { PayloadAction } from '@reduxjs/toolkit';
import { EReduxUserAction, ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import { ISagaAsyncActionOptions } from 'App/types/redux';
import { ITerryFilterParams } from 'App/types/terry';

import { IAccountLoginDto, ICreateAccountDto, IUser } from 'App/types/user';

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
  getProfileAndGoToMainAppAsync: (navigation: any) => {
    return {
      type: ESagaUserAction.GET_PROFILE_AND_GO_TO_MAIN_APP,
      payload: { navigation },
    };
  },
  getPublicFilterCategoriesAsync: (categoryIds: string[]) => {
    return {
      type: ESagaAppAction.GET_PUBLIC_FILTER_CATEGORIES,
      payload: { categoryIds },
    };
  },
  getPublicTerriesAsync: (params: ITerryFilterParams, navigation: any) => {
    return {
      type: ESagaAppAction.GET_PUBLIC_TERRIES,
      payload: { params, navigation },
    };
  },
};

export { reduxUserAction, sagaUserAction };
