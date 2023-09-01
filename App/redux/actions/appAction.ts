import { ELanguageCode } from 'App/enums';
import { EReduxAppAction } from 'App/enums/redux';
import { ICreateAccountDto } from 'App/types/redux';

const reduxAppAction = {
  setLanguage: (language: ELanguageCode) => {
    return {
      type: EReduxAppAction.SET_LANGUAGE_CODE,
      payload: { language },
    };
  },
  setRegisterData: (data: Partial<ICreateAccountDto>) => {
    return {
      type: EReduxAppAction.SET_REGISTER_DATA,
      payload: { registerData: data },
    };
  },
};

export { reduxAppAction };
