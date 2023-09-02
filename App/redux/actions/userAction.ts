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
  createAccountAsync: (data: ICreateAccountDto): PayloadAction<ICreateAccountDto> => {
    return {
      type: ESagaUserAction.CREATE_ACCOUNT,
      payload: data,
    };
  },
  loginAsync: (data: IAccountLoginDto): PayloadAction<IAccountLoginDto> => {
    return {
      type: ESagaUserAction.LOGIN_ACCOUNT,
      payload: data,
    };
  },
  getOTPAsync: (data: ICreateAccountDto, onFailCallback: () => void, onSuccessCallback: () => void) => {
    return {
      type: ESagaUserAction.GET_OTP,
      payload: { data, onFailCallback, onSuccessCallback },
    };
  },
};

export { reduxUserAction, sagaUserAction };
