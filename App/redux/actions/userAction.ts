import { PayloadAction } from '@reduxjs/toolkit';
import { EReduxUserAction, ESagaUserAction } from 'App/enums/redux';
import { IAccountLoginDto, ICreateAccountDto } from 'App/types/redux';
import { IUser } from 'App/types/user';

const reduxUserAction = {
  setUser: (user: IUser): PayloadAction<IUser> => {
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
  getOTPAsync: (data: ICreateAccountDto, navigation: any) => {
    return {
      type: ESagaUserAction.GET_OTP,
      payload: { data, navigation },
    };
  },
};

export { reduxUserAction, sagaUserAction };
