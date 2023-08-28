import { PayloadAction } from '@reduxjs/toolkit';
import { ELanguageCode } from 'App/enums';
import { EReduxAppAction } from 'App/enums/redux';
import { ICreateAccountDto } from 'App/types/redux';

const reduxAppAction = {
  setLanguage: (language: ELanguageCode): PayloadAction<ELanguageCode> => {
    return {
      type: EReduxAppAction.SET_LANGUAGE_CODE,
      payload: language,
    };
  },
  setRegisterData: (data: Partial<ICreateAccountDto>): PayloadAction<Partial<ICreateAccountDto>> => {
    return {
      type: EReduxAppAction.SET_REGISTER_DATA,
      payload: data,
    };
  },
};

export { reduxAppAction };
